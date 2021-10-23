const router = require('express').Router();
const authController = require('../controller/AuthController');
const roadmapController = require('../controller/RoadmapController');

// Get all roadmaps of a user
router.get('/all', roadmapController.getAllRoadmaps);

// Get a single roadmap
router.get('/:id', roadmapController.getRoadmap);

// Create a roadmap
router.post(
    '/create',
    authController.isAuthenticated,
    roadmapController.createRoadmap
);

// Search a roadmap
router.get('/search', roadmapController.searchRoadmap);

// Fork a roadmap
router.post(
    '/fork/:id',
    authController.isAuthenticated,
    roadmapController.forkRoadmap
);

// Create note for a roadmap
router.post(
    '/:id/note/create',
    authController.isAuthenticated,
    roadmapController.createNote
);

// Get all notes of a roadmap
router.get(
    '/note/all',
    authController.isAuthenticated,
    roadmapController.getNotes
);

// Get a note by noteID
router.get('/note', authController.isAuthenticated, roadmapController.getNote);

module.exports = router;
