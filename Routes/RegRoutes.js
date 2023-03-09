const express = require('express');
const router = express.Router();
const {register} = require('../Controllers/RegController')

router.route('/').post(register);

module.exports = router