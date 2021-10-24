import { Avatar, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { Link } from 'react-router-dom';
import Chip from '@mui/material/Chip';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import Icon from '@mui/material/Icon';
import Tooltip from '@mui/material/Tooltip';

const UserConnectionRequestItem = (props) => {
    const { index, user, type, handleAccept, handleDecline } = props;

    return (
        <ListItem style={{ width: '100%', borderBottom: '1px solid grey' }}>
            <Link
                key={index}
                style={{ textDecoration: 'none', flexGrow: 1 }}
                to={`/profile/${user.username}`}
            >
                <ListItemIcon>
                    <Avatar />
                </ListItemIcon>
                <ListItemText primary={user.username} secondary={user.name} />
            </Link>
            {type === 'Pending' ? (
                <Chip
                    key={index}
                    label={'Pending'}
                    size="small"
                    style={{
                        backgroundColor: 'orange',
                        color: 'white',
                    }}
                />
            ) : (
                <>
                    <Tooltip title="Decline">
                        <Icon
                            style={{
                                color: 'red',
                                fontSize: '2rem',
                                marginRight: '1rem',
                                cursor: 'pointer',
                            }}
                            onClick={(e) => {
                                handleDecline(e, user);
                            }}
                        >
                            highlight_off
                        </Icon>
                    </Tooltip>
                    <Tooltip title="Accept">
                        <Icon
                            style={{
                                color: 'green',
                                fontSize: '2rem',
                                cursor: 'pointer',
                            }}
                            onClick={(e) => {
                                handleAccept(e, user);
                            }}
                        >
                            check_circle
                        </Icon>
                    </Tooltip>
                </>
            )}
        </ListItem>
    );
};

export default UserConnectionRequestItem;
