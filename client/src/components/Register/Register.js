import React from 'react'
import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper';
import Avatar from '@mui/material/Avatar';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import Checkbox from '@mui/material/Link';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { makeStyles } from '@mui/styles';
import classes from "./Register.css";


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
    const classes = useStyles();
    const avatarStyle = { backgroundColor: '#1bbd7e', margin: 'auto 0.5rem' };
    const btnstyle = { margin: '8px 0' };
    return(
        <Grid className={classes.container}>
            <Paper elevation={20} className={classes.form}>
                <div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                    }}
                >
                    <Avatar style={avatarStyle}>
                        <LockOutlinedIcon  className={classes.lock}/>
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
                />
                <TextField
                    label="Username"
                    variant="outlined"
                    placeholder="Enter username"
                    fullWidth
                    required
                    style={{ marginTop: '20px' }}
                />
                <TextField
                    label="Password"
                    placeholder="Enter password"
                    type="password"
                    fullWidth
                    required
                    style={{ marginTop: '20px' }}
                />
                <Button
                    type="submit"
                    color="primary"
                    variant="contained"
                    style={btnstyle}
                    fullWidth
                >
                    Register
                </Button>
                <Typography>
                    <Link
                        href="#"
                        style={{ textDecoration: 'none', color: 'black' }}
                    >
                        Already have an account?
                    </Link>
                </Typography>
            </Paper>
        </Grid>
    )
}

export default Register
