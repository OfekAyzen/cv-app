// import * as React from 'react';
// import { useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

// import Button from '@mui/material/Button';
// import CssBaseline from '@mui/material/CssBaseline';
// import TextField from '@mui/material/TextField';
// import FormControlLabel from '@mui/material/FormControlLabel';
// import Checkbox from '@mui/material/Checkbox';
// import Link from '@mui/material/Link';
// import Grid from '@mui/material/Grid';
// import Box from '@mui/material/Box';
// import Typography from '@mui/material/Typography';
// import Container from '@mui/material/Container';
// import { createTheme, ThemeProvider } from '@mui/material/styles';
// import { Snackbar } from '@mui/material';
// import Header from '../Header';
// import logo from '../images/logo_tech19.png';


// function Copyright(props) {
//   return (
//     <Typography variant="body2" color="text.secondary" align="center" {...props}>
//       {'Copyright © '}
//       <Link color="inherit" href="https://example.com">
//         Tech 19
//       </Link>{' '}
//       {new Date().getFullYear()}
//       {'.'}
//     </Typography>
//   );
// }

// const defaultTheme = createTheme();

// export default function SignUp() {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const [email, setEmail] = useState('');
//   const [first_name, setFirstName] = useState('');
//   const [last_name, setLastName] = useState('');
//   const [phone_number, setPhoneNumber] = useState('');
//   const [snackbarOpen, setSnackbarOpen] = useState(false);
//   const [snackbarMessage, setSnackbarMessage] = useState('');
//   const navigate = useNavigate();

//   const handleSignUp = async (event) => {
//     event.preventDefault();
  
//     try {
//       const response = await axios.post('http://localhost:5000/signup', {
//         username: username,
//         password: password,
//         email: email,
//         first_name: first_name,
//         last_name: last_name,
//         phone_number: phone_number,
//       }, { withCredentials: true });
  
     
  
//       if (response.status === 200 || response.status === 201) {
      
//         setSnackbarMessage('User added successfully!');
//         setSnackbarOpen(true);

  
//         // Redirect to HomePage and pass user role and username as query parameters
      
//         navigate("/Login")
//         //navigate('/HomePage', { state: { role: response.data.role, username: username } });
//         // navigate("/Login");
//       } else {
//         const errorMessage = response.data.message || 'An error occurred. Please try again.';
//         setSnackbarMessage(errorMessage);
//         setSnackbarOpen(true);
//         console.log('ERROR');
//       }
//     } catch (error) {
//       const errorMessage = error.response?.data?.message || 'An error occurred. Please try again later.';
//       setSnackbarMessage(errorMessage);
//       setSnackbarOpen(true);
//       console.log(error);
//     }
//   };
  
//   return (
//     <ThemeProvider theme={defaultTheme}>
      
//       <Typography variant="h6" component="div" sx={{ flexGrow: 1 ,backgroundColor:'black'}}>
//                     <img src={logo} alt="Tech19 Logo" style={{ maxWidth: '300px' }} />
//             </Typography>
//       <Container component="main" maxWidth="xs">
//         <CssBaseline />
//         <Box
//           sx={{
//             marginTop: 8,
//             display: 'flex',
//             flexDirection: 'column',
//             alignItems: 'center',
//             textAlign: 'center', // Add this line to center-align the form content
//           }}
//         >
//           <Typography component="h1" variant="h4">
//             Sign up
//           </Typography>
//           <Typography component="h1" variant="h5">
//             Join our website
//           </Typography>
//           <Box component="form" noValidate onSubmit={handleSignUp} sx={{ mt: 3 }}>
//           <div
//               style={{
//                 display: 'flex',
//                 justifyContent: 'space-between',
//                 alignItems: 'stretch',
//                 gap: '1px',
//               }}
//             >
//               <div style={{ flex: 1 }}>
//                 {/* Left side: First Name, Last Name, Password */}
//                 <TextField
//                   autoComplete="given-name"
//                   name="firstName"
//                   required
//                   fullWidth
//                   id="firstName"
//                   label="First Name"
//                   autoFocus
//                   value={first_name}
//                   onChange={(e) => setFirstName(e.target.value)}
//                   sx={{width:'70%'}}
                  
