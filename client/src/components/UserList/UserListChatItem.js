import {
    Avatar,
    Badge,
    Button,
    Chip,
    Grid,
    IconButton,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Tooltip,
} from '@mui/material';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../../context/UserContext';
import ChatIcon from '@mui/icons-material/Chat';

const UserListChatItem = (props) => {
    const { index, curuser, setSelectedUser, online } = props;
    const [user, setUser] = useContext(UserContext);
    return (
        <ListItemButton
            key={index}
            divider
            onClick={(e) => {
                setSelectedUser(curuser);
            }}
        >
            <ListItemIcon>
                <Badge color="success" variant={online ? 'dot' : ''}>
                    <Avatar src={curuser.avatar} />
                </Badge>
            </ListItemIcon>
            <ListItemText primary={curuser.username} secondary={curuser.name} />
        </ListItemButton>
    );
};

export default UserListChatItem;
