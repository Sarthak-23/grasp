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
        <ListItem key={index} divider>
            <Link
                to={`/profile/${user.username}`}
                style={{
                    textDecoration: 'none',
                    flexGrow: 1,
                    display: 'flex',
                    alignItems: 'center',
                }}
            >
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
            </Link>
        </ListItem>
    );
};

export default UserListItem;
