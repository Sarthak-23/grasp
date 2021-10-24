import Add from '@mui/icons-material/Add';
import { Button, Icon, Typography, IconButton, Collapse } from '@mui/material';
import React, { useState, useEffect } from 'react';
import RoadmapList from '../../RoadmapList/RoadmapList';

import Alert from '@mui/material/Alert';
import CloseIcon from '@mui/icons-material/Close';

const buttonStyle = {
    marginTop: '1rem',
};

const YourRoadmaps = (props) => {
    const [roadmaps, setRoadmaps] = React.useState([]);
    const [toggle, setToggle] = useState(false);
    const [open, setOpen] = useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                let result = await fetch(
                    `/profile/${props.user.username}/roadmaps`
                );
                result = await result.json();
                return result;
            } catch (e) {
                console.log(e);
            }
        };
        fetchUser().then((res) => {
            if (!res.error) setRoadmaps(res);
        });
    }, [props.user]);

    return (
        <RoadmapList
            title="Your Roadmaps"
            roadmaps={roadmaps}
            emptyText={'No roadmaps created yet.'}
            handleOpen={handleOpen}
            handleClose={handleClose}
            open={open}
        >
            <Collapse in={open}>
                <Alert
                    action={
                        <IconButton
                            aria-label="close"
                            color="inherit"
                            size="small"
                            onClick={() => {
                                setOpen(false);
                            }}
                        >
                            <CloseIcon fontSize="inherit" />
                        </IconButton>
                    }
                    sx={{ mb: 2 }}
                >
                    Cloned Successfully!
                </Alert>
            </Collapse>
            {props.isEditable ? (
                <Button
                    onClick={() => {
                        props.modalClick();
                    }}
                    variant="contained"
                    style={buttonStyle}
                >
                    <Icon style={{ color: 'white' }}>add</Icon>
                    <Typography style={{ color: 'white' }}>CREATE</Typography>
                </Button>
            ) : null}
        </RoadmapList>
    );
};

export default YourRoadmaps;
