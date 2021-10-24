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
        about: req.user.about,
        id: req.user._id,
        connections: req.user.connections,
        goals: req.user.goals,
        sent: req.user.sent,
        received: req.user.received,
    });
});

// Regsiter
router.post('/register', passport.authenticate('register'), (req, res) => {
    res.json({
        username: req.user.username,
        name: req.user.name,
        about: req.user.about,
        id: req.user._id,
        connections: req.user.connections,
        goals: req.user.goals,
        sent: req.user.sent,
        received: req.user.received,
    });
});

// Logout
router.post('/logout', (req, res) => {
    req.logout();
    res.json({ success: true });
});

module.exports = router;
