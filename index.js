require('dotenv').config();
require('./config/dbConfig').config();
const express = require('express');
const passport = require('passport');
const cors = require('cors');
const path = require('path');
const cookieParser = require('cookie-parser');

// Routers
const authRoutes = require('./routes/auth');
const roadRoutes = require('./routes/roadmaps');
const profileRoutes = require('./routes/profile');

// Important constants
const app = express();
const PORT = process.env.PORT || 5000;

// Middle wares
app.use(express.json());
app.use('/public', express.static(path.resolve(__dirname, './public')));
app.use(express.static(path.resolve(__dirname, './client/build')));
if (process.env.NODE_ENV === 'production') {
    app.use(cors());
}
app.use(cookieParser());
// app.use(passport.initialize());
// app.use(passport.session());

// Routing
app.use('/profile', profileRoutes);
app.use('/auth', authRoutes);
app.use('/roadmaps', roadRoutes);

if (process.env.NODE_ENV === 'production') {
    const path = require('path');
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

// Listen at PORT
app.listen(PORT, () => {
    console.log(`Server is up at ${PORT}`);
});
