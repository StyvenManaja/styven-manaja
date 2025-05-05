const express = require('express');
const userController = require('../controllers/user.controller');
const authentication = require('../middlewares/authentication');

const route = express.Router();

route.post('/api/signup', userController.registerUser);     //route pour l'enregistrement de l'utilisateur
route.post('/api/login', userController.loginUser);         //route pour la connexion
route.get('/api/user', authentication, userController.userData);    //route pour récuperer les données de l'utilisateur authentifié

module.exports = route;