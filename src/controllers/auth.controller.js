const jwt = require('jsonwebtoken');
const tokenGenerator = require('../utils/tokenGenerator');

const refreshToken = (req, res) => {
    let refreshToken = req.cookies.refreshToken;    //recuperation du refresh token dans les cookies
    if(!refreshToken) {
        return res.status(403).json({ message: 'No token found.' });    // si token vide
    }

    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (error, decoded) => { //vérification du token s'il est valide
        if(error) {
            return res.sendStatus(401);  // si token invalide
        }
        //recuperation des données encoder dans le token
        let username = decoded.username;
        let email = decoded.email;

        //génération d'un nouveau token d'accès avec les données decoder
        let newAccessToken = tokenGenerator.generateAccessToken(username, email);

        //envoi du nouveau token dans les cookies
        res.cookie('accessToken', newAccessToken, ({
            httpOnly: true,
            secure: true,
            sameSite: 'None',
            maxAge: 1 * 60 * 1000
        }));
        res.json({ message: 'New access token sent.' });
    })
}

const logout = (req, res) => {
    //suppression de l'access et du refresh token dans les cookies
    res.clearCookie('accessToken', {
      httpOnly: true,
      secure: true,
      sameSite: 'None',
      path: '/'
    });
  
    res.clearCookie('refreshToken', {
      httpOnly: true,
      secure: true,
      sameSite: 'None',
      path: '/'
    });
  
    res.status(200).json({ message: 'Déconnexion réussie. À bientôt !' });
  };
  

module.exports = { refreshToken, logout };