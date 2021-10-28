import {
    Avatar,
    Card,
    CardContent,
    CardHeader,
    Grid,
    Typography,
} from '@mui/material';
import { Box } from '@mui/system';

const Message = (props) => {
    return (
        <Box style={{ display: 'flex', alignItems: 'flex-start' }}>
            {props.other && (
                <Avatar
                    style={{ width: '20px', height: '20px', margin: '5px' }}
                ></Avatar>
            )}
            <Card sx={{ bgcolor: 'primary.main', color: 'white' }}>
                <CardContent>
                    <Typography variant="p">{props.content}</Typography>
                </CardContent>
            </Card>
        </Box>
    );
};

export default Message;
