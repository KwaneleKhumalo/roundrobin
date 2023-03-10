const nodemailer = require("nodemailer");
const {v4: uuidv4} = require('uuid')

const sendMail = (req, res) => {
  const generateCode = uuidv4();
  const accessCode = generateCode.split("-")[0];

  const mail = (code) => {
   let mail = nodemailer.createTransport({
    host: "gmail.com",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASS,
    },
  });

  let mailOptions = {
    from: process.env.EMAIL,
    to: 'kngema@hotmail.com',
    subject: "Do not Reply",
    text: code,
  };

  mail.sendMail(mailOptions, (error, info) => {
    error
      ? console.log("No success" + error)
      : res.status(200).json(`Success ${info.response}`);
  });
  }

  // console.log(accessCode);
  
};







// const finalVerification = () => {
//  const generateCode = uuidv4();
//  const accessCode = generateCode.split("-")[0];

//  let mail = nodemailer.createTransport({
//   service: "gmail",
//   auth: {
//     user: process.env.EMAIL,
//     pass: process.env.EMAIL_PASS,
//   },
// });

// let mailOptions = {
//   from: process.env.EMAIL,
//   to: 'ngemakwanele1@gmail.com',
//   subject: "Do not Reply",
//   text: accessCode,
// };

// mail.sendMail(mailOptions, (error, info) => {
//   error
//     ? console.log("No success" + error)
//     : res.status(200).json(`Success ${info.response}`);
// });

// const {accessFromMail} = accessValidation(req.body.accessCode);
//  // if(!accessFromMail) return res.status(400).send(error.details[0].message);
//  // const gainAccess = req.body.accessCode;
//  // if(!gainAccess || gainAccess !== accessCode) return res.status(StatusCodes.UNAUTHORIZED).send('Access Denied!');
// }
