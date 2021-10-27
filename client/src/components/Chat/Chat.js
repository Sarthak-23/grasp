import { Box } from '@mui/material';
import { useEffect } from 'react';
import { useParams } from 'react-router';
import socket from './Socket';
import classes from './Chat.css';

const Chat = () => {
    const { username } = useParams();

    useEffect(() => {
        socket.auth = { username };
        socket.connect();
    }, []);

    return <Box></Box>;
};

export default Chat;
