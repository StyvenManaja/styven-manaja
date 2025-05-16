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

// CORS config
const allowedOrigins = ['https://admin-frontend-ashen-two.vercel.app'];

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
};

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use(helmet());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());
app.use(cors(corsOptions));

// Routes
app.use(route);
app.use(userRoute);
app.use(authRoute);
app.use(postRoute);

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, 'views', '404.html'));
});

module.exports = app;
