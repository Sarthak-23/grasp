import { Button, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { useState } from 'react';

const NewConnection = () => {
    const [newusername, setNewusername] = useState('');
    const [loading, setLoading] = useState('');

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
            />
            <Button
                variant="contained"
                disabled={loading}
                style={{ marginLeft: '1rem' }}
            >
                Connect
            </Button>
        </Box>
    );
};

export default NewConnection;
