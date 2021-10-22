const router = require('express').Router();
const passport = require('passport');
const authController = require('../controller/AuthController');
const userController = require('../controller/UserController');
const Roadmap = require('../models/Roadmap');
const User = require('../models/User');

// Profile
router.get('/:username', userController.getProfile);

// Connect to a user
router.post(
    '/:username/connect',
    authController.isAuthenticated,
    userController.connectProfile
);

// Search a profile
router.get('/search', userController.searchProfile);

module.exports = router;
