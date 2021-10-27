import { Box, Grid, Typography } from '@mui/material';
import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import Navbar from '../Navbar/Navbar';
import socket from './Socket';
import UserList from '../UserList/UserList';
import classes from './Chat.css';
import { UserContext } from '../../context/UserContext';
import UserListItem from '../UserList/UserListItem';
import UserListChatItem from '../UserList/UserListChatItem';
import UserListChat from '../UserList/UserListChat';
import Chat from './Chat.js';

const ChatContainer = () => {
    const [user, setUser] = useContext(UserContext);
    const [connections, setConnections] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchConnections = async () => {
        let res = await fetch(`/profile/connections`);
        res = await res.json();
        return res;
    };

    useEffect(() => {
        fetchConnections()
            .then((res) => {
                // if (res.profiles) setConnections(res.profiles);
                setConnections((prev) => {
                    for (let i = 0; i < 15; i++)
                        prev = [
                            ...prev,
                            {
                                _id: 'something',
                                username: 'something',
                                name: 'something',
                            },
                        ];
                    return prev;
                });
                setLoading(false);
            })
            .then(() => {
                socket.connect();
            });
    }, []);

    // if (user)
    return (
        <Box style={{ height: '100vh' }}>
            <Navbar />
            <Grid container style={{ height: '100%', overflow: 'hidden' }}>
                <Grid
                    item
                    md={3}
                    style={{
                        borderRight: '1px solid grey',
                        borderBottom: '1px solid grey',
                        height: '100vh',
                        overflow: 'scroll',
                    }}
                >
                    <UserListChat
                        users={connections}
                        loading={loading}
                        title="Connections"
                    >
                        {connections.length > 0 ? (
                            connections.map((user, index) => {
                                return (
                                    <UserListChatItem
                                        key={index}
                                        curuser={user}
                                        index={index}
                                    />
                                );
                            })
                        ) : (
                            <Typography
                                style={{
                                    textAlign: 'center',
                                    marginTop: '1rem',
                                }}
                            >
                                No connections yet.
                            </Typography>
                        )}
                    </UserListChat>
                </Grid>
                <Grid
                    item
                    md={9}
                    style={{
                        height: '100vh',
                        overflow: 'scroll',
                    }}
                >
                    <Chat />
                </Grid>
            </Grid>
        </Box>
    );
    // else return <Box></Box>;
};

export default ChatContainer;
