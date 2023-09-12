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
import "../../styles/LoginPage.css";
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
const ConfirmSignUp = () =>  {
  const [confirmationCode, setConfirmationCode] = useState('');
  const navigate = useNavigate();
  const { username } = useParams();
  const handleConfirmation = async () => {

    console.log(username);
    
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
    <div className='div-bar' position="static" >
    <img src={logo} />
  </div>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div>
          <Typography component="h1" variant="h4">
            Confirm Sign Up
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
                </div>
        </div>
      </Container>
    </ThemeProvider>
  );
}

export default ConfirmSignUp;
