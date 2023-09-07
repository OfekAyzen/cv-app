


// import * as React from 'react';
// import Avatar from '@mui/material/Avatar';
// import Button from '@mui/material/Button';
// import CssBaseline from '@mui/material/CssBaseline';
// import TextField from '@mui/material/TextField';
// import FormControlLabel from '@mui/material/FormControlLabel';
// import Checkbox from '@mui/material/Checkbox';
// import logo from '../../../src/Components/images/logo_tech19.png';
// import Grid from '@mui/material/Grid';
// import Box from '@mui/material/Box';
// import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
// import Typography from '@mui/material/Typography';
// import Container from '@mui/material/Container';
// import { createTheme, ThemeProvider } from '@mui/material/styles';
// import Header from "../../Components/Header";
// import "../../styles/LoginPage.css";
// import { useState, useEffect } from 'react'
// import { useNavigate } from 'react-router-dom'
// import axios from 'axios';
// import { Link as RouterLink } from 'react-router-dom'; // Import RouterLink
// import { Link } from '@mui/material';
// // import { Storage } from "@aws-amplify/storage"

// const defaultTheme = createTheme();


// // await Storage.put("test.txt", "Hello");

// export default function Login(props) {

//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');

//   const navigate = useNavigate();




//   const handleLogin = async (event) => {
//     event.preventDefault();

//     if (username === '') {
//       console.log('Login Failed');
//       setLoginError('Please enter a username');
//       return;
//     }
//     if (password === '') {
//       console.log('Login Failed');
//       setLoginError('Please enter a password');
//       return;
//     }

//     try {
//       const response = await axios.post('http://localhost:5000/token', {
//         username: username,
//         password: password,
//       });

//       if (response.status === 200) {
//         // Login successful

//         props.onLogIn(response.data.role);
//         props.setToken(response.data.access_token)

//         props.setUserName(response.data.username);


//         const pendingJobId = sessionStorage.getItem('pendingJobId');
//         if (pendingJobId) {


//           localStorage.setItem('candidate_id', response.data.candidate_id);//
//           navigate(`/Apply/${pendingJobId}`);
//           sessionStorage.removeItem('pendingJobId');
//         } else {
//           // No pending job ID, navigate to the appropriate page based on user role
//           if (response.data.role === 'candidate') {
//             localStorage.setItem('candidate_id', response.data.candidate_id);//

//             props.setCandidateId(response.data.candidate_id);
//             navigate('/HomePage');
//           } else if (response.data.role === 'manager') {
//             props.setUserId(response.data.user_id);
//             navigate('/Profile');
//           }
//         }
//       } else {
//         // Login failed
//         setLoginError('Incorrect username or password');
//       }
//     } catch (error) {
//       if (error.response) {
//         console.log(error.response)
//         console.log(error.response.status)
//         console.log(error.response.headers)
//       }

//       setLoginError('Error logging in');
//     }
//   };

//   const handleSubmit = (event) => {
//     event.preventDefault();
//     const data = new FormData(event.currentTarget);
//     console.log({
//       email: data.get('email'),
//       password: data.get('password'),
//     });
//   };

//   return (
//     <ThemeProvider theme={defaultTheme}>
//       <div className='div-bar' position="static" >
//         <img src={logo} />
//       </div>
//       <Container component="main" maxWidth="xs">
//         <CssBaseline />
//         <Box
//           sx={{
//             marginTop: 8,
//             display: 'flex',
//             flexDirection: 'column',
//             alignItems: 'center',
//           }}
//         >
//           <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
//             <LockOutlinedIcon />
//           </Avatar>
//           <Typography component="h1" variant="h4">
//             Welcome back !
//           </Typography>
//           <Typography component="h1" variant="h6">
//             Welcome back! Please enter your details.
//           </Typography>
//           <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1, textAlign: 'center', }}>
//             <TextField
//               margin="normal"
//               required
//               fullWidth
//               id="username"
//               label="Username"
//               name="username"
//               autoComplete="username"
//               value={username}
//               autoFocus
//               onChange={(e) => setUsername(e.target.value)}
//             />
//             <TextField
//               margin="normal"
//               required
//               fullWidth
//               name="password"
//               label="Password"
//               type="password"
//               id="password"
//               autoComplete="current-password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//             />

