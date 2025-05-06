const postRepository = require('../repositories/post.repository');

const createPost = async (title, content, author) => {  //passer les données du post dans les paramètres
    let postData = {
        title: title,
        content: content,
        author: author
    }
    let post = await postRepository.createPost(postData);   //appel du method pour crée le post
    if(!post) { return null };  //si pas de post crée, renvoi null au controller
    return post;    // sinon, on envoi le post au controller
}

const findAllPost = async () => {
    let postList = await postRepository.findAllPost();
    if(!postList) { return null };  //si pas de post trouver ou il y avait une erreur, on envoi null au controller
    return postList;    //sinon, on envoi la liste
}

const updatePost = async (id, title, content) => {
    //mise à jour du Post
    let postUpdated = await postRepository.updatePost(id, title, content);  //essaye de récuperer le post mis à jour
    if(!postUpdated) { return null };   //si post pas modifier, on envoi null
    //sinon on envoi le post mis à jour
    return postUpdated;

}

const deletePost = async (id) => {
    //on essaye de supprimer le post
    let deleted = await postRepository.deletePost(id);
    if(!deleted) { return false };   //s'il y avait eu une erreur lors de la suppression, on envoi false
    return true;    //sinon, on envoi true
}

module.exports = { createPost, findAllPost, updatePost, deletePost };