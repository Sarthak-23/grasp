import * as React from 'react';
import { styled } from '@mui/material/styles';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import EditRoadIcon from '@mui/icons-material/EditRoad';
import { makeStyles } from '@mui/styles';

import classes from './Search.css';

// function generate(element) {
//     return [0, 1, 2].map((value) =>
//         React.cloneElement(element, {
//             key: value,
//         })
//     );
// }

const useStyles = makeStyles((theme) => ({
    container: {
        height: '100vh',
        margin: '0',
        display: 'flex',
        justifyContent: 'center',
    },
}));

const Demo = styled('div')(({ theme }) => ({
    backgroundColor: theme.palette.background.paper,
}));

const Search = () => {
    const classes = useStyles();

    return (
        <Grid container className={classes.container}>
            <Grid item xs={12} md={9}>
                <Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div">
                    Search Results
                </Typography>
                <hr />
                <Demo>
                    <List>
                        {/* {generate( */}
                        <ListItem>
                            <ListItemIcon>
                                <EditRoadIcon />
                            </ListItemIcon>
                            <ListItemText
                                primary="Topic Name"
                                secondary="Description"
                            />
                        </ListItem>
                        {/* )} */}
                    </List>
                </Demo>
            </Grid>
        </Grid>
    );
};

export default Search;
