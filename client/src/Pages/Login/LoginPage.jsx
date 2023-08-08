// import React, { useState } from 'react';
// import axios from 'axios';

// const LoginPage = ({ onLogIn }) => {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const [loginError, setLoginError] = useState('');




  

//   const handleLogin = async (event) => {
//     event.preventDefault();

//     try {
//       const response = await axios.post('http://localhost:5000/login',{
//         username: username,
//         password: password,
//       }
//       ,{withCredentials: true}
      
//       );

//       if (response.status === 200) {
        
//         // Login successful
//         onLogIn(response.data.role); // Notify parent component that user is logged in with role
//       } else {
//         // Login failed
//         setLoginError('Incorrect username or password');
//       }
//     } catch (error) {
//       // Error occurred
//       console.log(error);
//       setLoginError('Error logging in');
//     }
//   };

//   return (
//     <div >
//       <form onSubmit={handleLogin}>
//         <label htmlFor="username">Username:</label>
//         <input
//           type="text"
//           id="username"
//           value={username}
//           onChange={(e) => setUsername(e.target.value)}
//         />
//         <label htmlFor="password">Password:</label>
//         <input
//           type="password"
//           id="password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//         />
//         <p>{loginError}</p>
//         <button type="submit">Login</button>
//       </form>
//     </div>
//   );
// };

// export default LoginPage;

import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Header from "../../Components/Header";
import "../../styles/LoginPage.css";
import { useState, useEffect, useContext } from 'react'
import { useUserUpdate } from '../../UserContext.jsx'
import { useNavigate } from 'react-router-dom'
import axios from 'axios';


function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="">
        Tech 19 
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function SignIn({onLogIn, isLoggedIn}) {
  
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');


  const userUpdatedFunction = useUserUpdate();
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn){
      userUpdatedFunction(null);
      onLogIn(undefined);
      localStorage.setItem('logged_user', null);
    }
  }, []);


  const handleLogin = async (event) => {
    event.preventDefault();
    //console.log(await getUsers())
    if (username === '') {
      console.log('Login Failed');
      setLoginError('Please enter a username');
      return;
    }
    if (password === '') {
      console.log('Login Failed');
      setLoginError('Please enter a password');
      return;
    }
    try {
      const response = await axios.post('http://localhost:5000/login', {
        username: username,
        password: password,
      }, { withCredentials: true });
  
      if (response.status === 200) {
        // Login successful
        onLogIn(response.data.role);
  
        // Check if the user role is "candidate" and redirect to HomePage accordingly
        if (response.data.role === "candidate") {
          navigate('/HomePage');
        } else if(response.data.role === "manager") {
          navigate('/ViewCandidate');
        }
      } else {
        // Login failed
        setLoginError('Incorrect username or password');
      }
    } catch (error) {
      // Error occurred
      console.log(error);
      setLoginError('Error logging in');
    }
  };
  



  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Header />
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h4">
            Welcome back !
          </Typography>
          <Typography component="h1" variant="h6">
            Welcome back ! Please enter your details.
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoComplete="username"
              value={username}
              autoFocus
              onChange={(e) => setUsername(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={handleLogin}
            >
              Login
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="/SignUp" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}