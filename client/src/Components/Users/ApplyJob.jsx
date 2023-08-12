import * as React from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import { useState } from 'react';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import axios from 'axios';

import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';

import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';

import Header from '../Header';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import UploadCV from './UploadCV';

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

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));





export default function ApplyJob(props) {
    const [email, setEmail] = useState('');
    const [first_name, setFirstName] = useState('');
    const [last_name, setLastName] = useState('');
    const [flashMessage, setFlashMessage] = useState('');
    const [location, setLocation] = useState('');

    const [phone_number, setPhoneNumber] = useState('');
    const [gender, setGender] = useState('');
    const [education, setEducation] = useState('');
    const [work_experience, setWorkExperience] = useState('');
    const [candidate_id, setCandidateId] = useState('');
    const [skills, setSkills] = useState('');
    const [position, setPosition] = useState('');
    const [certifications, setCertifications] = useState('');
    const [data, setData] = useState('');


    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        

    
        const candidateData = {
            // job_id: props.job_id,
            // candidate_id: props.userId ,
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
        };
  
        setData(candidateData);

    };

    const handleClose = (event) => {
        props.setOpen(false);


    }

    const handleSaveApp = async (event) => {
        event.preventDefault();

        const applicationData = {
            first_name: first_name,
            last_name: last_name,
            location: location,
            email: email,
            phone_number: phone_number,
            gender: gender,
            education: education,
            work_experience: work_experience,
            skills: skills,
            position: position,
            certifications: certifications
        };

    
        try {
            const response = await axios.post('http://localhost:5000/add_candidate', applicationData, {
                headers: {
                    Authorization: 'Bearer ' + props.token, // Include the JWT in the headers
                    'Content-Type': 'application/json',
                },
            });

            if (response.status === 200) {
                props.onApplicationSubmit(applicationData);
                console.log(response.data);
                setFlashMessage('Job application added successfully!');
                // Handle success, if needed
            } else {
                console.log('Error saving application');
                setFlashMessage('Error saving application.');
                // Handle error, if needed
            }
        } catch (error) {
            if (error.response) {
                setFlashMessage(error.response.data.message); // Set the error message from the server
            } else {
                setFlashMessage('Error saving application.');
            }
        }
    };
    const handleUploadCV = (event) => {
        props.setOpen(false);
        

    }
    return (
        <div>

            <Header></Header>
            {console.log("props apply :", props)}
            <h1>Join our team! {props.candidate_id}</h1>
            {console.log("candidate id :", props.candidate_id)}
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

                    <Typography component="h1" variant="h4">
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
                                        value={first_name}
                                        onChange={(e) => setFirstName(e.target.value)}
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
                                        value={last_name}
                                        onChange={(e) => setLastName(e.target.value)}
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
                                        value={gender}
                                        onChange={(e) => setGender(e.target.value)}
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
                                        value={location}
                                        onChange={(e) => setLocation(e.target.value)}
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
                                        value={phone_number}
                                        onChange={(e) => setPhoneNumber(e.target.value)}
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
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
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
                                        value={position}
                                        onChange={(e) => setPosition(e.target.value)}
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
                                        value={education}
                                        onChange={(e) => setEducation(e.target.value)}
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
                                        value={work_experience}
                                        onChange={(e) => setWorkExperience(e.target.value)}
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
                                        value={skills}
                                        onChange={(e) => setSkills(e.target.value)}
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
                                        value={certifications}
                                        onChange={(e) => setCertifications(e.target.value)}
                                    />
                                </Grid>
                            </Grid>
                        </Grid>
                        <Button onClick={handleClose} type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                            Apply---
                        </Button>
                        <Button onClick={handleSaveApp} type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                            Save
                        </Button>
                    
                        <UploadCV  
                                             candidate_id={props.candidate_id}  token={props.token} 
                                             userRole={props.userRole} setToken={props.setToken}
                                               job_id={props.job_id}> </UploadCV>
                         {/* Display flash message */}
                        {flashMessage && (
                            <Typography variant="body1" color="error" align="center">
                                {flashMessage}
                            </Typography>
                        )}
                        <Grid container justifyContent="flex-end">
                            <Grid item>
                                <Link href="#" variant="body2">
                                    Already have an account? Sign in
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
                <Copyright sx={{ mt: 5 }} />
            </Container>



        </div>
    );
}