const userService = require('../services/userService');

//controller d'enregistrement d'utilisateur
const registerUser = async (req, res) => {
    let { username, email, password } = req.body;
    let user = await userService.registerUser(username, email, password);
    if(!user) {
        return res.status(403).json({ message: 'Error on registering user.' });     //au cas où le repository envoi null
    }
    res.status(200).json({ message: `Welcome ${user}!` });
}

//controller pour la connexion de l'utilisateur
const loginUser = async (req, res) => {
    let { email, password } = req.body;
    let user = await userService.loginUser(email, password);
    if(!user) {
        return res.status(403).json({ message: 'User not found.' });        //si l'utilisateur n'est pas trouver
    }

    //stockage du refresh token dans un cookie pour pouvoir l'utiliser plus tard
    res.cookie('refreshToken', user.refreshToken, ({
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'Strict',
        maxAge: 1 * 60 * 60 * 1000
    }))

    //envoi de l'access token au front-end
    res.status(200).json({ accessToken: user.accessToken });
}

module.exports = { registerUser, loginUser };