require('dotenv').config();
require('./config/dbConfig').config();
const express = require('express');
const cors = require('cors');

// Routers
const authRoutes = require('./routes/auth');
const roadRoutes = require('./routes/roadmaps');

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

// Routing
app.use('/auth', authRoutes);
app.use('/:username/roadmaps', roadRoutes);

// Listen at PORT
app.listen(PORT, () => {
    console.log(`Server is up at ${PORT}`);
});
