const express = require('express');
const router = express.Router();
const loginRoute = express.Router();
const sendMailRoute = express.Router();
const {register, loginController, sendMail} = require('../Controllers/RegController')


router.route('/register').post(register);
router.route('/login').post(loginController);
sendMailRoute.route('/verify').post(sendMail);



module.exports = {
 router,
 loginRoute,
 sendMailRoute
}