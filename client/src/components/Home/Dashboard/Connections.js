import UserList from '../../UserList/UserList';
import UserListItem from '../../UserList/UserListItem';
import { Typography } from '@mui/material';
import { useState, useEffect } from 'react';
import { Box } from '@mui/system';
import NewConnection from './NewConnection';

const Connections = (props) => {
    const [connections, setConnections] = useState([]);

    const fetchConnections = async () => {
        let res = await fetch(`/profile/connections`);
        res = await res.json();
        return res;
    };

    useEffect(() => {
        fetchConnections().then((res) => {
            if (res.profiles) setConnections(res.profiles);
        });
    });

    return (
        <Box>
            <UserList users={connections} title="Users">
                {connections.length > 0 ? (
                    connections.map((user, index) => {
                        return (
                            <UserListItem
                                key={index}
                                user={user}
                                index={index}
                            />
                        );
                    })
                ) : (
                    <Typography
                        style={{ textAlign: 'center', marginTop: '1rem' }}
                    >
                        No connections yet.
                    </Typography>
                )}
            </UserList>
        </Box>
    );
};

export default Connections;
