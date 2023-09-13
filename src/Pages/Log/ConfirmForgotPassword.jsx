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
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { Link as RouterLink, useNavigate, useParams } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Auth } from 'aws-amplify'; // Import AWS Amplify
import logo from '../../../src/Components/images/logo_tech19.png';
import '../../styles/LoginPage.css';

const defaultTheme = createTheme();

const ConfirmForgotPassword = () => {
    const [confirmationCode, setConfirmationCode] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();
    const { username } = useParams();

    const handleConfirmation = async () => {
        // try {
        //   // Confirm the user using AWS Amplify with the confirmation code
        //   await Auth.confirmSignUp(username, confirmationCode);

        //   // Display a success message
        //   setMessage('Confirmation successful! You can now set a new password.');

        // } catch (error) {
        //   setMessage('Error confirming user. Please try again.');
        //   return;
        // }

        try {
            // Reset the user's password using AWS Amplify
            await Auth.forgotPasswordSubmit(username, confirmationCode, newPassword);

            // Display a success message
            setMessage('Password reset successful! You can now log in with your new password.');

            // Redirect the user to the login page or another appropriate page
            navigate('/Login');
        } catch (error) {
            if (error.code === 'CodeMismatchException') {
                setMessage('Invalid verification code provided, please try again.');
            } else {
                setMessage('Error resetting password. Please try again.');
            }
        }
    };

    return (
        <ThemeProvider theme={defaultTheme}>
            <div className='div-bar' position="static" >
                <img src={logo} alt='Logo' />
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
                            className="custom-text-field"
                            onChange={(e) => setConfirmationCode(e.target.value)}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="newPassword"
                            label="New Password"
                            type="password"
                            id="newPassword"
                            autoComplete="new-password"
                            value={newPassword}
                            className="custom-text-field"
                            onChange={(e) => setNewPassword(e.target.value)}
                        />
                        <Button
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
                            onClick={handleConfirmation}
                        >
                            Reset Password
                        </Button>
                        <Typography variant="body1" color="textSecondary" sx={{ mt: 2 }}>
                            {message}
                        </Typography>
                        <Grid item xs={6}>
                            <Link component={RouterLink} to="/forgot_password" variant="body2">
                                Forgot password?
                            </Link>
                        </Grid>
                        
                    </div>
                </div>
            </Container>
        </ThemeProvider>
    );
}

export default ConfirmForgotPassword;
