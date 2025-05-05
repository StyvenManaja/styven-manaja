const express = require('express');
const authController = require('../controllers/auth.controller');

const route = express.Router();

route.post('/api/refresh', authController.refreshToken);
route.post('/api/logout', authController.logout);

module.exports = route;