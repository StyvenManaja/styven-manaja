const User = require('../models/User');

//enregistrement de l'utilisateur dans la base de donnée
const registerUser = async (userData) => {
    try {
        let user = await User.create({
            username: userData.username,
            email: userData.email,
            password: userData.password
        })
        return user.username;
    } catch (error) {
        console.log('An error occured on registering user: ', error);
        return null;
    }
}

//chercher l'utilisateur depuis la base de donnée
const findUser = async (email) => {
    try {
        let user = await User.findOne({ email });
        if(!user) { return null };
        return user;
    } catch (error) {
        console.log('An error occured on finding user: ', error);
        return null;
    }
}

module.exports = { registerUser, findUser };