import {
    Box,
    Divider,
    Grid,
    LinearProgress,
    Paper,
    TextField,
    Toolbar,
    Typography,
} from '@mui/material';
import { io } from 'socket.io-client';
import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import Navbar from '../Navbar/Navbar';
import UserList from '../UserList/UserList';
import classes from './Chat.css';
import { UserContext } from '../../context/UserContext';
import UserListItem from '../UserList/UserListItem';
import UserListChatItem from '../UserList/UserListChatItem';
import UserListChat from '../UserList/UserListChat';
import Chat from './Chat.js';

const socket = io('/', { autoConnect: false });

const ChatContainer = () => {
    const params = useParams();
    const [user, setUser] = useContext(UserContext);
    const [selectedUser, setSelectedUser] = useState({});
    const [connections, setConnections] = useState([]);
    const [list, setList] = useState([]);
    const [search, setSearch] = useState('');
    const [loading, setLoading] = useState(true);

    const fetchConnections = async () => {
        let res = await fetch(`/profile/connections`);
        res = await res.json();
        return res;
    };

    const handleSearchChange = (e) => {
        setSearch(e.target.value);
        if (e.target.value === '') {
            setList(connections);
            return;
        }
        setList(() => {
            socket.connect();
            return connections.filter(
                (u) =>
                    // u.name.search(e.target.value) !== -1 ||
                    u.username.search(e.target.value) !== -1
            );
        });
    };

    // Define the socket events here
    const configSocket = () => {
        socket.onAny((event, ...args) => {
            console.log(event, args);
        });

        socket.on('connect_error', (err) => {
            console.log(err);
        });
    };

    useEffect(() => {
        configSocket();
        fetchConnections()
            .then((res) => {
                if (res.profiles)
                    setConnections(() => {
                        setList(res.profiles);
                        return res.profiles;
                    });
                setLoading(false);
            })
            .then(() => {
                socket.connect();
            });
    }, []);

    // if (user)
    return (
        <Grid container style={{ height: '100vh' }}>
            <Grid
                item
                xs={12}
                sm={4}
                style={{
                    height: '100%',
                    overflow: 'hidden',
                    borderRight: '1px solid #ccc',
                }}
            >
                <Navbar message={false} />
                {loading ? <LinearProgress color="success" /> : null}
                <Paper>
                    <Toolbar style={{ minHeight: '10vh', height: '10vh' }}>
                        <TextField
                            placeholder="Search connections"
                            size="small"
                            style={{ width: '100%' }}
                            value={search}
                            onChange={handleSearchChange}
                        />
                    </Toolbar>
                </Paper>
                <UserListChat
                    users={list}
                    loading={loading}
                    title="Connections"
                >
                    {list.length > 0 ? (
                        list.map((user, index) => {
                            return (
                                <UserListChatItem
                                    key={index}
                                    curuser={user}
                                    index={index}
                                    setSelectedUser={setSelectedUser}
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
                            {loading ? 'Loading...' : 'No connections yet.'}
                        </Typography>
                    )}
                </UserListChat>
            </Grid>
            <Grid
                item
                xs={12}
                sm={8}
                style={{ height: '100vh', overflow: 'hidden' }}
            >
                <Chat user={selectedUser} />
            </Grid>
        </Grid>
    );
    // else return <Box></Box>;
};

export default ChatContainer;
