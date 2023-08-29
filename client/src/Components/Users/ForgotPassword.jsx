// import React, { useState } from 'react';
// import axios from 'axios';
// import { Container, Typography, TextField, Button, CircularProgress } from '@mui/material';
// import logo from "../images/logo_tech19.png";
// const ForgotPassword = () => {
//   const [username, setUsername] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [message, setMessage] = useState('');

//   const handleForgotPassword = async () => {
//     setLoading(true);
//     setMessage('');

//     try {
//       const response = await axios.post(
//         'http://localhost:5000/forgot_password',
//         { username },
//         {
//           headers: {
//             'Content-Type': 'application/json',
//           },
//         }
//       );

//       setMessage(response.data.message);
//     } catch (error) {
//       if (error.response) {
//         setMessage(`Error: ${error.response.data.message}`);
//       } else {
//         setMessage('Error resetting password. Please try again later.');
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <>
         
//          <Typography variant="h6" component="div" sx={{  backgroundColor:'black'}}>
//          <img src={logo} alt="Tech19 Logo" style={{ maxWidth: '300px', display:'flex',alignContent:'flex-end' }} />
//             </Typography>
//       <Typography variant="h4" gutterBottom>
//         Forgot Password
//       </Typography>
//       <TextField
//         label="Username"
//         variant="outlined"
//         fullWidth
//         value={username}
//         onChange={(e) => setUsername(e.target.value)}
//         sx={{ marginBottom: 2 }}
//       />
//       <Button
//         variant="contained"
//         color="primary"
//         fullWidth
//         onClick={handleForgotPassword}
//         disabled={loading}
//         sx={{ marginBottom: 2 }}
//       >
//         {loading ? <CircularProgress size={24} /> : 'Reset Password'}
//       </Button>
//       <Typography color={message.includes('successful') ? 'success' : 'error'}>
//         {message}
//       </Typography>
//     </>
//   );
// };

// export default ForgotPassword;

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
          
            withCredentials: true, // Add this line
  
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
        <img src={logo} alt='Logo' />
      </div>
      <Container component='main' maxWidth='xs'>
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
          <Typography component='h1' variant='h4'>
            Forgot Password
          </Typography>
          <Typography component='h1' variant='h6'>
            Please enter your username to reset your password.
          </Typography>
          <Box component='form' onSubmit={handleForgotPassword} noValidate sx={{ mt: 1 }}>
            <TextField
              margin='normal'
              required
              fullWidth
              id='username'
              label='Username'
              name='username'
              autoComplete='username'
              value={username}
              autoFocus
              onChange={(e) => setUsername(e.target.value)}
            />
            <Button
              type='submit'
              fullWidth
              variant='contained'
              sx={{ mt: 3, mb: 2 }}
            >
              Reset Password
            </Button>
            <Grid container>
              <Grid item xs>
                <Link component={RouterLink} to='/login' variant='body2'>
                  Back to Login
                </Link>
              </Grid>
            </Grid>
            <Typography variant='body1' color='textSecondary' sx={{ mt: 2 }}>
              {message}
            </Typography>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default ForgotPassword;
