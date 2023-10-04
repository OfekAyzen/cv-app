



import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import logo from '../../../src/Components/images/logo_tech19.png';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Header from "../../Components/Header";
import "../../styles/LoginPage.css";
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import { Link as RouterLink } from 'react-router-dom'; // Import RouterLink
import { Link } from '@mui/material';
import { Amplify } from 'aws-amplify';
import { Auth } from 'aws-amplify';


const defaultTheme = createTheme();



export default function Login(props) {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message,setMessage]=useState('');
  const navigate = useNavigate();


  const handleSubmit = async (event) => {
    event.preventDefault();
  
    try {
      const user = await Auth.signIn(username, password);
      const my_user = user.signInUserSession.idToken.payload;
  
      // Check if the user is in the Admin group
      const isAdmin = my_user["cognito:groups"] && my_user["cognito:groups"].includes("Admin");
  
      // Check if the user is in the General group
      const isGeneral = my_user["cognito:groups"] && my_user["cognito:groups"].includes("General");
  
      const selectedJobId = localStorage.getItem('selectedJobId');
  
      if (isAdmin) {
        navigate("/Profile");
      } else if (isGeneral) {
        navigate('/HomePage');
        if (selectedJobId) {
          navigate(`/Apply/${selectedJobId}`);
        } else {
          navigate('/HomePage');
        }
        setMessage('Error signing in');
      }
      else if (selectedJobId) {
                navigate(`/Apply/${selectedJobId}`);
              
      } else {
        // User is not in any specified group
        console.log(" ");
        navigate('/HomePage');
      }
    } catch (error) {
      setMessage(error.message);
      console.log('error signing in', error);
    }
  };
  
  return (
    <ThemeProvider theme={defaultTheme}>
      <div className='div-bar' position="static" >
        <img src={logo} />
      </div>
      <Container  component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography style={{fontFamily:'"Calibri", sans-serif'}} component="h1" variant="h4">
            Welcome back !
          </Typography>
          <Typography style={{fontFamily:'"Calibri", sans-serif'}} component="h1" variant="h6">
            Welcome back! Please enter your details.
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1, textAlign: 'center', }}>
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
              className="custom-select"
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
              className="custom-select"
              
            />
            {message && (
  <Typography variant="body1" color="error" sx={{ mt: 2 }}>
    {message}
  </Typography>
)}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{   fontFamily:'"Calibri", sans-serif',
                mt: 4, mb: 2, width: '30%', color: 'white', backgroundColor: '#ad2069', '&:hover': {
                  backgroundColor: '#b4269a', // Set the hover background color
                },
              }}  // Center-align the login button
              // onClick={() => { handleSubmit }}
              onClick={handleSubmit}
            >
              Login
            </Button>
            <Grid container>
              <Grid item xs={6}> {/* Change the xs value */}
                <Link style={{fontFamily:'"Calibri", sans-serif'}} component={RouterLink} to="/forgot_password" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item xs={6}> {/* Change the xs value */}
                <Link style={{fontFamily:'"Calibri", sans-serif'}} component={RouterLink} to="/SignUp" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}


