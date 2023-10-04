
import { Auth } from 'aws-amplify';
import * as React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Snackbar } from '@mui/material';
import { parsePhoneNumber } from 'libphonenumber-js';
import logo from '../images/logo_tech19.png';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import "../../styles/SignUp.css";
import Link from '@mui/material/Link';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Avatar from '@mui/material/Avatar';
function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://example.com">
        Tech 19
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}


const defaultTheme = createTheme();

export default function SignUp({ }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [first_name, setFirstName] = useState('');
  const [last_name, setLastName] = useState('');
  const [phone_number, setPhoneNumber] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const navigate = useNavigate();

  const handleSignUp = async () => {
    try {
      // Format the phone number to E.164 format (Israeli format)
      const phoneNumberObject = parsePhoneNumber(phone_number, 'IL');
      if (phoneNumberObject && phoneNumberObject.isValid()) {
        const formattedPhoneNumber = phoneNumberObject.format('E.164');

        const { user } = await Auth.signUp({
          username,
          password,
          attributes: {
            email,
            phone_number: formattedPhoneNumber,
            given_name: first_name,
            family_name: last_name,
          },
        });
        setSnackbarMessage('User added successfully!');
        setSnackbarOpen(true);
        navigate(`/confirm-signup/${username}`);
      } else {
        console.log('Invalid phone number format');
        setSnackbarMessage('Invalid phone number format');
        setSnackbarOpen(true);
      }
    } catch (error) {
      console.log('error signing up:', error);
      setSnackbarMessage('Error signing up: ' + error.message);
      setSnackbarOpen(true);
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Typography variant="h6" component="div" sx={{ flexGrow: 1, backgroundColor: 'black' }}>
        <img src={logo} alt="Tech19 Logo" style={{ maxWidth: '300px' }} />
      </Typography>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 2,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
        <Box sx={{display:'flex',alignContent:'center',textAlign:'center',flexDirection:'column'}}>
           <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography style={{fontFamily:'"Calibri", sans-serif'}}  component="h1" variant="h4">
            Sign up
          </Typography>
          <Typography  style={{fontFamily:'"Calibri", sans-serif'}} component="h1" variant="h5">
            Join our website
          </Typography>
          </Box>
          <Box component="form" noValidate onSubmit={handleSignUp} sx={{ mt: 3 ,minWidth:'600px' ,height:'600px'}}>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'stretch',
                gap: '1px',
              }}
            >
              <div style={{ flex: 1 }}>
                <TextField
                  className='custom-select'
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                  value={first_name}
                  onChange={(e) => setFirstName(e.target.value)}
                  sx={{ width: '95%' ,paddingBottom:'15px'}}
                />
                <TextField
                  className='custom-select'
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                  value={last_name}
                  onChange={(e) => setLastName(e.target.value)}
                  sx={{ width: '95%',paddingBottom:'15px' }}
                />
                <TextField
                  className='custom-select'
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  sx={{ width: '95%' ,paddingBottom:'15px'}}
                />
              </div>
              <div style={{ flex: 1, borderLeft: '2px solid #ad2069', paddingLeft: '1px' }}>
                <TextField
                  className='custom-select'
                  required
                  fullWidth
                  name="phone_number"
                  label="Phone number"
                  type="tel"
                  id="phone_number"
                  autoComplete="tel"
                  placeholder="058-000000"
                  value={phone_number}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  sx={{ width: '95%',paddingBottom:'15px' }}
                />
                {/* <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  sx={{ width: '70%' }}
                /> */}
                <TextField
                  className='custom-select'
                  required
                  fullWidth
                  name="username"
                  label="Email"
                  type="text"
                  id="username"
                  autoComplete="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  sx={{ width: '95%',paddingBottom:'15px' }}
                />
              </div>
            </div>
            <Button
              type="button"
              fullWidth
              variant="contained"
              sx={{
                fontFamily:'"Calibri", sans-serif',
                mt: 4,
                mb: 2,
                width: '30%',
                color: 'white',
                backgroundColor: '#ad2069',
                '&:hover': {
                  backgroundColor: '#b4269a',
                },
              }}
              onClick={handleSignUp}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="center">
              <Grid item>
                <Link style={{fontFamily:'"Calibri", sans-serif'}} href="/Login" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
            <Snackbar
              open={snackbarOpen}
              autoHideDuration={5000}
              onClose={() => setSnackbarOpen(false)}
              message={snackbarMessage}
            />
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}
