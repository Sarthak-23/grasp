import { Avatar, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { Link } from 'react-router-dom';
import Chip from '@mui/material/Chip';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import Icon from '@mui/material/Icon';
import Tooltip from '@mui/material/Tooltip';

const UserConnectionRequestItem = (props) => {
    const { index, user, type, handleAccept, handleDecline } = props;

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
                                }}
                                onClick={handleDecline}
                            >
                                highlight_off
                            </Icon>
                        </Tooltip>
                        <Tooltip title="Accept">
                            <Icon
                                style={{ color: 'green', fontSize: '2rem' }}
                                onClick={handleAccept}
                            >
                                check_circle
                            </Icon>
                        </Tooltip>
                    </>
                )}
            </ListItem>
            <hr />
        </Link>
    );
};

export default UserConnectionRequestItem;
