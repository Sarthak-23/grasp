const Chat = require('../models/Chat');
const Message = require('../models/Message');
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

// People array is array of ids
// content is string
// sender is id of sender
exports.sendMessage = async (people, content, sender) => {
    try {
        let chat = await Chat.findOne({ people: { $all: people } });
        if (!chat) {
            chat = new Chat({
                people: people,
            });
            await chat.save();
        }
        const message = new Message({
            sender: sender,
            content: content,
        });
        await message.save();
        chat = await Chat.findOneAndUpdate(
            {
                people: { $all: people },
            },
            {
                messages: { $push: message },
            }
        );
        return message;
    } catch (e) {
        return null;
    }
};
