const app = require('./app');
const db = require('./src/config/db');

db.connectToDB();

module.exports = app;
