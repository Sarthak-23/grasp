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

const useStyles = makeStyles((theme) => ({
    container: {
        margin: '0 2rem',
    },
    Date_Class: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-end',
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
            <Grid item xs={12}>
                <Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div">
                    {props.title}
                </Typography>
                <hr />
                <Demo>
                    <List>
                        {props.roadmaps.length > 0 ? (
                            props.roadmaps.map((road) => {
                                return (
                                    <Link
                                        style={{ textDecoration: 'none' }}
                                        to="/"
                                    >
                                        <ListItem>
                                            <ListItemIcon>
                                                <EditRoadIcon />
                                            </ListItemIcon>
                                            <ListItemText
                                                primary="Topic Name"
                                                secondary="Description"
                                            />
                                            <ListItemText
                                                className={classes.Date_Class}
                                                primary="Last Update: 23-10-2021"
                                                secondary="Created On: 23-10-2021"
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
