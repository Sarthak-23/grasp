import React from 'react';

//componene
import Panel from './Panel/Panel';
import Roadmap from './Roadmap/Roadmap';
import RightPanel from './RightPanel/RightPanel';
import Navbar from '../Navbar/Navbar';

//classes
import classes from './Home.css';
import { Box } from '@mui/system';

const Home = (props) => {
    return (
        <div className={classes.Home}>
            <Navbar />
            <Box className={classes.Box}>
                {/* <Panel /> */}
                <Roadmap />
                <RightPanel />
            </Box>
        </div>
    );
};

export default Home;
