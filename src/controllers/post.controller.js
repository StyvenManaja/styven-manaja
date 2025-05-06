const postService = require('../services/post.service');

const createPost = async (req, res) => {
    let { title, content } = req.body;  //récuperer le titre et  le contenu du post depuis body
    let author = req.username;  //pour l'auteur ce sera le de l'utilisateur authentifié
    let post = await postService.createPost(title, content, author);    //on appel la method pour crée le post depuis services
    if(!post) {
        return res.status(403).json({ message: 'Error on creating post, please try again.' });  //si il y a erreur lors de la création
    }
    res.status(200).json({ post }); //on envoi le post si c'est crée
}

const findAllPost = async (req, res) => {
    let postList = await postService.findAllPost(); //récuperer la liste envoyer depuis le service
    if(!postList) {
        //si pas de post trouver
        return res.json({ message: 'No post found.' });
    }
    res.status(200).json({ postList }); //envoi de la liste de post

}

const updatePost = async (req, res) => {
    let { title, content } = req.body;  //récuperation des nouveau données du Post
    let { id } = req.params; //récuperation de l'id du post à modifier 
    let updatedPost = await postService.updatePost(id, title, content); //modification du Post
    if(!updatedPost) {
        //si la modification a échoué
        return res.status(403).json({ message: 'Can not update post.' });
    }
    res.status(200).json({ message: 'Post modified' });
}

const deletePost = async (req, res) => {
    let { id } = req.params;    //récuperation de l'id du post à modifier
    let deleted = await postService.deletePost(id);     //suppression du Post
    if(!deleted) {
        //si la suppression échoue
        return res.status(403).json({ message: 'Error on deleting post.' });
    }
    res.status(200).json({ message: 'Post deleted succcessfully.' });
}

module.exports = { createPost, findAllPost, updatePost, deletePost };