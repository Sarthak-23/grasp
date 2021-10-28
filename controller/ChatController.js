const Chat = require('../models/Chat');
const User = require('../models/User');

exports.getMessages = async (req, res) => {
    try {
        const user = await User.findOne({ username: req.params.username });
        if (!user) return res.json({ error: 'Invalid user' });
        const messages = await Chat.find({
            people: { $all: [req.user._id, user._id] },
        });
        res.json(messages);
    } catch (e) {
        res.status(501).json({ error: e });
    }
};
