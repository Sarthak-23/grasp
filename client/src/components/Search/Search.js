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
import UserListItem from '../UserList/UserListItem';

import classes from './Search.css';
import Navbar from '../Navbar/Navbar';
import { Box } from '@mui/system';
import { Button, CircularProgress, Icon } from '@mui/material';
import RoadmapList from '../RoadmapList/RoadmapList';
import UserList from '../UserList/UserList';
import { NavLink } from 'react-router-dom';

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
    const [resultType, setResultType] = React.useState(categoryOptions[0]);
    const [result, setResult] = React.useState([]);
    const [loading, setLoading] = React.useState(false);
    const [errors, setErrors] = React.useState('');
    const fetchUserByProfile = async () => {
        try {
            const res = await fetch(
                `/profile/search?type=${type.toLowerCase()}&keyword=${keyword}`,
                {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );
            const data = await res.json();
            if (data.error) throw data.error;
            return data;
        } catch (err) {
            console.log(err);
        }
    };

    const fetchRoadmap = async () => {
        try {
            const res = await fetch(
                `/roadmaps/all/search?q=${keyword.toLowerCase()}`,
                {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );
            const data = await res.json();
            if (data.error) throw data.error;
            return data;
        } catch (err) {
            console.log(err);
        }
    };

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
        if (!keyword) {
            setErrors('Please Enter a Query');
            setLoading(false);
            return;
        }
        setErrors('');
        if (category === 'Profile') {
            setResultType(categoryOptions[0]);
            fetchUserByProfile().then((res) => {
                if (res) {
                    setResult(res.profiles);
                    // console.log(res.profiles);
                }
                setLoading(false);
            });
        } else {
            setResultType(categoryOptions[1]);
            fetchRoadmap().then((res) => {
                if (res) {
                    setResult(res);
                }
                setLoading(false);
            });
        }
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
                {profileOptions.map((cat, index) => {
                    return (
                        <MenuItem key={index} value={cat}>
                            {cat}
                        </MenuItem>
                    );
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
                {roadmapOptions.map((cat, index) => {
                    return (
                        <MenuItem key={index} value={cat}>
                            {cat}
                        </MenuItem>
                    );
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
                        {categoryOptions.map((cat, index) => {
                            return (
                                <MenuItem key={index} value={cat}>
                                    {cat}
                                </MenuItem>
                            );
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
            <Typography className={classes.boxer} style={{ color: 'red' }}>
                {errors}
            </Typography>
            {result && resultType === categoryOptions[0] ? (
                <UserList title="Search Result" users={result}>
                    {result.length > 0 ? (
                        result.map((user, index) => {
                            return (
                                <UserListItem
                                    key={index}
                                    user={user}
                                    index={index}
                                    type="Connection"
                                />
                            );
                        })
                    ) : (
                        <Typography style={{ textAlign: 'center' }}>
                            Try a valid search
                        </Typography>
                    )}
                </UserList>
            ) : (
                <RoadmapList
                    title="Search Result"
                    roadmaps={result}
                    emptyText={'Try a valid search'}
                />
            )}
        </Box>
    );
};

export default Search;
