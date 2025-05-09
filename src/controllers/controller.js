const service = require('../services/service');
const postService = require('../services/post.service');
const path = require('path');
const parseMarkdown = require('../utils/parseMarkdown');

const homePage = (req, res) => {
    res.sendFile(path.join(__dirname, '..', '..', 'views', 'index.html'));
}

const aboutPage = (req, res) => {
    res.sendFile(path.join(__dirname, '..', '..', 'views', 'about.html'));
}

const servicePage = (req, res) => {
    res.sendFile(path.join(__dirname, '..', '..', 'views', 'services.html'));
}

const portfolioPage = (req, res) => {
    res.sendFile(path.join(__dirname, '..', '..', 'views', 'portfolio.html'));
}

const contactPage = (req, res) => {
    res.sendFile(path.join(__dirname, '..', '..', 'views', 'contact.html'));
}

//controller pour servir la page view
const blogPage = async (req, res) => {
    let postList = await postService.findAllPost(); //récuperer tous les post depuis la base et l'envoyer au frontend après
    res.render('blog', { postList });
}

//c'est pour récuperer un post spécifique et l'afficher dans un page
const findAPost = async (req, res) => {
    let { id } = req.params;
    let post = await postService.findAPost(id);
    post.content = parseMarkdown(post.content); //parser le contenu du post avant de l'envoyer au frontend
    res.render('post', { post });
}

const sendMail = async (req, res) => {
    let { name, email, message } = req.body;
    let isMailSent = await service.sendMail(name, email, message);
    if(isMailSent) {
        res.status(200).json({ message: 'Email sent successfully!' });
    } else {
        res.status(500).json({ message: 'Error on sending email' });
    }
}

module.exports = { homePage, aboutPage, servicePage, portfolioPage, contactPage, sendMail, blogPage, findAPost };