//             <Button
//               type="submit"
//               fullWidth
//               variant="contained"
//               sx={{ mt: 4, mb: 2, width: '30%', color: 'white', backgroundColor: '#ad2069','&:hover': {
//                 backgroundColor: '#b4269a', // Set the hover background color
//               }, }}  // Center-align the login button
//               onClick={() => {console.log("login")}}
//             >
//               Login
//             </Button>
//             <Grid container>
//               <Grid item xs={6}> {/* Change the xs value */}
//                 <Link component={RouterLink} to="/forgot_password" variant="body2">
//                   Forgot password?
//                 </Link>
//               </Grid>
//               <Grid item xs={6}> {/* Change the xs value */}
//                 <Link component={RouterLink} to="/SignUp" variant="body2">
//                   {"Don't have an account? Sign Up"}
//                 </Link>
//               </Grid>
//             </Grid>
//           </Box>
//         </Box>
//       </Container>
//     </ThemeProvider>
//   );
// }



// import * as React from 'react';
// import Avatar from '@mui/material/Avatar';
// import Button from '@mui/material/Button';
// import CssBaseline from '@mui/material/CssBaseline';
// import TextField from '@mui/material/TextField';
// import FormControlLabel from '@mui/material/FormControlLabel';
// import Checkbox from '@mui/material/Checkbox';
// import logo from '../../../src/Components/images/logo_tech19.png';
// import Grid from '@mui/material/Grid';
// import Box from '@mui/material/Box';
// import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
// import Typography from '@mui/material/Typography';
// import Container from '@mui/material/Container';
// import { createTheme, ThemeProvider } from '@mui/material/styles';
// import Header from "../../Components/Header";
// import "../../styles/LoginPage.css";
// import { useState, useEffect } from 'react'
// import { useNavigate } from 'react-router-dom'
// import axios from 'axios';
// import { Link as RouterLink } from 'react-router-dom'; // Import RouterLink
// import { Link } from '@mui/material';
// // import { Storage } from "@aws-amplify/storage"

// const defaultTheme = createTheme();


// // await Storage.put("test.txt", "Hello");

// export default function Login(props) {

//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');

//   const navigate = useNavigate();




//   const handleLogin = async (event) => {
//     event.preventDefault();

//     if (username === '') {
//       console.log('Login Failed');
//       setLoginError('Please enter a username');
//       return;
//     }
//     if (password === '') {
//       console.log('Login Failed');
//       setLoginError('Please enter a password');
//       return;
//     }

//     try {
//       const response = await axios.post('http://localhost:5000/token', {
//         username: username,
//         password: password,
//       });

//       if (response.status === 200) {
//         // Login successful

//         props.onLogIn(response.data.role);
//         props.setToken(response.data.access_token)

//         props.setUserName(response.data.username);


//         const pendingJobId = sessionStorage.getItem('pendingJobId');
//         if (pendingJobId) {


//           localStorage.setItem('candidate_id', response.data.candidate_id);//
//           navigate(`/Apply/${pendingJobId}`);
//           sessionStorage.removeItem('pendingJobId');
//         } else {
//           // No pending job ID, navigate to the appropriate page based on user role
//           if (response.data.role === 'candidate') {
//             localStorage.setItem('candidate_id', response.data.candidate_id);//

//             props.setCandidateId(response.data.candidate_id);
//             navigate('/HomePage');
//           } else if (response.data.role === 'manager') {
//             props.setUserId(response.data.user_id);
//             navigate('/Profile');
//           }
//         }
//       } else {
//         // Login failed
//         setLoginError('Incorrect username or password');
//       }
//     } catch (error) {
//       if (error.response) {
//         console.log(error.response)
//         console.log(error.response.status)
//         console.log(error.response.headers)
//       }

//       setLoginError('Error logging in');
//     }
//   };

//   const handleSubmit = (event) => {
//     event.preventDefault();
//     const data = new FormData(event.currentTarget);
//     console.log({
//       email: data.get('email'),
//       password: data.get('password'),
//     });
//   };

//   return (
//     <ThemeProvider theme={defaultTheme}>
//       <div className='div-bar' position="static" >
//         <img src={logo} />
//       </div>
//       <Container component="main" maxWidth="xs">
//         <CssBaseline />
//         <Box
//           sx={{
//             marginTop: 8,
//             display: 'flex',
//             flexDirection: 'column',
//             alignItems: 'center',
//           }}
//         >
//           <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
//             <LockOutlinedIcon />
//           </Avatar>
//           <Typography component="h1" variant="h4">
//             Welcome back !
//           </Typography>
//           <Typography component="h1" variant="h6">
//             Welcome back! Please enter your details.
//           </Typography>
//           <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1, textAlign: 'center', }}>
//             <TextField
//               margin="normal"
//               required
//               fullWidth
//               id="username"
//               label="Username"
//               name="username"
//               autoComplete="username"
//               value={username}
//               autoFocus
//               onChange={(e) => setUsername(e.target.value)}
//             />
//             <TextField
//               margin="normal"
//               required
//               fullWidth
//               name="password"
//               label="Password"
//               type="password"
//               id="password"
//               autoComplete="current-password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//             />

