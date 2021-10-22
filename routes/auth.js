const router = require('express').Router();
const passport = require('passport');
const authController = require('../controller/AuthController');

// Login
router.post('/login', passport.authenticate('login'), (req, res) => {
    res.json({ username: req.user.username, name: req.user.name });
});

// Regsiter
router.post('/register', passport.authenticate('register'), (req, res) => {
    res.json({ username: req.user.username, name: req.user.name });
});

// Logout
router.post('/logout', (req, res) => {
    req.logout();
    res.json({ success: true });
});

module.exports = router;
