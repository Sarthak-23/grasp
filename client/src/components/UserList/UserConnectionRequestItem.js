import { Avatar, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { Link } from 'react-router-dom';
import Chip from '@mui/material/Chip';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import Icon from '@mui/material/Icon';
import Tooltip from '@mui/material/Tooltip';

const UserConnectionRequestItem = (props) => {
    const { index, user, type } = props;

    const handleAccept = async (e) => {
        e.preventDefault();
        try {
            let res = await fetch(`/${user.username}/accept`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(user.username),
            });
            res = await res.json();

            //Rest will done by backend developer (On Current Project)
        } catch (err) {
            console.log(err);
        }
    };

    const handleDecline = async (e) => {
        e.preventDefault();
        try {
            let res = await fetch(`/${user.username}/reject`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(user.username),
            });
            res = await res.json();

            // Rest will done by backend developer (On Current Project)
        } catch (err) {
            console.log(err);
        }
    };

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
                            backgroundColor: '#90ee90',
                            color: 'white',
                        }}
                    />
                ) : (
                    <>
                        <Tooltip title="Accept">
                            <Icon
                                style={{ color: 'green' }}
                                onClick={handleAccept}
                            >
                                check_circle
                            </Icon>
                        </Tooltip>
                        <Tooltip title="Decline">
                            <Icon
                                style={{ color: 'red' }}
                                onClick={handleDecline}
                            >
                                highlight_off
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