//             <Button
//               type="submit"
//               fullWidth
//               variant="contained"
//               sx={{ mt: 4, mb: 2, width: '30%', color: 'white', backgroundColor: '#ad2069','&:hover': {
//                 backgroundColor: '#b4269a', // Set the hover background color
//               }, }}  // Center-align the login button
//               onClick={() => {console.log("login")}}
//             >
//               Login
//             </Button>
//             <Grid container>
//               <Grid item xs={6}> {/* Change the xs value */}
//                 <Link component={RouterLink} to="/forgot_password" variant="body2">
//                   Forgot password?
//                 </Link>
//               </Grid>
//               <Grid item xs={6}> {/* Change the xs value */}
//                 <Link component={RouterLink} to="/SignUp" variant="body2">
//                   {"Don't have an account? Sign Up"}
//                 </Link>
//               </Grid>
//             </Grid>
//           </Box>
//         </Box>
//       </Container>
//     </ThemeProvider>
//   );
// }





// import * as React from 'react';
// import Avatar from '@mui/material/Avatar';
// import Button from '@mui/material/Button';
// import CssBaseline from '@mui/material/CssBaseline';
// import TextField from '@mui/material/TextField';
// import FormControlLabel from '@mui/material/FormControlLabel';
// import Checkbox from '@mui/material/Checkbox';
// import logo from '../../../src/Components/images/logo_tech19.png';
// import Grid from '@mui/material/Grid';
// import Box from '@mui/material/Box';
// import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
// import Typography from '@mui/material/Typography';
// import Container from '@mui/material/Container';
// import { createTheme, ThemeProvider } from '@mui/material/styles';
// import Header from "../../Components/Header";
// import "../../styles/LoginPage.css";
// import { useState, useEffect } from 'react'
// import { useNavigate } from 'react-router-dom'
// import axios from 'axios';
// import { Link as RouterLink } from 'react-router-dom'; // Import RouterLink
// import { Link } from '@mui/material';
// // import { Storage } from "@aws-amplify/storage"

// const defaultTheme = createTheme();


// // await Storage.put("test.txt", "Hello");

// export default function Login(props) {

//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');

//   const navigate = useNavigate();




//   const handleLogin = async (event) => {
//     event.preventDefault();

//     if (username === '') {
//       console.log('Login Failed');
//       setLoginError('Please enter a username');
//       return;
//     }
//     if (password === '') {
//       console.log('Login Failed');
//       setLoginError('Please enter a password');
//       return;
//     }

//     try {
//       const response = await axios.post('http://localhost:5000/token', {
//         username: username,
//         password: password,
//       });

//       if (response.status === 200) {
//         // Login successful

//         props.onLogIn(response.data.role);
//         props.setToken(response.data.access_token)

//         props.setUserName(response.data.username);


//         const pendingJobId = sessionStorage.getItem('pendingJobId');
//         if (pendingJobId) {


//           localStorage.setItem('candidate_id', response.data.candidate_id);//
//           navigate(`/Apply/${pendingJobId}`);
//           sessionStorage.removeItem('pendingJobId');
//         } else {
//           // No pending job ID, navigate to the appropriate page based on user role
//           if (response.data.role === 'candidate') {
//             localStorage.setItem('candidate_id', response.data.candidate_id);//

//             props.setCandidateId(response.data.candidate_id);
//             navigate('/HomePage');
//           } else if (response.data.role === 'manager') {
//             props.setUserId(response.data.user_id);
//             navigate('/Profile');
//           }
//         }
//       } else {
//         // Login failed
//         setLoginError('Incorrect username or password');
//       }
//     } catch (error) {
//       if (error.response) {
//         console.log(error.response)
//         console.log(error.response.status)
//         console.log(error.response.headers)
//       }

//       setLoginError('Error logging in');
//     }
//   };

//   const handleSubmit = (event) => {
//     event.preventDefault();
//     const data = new FormData(event.currentTarget);
//     console.log({
//       email: data.get('email'),
//       password: data.get('password'),
//     });
//   };

