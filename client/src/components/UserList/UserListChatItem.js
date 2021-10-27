import {
    Avatar,
    Button,
    Chip,
    Grid,
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

const UserListChatItem = (props) => {
    const { index, curuser } = props;
    const [user, setUser] = useContext(UserContext);
    return (
        <ListItem key={index} divider>
            <ListItemIcon>
                <Avatar src={curuser.avatar} />
            </ListItemIcon>
            <ListItemText primary={curuser.username} secondary={curuser.name} />
        </ListItem>
    );
};

export default UserListChatItem;
