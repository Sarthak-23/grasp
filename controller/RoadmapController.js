const User = require('../models/User');
const Roadmap = require('../models/Roadmap');

// Get all roadmaps of a user
exports.getAllRoadmaps = (req, res) => {};

// Get a roadmap
exports.getRoadmap = (req, res) => {};

// Create a roadmap
exports.createRoadmap = (req, res) => {};

// Search a roadmap
exports.searchRoadmap = (req, res) => {
    const { type, keyword } = req.query; // type can be tag or fuzzy(by name)
    // Search according to the type
};
