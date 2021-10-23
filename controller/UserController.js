const User = require('../models/User');
const Roadmap = require('../models/Roadmap');

// Get a profile
exports.getProfile = async (req, res) => {
    try {
        const username = req.params.username;
        if (!username) return res.json({ error: 'Username invalid!' });
        const user = await User.findOne({ username: username }).select(
            '-password'
        );
        if (!user) return res.json({ error: 'Username invalid!' });
        const roadmaps = await Roadmap.find({ user: user._id });
        res.json({ user, roadmaps });
    } catch (e) {
        res.json(501).json({ error: e });
    }
};

// Connect to a profile
exports.connectProfile = async (req, res) => {
    try {
        if (!req.params.username)
            return res.json({ error: 'Username invalid!' });
        // Append to received of other
        const otherUser = await User.findOneAndUpdate(
            { username: req.params.username },
            { $push: { received: req.user._id } }
        );
        if (!otherUser) return res.json({ error: 'Username invalid!' });
        // Append to sent of user
        const user = await User.findOneAndUpdate(
            { username: username },
            { $push: { sent: otherUser._id } }
        );
        return res.json({ success: 'Request sent!' });
    } catch (e) {
        res.json(501).json({ error: e });
    }
};

// Search a profile
// Option to search include : username, name, goal
exports.searchProfile = async (req, res) => {
    const { type, keyword } = req.query;
};

// Accept invite
exports.acceptInvite = async (req, res) => {
    try {
        const username = req.query.username;
        // Update other user
        const otherUser = await User.findOneAndUpdate(
            { username: username },
            {
                $pull: { pending: req.user._id },
                $push: { connections: req.user._id },
            }
        );
        // Update my user
        await User.findOneAndUpdate(
            { username: req.user.username },
            {
                $pull: { sent: otherUser._id },
                $push: { connections: otherUser._id },
            }
        );
    } catch (e) {
        res.json(501).json({ error: e });
    }
};

// Reject invite
exports.rejectInvite = async (req, res) => {
    try {
        const username = req.query.username;
        // Update other user
        const otherUser = await User.findOneAndUpdate(
            { username: username },
            {
                $pull: { pending: req.user._id },
            }
        );
        // Update my user
        await User.findOneAndUpdate(
            { username: req.user.username },
            {
                $pull: { sent: otherUser._id },
            }
        );
    } catch (e) {
        res.json(501).json({ error: e });
    }
};