//                 />
//                 <TextField
//                   required
//                   fullWidth
//                   id="lastName"
//                   label="Last Name"
//                   name="lastName"
//                   autoComplete="family-name"
//                   value={last_name}
//                   onChange={(e) => setLastName(e.target.value)}
//                   sx={{width:'70%'}}
//                 />
//                 <TextField
//                   required
//                   fullWidth
//                   name="password"
//                   label="Password"
//                   type="password"
//                   id="password"
//                   autoComplete="new-password"
//                   value={password}
//                   onChange={(e) => setPassword(e.target.value)}
//                   sx={{width:'70%'}}
//                 />
//               </div>
//               <div style={{ flex: 1, borderLeft: '2px solid #ad2069', paddingLeft: '1px' }}>
//                 {/* Right side: Phone Number, Email, Username */}
//                 <TextField
//                   required
//                   fullWidth
//                   name="phone_number"
//                   label="Phone number"
//                   type="phone_number"
//                   id="phone_number"
//                   autoComplete="new-phone_number"
//                   value={phone_number}
//                   onChange={(e) => setPhoneNumber(e.target.value)}
//                   sx={{width:'70%'}}
//                 />
//                 <TextField
//                   required
//                   fullWidth
//                   id="email"
//                   label="Email Address"
//                   name="email"
//                   autoComplete="email"
//                   value={email}
//                   onChange={(e) => setEmail(e.target.value)}
//                   sx={{width:'70%'}}
//                 />
//                 <TextField
//                   required
//                   fullWidth
//                   name="username"
//                   label="Username"
//                   type="username"
//                   id="username"
//                   autoComplete="new-username"
//                   value={username}
//                   onChange={(e) => setUsername(e.target.value)}
//                   sx={{width:'70%'}}
//                 />
//               </div>
//             </div>
//             <Button
//               type="submit"
//               fullWidth
//               variant="contained"
//               sx={{ mt: 4, mb: 2, width: '15%', color: 'white',backgroundColor: '#ad2069' ,'&:hover': {
//                 backgroundColor: '#b4269a', 
//               },}} 
//               onClick={handleSignUp}
//             >
//               Sign Up
//             </Button>
//             <Grid container justifyContent="center">
//               <Grid item>
//                 <Link href="/Login" variant="body2">
//                   Already have an account? Sign in
//                 </Link>
//               </Grid>
//             </Grid>
//             {/* Snackbar to display messages */}
//             <Snackbar
//               open={snackbarOpen}
//               autoHideDuration={5000}
//               onClose={() => setSnackbarOpen(false)}
//               message={snackbarMessage}
//               // Customize the style of the snackbar as needed
//               // Example: style={{ backgroundColor: 'red' }}
//           />
//           </Box>
//         </Box>
//         <Copyright sx={{ mt: 5 }} />
//       </Container>
//     </ThemeProvider>
//   );
// }
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

import Link from '@mui/material/Link';


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

export default function SignUp() {
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
        // navigate(`/confirm-signup?username=${username}`);
        console.log("username = ",username);
        navigate(`/confirm-signup?username=${username}`); 
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
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
          }}
        >
          <Typography component="h1" variant="h4">
            Sign up
          </Typography>
          <Typography component="h1" variant="h5">
            Join our website
          </Typography>
          <Box component="form" noValidate onSubmit={handleSignUp} sx={{ mt: 3 }}>
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
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                  value={first_name}
                  onChange={(e) => setFirstName(e.target.value)}
                  sx={{ width: '70%' }}
                />
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                  value={last_name}
                  onChange={(e) => setLastName(e.target.value)}
                  sx={{ width: '70%' }}
                />
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  sx={{ width: '70%' }}
                />
              </div>
              <div style={{ flex: 1, borderLeft: '2px solid #ad2069', paddingLeft: '1px' }}>
                <TextField
                  required
                  fullWidth
                  name="phone_number"
                  label="Phone number"
                  type="tel"
                  id="phone_number"
                  autoComplete="tel"
                  placeholder="058-5008855"
                  value={phone_number}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  sx={{ width: '70%' }}
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
                  required
                  fullWidth
                  name="username"
                  label="Email"
                  type="text"
                  id="username"
                  autoComplete="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  sx={{ width: '70%' }}
                />
              </div>
            </div>
            <Button
              type="button"
              fullWidth
              variant="contained"
              sx={{
                mt: 4,
                mb: 2,
                width: '15%',
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
                <Link href="/Login" variant="body2">
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
