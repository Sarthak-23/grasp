import React from 'react';

//componene
import Panel from './Panel/Panel';
import Roadmap from './Roadmap/Roadmap';
import RightPanel from './RightPanel/RightPanel';
import Navbar from '../Navbar/Navbar';

//classes
import classes from './Home.css';

const Home = (props) => {
    return (
        <div className={classes.Home}>
            <Navbar />
            <Panel />
            {/* <Roadmap /> */}
            {/* <RightPanel/> */}
        </div>
    );
};

export default Home;
