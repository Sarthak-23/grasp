import React from 'react'

//componene
import Panel from './Panel/Panel'
import Roadmap from './Roadmap/Roadmap'

//classes
import classes from "./Home.css"

const Home = (props) => {
    return (
        <div className={classes.Home}>
            <Panel />
            <Roadmap />
        </div>
    )
}

export default Home
