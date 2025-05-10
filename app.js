const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
require('dotenv').config();
const path = require('path');
const cookieParser = require('cookie-parser');
const route = require('./src/routes/route');
const userRoute = require('./src/routes/user.route');
const authRoute = require('./src/routes/auth.route');
const postRoute = require('./src/routes/post.route');

const app = express();


// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use(helmet());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());
app.use(cors());

//utilisation de tout les routes
app.use(route);
app.use(userRoute);
app.use(authRoute);
app.use(postRoute);

app.set('views', path.join(__dirname, 'views'));

//mis en place du Middlewares pour les view avec ejs
app.set('view engine', 'ejs');

app.use((req, res) => {
    res.status(404).sendFile(path.join(__dirname, 'views', '404.html'));
});

module.exports = app;
