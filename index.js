require('dotenv').config();
require('./config/dbConfig').config();
const express = require('express');
const passport = require('passport');
const session = require('express-session');
const cors = require('cors');

// Routers
const authRoutes = require('./routes/auth');
const roadRoutes = require('./routes/roadmaps');
const profileRoutes = require('./routes/profile');

// Important constants
const app = express();
const PORT = process.env.PORT || 5000;

// Middle wares
app.use(express.json());
app.use(
    cors({
        origin: 'http://localhost:5000/',
    })
);
app.use(
    session({
        secret: process.env.SESSION_KEY,
        resave: true,
        saveUninitialized: true,
        cookie: {
            expires: new Date(Date.now() + 3 * 24 * 60 * 1000),
        },
    })
);
app.use(passport.initialize());
app.use(passport.session());

// Routing
app.use('/profile', profileRoutes);
app.use('/auth', authRoutes);
app.use('/roadmaps', roadRoutes);

// Listen at PORT
app.listen(PORT, () => {
    console.log(`Server is up at ${PORT}`);
});
