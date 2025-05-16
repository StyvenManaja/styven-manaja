const userService = require('../services/user.service');

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

    //stockage de l'access et refresh token dans les cookies pour pouvoir les utiliser plus tard
    res.cookie('accessToken', user.accessToken, ({
        httpOnly: true,
        secure: true,
        sameSite: 'None',
        maxAge: 1 * 60 * 1000
    }))
    
    res.cookie('refreshToken', user.refreshToken, ({
        httpOnly: true,
        secure: true,
        sameSite: 'None',
        maxAge: 1 * 60 * 60 * 1000
    }))

    res.status(200).json({ message: 'Login successful.' });
}

//controller qui envoi le nom et l'email de l'utilisateur
const userData = (req, res) => {
    res.status(200).json({
        username: req.username,
        email: req.email
    })
}

module.exports = { registerUser, loginUser, userData };
