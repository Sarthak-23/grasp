import { Avatar, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { Link } from 'react-router-dom';

const UserListItem = (props) => {
    const { index, user } = props;
    return (
        <Link
            key={index}
            style={{ textDecoration: 'none' }}
            to={`/profile/${user.username}`}
        >
            <ListItem>
                <ListItemIcon>
                    <Avatar />
                </ListItemIcon>
                <ListItemText primary={user.username} secondary={user.name} />
                <ListItemText
                    secondary={
                        user.about ? user.about.slice(0, 100) + '...' : ''
                    }
                />
            </ListItem>
            <hr />
        </Link>
    );
};

export default UserListItem;
