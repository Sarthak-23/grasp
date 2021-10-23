import React, { useState } from 'react';
import classes from './RightPanel.css';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import Button from '@mui/material/Button';
import { Typography } from '@mui/material';
import { Box } from '@mui/system';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const RightPanel = () => {
    const [des_disable, setDesdisable] = useState(true);
    const [mat_disable, setMatdisable] = useState(true);
    const [description, setDescription] = useState('');
    const [material, setMaterial] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(description, material);
    };

    return (
        <Box className={classes.Container}>
            <Typography
                style={{ textAlign: 'left', width: '100%' }}
                variant="h5"
            >
                Topic Name
            </Typography>
            <TextareaAutosize
                aria-label="minimum height"
                minRows={10}
                placeholder="Description"
                className={classes.textArea}
                disabled={des_disable}
                name="description"
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            />
            <TextareaAutosize
                aria-label="minimum height"
                minRows={5}
                placeholder="Materials"
                className={classes.textArea}
                disabled={mat_disable}
                name="material"
                id="material"
                value={material}
                onChange={(e) => setMaterial(e.target.value)}
            />
            <Button
                variant="contained"
                color="success"
                className={classes.Button}
                onClick={handleSubmit}
            >
                Update
            </Button>
        </Box>
    );
};

export default RightPanel;
