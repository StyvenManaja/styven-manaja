const mongoose = require('mongoose');

//Schema pour les posts
let postSchema = new mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    author: { type: String, required: true }
}, {
    timestamps: true
})

//création du model post
const Post = mongoose.model('Post', postSchema);

module.exports = Post;