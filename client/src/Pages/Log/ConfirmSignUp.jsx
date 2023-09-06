// import React, { useState } from 'react';
// import { Auth } from 'aws-amplify';
// import { useNavigate } from 'react-router-dom';
// import Button from '@mui/material/Button';
// import TextField from '@mui/material/TextField';
// import Container from '@mui/material/Container';
// import CssBaseline from '@mui/material/CssBaseline';
// import Typography from '@mui/material/Typography';
// import { createTheme, ThemeProvider } from '@mui/material/styles';

// const defaultTheme = createTheme();

// export default function ConfirmSignUp(props) {
//     const [confirmationCode, setConfirmationCode] = useState('');
//     const navigate = useNavigate();

//     const handleConfirmation = async () => {
//         console.log("handle confirm" ,props.username)
//         try {
//             await Auth.confirmSignUp(username, confirmationCode);
//             console.log('User confirmed successfully');
//             // Redirect the user to the login page or another appropriate page
//             navigate('/Login'); // You can customize the route
//         } catch (error) {
//             console.log('Error confirming user', error);
//             // Handle confirmation error (e.g., display an error message)
//         }
//     };

//     return (
//         <ThemeProvider theme={defaultTheme}>
//             <h1> username {props.username}</h1>
//             <Container component="main" maxWidth="xs">
//                 <CssBaseline />
//                 <div>
//                     <Typography component="h1" variant="h4">
//                         Confirm Sign Up
//                     </Typography>
//                     <form onSubmit={handleConfirmation}>
//                         <TextField
//                             variant="outlined"
//                             margin="normal"
//                             required
//                             fullWidth
//                             id="confirmationCode"
//                             label="Confirmation Code"
//                             name="confirmationCode"
//                             autoComplete="confirmationCode"
//                             autoFocus
//                             value={confirmationCode}
//                             onChange={(e) => setConfirmationCode(e.target.value)}
//                         />
//                         <Button
//                             type="submit"
//                             fullWidth
//                             variant="contained"
//                             sx={{
//                                 mt: 3,
//                                 mb: 2,
//                                 backgroundColor: '#ad2069',
//                                 color: 'white',
//                                 '&:hover': {
//                                     backgroundColor: '#b4269a',
//                                 },
//                             }}
//                             onClick={()=>{handleConfirmation}}
//                         >
//                             Confirm
//                         </Button>
//                     </form>
//                 </div>
//             </Container>
//         </ThemeProvider>
//     );
// }

import React, { useState } from 'react';
import { Auth } from 'aws-amplify';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const defaultTheme = createTheme();

export default function ConfirmSignUp(props) {
  const [confirmationCode, setConfirmationCode] = useState('');
  const navigate = useNavigate();

  const handleConfirmation = async () => {
    const { username } = props; // Get the username from props
    console.log("props.username : ",username);
    try {
      await Auth.confirmSignUp(username, confirmationCode);
      console.log('User confirmed successfully');
      // Redirect the user to the login page or another appropriate page
      navigate('/Login'); // You can customize the route
    } catch (error) {
      console.log('Error confirming user', error);
      // Handle confirmation error (e.g., display an error message)
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <h1> username {props.username}</h1>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div>
          <Typography component="h1" variant="h4">
            Confirm Sign Up
          </Typography>
          <form onSubmit={handleConfirmation}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="confirmationCode"
              label="Confirmation Code"
              name="confirmationCode"
              autoComplete="confirmationCode"
              autoFocus
              value={confirmationCode}
              onChange={(e) => setConfirmationCode(e.target.value)}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                mt: 3,
                mb: 2,
                backgroundColor: '#ad2069',
                color: 'white',
                '&:hover': {
                  backgroundColor: '#b4269a',
                },
              }}
            >
              Confirm
            </Button>
          </form>
        </div>
      </Container>
    </ThemeProvider>
  );
}
