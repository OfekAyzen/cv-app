import React, { useState } from 'react';
import { Auth } from 'aws-amplify';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useParams } from 'react-router-dom';
import logo from '../../../src/Components/images/logo_tech19.png';
import Grid from '@mui/material/Grid';
import Snackbar from '@mui/material/Snackbar';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import MuiAlert from '@mui/material/Alert';
import { CognitoIdentityServiceProvider } from 'aws-sdk';
import { Link as RouterLink } from 'react-router-dom'; // Import RouterLink
import { Link ,Avatar} from '@mui/material';
import "../../styles/LoginPage.css";
import "../../styles/ProfileManager.css";
const defaultTheme = createTheme();
// const styles = {
//     container: {
//       display: 'flex',
//       flexDirection: 'column',
//       alignItems: 'center',
//       justifyContent: 'center',
//       minHeight: '100vh',
//     },
//     divBar: {
//       position: 'static',
//     },
//     img: {
//       maxWidth: '100%',
//       height: 'auto',
//     },
//     formContainer: {
//       width: '100%',
//       display: 'flex',
//       flexDirection: 'column',
//       alignItems: 'center',
//     },
//     form: {
//       width: '100%',
//       marginTop: 1,
//     },
//     submitButton: {
//       margin: '2rem 0',
//       width: '50%',
//       backgroundColor: '#ad2069',
//       color: 'white',
//       '&:hover': {
//         backgroundColor: '#b4269a',
//       },
//     },
//     linkGrid: {
//       marginTop: '1rem',
//     },
//   };


const ConfirmSignUp = () => {




  const [confirmationCode, setConfirmationCode] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const navigate = useNavigate();
  const { username } = useParams();

  const handleConfirmation = async () => {
    try {
      await Auth.confirmSignUp(username, confirmationCode);
      console.log('User confirmed successfully');

      // Open the Snackbar to show a success message
      setOpenSnackbar(true);

      // Redirect the user to the login page or another appropriate page
      navigate('/Login');
    } catch (error) {
      console.log('Error confirming user', error);
      // Handle confirmation error (e.g., display an error message)
    }
  };
 

  // const handleConfirmation = async () => {
  //   try {
  //     await Auth.confirmSignUp(username, confirmationCode);
  //     console.log('User confirmed successfully');
  
  //     // Call the function to add the user to a group
  //     await addUsertoGroup(username, 'General'); // Replace 'General' with your group name
  
  //     // Open the Snackbar to show a success message
  //     setOpenSnackbar(true);
  
  //     // Redirect the user to the login page or another appropriate page
  //     navigate('/Login');
  //   } catch (error) {
  //     console.log('Error confirming user', error);
  //     // Handle confirmation error (e.g., display an error message)
  //   }
  // };
  
 
  // const addUsertoGroup = async (username, groupname) => {
  //   const cognitoidentityserviceprovider = new CognitoIdentityServiceProvider();
  
  //   const params = {
  //     GroupName: groupname,
  //      // Replace with your actual User Pool ID
  //     Username: username
  //   };
  
  //   try {
  //     await cognitoidentityserviceprovider.adminAddUserToGroup(params).promise();
  //     console.log('User added to group successfully');
  //   } catch (error) {
  //     console.error('Error adding user to group', error);
  //   }
  // };
  

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };


  return (
    <ThemeProvider theme={defaultTheme}>
      <div className='div-bar' position="static" >
        <img src={logo} />
      </div>
      <Container component="main" maxWidth="xs" sx={{ display: 'flex', alignContent: 'center', textAlign: 'center', marginTop: '50px' }}>
        <CssBaseline />

        
        <div>
        <div style={{ display: 'flex', textAlign: 'center', justifyContent: 'center' }}>
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
        </div>
          <Typography component="h1" variant="h4">
            Verification code
          </Typography>
          <div>

            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="confirmationCode"
              label="Confirmation Code"
              name="confirmationCode"
              autoComplete="confirmationCode"
              className="custom-text-field"
              autoFocus
              value={confirmationCode}
              onChange={(e) => setConfirmationCode(e.target.value)}
            />
            <Button
              //   type="submit"
              onClick={handleConfirmation}
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
            {/* Snackbar for success message */}
            <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar} anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}>
              <MuiAlert elevation={6} variant="filled" severity="success" onClose={handleCloseSnackbar}>
                Confirmation successful!
              </MuiAlert>
            </Snackbar>
          </div>
          <Grid item xs={6}> {/* Change the xs value */}
            <Link component={RouterLink} to="/forgot_password" variant="body2">
              Forgot password?
            </Link>
          </Grid>
        </div>

      </Container>
    </ThemeProvider>
  );
}

export default ConfirmSignUp;
