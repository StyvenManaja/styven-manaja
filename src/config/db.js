const mongoose = require('mongoose');

const connectToDB = () => {
    try {
        mongoose.connect(process.env.mongo_URI);
        console.log('Connected to the database.');
    } catch (error) {
        console.log('Error on connecting to the database: ', error);
    }
}

module.exports = { connectToDB };