const router = require('express').Router();
const roadmapController = require('../controller/RoadmapController');

// Get all roadmaps of a user
router.get('/all', roadmapController.getAllRoadmaps);

// Get a single roadmap
router.get('/:title', roadmapController.getRoadmap);

// Create a roadmap
router.post('/create', roadmapController.createRoadmap);

// Search a roadmap
router.get('/search', roadmapController.searchRoadmap);

module.exports = router;
