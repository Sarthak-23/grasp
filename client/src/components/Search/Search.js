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
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';

import classes from './Search.css';
import Navbar from '../Navbar/Navbar';
import { Box } from '@mui/system';
import { Button, CircularProgress, Icon } from '@mui/material';

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
    Date_Class: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-end',
    },
    boxer: {
        padding: '1rem',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    boxerElements: {
        margin: '1rem',
    },
}));

const Demo = styled('div')(({ theme }) => ({
    backgroundColor: theme.palette.background.paper,
}));

const categoryOptions = ['Profile', 'Roadmap'];
const profileOptions = ['Username', 'Name', 'Goal'];
const roadmapOptions = ['Tag'];

const Search = () => {
    const classes = useStyles();

    const [category, setCategory] = React.useState(categoryOptions[0]);
    const [type, setType] = React.useState(profileOptions[0]);
    const [keyword, setKeyword] = React.useState('');
    const [loading, setLoading] = React.useState(false);

    const handleCategory = (e) => {
        setCategory(e.target.value);
        if (e.target.value === categoryOptions[0]) setType(profileOptions[0]);
        else setType(roadmapOptions[0]);
    };

    const handleTypes = (e) => {
        setType(e.target.value);
    };

    const handleKeyword = (e) => {
        setKeyword(e.target.value);
    };

    const handleSearch = async () => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
        }, 2000);
    };

    const renderProfileTypes = () => {
        return (
            <Select
                className={classes.boxerElements}
                id="profile-select"
                value={type}
                label="Type"
                onChange={handleTypes}
            >
                {profileOptions.map((cat) => {
                    return <MenuItem value={cat}>{cat}</MenuItem>;
                })}
            </Select>
        );
    };
    const renderRoadmapTypes = () => {
        return (
            <Select
                className={classes.boxerElements}
                id="roadmap-select"
                value={type}
                label="Type"
                onChange={handleTypes}
            >
                {roadmapOptions.map((cat) => {
                    return <MenuItem value={cat}>{cat}</MenuItem>;
                })}
            </Select>
        );
    };

    return (
        <Box>
            <Navbar />
            <Grid container className={classes.boxer}>
                <Grid item>
                    <Select
                        className={classes.boxerElements}
                        id="category-select"
                        value={category}
                        label="Category"
                        onChange={handleCategory}
                    >
                        {categoryOptions.map((cat) => {
                            return <MenuItem value={cat}>{cat}</MenuItem>;
                        })}
                    </Select>
                </Grid>
                <Grid item>
                    {category === categoryOptions[0]
                        ? renderProfileTypes()
                        : renderRoadmapTypes()}
                </Grid>
                <Grid item>
                    <TextField
                        style={{ margin: '1rem' }}
                        id="outlined-basic"
                        label="Search Keyword"
                        variant="outlined"
                        value={keyword}
                        onChange={handleKeyword}
                    />
                </Grid>
                <Grid item>
                    {loading ? (
                        <CircularProgress />
                    ) : (
                        <Button
                            variant="contained"
                            color="success"
                            onClick={handleSearch}
                        >
                            <Icon style={{ color: 'white' }}>search</Icon>
                        </Button>
                    )}
                </Grid>
            </Grid>
            <Grid container className={classes.container}>
                <Grid item xs={12} md={9}>
                    <Typography
                        sx={{ mt: 4, mb: 2 }}
                        variant="h6"
                        component="div"
                    >
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
                                <ListItemText
                                    className={classes.Date_Class}
                                    primary="Last Update: 23-10-2021"
                                    secondary="Created On: 23-10-2021"
                                />
                            </ListItem>
                            {/* )} */}
                        </List>
                    </Demo>
                </Grid>
            </Grid>
        </Box>
    );
};

export default Search;
