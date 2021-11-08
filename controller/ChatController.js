const Chat = require('../models/Chat');
const Message = require('../models/Message');
const User = require('../models/User');

//Node Rsa Imports
const NodeRSA = require('node-rsa');
const key = new NodeRSA({ b: 1024 });

//Encryption Function
// const { encrypt, decrypt } = require('../Encryptions');

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
        }).sort({ createdAt: 1 });
        console.log(messages);
        messages.forEach((msg) => {
            msg.content = key.decrypt(msg.content, 'utf8');
            // msg.content = decrypt(msg.content, 4);
        });
        console.log(messages);
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
        // let encryptedmessage = encrypt(content, 4);
        let encryptedmsg = key.encrypt(content, 'base64');
        const message = new Message({
            sender: sender,
            content: encryptedmsg,
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
        console.log('line number 66' + message.content);
        // content: decrypt(message.content, 4),
        let sendmessage = {
            sender: message.sender,
            content: key.decrypt(message.content, 'utf8'),
            _id: message._id,
            createdAt: message.createdAt,
            updatedAt: message.updatedAt,
        };
        return sendmessage;
    } catch (e) {
        console.log(e);
        return null;
    }
};
