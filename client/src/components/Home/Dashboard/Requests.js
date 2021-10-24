import UserList from '../../UserList/UserList';
import UserConnectionRequestItem from '../../UserList/UserConnectionRequestItem';
import { Typography } from '@mui/material';
import { useState, useEffect } from 'react';

const Requests = (props) => {
    const { user } = props;
    const [received, setReceived] = useState([]);
    const fetchReceived = async () => {
        let res = await fetch(`/profile/received`);
        res = await res.json();
        return res;
    };

    const handleAccept = async (e) => {
        e.stopPropagation();
        try {
            let res = await fetch(`/profile/${user.username}/accept`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            res = await res.json();

            //Rest will done by backend developer (On Current Project)
        } catch (err) {
            console.log(err);
        }
    };

    const handleDecline = async (e) => {
        e.stopPropagation();
        try {
            let res = await fetch(`/profile/${user.username}/reject`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            res = await res.json();

            // Rest will done by backend developer (On Current Project)
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        fetchReceived().then((res) => {
            if (res.profiles) setReceived(res.profiles);
        });
    });

    return (
        <UserList users={received} title="Users">
            {received.length > 0 ? (
                received.map((user, index) => {
                    return (
                        <UserConnectionRequestItem
                            key={index}
                            user={user}
                            index={index}
                            handleAccept={handleAccept}
                            handleDecline={handleDecline}
                            type="Received"
                        />
                    );
                })
            ) : (
                <Typography style={{ textAlign: 'center' }}>
                    No received requests yet.
                </Typography>
            )}
        </UserList>
    );
};

export default Requests;
