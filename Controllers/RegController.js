require('dotenv').config();
const newUser = require("../Models/RegModels");
const { StatusCodes } = require("http-status-codes");
const { registerValidation, loginValidation} = require("../middleware/validationMiddleware");
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken')
const nodemailer = require("nodemailer");
const {v4: uuidv4} = require('uuid');
const { LocalStorage } = require('node-localstorage');
let {localStorage} = require('node-localstorage').LocalStorage
localStorage = new LocalStorage('./scratch');

const finalVerification = async () => {
  const generateCode = uuidv4();
  const accessCode = generateCode.split("-")[0];

  localStorage.setItem('access-Code', accessCode);
  let mail = nodemailer.createTransport({
   service: "gmail",
   auth: {
     user: process.env.EMAIL,
     pass: process.env.EMAIL_PASS,
   },
 });

 let mailOptions = {
   from: process.env.EMAIL,
   to: 'ngemakwanele1@gmail.com',
   subject: "Do not Reply",
   text: `Your access code is: \n ${accessCode}`,
 };

 mail.sendMail(mailOptions, (error, info) => {
   error
     ? console.log("No success" + error)
     : res.status(200).json(`Success ${info.response}`);
 });
 }

const register = async (req, res) => {
  const { error } = registerValidation(req.body);
  const userExists = await newUser.findOne({ email: req.body.email });

  if (error) {
    return res.status(400).json(error.details[0].message);
  } else if (userExists) {
    return res
      .status(StatusCodes.CONFLICT)
      .send("This user with this email already exists. Please login.");
  } else {
    try {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(req.body.password, salt);

      const userFields = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        positionTitle: req.body.positionTitle,
        email: req.body.email,
        password: hashedPassword
      }


      const user = await newUser.create(userFields);
      return res
        .status(StatusCodes.CREATED)
        .json({ name: user.firstName });
    } catch (error) {
      return console.log(error);
    }
  }
};

const loginController = async (req, res) => {
  // validation
  const {error} = loginValidation(req.body);
  if(error) return res.status(400).send(error.details[0].message);
  const user = await newUser.findOne({email: req.body.email})
  if(!user) return res.status(400).send(`Email or Password is wrong`);
  const correctPassword = await bcrypt.compare(req.body.password, user.password);
  if(!correctPassword) return res.status(400).send(`Email or Password is wrong`);

  finalVerification()
  // JWT
  const token = jwt.sign({name: user.firstName, lastname: user.lastName},process.env.TOKEN_SECRET )
  res.header('authorization-token', token).json({
    msg: "Success!",
    verification: "Please enter the code sent to the email associated with your account."
  });
};

const sendMail = async (req, res) => {
  const accessCode = localStorage.getItem('access-Code');
  const code = req.body.accessCode;
  if(!code) return res.status(400).send('This field is required');

  if(code !== accessCode) return res.status(StatusCodes.UNAUTHORIZED).send('Access Denied!')

  res.status(StatusCodes.OK).json({msg: "success!"})
}


















module.exports = {
  register,
  loginController,
  sendMail
};
