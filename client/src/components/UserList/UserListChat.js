import {
    Grid,
    Typography,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Avatar,
    LinearProgress,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import EditRoadIcon from '@mui/icons-material/EditRoad';
import { styled } from '@mui/material/styles';
import { Link } from 'react-router-dom';
import UserListItem from './UserListItem';

const useStyles = makeStyles((theme) => ({
    chatContainer: {
        overflow: 'scroll',
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
const UserListChat = (props) => {
    const classes = useStyles();
    return (
        <Grid
            container
            className={classes.chatContainer}
            style={{ width: '100%' }}
        >
            <Grid item xs={12}>
                <Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div">
                    {`${props.title} (${props.users.length})`}
                </Typography>
                <hr />
                {props.loading ? <LinearProgress color="success" /> : null}
                <Demo>
                    <List>{props.children}</List>
                </Demo>
            </Grid>
        </Grid>
    );
};

export default UserListChat;
