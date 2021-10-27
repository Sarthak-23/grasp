import { Box } from '@mui/system';
import { useEffect, useState } from 'react';
import Message from './Message';

const Chat = (props) => {
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        setMessages((prev) => {
            prev = [];
            for (let i = 0; i < 15; i++) {
                prev = [
                    ...prev,
                    {
                        content: 'Some random long message',
                        sender: 'Divyansh Falodiya',
                    },
                ];
            }
            return prev;
        });
    }, []);

    return (
        <Box style={{ display: 'flex', flexDirection: 'column' }}>
            {messages.map((m, index) => {
                return (
                    <Message
                        content={m.content}
                        sender={m.sender}
                        key={index}
                    />
                );
            })}
        </Box>
    );
};

export default Chat;
