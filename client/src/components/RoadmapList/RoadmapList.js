import {
    Grid,
    Typography,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import EditRoadIcon from '@mui/icons-material/EditRoad';
import { styled } from '@mui/material/styles';
import { Link } from 'react-router-dom';
import Chip from '@mui/material/Chip';

const useStyles = makeStyles((theme) => ({
    container: {
        height: '100vh',
        margin: '0',
        display: 'flex',
        justifyContent: 'center',
    },
    Date_Class: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-end',
    },
    chip: {
        pointerEvents: 'none',
        margin: '0.1em',
    },
}));

const Demo = styled('div')(({ theme }) => ({
    backgroundColor: theme.palette.background.paper,
}));

// props contain
// title
// roadmaps
// emptyText
const RoadmapList = (props) => {
    const classes = useStyles();
    return (
        <Grid container className={classes.container}>
            <Grid item xs={12} md={9}>
                <Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div">
                    {`${props.title} (${props.roadmaps.length})`}
                </Typography>
                <hr />
                {props.children}
                <Demo>
                    <List>
                        {props.roadmaps && props.roadmaps.length > 0 ? (
                            props.roadmaps.map((road, index) => {
                                var createdate = road.createdAt
                                    ? road.createdAt.split('T')
                                    : '';
                                var updatedate = road.updatedAt
                                    ? road.updatedAt.split('T')
                                    : '';
                                return (
                                    <Link
                                        key={index}
                                        style={{ textDecoration: 'none' }}
                                        to={`/roadmap/${road._id}`}
                                    >
                                        <ListItem>
                                            <ListItemIcon>
                                                <EditRoadIcon />
                                            </ListItemIcon>
                                            <ListItemText
                                                primary={road.title}
                                                secondary={road.description}
                                            />
                                            <Grid>
                                                {road &&
                                                    road.tags.map(
                                                        (t, index) => {
                                                            return (
                                                                <Chip
                                                                    key={index}
                                                                    label={t.toLowerCase()}
                                                                    className={
                                                                        classes.chip
                                                                    }
                                                                    size="small"
                                                                    style={{
                                                                        backgroundColor:
                                                                            'orange',
                                                                        color: 'white',
                                                                    }}
                                                                    // color="warning"
                                                                />
                                                            );
                                                        }
                                                    )}
                                            </Grid>
                                            <ListItemText
                                                className={classes.Date_Class}
                                                primary={updatedate[0]}
                                                secondary={createdate[0]}
                                            />
                                        </ListItem>
                                        <hr />
                                    </Link>
                                );
                            })
                        ) : (
                            <Typography style={{ textAlign: 'center' }}>
                                {props.emptyText}
                            </Typography>
                        )}
                    </List>
                </Demo>
            </Grid>
        </Grid>
    );
};

export default RoadmapList;
