import { Box } from '@mui/system';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import classes from '../Home/Home.css';
import Navbar from '../Navbar/Navbar';
import Panel from '../Home/Dashboard/Dashboard';

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

    return (
        <div className={classes.Home}>
            <Navbar />
            <Box className={classes.Box}>
                <Panel user={profile.user} roadmaps={profile.roadmaps} />
            </Box>
        </div>
    );
};

export default Profile;
