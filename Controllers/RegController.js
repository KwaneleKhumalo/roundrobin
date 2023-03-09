const newUser = require("../Models/RegModels");
const {StatusCodes} = require('http-status-codes')

const register = async (req, res) => {
  // throw new Error('Async Error')
  const user = await newUser.create({...req.body});
  const token = user.createJWT();
  res.status(StatusCodes.CREATED).json({ user: {name:user.firstName}, token });
};


const loginController = async (req, res) => {
  const {email, password} = req.body;
  const user = await newUser.findOne({email})

  if(!user)
  {
    res.status(StatusCodes.NOT_FOUND).send(`
      <div>
        <h1>404!</h1>
        <strong>THIS USER DOES NOT EXIST!</strong>
      </div>
    `)
  }

  const correctPassword = await user.comparePasswords(password)

  if(!correctPassword)
  {
    res.status(StatusCodes.NOT_FOUND).send(`
      <div>
        <h1>404!</h1>
        <strong>THIS USER DOES NOT EXIST!</strong>
      </div>
    `)
  }


    const token = user.createJWT();
    res.status(StatusCodes.OK).json({user: {name: user.firstName}, token});

}


module.exports = {
  register,
  loginController
};
