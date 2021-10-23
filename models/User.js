const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    name: { type: String, require: true },
    username: { type: String, require: true, unique: true },
    password: { type: String, require: true },
    connections: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    sent: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    received: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
});

const User = mongoose.model('User', UserSchema);

module.exports = User;