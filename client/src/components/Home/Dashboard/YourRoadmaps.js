import Add from '@mui/icons-material/Add';
import { Button, Icon, Typography } from '@mui/material';
import RoadmapList from '../../RoadmapList/RoadmapList';

const buttonStyle = {
    marginTop: '1rem',
};

const YourRoadmaps = (props) => {
    return (
        <RoadmapList
            title="Your Roadmaps"
            roadmaps={props.roadmaps}
            emptyText={'No roadmaps created yet.'}
        >
            {props.isEditable ? (
                <Button variant="contained" style={buttonStyle}>
                    <Icon style={{ color: 'white' }}>add</Icon>
                    <Typography style={{ color: 'white' }}>CREATE</Typography>
                </Button>
            ) : null}
        </RoadmapList>
    );
};

export default YourRoadmaps;
