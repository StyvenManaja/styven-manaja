const jwt = require('jsonwebtoken');

const generateAccessToken = (username, email) => {
    return jwt.sign({ username, email }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1min' });   //token d'accès
}

const generateRefreshToken = (username, email) => {
    return jwt.sign({ username, email }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '1d' }); //refresh token
}

module.exports = { generateAccessToken, generateRefreshToken };