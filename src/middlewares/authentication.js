//middleware pour l'authentification
const jwt = require('jsonwebtoken');

const authentication = (req, res, next) => {
    let token = req.cookies.accessToken;    //récuperer le token depuis les cookies
    if(!token) {
        return res.status(401).json({ message: 'No token found.' });
    }

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (error, decoded) => {
        if(error) {
            return res.status(401).json({ message: 'Invalid or expires token.' });
        }

        //récuperation des données encoder dans le token
        req.username = decoded.username;
        req.email = decoded.email;
        next(); //passer au prochain middleware avec les donnée recuperer
    })
}

module.exports = authentication;