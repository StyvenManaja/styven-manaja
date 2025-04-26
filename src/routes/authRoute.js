const express = require('express');
const authController = require('../controllers/authController');

const route = express.Router();

route.post('/refresh-token', authController.refreshToken);
route.post('/logout', authController.logout);

module.exports = route;