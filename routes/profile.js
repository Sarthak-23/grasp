const router = require('express').Router();
const passport = require('passport');
const authController = require('../controller/AuthController');
const userController = require('../controller/UserController');
const Roadmap = require('../models/Roadmap');
const User = require('../models/User');

// Search a profile
router.get('/api/search', userController.searchProfile);

// Update profile
router.patch(
    '/update',
    authController.isAuthenticated,
    userController.updateProfile
);

// Pending requests
router.get(
    '/pending',
    authController.isAuthenticated,
    userController.getPendingRequests
);

// Received requests
router.get(
    '/received',
    authController.isAuthenticated,
    userController.getReceivedRequests
);

// Connections
router.get(
    '/connections',
    authController.isAuthenticated,
    userController.getAllConnections
);

// Profile
router.get('/:username', userController.getProfile);

// Get all roadmaps of the user
router.get('/:username/roadmaps', userController.getRoadmaps);

// Connections to a user
router.get('/:username/connections', userController.getUserConnections);

// Connect to a user
router.post(
    '/:username/connect',
    authController.isAuthenticated,
    userController.connectProfile
);

// Accept to a user
router.post(
    '/:username/accept',
    authController.isAuthenticated,
    userController.acceptInvite
);

// Reject to a user
router.post(
    '/:username/reject',
    authController.isAuthenticated,
    userController.rejectInvite
);

module.exports = router;
