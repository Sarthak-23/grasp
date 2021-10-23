import React, { useState } from 'react';
import Icon from '@mui/material/Icon';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import classes from './RightPanel.css';
import Backdrop from '@mui/material/Backdrop';
import TextField from '@mui/material/TextField';

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
    const [open, setOpen] = React.useState(false);
    const [description, setDescription] = useState('');
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    return (
        <div className={classes.Container}>
            <h1>Topic Name</h1>
            <div className={classes.Description}>
                <BorderColorIcon
                    className={classes.Edit}
                    onClick={handleOpen}
                />
                <br />
                <br />
                <div style={{ textAlign: 'center' }}>
                    <p>Description</p>
                    <br />
                </div>
            </div>
            <div className={classes.Materials}>
                <p>Materials</p>
            </div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Box sx={style}>
                    <Typography
                        id="modal-modal-title"
                        variant="h6"
                        component="h2"
                    >
                        Topic
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        <TextField
                            label="Description"
                            variant="outlined"
                            placeholder="Enter Description"
                            fullWidth
                            required
                            style={{ marginTop: '20px' }}
                            name="description"
                            id="description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </Typography>
                </Box>
            </Modal>
        </div>
    );
};

export default RightPanel;
