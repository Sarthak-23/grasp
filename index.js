require('dotenv').config();
require('./config/dbConfig').config();
const express = require('express');
const homeRoutes = require('./routes/home');
const cors = require("cors")


// Important constants
const app = express();
const PORT = process.env.PORT || 5000;

// Middle wares
app.use(express.json());
app.use(cors());

// Routing
app.use('/', homeRoutes);

// Listen at PORT
app.listen(PORT, () => {
    console.log(`Server is up at ${PORT}`);
});
