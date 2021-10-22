const router = require('express').Router();
const passport = require('passport');
const authController = require('../controller/AuthController');
const User = require('../models/User');

// Profile
router.get('/:username', async (req, res) => {
    try {
        const username = req.query.username;
        if (!username) return res.json({ error: 'Username invalid!' });
        const user = await User.findOne({ username: req.query.username });
        if (!user) return res.json({ error: 'Username invalid!' });
        res.json({ user });
    } catch (e) {
        res.json(501).json({ error: e });
    }
});

module.exports = router;
