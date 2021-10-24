import UserList from '../../UserList/UserList';
import UserConnectionRequestItem from '../../UserList/UserConnectionRequestItem';
import { Typography } from '@mui/material';
import { useState, useEffect } from 'react';

const Pending = (props) => {
    const [sent, setSent] = useState([]);

    const fetchSent = async () => {
        let res = await fetch(`/profile/pending`);
        res = await res.json();
        return res;
    };

    useEffect(() => {
        fetchSent().then((res) => {
            if (res.profiles) setSent(res.profiles);
        });
    });

    return (
        <UserList users={sent} title="Users">
            {sent.length > 0 ? (
                sent.map((user, index) => {
                    return (
                        <UserConnectionRequestItem
                            key={index}
                            user={user}
                            index={index}
                            type="Pending"
                        />
                    );
                })
            ) : (
                <Typography style={{ textAlign: 'center' }}>
                    No pending requests yet.
                </Typography>
            )}
        </UserList>
    );
};

export default Pending;
