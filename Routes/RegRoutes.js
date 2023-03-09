const express = require('express');
const router = express.Router();
const loginRoute = express.Router();
const {register, loginController} = require('../Controllers/RegController')

// router.route('/').post(login)


router.route('/register').post(register);
router.route('/login').post(loginController);



module.exports = {
 router,
 loginRoute
}