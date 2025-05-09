const express = require('express');
const postController = require('../controllers/post.controller');
const authentication = require('../middlewares/authentication');

const route = express.Router();

route.post('/api/post/create', authentication, postController.createPost);  //création du post
route.get('/api/posts', postController.findAllPost);    //route pour récuperer les posts dans la base
route.put('/api/post/:id', authentication, postController.updatePost);  //route pour la mis à jour du post
route.delete('/api/post/:id', authentication, postController.deletePost);   //route pour la suppression du post

module.exports = route;