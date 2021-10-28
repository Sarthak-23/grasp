import {
    AppBar,
    Divider,
    List,
    ListItem,
    TextField,
    Toolbar,
    Typography,
} from '@mui/material';
import { Box } from '@mui/system';
import { useEffect, useRef, useState } from 'react';
import Message from './Message';

const Chat = (props) => {
    const { user } = props;
    const listRef = useRef(null);
    const [messages, setMessages] = useState([]);

    const fetchPreviousMessages = async () => {};

    useEffect(() => {
        setMessages((prev) => {
            prev = [];
            for (let i = 0; i < 10; i++) {
                prev = [
                    ...prev,
                    {
                        content: 'Some random long message',
                        sender: 'Divyansh Falodiya',
                    },
                    {
                        content: 'Some other random long message',
                        sender: 'other',
                    },
                ];
            }
            return prev;
        });
    }, [props]);

    useEffect(() => {
        try {
            listRef.current.scrollTop = listRef.current.scrollHeight;
            console.log(listRef.current.style);
        } catch (e) {
            console.log(e);
        }
    }, [props, messages]);

    if (user._id)
        return (
            <Box style={{ position: 'relative', height: '100%' }}>
                <AppBar position="static" color="transparent">
                    <Toolbar style={{ minHeight: '10vh', height: '10vh' }}>
                        <Typography>{user.name}</Typography>
                    </Toolbar>
                </AppBar>
                <List
                    ref={listRef}
                    style={{
                        height: '80vh',
                        overflow: 'auto',
                        marginTop: '5px',
                    }}
                >
                    {messages.map((m, index) => {
                        return (
                            <ListItem
                                key={index}
                                style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: `${
                                        m.sender === 'other'
                                            ? 'flex-start'
                                            : 'flex-end'
                                    }`,
                                }}
                            >
                                <Message
                                    other={m.sender === 'other'}
                                    content={m.content}
                                    sender={m.sender}
                                />
                            </ListItem>
                        );
                    })}
                </List>
                <Divider />
                <AppBar
                    position="absolute"
                    color="transparent"
                    style={{ bottom: 0, top: 'auto', backgroundColor: '#ddd' }}
                >
                    <Toolbar style={{ minHeight: '10vh', height: '10vh' }}>
                        <TextField
                            variant="standard"
                            placeholder="Message"
                            style={{ width: '100%' }}
                        />
                    </Toolbar>
                </AppBar>
            </Box>
        );

    return (
        <Box style={{ position: 'relative', height: '100%' }}>
            <Box
                style={{
                    position: 'absolute',
                    left: '50%',
                    top: '50%',
                    transform: 'translate(-50%, -50%)',
                }}
            >
                <Typography color="primary" variant="h3" align="center">
                    Grasp
                </Typography>
                <Typography
                    sx={{ color: 'text.disabled', width: '100%' }}
                    align="center"
                >
                    Select a connection to star messaging.
                </Typography>
            </Box>
        </Box>
    );
};

export default Chat;
