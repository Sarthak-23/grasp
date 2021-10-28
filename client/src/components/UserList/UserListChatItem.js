import {
    Avatar,
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
    const { index, curuser, setSelectedUser } = props;
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
                <Avatar src={curuser.avatar} />
            </ListItemIcon>
            <ListItemText primary={curuser.username} secondary={curuser.name} />
        </ListItemButton>
    );
};

export default UserListChatItem;
