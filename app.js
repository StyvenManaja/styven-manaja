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

// Configuration CORS
app.use(cors({
    origin: process.env.NODE_ENV === 'production'
    ? 'https://styven-manaja.digital'
    : 'http://localhost:5173',
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

app.set('views', path.join(__dirname, 'views'));

//mis en place du Middlewares pour les view avec ejs
app.set('view engine', 'ejs');

// Middleware pour servir les fichiers statiques React
if (process.env.NODE_ENV === 'production') {
    // Dossier où React génère les fichiers build
    app.use(express.static(path.join(__dirname, 'admin-frontend', 'dist')));
  
    // Route pour toutes les autres requêtes, retourner index.html de React
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'admin-frontend', 'dist', 'index.html'));
    });
};

app.use((req, res) => {
    res.status(404).sendFile(path.join(__dirname, 'views', '404.html'));
});

module.exports = app;