//   return (
//     <ThemeProvider theme={defaultTheme}>
//       <div className='div-bar' position="static" >
//         <img src={logo} />
//       </div>
//       <Container component="main" maxWidth="xs">
//         <CssBaseline />
//         <Box
//           sx={{
//             marginTop: 8,
//             display: 'flex',
//             flexDirection: 'column',
//             alignItems: 'center',
//           }}
//         >
//           <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
//             <LockOutlinedIcon />
//           </Avatar>
//           <Typography component="h1" variant="h4">
//             Welcome back !
//           </Typography>
//           <Typography component="h1" variant="h6">
//             Welcome back! Please enter your details.
//           </Typography>
//           <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1, textAlign: 'center', }}>
//             <TextField
//               margin="normal"
//               required
//               fullWidth
//               id="username"
//               label="Username"
//               name="username"
//               autoComplete="username"
//               value={username}
//               autoFocus
//               onChange={(e) => setUsername(e.target.value)}
//             />
//             <TextField
//               margin="normal"
//               required
//               fullWidth
//               name="password"
//               label="Password"
//               type="password"
//               id="password"
//               autoComplete="current-password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//             />

//             <Button
//               type="submit"
//               fullWidth
//               variant="contained"
//               sx={{ mt: 4, mb: 2, width: '30%', color: 'white', backgroundColor: '#ad2069','&:hover': {
//                 backgroundColor: '#b4269a', // Set the hover background color
//               }, }}  // Center-align the login button
//               onClick={() => {console.log("login")}}
//             >
//               Login
//             </Button>
//             <Grid container>
//               <Grid item xs={6}> {/* Change the xs value */}
//                 <Link component={RouterLink} to="/forgot_password" variant="body2">
//                   Forgot password?
//                 </Link>
//               </Grid>
//               <Grid item xs={6}> {/* Change the xs value */}
//                 <Link component={RouterLink} to="/SignUp" variant="body2">
//                   {"Don't have an account? Sign Up"}
//                 </Link>
//               </Grid>
//             </Grid>
//           </Box>
//         </Box>
//       </Container>
//     </ThemeProvider>
//   );
// }



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

  const navigate = useNavigate();



  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    try {
      const user = await Auth.signIn(username, password);

      console.log(user.signInUserSession.idToken.payload);
      // Assuming you have the user object
      const my_user = user.signInUserSession.idToken.payload;

      // Check if the user is in the Admin group
      const isAdmin = my_user["cognito:groups"].includes("Admin");

      // Check if the user is in the General group
      const isGeneral = my_user["cognito:groups"].includes("General");

      // if (isAdmin && isGeneral) {
      //   // User is in both Admin and General groups
      //   console.log("User is in both Admin and General groups.");
      // } 
       if (isAdmin) {
        // User is in the Admin group
        console.log("User is in the Admin group.");
        navigate("/Profile");
      } else if (isGeneral) {
        // User is in the General group
        console.log("User is in the General group.");
        navigate('/HomePage');
      } else {
        // User is not in any specified group
        navigate('/HomePage');
        console.log("User is not in any specified group.");
      }
      // // Check if the user is confirmed
      // if (user.challengeName === 'CUSTOM_CHALLENGE') {
      //   console.log("user confiramtion");
      //   // User is not confirmed, send confirmation code
      //   await Auth.confirmSignUp(username);
      //   console.log('Confirmation code sent');
      //   // Redirect the user to a page to enter the confirmation code
      //   navigate('/confirm-signup'); // You can customize the route
      // } else {
      //   // User is signed in
      //   console.log('User signed in successfully');
      // }
      // console.log("username = ",username);
      // navigate(`/confirm-signup?username=${username}`); // You can customize the route


      
    } catch (error) {
      console.log('error signing in', error);
    }
  };
  return (
    <ThemeProvider theme={defaultTheme}>
      <div className='div-bar' position="static" >
        <img src={logo} />
      </div>
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
              sx={{
                mt: 4, mb: 2, width: '30%', color: 'white', backgroundColor: '#ad2069', '&:hover': {
                  backgroundColor: '#b4269a', // Set the hover background color
                },
              }}  // Center-align the login button
              onClick={() => { handleSubmit }}
            >
              Login
            </Button>
            <Grid container>
              <Grid item xs={6}> {/* Change the xs value */}
                <Link component={RouterLink} to="/forgot_password" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item xs={6}> {/* Change the xs value */}
                <Link component={RouterLink} to="/SignUp" variant="body2">
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


