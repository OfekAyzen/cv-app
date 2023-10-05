import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import "../../styles/Profilemanager.css";
import Link from '@mui/material/Link';
function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="">
        Tech 19
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const defaultTheme = createTheme();

const EditPostion = ({ jobId }) => {
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      candidate_id: jobId,
      first_name: data.get('firstName'),
      last_name: data.get('lastName'),
      gender: data.get('gender'),
      location: data.get('location'),
      phone_number: data.get('phoneNumber'),
      email: data.get('email'),
      position: data.get('position'),
      education: data.get('education'),
      work_experience: data.get('workExperience'),
      skills: data.get('skills'),
      certifications: data.get('certifications'),
    });
  };

  return (
    <>
      
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
        
            <Typography style={{fontFamily:'"Calibri", sans-serif'}} component="h1" variant="h4">
              Job Application
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                    {/* Left Side */}
                    <Grid item xs={12}>
                    <TextField
                        autoComplete="given-name"
                        name="firstName"
                        required
                        fullWidth
                        id="firstName"
                        label="First Name"
                        autoFocus
                    />
                    </Grid>
                    <Grid item xs={12} >
                    <TextField
                        required
                        fullWidth
                        id="lastName"
                        label="Last Name"
                        name="lastName"
                        autoComplete="family-name"
                    />
                    </Grid>
                    <Grid item xs={12}>
                    <TextField
                        required
                        fullWidth
                        id="gender"
                        label="Gender"
                        name="gender"
                        autoComplete="gender"
                    />
                    </Grid>
                    <Grid item xs={12}>
                    <TextField
                        required
                        fullWidth
                        id="location"
                        label="Location"
                        name="location"
                        autoComplete="location"
                    />
                    </Grid>
                    <Grid item xs={12}>
                    <TextField
                        required
                        fullWidth
                        id="phoneNumber"
                        label="Phone Number"
                        name="phoneNumber"
                        autoComplete="phone-number"
                    />
                    </Grid>
                    <Grid item xs={12}>
                    <TextField
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                    />
                    </Grid>
                    <Grid item xs={12}>
                    <TextField
                        required
                        fullWidth
                        id="position"
                        label="Position"
                        name="position"
                        autoComplete="position"
                    />
                    </Grid>
                </Grid>
                {/* Right Side */}
                <Grid item xs={12}>
                    <Grid item xs={12}>
                    <TextField
                        required
                        fullWidth
                        id="education"
                        label="Education"
                        name="education"
                        autoComplete="education"
                    />
                    </Grid>
                    <Grid item xs={12}>
                    <TextField
                        required
                        fullWidth
                        id="workExperience"
                        label="Work Experience"
                        name="workExperience"
                        autoComplete="work-experience"
                    />
                    </Grid>
                    <Grid item xs={12}>
                    <TextField
                        required
                        fullWidth
                        id="skills"
                        label="Skills"
                        name="skills"
                        autoComplete="skills"
                    />
                    </Grid>
                    <Grid item xs={12}>
                    <TextField
                        required
                        fullWidth
                        id="certifications"
                        label="Certifications"
                        name="certifications"
                        autoComplete="certifications"
                    />
                    </Grid>
                </Grid>
              </Grid>
              <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                Sign Up
              </Button>
              <Grid container justifyContent="flex-end">
                <Grid item>
                  <Link href="#" variant="body2">
                    Already have an account? Sign in
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
      
        </Container>
    
    </>
  );
};

export default EditPostion;
