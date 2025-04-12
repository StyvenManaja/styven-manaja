const service = require('../services/service');
const path = require('path');

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

const sendMail = async (req, res) => {
    let { name, email, message } = req.body;
    let isMailSent = await service.sendMail(name, email, message);
    if(isMailSent) {
        res.status(200).json({ message: 'Email sent successfully!' });
    } else {
        res.status(500).json({ message: 'Error on sending email' });
    }
}

module.exports = { homePage, aboutPage, servicePage, portfolioPage, contactPage, sendMail };