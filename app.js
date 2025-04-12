const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
require('dotenv').config();
const path = require('path');
const route = require('./src/routes/route');

const app = express();

//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use(cors());
app.use(helmet());
app.use(express.static(path.join(__dirname, 'public')));
app.use(route); 

app.use((req, res) => {
    res.status(404).sendFile(path.join(__dirname, 'views', '404.html'));
});

app.set('views', path.join(__dirname, 'views'));

module.exports = app;