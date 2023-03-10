const jwt = require("jsonwebtoken");
const { StatusCodes } = require("http-status-codes");

const auth = (req, res, next) => {
 const token = req.header('authorization-token');
 if(!token) return res.status(StatusCodes.UNAUTHORIZED).send('Access Denied!');

 try {
  const userVerified = jwt.verify(token, process.env.TOKEN_SECRET);
  req.user = userVerified;
  next();
 } catch (error) {
  return res.status(StatusCodes.NOT_FOUND).send('Invalid Token');
 }
};

module.exports = auth;
