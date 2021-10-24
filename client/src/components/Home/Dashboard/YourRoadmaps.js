import Add from '@mui/icons-material/Add';
import { Button, Icon, Typography } from '@mui/material';
import React, { useState, useEffect } from 'react';
import RoadmapList from '../../RoadmapList/RoadmapList';

const buttonStyle = {
    marginTop: '1rem',
};

const YourRoadmaps = (props) => {
    const [roadmaps, setRoadmaps] = React.useState([]);

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
    }, []);

    return (
        <RoadmapList
            title="Your Roadmaps"
            roadmaps={roadmaps}
            emptyText={'No roadmaps created yet.'}
        >
            {console.log(roadmaps)}
            {props.isEditable ? (
                <Button
                    onClick={props.modalClick}
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
