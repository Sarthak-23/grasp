require('dotenv').config();
require('./config/dbConfig').config();
const express = require('express');
const passport = require('passport');
const cors = require('cors');
const path = require('path');
const server = require('http').Server(app);
const cookieParser = require('cookie-parser');

// Routers
const authController = require('./controller/AuthController');
const authRoutes = require('./routes/auth');
const roadRoutes = require('./routes/roadmaps');
const profileRoutes = require('./routes/profile');
const User = require('./models/User');
const Chat = require('./models/Chat');

// Important constants
const app = express();
const io = require('socket.io')(server);
const PORT = process.env.PORT || 5000;

// Middle wares
app.use(express.json());
app.use('/public', express.static(path.resolve(__dirname, './public')));
app.use(express.static(path.resolve(__dirname, './client/build')));
if (process.env.NODE_ENV === 'production') {
    app.use(cors());
}
app.use(cookieParser());
// app.use(passport.initialize());
// app.use(passport.session());

// Routing
app.use('/profile', profileRoutes);
app.use('/auth', authRoutes);
app.use('/roadmaps', roadRoutes);

if (process.env.NODE_ENV === 'production') {
    const path = require('path');
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

// Socket IO
io.of('/chat').use(authController.isSocketAuthenticated);
io.of('/chat').use(async (socket, next) => {
    const username = socket.handshake.auth.username;
    const otherUser = await User.findOne({
        username: username,
        connections: socket.user._id,
    });
    if (!otherUser) return next(new Error('Invalid user'));
    socket.otheruser = otherUser;
    next();
});
io.of('/chat').on('connect', async (socket) => {
    console.log('User connected');

    let chat = await Chat.findOne({
        people: { $all: [socket.user.username, socket.otherUser.username] },
    });
    if (!chat) {
        chat = new Chat({
            people: [socket.user.username, socket.otherUser.username],
        });
        await chat.save();
    }

    socket.on('message', (message) => {
        console.log(message);
    });

    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});

// Listen at PORT
server.listen(PORT, () => {
    console.log(`Server is up at ${PORT}`);
});
