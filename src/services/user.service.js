const userRepository = require('../repositories/user.repository');
const tokenGenerator = require('../utils/tokenGenerator');

const registerUser = async (username, email, password) => {
    let userData = {
        username: username,
        email: email,
        password: password
    }

    let user = await userRepository.registerUser(userData);     //appel de la méthode pour l'enregistrement d'un utilisateur
    if(!user) { return  null };
    return user;
}

const loginUser = async (email, password) => {
    let user = await userRepository.findUser(email);    //appel de la méthode pour chercher l'utilisateur
    if(user && (await user.matchPassword(password))) {  //verifier si l'utilisateur existe et si le mot de passe correspond
        //génération des token pour l'auth
        let accessToken = tokenGenerator.generateAccessToken(user.username, user.email);
        let refreshToken = tokenGenerator.generateRefreshToken(user.username, user.email);

        //envoie des tokens au controller
        return {
            accessToken: accessToken,
            refreshToken: refreshToken
        }
    }
    return null;
}

module.exports = { registerUser, loginUser };