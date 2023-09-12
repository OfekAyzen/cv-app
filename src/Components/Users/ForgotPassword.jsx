import React, { useState } from 'react';
import {
  Avatar,
  Box,
  Button,
  Container,
  CssBaseline,
  Grid,
  Link,
  TextField,
  Typography,
} from '@mui/material';
import logo from "../images/logo_tech19.png";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { Link as RouterLink } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import axios from 'axios';

const defaultTheme = createTheme();

const ForgotPassword = () => {
  const [username, setUsername] = useState('');
  const [message, setMessage] = useState('');

  const handleForgotPassword = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        'http://localhost:5000/forgot_password',
        { username },
        {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        }
      );

      setMessage(response.data.message);
    } catch (error) {
      setMessage('Error sending password reset email.');
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
       <div className='div-bar' position='static'>
            <img src={logo} alt='Logo' fullWidth style={{maxWidth:'100%'}} />
          </div>
      <Container component='main' maxWidth='xs' sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '60vh' }}>
        <CssBaseline />
        <Box
          sx={{
       
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: '100%',
            p: 1, // Add padding for the box
            backgroundColor: 'white', // Add a background color
            borderRadius: 8, // Add rounded corners
          }}
        >
         
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component='h1' variant='h4'>
            Forgot Password
          </Typography>
          <Typography component='h1' variant='h6'>
            Please enter your username to reset your password.
          </Typography>
          <Box component='form' onSubmit={handleForgotPassword} noValidate sx={{ mt: 3, width: '100%' }}>
            <TextField
              margin='normal'
              required
              fullWidth
              id='username'
              label='Username'
              name='username'
              autoComplete='username'
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
             <Button
              type='submit'
              fullWidth
              variant='contained'
              sx={{marginLeft:'25%', mt: 2, width: '50%', backgroundColor: '#b4269a', '&:hover': { backgroundColor: '#b4269a' } }}
            >
              Reset Password
            </Button>
            <Typography variant='body1' color='textSecondary' sx={{ mt: 2 }}>
              {message}
            </Typography>
            <Grid container justifyContent="center" sx={{ mt: 2 }}>
              <Grid item>
                <Link component={RouterLink} to='/login' variant='body2'>
                  Back to Login
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default ForgotPassword;
