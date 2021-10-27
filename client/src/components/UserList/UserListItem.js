import {
    Avatar,
    Button,
    Chip,
    IconButton,
    ListItem,
    ListItemIcon,
    ListItemText,
    Tooltip,
} from '@mui/material';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../../context/UserContext';
import ChatIcon from '@mui/icons-material/Chat';

const UserListItem = (props) => {
    const { index, curuser, type } = props;
    const [user, setUser] = useContext(UserContext);
    return (
        <ListItem key={index} divider>
            <Link
                to={`/profile/${curuser.username}`}
                style={{
                    textDecoration: 'none',
                    flexGrow: 1,
                    display: 'flex',
                    alignItems: 'center',
                }}
            >
                <ListItemIcon>
                    <Avatar src={curuser.avatar} />
                </ListItemIcon>
                <ListItemText
                    primary={curuser.username}
                    secondary={curuser.name}
                />
                {/* {type
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
                    : null} */}
            </Link>
            {user && curuser.connections.includes(user._id) ? (
                <Tooltip title="Message">
                    <IconButton color="success">
                        <ChatIcon />
                    </IconButton>
                </Tooltip>
            ) : null}
        </ListItem>
    );
};

export default UserListItem;
