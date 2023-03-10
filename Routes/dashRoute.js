const express = require('express');
const dashboard = require('../Controllers/dashController');
const dash = express.Router();

dash.route('/').get(dashboard);

module.exports = {
 dash
}