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

// Configuration CORS (uniquement une fois ici)
app.use(cors({
    origin: 'http://localhost:5173',  // URL du frontend React
    credentials: true  // Permet d'envoyer les cookies avec les requêtes
}));

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use(helmet());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());
//utilisation de tout les routes
app.use(route);
app.use(userRoute);
app.use(authRoute);
app.use(postRoute);

app.use((req, res) => {
    res.status(404).sendFile(path.join(__dirname, 'views', '404.html'));
});

app.set('views', path.join(__dirname, 'views'));

module.exports = app;