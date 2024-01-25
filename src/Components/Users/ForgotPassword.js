// import React, { useState } from 'react';
// import {
//   Avatar,
//   Box,
//   Button,
//   Container,
//   CssBaseline,
//   Grid,
//   Link,
//   TextField,
//   Typography,
// } from '@mui/material';
// import logo from "../images/logo_tech19.png";
// import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
// import { Link as RouterLink } from 'react-router-dom';
// import { ThemeProvider, createTheme } from '@mui/material/styles';
// import axios from 'axios';

// const defaultTheme = createTheme();

// const ForgotPassword = () => {
//   const [username, setUsername] = useState('');
//   const [message, setMessage] = useState('');

//   const handleForgotPassword = async (e) => {
//     e.preventDefault();

//     try {
//       const response = await axios.post(
//         'http://localhost:5000/forgot_password',
//         { username },
//         {
//           headers: {
//             'Content-Type': 'application/json',
//           },
//           withCredentials: true,
//         }
//       );

//       setMessage(response.data.message);
//     } catch (error) {
//       setMessage('Error sending password reset email.');
//     }
//   };

//   return (
//     <ThemeProvider theme={defaultTheme}>
//        <div className='div-bar' position='static'>
//             <img src={logo} alt='Logo' fullWidth style={{maxWidth:'100%'}} />
//           </div>
//       <Container component='main' maxWidth='xs' sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '60vh' }}>
//         <CssBaseline />
//         <Box
//           sx={{

//             display: 'flex',
//             flexDirection: 'column',
//             alignItems: 'center',
//             width: '100%',
//             p: 1, // Add padding for the box
//             backgroundColor: 'white', // Add a background color
//             borderRadius: 8, // Add rounded corners
//           }}
//         >

//           <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
//             <LockOutlinedIcon />
//           </Avatar>
//           <Typography component='h1' variant='h4'>
//             Forgot Password
//           </Typography>
//           <Typography component='h1' variant='h6'>
//             Please enter your username to reset your password.
//           </Typography>
//           <Box component='form' onSubmit={handleForgotPassword} noValidate sx={{ mt: 3, width: '100%' }}>
//             <TextField
//               margin='normal'
//               required
//               fullWidth
//               id='username'
//               label='Username'
//               name='username'
//               autoComplete='username'
//               value={username}
//               onChange={(e) => setUsername(e.target.value)}
//             />
//              <Button
//               type='submit'
//               fullWidth
//               variant='contained'
//               sx={{marginLeft:'25%', mt: 2, width: '50%', backgroundColor: '#b4269a', '&:hover': { backgroundColor: '#b4269a' } }}
//             >
//               Reset Password
//             </Button>
//             <Typography variant='body1' color='textSecondary' sx={{ mt: 2 }}>
//               {message}
//             </Typography>
//             <Grid container justifyContent="center" sx={{ mt: 2 }}>
//               <Grid item>
//                 <Link component={RouterLink} to='/login' variant='body2'>
//                   Back to Login
//                 </Link>
//               </Grid>
//             </Grid>
//           </Box>
//         </Box>
//       </Container>
//     </ThemeProvider>
//   );
// };

// export default ForgotPassword;
import React, { useState } from "react";
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
} from "@mui/material";
import logo from "../images/logo_tech19.png";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { Auth } from "aws-amplify"; // Import AWS Amplify
import "../../styles/Login.css";
const defaultTheme = createTheme();

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://example.com">
        Tech 19
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const ForgotPassword = () => {
  const [username, setUsername] = useState("");
  const [confirmationCode, setConfirmationCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleForgotPassword = async (e) => {
    e.preventDefault();

    try {
      // Send a confirmation code to the user's email using AWS Amplify
      await Auth.forgotPassword(username);

      // Display a message to inform the user
      setMessage("Confirmation code sent to your email. Check your inbox.");
      navigate(`/confirm_forgot_password/${username}`);
    } catch (error) {
      setMessage("Error sending confirmation code. Please try again.");
    }
  };

  const handlePasswordReset = async () => {
    try {
      // Reset the password using the confirmation code and new password
      await Auth.forgotPasswordSubmit(username, confirmationCode, newPassword);

      // Display a success message
      setMessage(
        "Password reset successful! You can now log in with your new password."
      );

      // Redirect the user to the login page or another appropriate page
      navigate("/Login");
    } catch (error) {
      setMessage(
        "Error resetting password. Please make sure your password contains the following:" +
          " The password must contain at least 8 characters" +
          " The password must contain at least one uppercase letter" +
          " The password must contain at least one number"
      );
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <div className="div-bar" position="static">
        <img src={logo} alt="Logo" fullWidth style={{ maxWidth: "100%" }} />
      </div>
      <Container
        component="main"
        maxWidth="xs"
        sx={{
          display: "flex",
          alignItems: "center",
          alignContent: "center",
          justifyContent: "center",
          height: "60vh",
        }}
      >
        <CssBaseline />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "100%",
            p: 1,
            backgroundColor: "white",
            borderRadius: 8,
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h4">
            Forgot Password
          </Typography>
          <Typography component="h1" variant="h6">
            Please enter your username to reset your password.
          </Typography>
          {message && (
            <Typography variant="body1" color="textSecondary" sx={{ mt: 2 }}>
              {message}
            </Typography>
          )}

          <Box
            component="form"
            onSubmit={handleForgotPassword}
            noValidate
            sx={{ mt: 3, width: "100%" }}
          >
            <TextField
              className="custom-select"
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoComplete="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                mt: 4,
                mb: 2,
                width: "100%",
                color: "white",
                display: "flex",
                backgroundColor: "#ad2069",
                "&:hover": {
                  backgroundColor: "#b4269a",
                },
              }}
            >
              Send Confirmation Code
            </Button>
          </Box>

          <Grid container justifyContent="center" sx={{ mt: 2 }}>
            <Grid item>
              <Link component={RouterLink} to="/Login" variant="body2">
                Back to Login
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Container>
      <Copyright sx={{ mt: 5 }} />
    </ThemeProvider>
  );
};

export default ForgotPassword;
