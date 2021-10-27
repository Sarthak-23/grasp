import { Card, CardContent, CardHeader, Grid, Typography } from '@mui/material';
import { Box } from '@mui/system';

const Message = (props) => {
    return (
        <Card variant="outlined">
            <CardContent>
                <Typography gutterBottom variant="p">
                    {props.sender}
                </Typography>
                <Typography variant="h6">{props.content}</Typography>
            </CardContent>
        </Card>
    );
};

export default Message;
