import { Button, Chip, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { useState } from 'react';

const NewConnection = (props) => {
    const { currentuser, profile } = props;
    const [loading, setLoading] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);

    const handleConnect = async () => {
        setLoading(true);
        try {
            if (!profile.username) {
                setError('Invalid Username');
                return;
            }
            let res = await fetch(`/profile/${profile.username}/connect`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            res = await res.json();
            console.log(res);
            if (res.error) setError(res.error);
            else {
                setError('');
                setSuccess(true);
            }
            setLoading(false);
        } catch (e) {
            console.log(e);
            setError('Something went wrong');
        }
    };

    if (currentuser._id && profile.connections.includes(currentuser._id))
        return <Chip color="success" label="Connected" />;
    if (currentuser._id && profile.received.includes(currentuser._id))
        return <Chip color="warning" label="Pending" />;
    if (currentuser._id && profile.sent.includes(currentuser._id))
        return <Chip color="warning" label="Pending" />;

    if (currentuser._id)
        return (
            <Box>
                {!success ? (
                    <Box>
                        <Button
                            disabled={loading ? true : false}
                            variant="contained"
                            onClick={handleConnect}
                        >
                            Connect
                        </Button>
                        <Typography color="error">{error}</Typography>
                        <Typography color="success">{success}</Typography>
                    </Box>
                ) : (
                    <Chip color="warning" label="Pending" />
                )}
            </Box>
        );

    return <Box></Box>;
};

export default NewConnection;
