const Post = require('../models/Post');

//création d'un post
const createPost = async (postData) => {
    try {
        //essaye de crée le post avec les données reçu via le service
        let post = await Post.create({
            title: postData.title,
            content: postData.content,
            author: postData.author
        });
        return post;    //si création avec succès
    } catch (error) {
        //s'il y avait une erreur lors de la création du post
        console.log('An error occured when creating post: ', error.message);
        return null;
    }
}

//récuperer tous les posts
const findAllPost = async () => {
    try {
        //on essaie de récuperer tous les posts dans la base de donnée
        let postList = await Post.find();
        return postList;    //si les posts sont récuperer
    } catch (error) {
        //s'il y avait une erreur lors de la récuperation des posts
        console.log('An error occured when finding all post: ', error.message);
        return null;
    }
}

//mise à jour d'un post
const updatePost = async (id, title, content) => {
    try {
        let updatedPost = await Post.findByIdAndUpdate(id, { title: title, content: content }, { new: true }); //on met à jour le post avec ce id en mettant les nouveau données et on récupere aussi la post mis à jour
        return updatedPost; //on envoie le post mis à jour
    } catch (error) {
        //si il y avait une erreur lors de la mise à jour du Post
        console.log('An error occured when updating the post: ', error.message);
        return null;
    }
}

//supprimer un post
const deletePost = async (id) => {
    try {
        //suppression du post
        await Post.findByIdAndDelete(id);
        return true;
    } catch (error) {
        //si erreur bien sur, on renvoi false
        console.log('Error on deleting the post: ', error.message);
        return false;
    }
}

module.exports = { createPost, findAllPost, updatePost, deletePost };