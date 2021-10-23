import React, { useEffect } from 'react';

//componene
import Panel from './Dashboard/Dashboard';
import Roadmap from './Roadmap/Roadmap';
import RightPanel from './RightPanel/RightPanel';
import Navbar from '../Navbar/Navbar';

//classes
import classes from './Home.css';
import { Box } from '@mui/system';
import { UserContext } from '../../context/UserContext';

const Home = (props) => {
    const [user, setUser] = React.useState({
        id: props.user.id,
        username: props.user.username,
        name: props.user.name,
    });
    const [roadmaps, setRoadmaps] = React.useState([]);

    useEffect(() => {
        const fetchUser = async () => {
            let result = await fetch(`/profile/${user.username}`);
            result = await result.json();
            return result;
        };
        fetchUser().then((res) => {
            setUser(res.user);
            setRoadmaps(res.roadmaps);
        });
    }, []);

    return (
        <div className={classes.Home}>
            <Navbar />
            <Box className={classes.Box}>
                {/* <Panel user={user} roadmaps={roadmaps} /> */}
                <Roadmap />
                {/* <RightPanel /> */}
            </Box>
        </div>
    );
};

export default Home;
