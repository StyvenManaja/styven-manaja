const jwt = require('jsonwebtoken');
const tokenGenerator = require('../utils/tokenGenerator');

const refreshToken = (req, res) => {
    let refreshToken = req.cookies.refreshToken;    //recuperation du refresh token dans les cookies
    if(!refreshToken) {
        return res.status(403).json({ message: 'No token found.' });    // si token vide
    }

    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (error, decoded) => { //vérification du token s'il est valide
        if(error) {
            return res.status(401).json({ message: 'Invalid or expired token.' });  // si token invalide
        }
        //recuperation des données encoder dans le token
        let username = decoded.username;
        let email = decoded.email;

        //génération d'un nouveau token d'accès avec les données decoder
        let newAccessToken = tokenGenerator.generateAccessToken(username, email);
        res.status(200).json({ accessToken: newAccessToken });
    })
}

const logout = (req, res) => {
    res.clearCookie('refreshToken', { httpOnly: true, secure: true, sameSite: 'Strict' });  //supprimer le refresh token dans les cookies
    res.json({ message: 'User logged out successfully.' });
}

module.exports = { refreshToken, logout };