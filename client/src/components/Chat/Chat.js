import {
    AppBar,
    Divider,
    List,
    ListItem,
    TextField,
    Toolbar,
    Typography,
    IconButton,
    Icon,
    Button,
    Fab,
} from '@mui/material';
import { Box, styled, useTheme } from '@mui/system';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SendIcon from '@mui/icons-material/Send';
import { useEffect, useRef, useState } from 'react';
import Message from './Message';


const IconButtonCustom = styled(IconButton)(({ theme }) => ({
    marginRight: '1em',
    [theme.breakpoints.up('sm')]: {
        display: 'none',
    },
}));

const Chat = (props) => {
    const { user, setSelectedUser, socket, people, sender} = props; // user is selected user //sender is self uid
    const theme = useTheme();
    const listRef = useRef(null);
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);


    const sendMessage = () => {
        if (message === '' || socket === "") return;
        
        //send message to server
        console.log({
            people: people,
            message: {
                sender: sender,
                content: message
            }
        })
        
        console.log(socket)
        socket.emit("messageToEnd", {
            people: people,
            message: {
                sender: sender,
                content: message
            }
        }, (data) => {
            console.log("Message sent!");
        })

        setMessage('');
    };

    
    useEffect(() => {
        if (socket) {
            
            // incomming messages
            socket.on("MessagefromEnd", (message) => {
                console.log(message)
                setMessages(prev => {
                    return [...prev, {
                        ...message
                    }]
                })
            })
           
        }
 
    }, [socket])

    useEffect(() => {
        const fetchPreviousMessages = async () => {
            try {
                let res = await fetch(`/profile/api/messages/${user.username}`);
                res = await res.json();
                console.log(res)
                return res;
            } catch (e) {
                console.log(e);
            }
        };
        if (user._id) {
            fetchPreviousMessages()
                .then((res) => {
                    if (!res.error) setMessages(res);
                })
                .then(() => {
                    // setOpen(true);
                });
        }
    }, [props]);

    useEffect(() => {
        try {
            listRef.current.scrollTop = listRef.current.scrollHeight;
            // console.log(listRef.current.style);
        } catch (e) {
            // console.log(e);
        }
    }, [props, messages]);

    if (user._id)
        return (
            <Box style={{ position: 'relative', height: '100%' }}>
                <AppBar position="static" color="transparent">
                    <Toolbar style={{ minHeight: '10vh', height: '10vh' }}>
                        <IconButtonCustom
                            theme={theme}
                            onClick={() => setSelectedUser({})}
                        >
                            <ArrowBackIcon />
                        </IconButtonCustom>
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
                    {messages.length === 0 && (
                        <Typography
                            align="center"
                            sx={{
                                padding: '1rem',
                                color: 'text.disabled',
                            }}
                        >
                            Start your conversation with {user.name} here.
                        </Typography>
                    )}
                    {messages.map((m, index) => {
                        console.log(m.sender, sender)
                        return (
                            <ListItem
                                key={index}
                                style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: `${
                                        m.sender !== sender //other
                                            ? 'flex-start'
                                            : 'flex-end'
                                    }`,
                                }}
                            >
                                <Message
                                    other={m.sender !== sender}
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
                            multiline
                            maxRows={1}
                            style={{ width: '100%' }}
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.code === 'Enter' || e.code === 'NumpadEnter') {
                                    sendMessage();
                                }
                            }}
                        />
                        <IconButton color="primary" onClick={sendMessage}>
                            <SendIcon />
                        </IconButton>
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
                    Select a connection to start messaging.
                </Typography>
            </Box>
        </Box>
    );
};

export default Chat;
