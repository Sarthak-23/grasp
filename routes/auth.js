const router = require('express').Router();
const authController = require('../controller/AuthController');

// Login
router.get('/login', authController.login);

// Regsiter
router.get('/register', authController.register);

module.exports = router;
