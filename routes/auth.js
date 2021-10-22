const router = require('express').Router();
const passport = require('passport');
const authController = require('../controller/AuthController');

// Login
router.post('/login', passport.authenticate('login'));

// Regsiter
router.post('/register', passport.authenticate('register'));

module.exports = router;
