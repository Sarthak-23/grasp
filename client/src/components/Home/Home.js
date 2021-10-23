import React from 'react';

//componene
import Panel from './Panel/Panel';
import Roadmap from './Roadmap/Roadmap';
import RightPanel from './RightPanel/RightPanel';

//classes
import classes from './Home.css';

const Home = (props) => {
    return (
        <div className={classes.Home}>
            <Panel />
            <Roadmap />
            {/* <RightPanel/> */}
        </div>
    );
};

export default Home;
