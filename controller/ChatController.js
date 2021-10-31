const Chat = require('../models/Chat');
const Message = require('../models/Message');
const User = require('../models/User');

// username => req.params.username
// Only authenticated users should access this
exports.getMessages = async (req, res) => {
    try {
        const user = await User.findOne({ username: req.params.username });
        if (!user) return res.json({ error: 'Invalid user' });
        let chat = await Chat.findOne({
            people: { $all: [req.user._id, user._id] },
        });
        if (!chat) {
            chat = new Chat({
                people: [req.user._id, user._id],
            });
            await chat.save();
        }
        const messages = await Message.find({
            _id: { $in: chat.messages },
        }).sort({ createdAt: -1 });
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
                $push: {
                    messages: message,
                },
            }
        );
        return message;
    } catch (e) {
        console.log(e);
        return null;
    }
};
