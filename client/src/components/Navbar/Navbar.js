import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import Icon from '@mui/material/Icon';
import classes from './Navbar.css';
import { Avatar, Button, Tooltip } from '@mui/material';

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: 'auto',
    },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: '12ch',
            '&:focus': {
                width: '20ch',
            },
        },
    },
}));

const EmptySpace = styled('div')(({ theme }) => ({
    flexGrow: 1,
    margin: 'auto 1rem',
}));

const Container = styled('div')(({ theme }) => ({
    position: 'fixed',
    display: 'flex',
    alignItems: 'center',
    width: '100%',
}));

const Navbar = (props) => {
    return (
        <Container >
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="open drawer"
                        sx={{ mr: 2 }}
                    >
                        <Icon style={{ color: 'white' }}>menu</Icon>
                    </IconButton>
                    <Typography
                        variant="h6"
                        noWrap
                        component="div"
                        color="white"
                        sx={{
                            // flexGrow: 1,
                            display: { xs: 'none', sm: 'block' },
                        }}
                    >
                        Grasp
                    </Typography>
                    <EmptySpace />
                    <Search>
                        <SearchIconWrapper>
                            <SearchIcon />
                        </SearchIconWrapper>
                        <StyledInputBase
                            placeholder="Search…"
                            inputProps={{ 'aria-label': 'search' }}
                        />
                    </Search>
                    <EmptySpace />
                    <Tooltip title="Logout">
                        <Button variant="contained" color="error">
                            <Icon style={{ color: 'white' }}>logout</Icon>
                        </Button>
                    </Tooltip>
                </Toolbar>
            </AppBar>
        </Container>
    );
};

export default Navbar;
