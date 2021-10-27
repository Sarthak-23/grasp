import { io } from 'socket.io-client';

const socket = io('/', { autoConnect: false });

// Define the events here
socket.onAny((event, ...args) => {
    console.log(event, args);
});

socket.on('connect_error', (err) => {
    console.log(err);
});

export default socket;
