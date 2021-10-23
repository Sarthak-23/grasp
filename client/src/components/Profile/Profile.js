import { Box } from '@mui/system';
import React, { useState } from 'react';
import { useParams } from 'react-router';

const Profile = (props) => {
    const [profile, setProfile] = useState({});
    const { username } = useParams();
    const fetchProfile = async () => {
        try {
            const res = await fetch(`/profile/${username}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const data = await res.json();
            if (data.error) throw data.error;
            return data;
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        fetchProfile().then((res) => {
            if (res) {
                setProfile(res);
            }
        });
    }, []);

    return <Box></Box>;
};

export default Profile;
