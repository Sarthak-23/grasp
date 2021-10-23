const router = require('express').Router();
const passport = require('passport');
const authController = require('../controller/AuthController');

// Get user
router.get('/user', (req, res) => {
    if (req.user) {
        res.json(req.user);
    } else {
        res.json({ error: 'Unauthorized user' });
    }
});

// Login
router.post('/login', passport.authenticate('login'), (req, res) => {
    res.json({
        username: req.user.username,
        name: req.user.name,
        id: req.user._id,
    });
});

// Regsiter
router.post('/register', passport.authenticate('register'), (req, res) => {
    res.json({
        username: req.user.username,
        name: req.user.name,
        id: req.user._id,
    });
});

// Logout
router.post('/logout', (req, res) => {
    req.logout();
    res.json({ success: true });
});

module.exports = router;
