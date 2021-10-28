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
        if (e.target.value === '\n') {
            handleSearch();
        }
        setSearch(e.target.value);
    };

    const handleSearch = () => {
        if (search === '') {
            setList(connections);
            return;
        }
        setList(() => {
            return connections.filter((u) => u.name.search(search) !== -1);
        });
    };

    useEffect(() => {
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
                <Navbar />
                {loading ? <LinearProgress color="success" /> : null}
                <Paper>
                    <Toolbar style={{ minHeight: '10vh', height: '10vh' }}>
                        <TextField
                            placeholder="Search connections"
                            size="small"
                            style={{ width: '100%' }}
                            value={search}
                            onChange={handleSearchChange}
                            onKeyPress={(e) =>
                                e.key === 'Enter' && handleSearch()
                            }
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
