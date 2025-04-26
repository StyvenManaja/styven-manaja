const express = require('express');
const userController = require('../controllers/userController');

const route = express.Router();

route.post('/signup', userController.registerUser);     //route pour l'enregistrement de l'utilisateur
route.post('/login', userController.loginUser);         //route pour la connexion

module.exports = route;