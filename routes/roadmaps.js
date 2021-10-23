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

// Update a roadmap
router.patch(
    '/:id',
    authController.isAuthenticated,
    roadmapController.updateRoadmap
);

// Fork a roadmap
router.post(
    '/fork/:id',
    authController.isAuthenticated,
    roadmapController.forkRoadmap
);

// Search a roadmap
router.get('/all/search', roadmapController.searchRoadmap);

// Create note for a roadmap
router.post(
    '/:id/notes/create',
    authController.isAuthenticated,
    roadmapController.createNote
);

// Get all notes of a roadmap
router.get(
    '/:id/notes/all',
    authController.isAuthenticated,
    roadmapController.getNotes
);

// Get a note by noteID
router.get(
    '/notes/:noteid',
    authController.isAuthenticated,
    roadmapController.getNote
);

// Update a note by noteID
router.patch(
    '/notes/:noteid',
    authController.isAuthenticated,
    roadmapController.updateNote
);

module.exports = router;
