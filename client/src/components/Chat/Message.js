import {
    Avatar,
    Card,
    CardContent,
    CardHeader,
    CardActionArea,
    Grid,
    Typography,
    Badge,
} from '@mui/material';
import { Box } from '@mui/system';

const Message = (props) => {
    return (
        <Box
            style={{
                position: 'relative',
                display: 'flex',
                alignSelf: `${props.other ? 'flex-start' : 'flex-end'}`,
            }}
        >
            {props.other && (
                <Avatar
                    src={props.avatar}
                    style={{
                        width: '20px',
                        height: '20px',
                        margin: '5px',
                        alignSelf: 'flex-start',
                    }}
                ></Avatar>
            )}
            <Card sx={{ bgcolor: 'primary.main', color: 'white' }}>
                <CardContent>
                    <Typography variant="p">{props.content}</Typography>
                </CardContent>
            </Card>
            <Typography
                variant="p"
                style={{
                    alignSelf: 'flex-end',
                    fontSize: '0.7rem',
                    position: 'absolute',
                    right: '5px',
                    bottom: '5px',
                    color: '#aaaaaa',
                }}
            >
                {props.timestamp.split('.')[0].substr(0, 5)}
            </Typography>
        </Box>
    );
};

export default Message;
