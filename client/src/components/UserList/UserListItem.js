import {
    Avatar,
    Chip,
    ListItem,
    ListItemIcon,
    ListItemText,
} from '@mui/material';
import { Link } from 'react-router-dom';

const UserListItem = (props) => {
    const { index, user, type } = props;
    return (
        <Link
            key={index}
            style={{ textDecoration: 'none' }}
            to={`/profile/${user.username}`}
        >
            <ListItem>
                <ListItemIcon>
                    <Avatar src={user.avatar} />
                </ListItemIcon>
                <ListItemText primary={user.username} secondary={user.name} />
                {type
                    ? user.goals.map((g, index) => {
                          return (
                              <Chip
                                  key={index}
                                  label={g}
                                  style={{
                                      margin: '0.2em',
                                      backgroundColor: '#D2B48C',
                                  }}
                                  size="small"
                              />
                          );
                      })
                    : null}
            </ListItem>
            <hr />
        </Link>
    );
};

export default UserListItem;
