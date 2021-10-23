const mongoose = require('mongoose');
const User = require('../models/User');
const Note = require('../models/Note');
const Roadmap = require('../models/Roadmap');

// Get all roadmaps of a user
exports.getAllRoadmaps = async (req, res) => {
    try {
        const user = await User.findOne({
            username: req.query.username,
        }).select('_id');
        if (!user) {
            return res.status(401).json({ error: 'Invalid username' });
        }
        let isPrivate = false;
        if (req.user) {
            isPrivate = req.user._id.equals(user._id);
        }
        let roadmaps;
        if (isPrivate)
            roadmaps = await Roadmap.find({
                user: user._id,
            });
        else
            roadmaps = await Roadmap.find({
                user: user._id,
                private: isPrivate,
            });
        res.json(roadmaps);
    } catch (e) {
        res.status(500).json({ error: e });
    }
};

// Get a roadmap
exports.getRoadmap = async (req, res) => {
    try {
        const roadmaps = await Roadmap.findOne({
            _id: req.params.id,
        });
        if (roadmaps.private === true && !req.user._id.equals(roadmaps.user)) {
            return res.status(400).json({ error: 'Roadmap unavailable' });
        }
        if (!roadmaps) {
            return res.status(400).json({ error: 'Roadmap unavailable' });
        }
        res.json(roadmaps);
    } catch (e) {
        res.status(500).json({ error: e });
    }
};

// Create a roadmap
exports.createRoadmap = async (req, res) => {
    try {
        const roadmap = new Roadmap({
            title: req.body.title,
            description: req.body.description,
            start: req.body.start,
            user: req.user._id,
            path: req.body.path,
            private: req.body.private,
        });
        await roadmap.save();
        res.json({ success: 'Roadmap created successfully' });
    } catch (e) {
        res.status(500).json({ error: e });
    }
};

// Search a roadmap
// Options to search include : tag, name
exports.searchRoadmap = async (req, res) => {
    const { type, keyword } = req.query;
};

// Fork a roadmap
exports.forkRoadmap = async (req, res) => {
    try {
        const roadmap = await Roadmap.findOne({
            _id: req.params.id,
            private: false,
        });
        if (!roadmap) {
            return res.status(400).json({ error: 'Roadmap unavailable' });
        }
        if (roadmap.user.equals(req.user._id)) {
            return res.status(401).json({ error: 'Invalid operation' });
        }
        roadmap.parent = roadmap._id;
        roadmap.user = req.user._id;
        delete roadmap._id;
        const newRoadmap = new Roadmap(roadmap);
        await newRoadmap.save();
        res.json({ success: 'Forked successfully' });
    } catch (e) {
        res.status(501).json({ error: e });
    }
};

// Create note for a roadmap by roadmapID
exports.createNote = async (req, res) => {
    try {
        const roadmap = await Roadmap.findById(req.params.id);
        if (roadmap.user !== req.user._id) {
            return res.status(401).json({ error: 'Roadmap unavailable' });
        }
        const note = new Note({
            title: req.body.title,
            content: req.body.content,
            roadmap: req.params.id,
        });
        await note.save();
        res.json({ success: 'Note created successfully' });
    } catch (e) {
        res.status(501).json({ error: e });
    }
};

// Get all notes title and date by roadmapID
exports.getNotes = async (req, res) => {
    try {
        const roadmap = await Roadmap.findById(req.query.id);
        if (roadmap.user !== req.user._id) {
            return res.status(401).json({ error: 'Invalid operation' });
        }
        const notes = await Note.find({
            roadmap: roadmap._id,
            user: req.user._id,
        }).select('-content');
        res.json(notes);
    } catch (e) {
        res.status(501).json({ error: e });
    }
};

// Get single note by noteID
exports.getNote = async (req, res) => {
    try {
        const note = await Note.findOne({
            _id: req.query.id,
            user: req.user._id,
        });
        res.json(note);
    } catch (e) {
        res.status(501).json({ error: e });
    }
};
