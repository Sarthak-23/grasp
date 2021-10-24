import React, { useState } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Avatar from '@mui/material/Avatar';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import Checkbox from '@mui/material/Link';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { makeStyles } from '@mui/styles';
import classes from './Register.css';
import { UserContext } from '../../context/UserContext';

const useStyles = makeStyles((theme) => ({
    container: {
        // width: '100vw',
        height: '100vh',
        margin: '0',
        display: 'flex',
        alignItems: 'center',
        // border: `1px solid ${theme.palette.divider}`,
        // borderRadius: '1rem',
    },
    form: {
        padding: 30,
        margin: 'auto',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    lock: {},
}));

const Register = (props) => {
    const hist = useHistory();
    const [user, setUser] = React.useContext(UserContext);
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState('');
    const [loader, setLoader] = useState(false);

    const classes = useStyles();
    const avatarStyle = { backgroundColor: '#1bbd7e', margin: 'auto 0.5rem' };
    const btnstyle = { margin: '8px 0' };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoader(true);
        try {
            if (!name || !username || !password) {
                setErrors('Please Fill all the fields');
                setLoader(false);
                return;
            }
            setErrors('');
            //Submit the Register Form
            let res = await fetch('/auth/register', {
                method: 'POST',
                body: JSON.stringify({ username, password, name }),
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            res = await res.json();
            console.log(res);
            if (res._id) {
                setUser(res);
                setErrors('');
                hist.replace('/');
            } else {
                setErrors('Something went wrong');
            }
            setLoader(false);
        } catch (e) {
            setLoader(false);
            console.log(e);
            setErrors('Something went wrong');
        }
    };

    return (
        <Grid className={classes.container}>
            <Paper elevation={20} className={classes.form}>
                <div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                    }}
                >
                    <Avatar style={avatarStyle}>
                        <LockOutlinedIcon className={classes.lock} />
                    </Avatar>
                    <h2>Register</h2>
                </div>
                <TextField
                    label="Name"
                    variant="outlined"
                    placeholder="Enter name"
                    fullWidth
                    required
                    style={{ marginTop: '20px' }}
                    name="name"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <TextField
                    label="Username"
                    variant="outlined"
                    placeholder="Enter username"
                    fullWidth
                    required
                    style={{ marginTop: '20px' }}
                    name="username"
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value.toLowerCase())}
                />
                <TextField
                    label="Password"
                    placeholder="Enter password"
                    type="password"
                    fullWidth
                    required
                    style={{ marginTop: '20px' }}
                    name="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                {errors ? (
                    <Typography style={{ color: 'red' }}>{errors}</Typography>
                ) : null}
                {loader ? (
                    <Button
                        type="submit"
                        color="success"
                        variant="contained"
                        style={btnstyle}
                        fullWidth
                        onClick={handleSubmit}
                        style={{ marginTop: '20px', marginBottom: '15px' }}
                        disabled
                    >
                        Register
                    </Button>
                ) : (
                    <Button
                        type="submit"
                        color="success"
                        variant="contained"
                        style={btnstyle}
                        fullWidth
                        onClick={handleSubmit}
                        style={{ marginTop: '20px', marginBottom: '15px' }}
                    >
                        Register
                    </Button>
                )}

                <Typography>
                    <NavLink
                        to="/login"
                        style={{ textDecoration: 'none', color: 'black' }}
                    >
                        Already have an account?
                    </NavLink>
                </Typography>
            </Paper>
        </Grid>
    );
};

export default Register;
