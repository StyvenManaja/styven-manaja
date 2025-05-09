const express = require('express');

const controller = require('../controllers/controller');

const route = express.Router();

route.get('/', controller.homePage);
route.get('/about', controller.aboutPage);
route.get('/services', controller.servicePage);
route.get('/portfolio', controller.portfolioPage);
route.get('/contact', controller.contactPage);
route.get('/blog', controller.blogPage);
route.get('/blog/:id', controller.findAPost);

route.post('/send-mail', controller.sendMail);

module.exports = route;