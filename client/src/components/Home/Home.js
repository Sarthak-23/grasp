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
    const [details, setDetails] = React.useContext(UserContext);
    useEffect(() => {
        const fetchUser = async () => {
            let result = await fetch(`/profile/${details.username}`);
            result = await result.json();
            return result;
        };
        fetchUser().then((res) => {
            setDetails(res);
        });
    }, []);

    return (
        <div className={classes.Home}>
            <Navbar />
            <Box className={classes.Box}>
                <Panel user={details.user} roadmaps={details.roadmaps} />
                {/* <Roadmap /> */}
                {/* <RightPanel /> */}
            </Box>
        </div>
    );
};

export default Home;
