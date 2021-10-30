require('dotenv').config();
require('./config/dbConfig').config();
const express = require('express');
const passport = require('passport');
const cors = require('cors');
const path = require('path');
const http = require('http');
const cookieParser = require('cookie-parser');

// Routers
const authRoutes = require('./routes/auth');
const roadRoutes = require('./routes/roadmaps');
const profileRoutes = require('./routes/profile');
const User = require('./models/User');
const Chat = require('./models/Chat'); 
const authController = require('./controller/AuthController');

//online users
let onlineUsers = [];

// Important constants
const app = express();
const server = http.Server(app);
const io = require('socket.io')(server, {
    cors: {
        origin: "*"
    }
});

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
// io.of('/chat').use(authController.isSocketAuthenticated);

io.of('/chat').on('connect', async (socket) => {
    // console.log("Socket connected", socket.id)

    //online status 
    socket.on("iamOnline", (data) => {
        onlineUsers.push({ 
            uid: data.user._id,
            socketId: socket.id
        });
        io.of("/chat").emit("userOnlineUpdate", onlineUsers)
        
        console.log(onlineUsers)
    })

    //join to room
    socket.on("joinRoom", (data, joined_ack) => {
        // socket.join(data.room)
        console.log("Joined to room", data.room)

        //getting socket client know, they are connected to the room
        joined_ack(true);
    })

    //leave and join
    socket.on("leaveAndJoin", (data, lj_ack) => {
        // socket leave the room 
        // socket.leave(data.toLeave)
        
        // socket join the new room 
        // socket.join(data.toJoin)
        console.log("Joined to room", data.toJoin)


        lj_ack(1);
    })

    //leave room
    socket.on("leaveRoom", (data, leave_ack) => {
        // socket.leave(data.room)
        console.log("Room Left", data.room)

        leave_ack(1);
    })


    //message recived
    socket.on("messageToEnd", (data, ack) => {
        console.log(data)
        

        //emit message
        

        //ack
        ack(1);
    })

    //removing offline user from array of online user
    socket.on("disconnect", () => {
        onlineUsers = onlineUsers.filter((onUser) => {
            if (onUser.socketId == socket.id) return 0;
            else return 1;
        })
        console.log(onlineUsers, "userDisconnected")
        io.of("/chat").emit("userOnlineUpdate", {message: "online_user_list_is_been_updated"})
    })
    //disconnecting from client request
    socket.on('forceDis', function(){
        socket.disconnect();
        onlineUsers = onlineUsers.filter((onUser) => {
            if (onUser.socketId == socket.id) return 0;
            else return 1;
        })
        console.log(onlineUsers, "userDisconnected")
        io.of("/chat").emit("userOnlineUpdate", {message: "online_user_list_is_been_updated"})
    });

})

// Listen at PORT
server.listen(PORT, () => {
    console.log(`Server is up at ${PORT}`);
});