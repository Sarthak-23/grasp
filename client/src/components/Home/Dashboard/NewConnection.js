import { Button, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { useState } from 'react';

const NewConnection = () => {
    const [newusername, setNewusername] = useState('');
    const [loading, setLoading] = useState('');
    const [error, setError] = useState('');

    const handleConnect = async () => {
        setLoading(true);
        try {
            let res = await fetch(`/profile/${newusername}/connect`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            res = await res.json();
            if (res.error) setError(res.error);
            else {
                setError('');
                setNewusername('');
            }
            setLoading(false);
        } catch (e) {
            console.log(e);
            setError('Something went wrong');
        }
    };

    return (
        <Box
            style={{
                display: 'flex',
                justifyContent: 'flex-end',
                alignItems: 'center',
            }}
        >
            <TextField
                label="Username"
                value={newusername}
                onChange={(e) => setNewusername(e.target.value)}
                error={error ? true : false}
            />
            <Button
                variant="contained"
                disabled={loading ? true : false}
                style={{ marginLeft: '1rem' }}
                onClick={handleConnect}
            >
                Connect
            </Button>
        </Box>
    );
};

export default NewConnection;
