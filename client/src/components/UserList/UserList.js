import {
    Grid,
    Typography,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Avatar,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import EditRoadIcon from '@mui/icons-material/EditRoad';
import { styled } from '@mui/material/styles';
import { Link } from 'react-router-dom';

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
}));

const Demo = styled('div')(({ theme }) => ({
    backgroundColor: theme.palette.background.paper,
}));

// props contain
// title
// users
// emptyText
const UserList = (props) => {
    const classes = useStyles();
    return (
        <Grid container className={classes.container}>
            <Grid item xs={12} md={9}>
                <Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div">
                    {props.title}
                </Typography>
                <hr />
                <Demo>
                    <List>
                        {props.users.length > 0 ? (
                            props.users.map((user) => {
                                return (
                                    <Link
                                        style={{ textDecoration: 'none' }}
                                        to={`/profile/${user.username}`}
                                    >
                                        <ListItem>
                                            <ListItemIcon>
                                                <Avatar />
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

export default UserList;