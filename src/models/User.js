const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

//le schema pour l'utilisateur
let userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});

//hasher le mot de passe à l'enregistrement d'un nouveau utilisateur ou d'un modification de son mot de passe
userSchema.pre('save', async function(next) {
    if(!this.isModified('password')) { return next() };     //si le mot de passe n'est pas modifier, on ne fait rien
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

//method pour comparer le mot de passe(à utiliser pendant la connexion)
userSchema.methods.matchPassword = async function(enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User', userSchema);