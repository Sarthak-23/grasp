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

//component

//classes
import classes from "./Login.css"

const Login = () => {
    const paperStyle={padding :20,height:'50vh',width:300, margin:"20px auto"}
    const avatarStyle={backgroundColor:'#1bbd7e'}
    const btnstyle={margin:'8px 0'}
    return(
        <Grid style={{marginTop:"80px"}} align='center'>
            <Paper elevation={20} style={paperStyle}>
                <Grid align='center'>
                     <Avatar style={avatarStyle}>
                        <LockOutlinedIcon color="blue"/>
                     </Avatar>
                    <h2>Log In</h2>
                </Grid>
                <TextField label='Username' variant="outlined" placeholder='Enter username' fullWidth required style={{marginTop:"20px"}}/>
                <TextField label='Password' placeholder='Enter password' type='password' fullWidth required style={{marginTop:"20px"}}/>
                <Button type='submit' color='primary' variant="contained" style={btnstyle} fullWidth>Sign in</Button>
                <Typography>
                     <Link href="#" style={{textDecoration:"none", color:"black"}} >
                     Do you have an account? 
                </Link>
                </Typography>
            </Paper>
        </Grid>
    )
}

export default Login
