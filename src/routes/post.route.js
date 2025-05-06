const express = require('express');
const postController = require('../controllers/post.controller');
const authentication = require('../middlewares/authentication');

const route = express.Router();

route.post('/post/create', authentication, postController.createPost);  //création du post
route.get('/posts', postController.findAllPost);    //route pour récuperer les posts dans la base
route.put('/post/:id', postController.updatePost);  //route pour la mis à jour du post
route.delete('/post/:id', postController.deletePost);   //route pour la suppression du post

module.exports = route;