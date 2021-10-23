import React from 'react'

//componene
import Panel from './Panel/Panel'

//classes
import classes from "./Home.css"

const Home = (props) => {
    return (
        <div className={classes.Home}>
            <Panel />
        </div>
    )
}

export default Home
