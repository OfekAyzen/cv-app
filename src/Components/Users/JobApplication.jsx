

import * as React from 'react';

import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';

import { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import logo from "../images/logo_tech19.png";
import Typography from '@mui/material/Typography';
import Snackbar from '@mui/material/Snackbar';
import SnackbarContent from '@mui/material/SnackbarContent';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import { useParams } from 'react-router-dom';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { useNavigate } from 'react-router-dom';
import Header from '../Header';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import UploadCV from './UploadCV';
import MuiAlert from '@mui/material/Alert';
import { API, graphqlOperation } from 'aws-amplify';
import { createCandidate } from '../../graphql/mutations';
import { createCandidateJobs } from '../../graphql/mutations';
import { Auth } from 'aws-amplify';
import {
    InputLabel,
    Select,

    MenuItem
} from '@mui/material';
import { Storage } from 'aws-amplify';
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





export default function JobApplication(props) {
    const [email, setEmail] = useState('');
    const [first_name, setFirstName] = useState('');
    const [last_name, setLastName] = useState('');
    const [flashMessage, setFlashMessage] = useState('');
    const [location, setLocation] = useState('');
    const [phone_number, setPhoneNumber] = useState('');
    const [gender, setGender] = useState('');
    const [education, setEducation] = useState('');
    const [work_experience, setWorkExperience] = useState('');
    const [candidateId, setCandidateId] = useState('');
    const [skills, setSkills] = useState('');
    const [position, setPosition] = useState('');
    const [certifications, setCertifications] = useState('');
    const [data, setData] = useState('');
    const [successSnackbarOpen, setSuccessSnackbarOpen] = useState(false);
    const [errorSnackbarOpen, setErrorSnackbarOpen] = useState(false);
    const { job_id } = useParams();
    const [formSubmitted, setFormSubmitted] = useState(false);
    const [cvFile, setCvFile] = useState('');
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const applyJobJobId = job_id || props.job_id;

    const [flashSeverity, setFlashSeverity] = useState('success'); // Severity of the flash message (success, error, warning, info)

    const handleSnackbar = (message, severity) => {
        setFlashMessage(message);
        setFlashSeverity(severity);
    };
    const educationOptions = [
        "All",
        "High School",
        "Bachelor's Degree",
        "Master's Degree"
    ];

    const workExperienceOptions = [
        "All",
        "Less than 1 year",
        "1-3 years",
        "3-5 years"
    ];

    const genderOptions = ["All", "Female", "Male", "Other"];
    const [cvFileKey, setCvFileKey] = useState(null);


    const createCandidateAndApply = async () => {


        try {


            // Get the cvFileKey from localStorage
            const cvFileKeyFromStorage = localStorage.getItem('cvFileKey');

            // Define the candidate data
            const candidateData = {
                input: {
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
                    certifications: certifications,
                    cv: cvFileKeyFromStorage, // Use the saved CV file key
                },
            };

            // Update the createCandidate mutation to include cvFileKey
            const response = await API.graphql(
                graphqlOperation(createCandidate, candidateData)
            );

            if (response.data.createCandidate) {
                // Candidate was successfully created
                const candidateId = response.data.createCandidate.id;
                handleapplyjob(candidateId); // Call the function to create CandidateJobs

                navigate('/HomePage');
                //  props.onClose();

            } else {
                // Handle candidate creation failure
                handleSnackbar('Failed to submit application.', 'error');

            }

            // Remove cvFileKey from localStorage after use
            localStorage.removeItem('cvFileKey');
        } catch (error) {
            // Handle errors
            console.error('Error creating candidate:', error);

        }
    };

    useEffect(() => {
        // Define a function to upload the CV
        const uploadCV = async () => {
            try {
                if (!cvFile) return;

                const cvFileName = cvFile.name;
                // const newCvFileKey = `CVs/${Date.now()}_${cvFileName}`;
                const newCvFileKey = `${Date.now()}_${cvFileName}`;
                await Storage.put(newCvFileKey, cvFile, {
                    contentType: cvFile.type,
                });
                //  console.log('CV uploaded successfully. Key:', newCvFileKey);
                setFlashMessage('CV uploaded successfully!');
                // Update cvFileKey and save it
                setCvFileKey(newCvFileKey);
                localStorage.setItem('cvFileKey', newCvFileKey);  // Save in localStorage
            } catch (error) {
                console.error('Error uploading CV:', error);
                setErrorSnackbarOpen(true);
            }
        };


        // Call uploadCV if cvFile is not null
        if (cvFile) {
            uploadCV();
        }
    }, [cvFile, setCvFileKey]);

    // Effect to log cvFileKey when it changes

    useEffect(() => {
        // console.log('CV . Key:', cvFileKey);
    }, [cvFileKey]);

    const handleUploadCV = (event) => {
        const selectedCvFile = event.target.files[0];
        if (selectedCvFile) {
            // console.log('Selected CV File:', selectedCvFile);
            setCvFile(selectedCvFile);
        }
    };



    const handleSubmit = async (event) => {
        // console.log("handleSubmit");
        event.preventDefault();
        setFormSubmitted(true); // Mark the form as submitted

        // Validate all fields before proceeding
        if (
            !first_name ||
            !last_name ||
            !location ||
            !email ||
            !phone_number ||
            !gender ||
            !education ||
            !work_experience ||
            !skills ||
            !position ||
            !certifications
        ) {
            setFlashMessage('Please fill out all fields.');
            return; // Stop submission if any field is missing
        }

        // Check if any field is empty
        const fieldsToCheck = [
            first_name,
            last_name,
            location,
            email,
            phone_number,
            gender,
            education,
            work_experience,
            skills,
            position, // Include 'position' in the fields to check
            certifications,
        ];

        if (fieldsToCheck.some(field => field === '')) {
            setFlashMessage('Please fill out all fields.');
            return;
        }
        const data = new FormData(event.currentTarget);

        const candidateData = {
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

    const handleapplyjob = async (candidateId) => {

        try {
            // Get the Cognito User ID of the authenticated user
            const user = await Auth.currentAuthenticatedUser();
            const cognitoSub = user.attributes.sub;

            const candidateJobsData = {
                input: {
                    candidateId: candidateId,
                    jobsId: props.job_id || job_id,
                    // cognitoSub: cognitoSub, // Set cognitoSub using the Cognito User ID

                },
            };

            const response = await API.graphql(graphqlOperation(createCandidateJobs, candidateJobsData));
            // console.log("GraphQL Response:", response);

            if (response.data.createCandidateJobs) {
                // Application was successfully created
                // handleSnackbar('Application submitted successfully!', 'success');
                if (props && props.onApplicationSuccess && typeof props.onApplicationSuccess === 'function') {
                    props.onApplicationSuccess('Application submitted successfully!', 'success');
                  } else {
                    console.error('invalid function .');
                    // Handle the case where onApplicationSuccess is not a valid function
                  }
                setFlashMessage('Application submitted successfully!','success');
                localStorage.removeItem('selectedJobId');
                navigate('/HomePage');
                if (props && props.onClose && typeof props.onClose === 'function') {
                    props.onClose();
                  } else {
                    console.error('Invalid function for onClose.');
                    // Handle the case where onClose is not a valid function
                  }

            } else {
                // handleSnackbar('Failed to submit application.', 'error');
                setFlashMessage('Failed to submit application.','error');
            }
            setFlashMessage('Application submitted successfully!','success');
        } catch (error) {
            // Handle GraphQL or other errors
            // handleSnackbar('Error applying for the job.', 'error');
            setFlashMessage('Error applying for the job.','error');
            console.error('Error applying for the job:', error);
        }
    };



    return (
        <div style={{ backgroundColor: 'rgba(255, 255, 255, 0.9)' }}>

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

                        backgroundColor: 'rgba(255, 255, 255, 0.9)',

                    }}
                >
                    <h1 style={{ textAlign: 'center' }}>Join our team!</h1>
                    <Typography component="h1" variant="h4">
                        Job Application
                    </Typography>
                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                        <div
                            style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'stretch',
                                gap: '120px', // Increased gap
                                padding: '0 30px', // Added padding
                            }}
                        >
                            <div style={{ flex: 1 }} >

                                <Grid item xs={12} sx={{ width: '300px' }}>
                                    {/* Left Side */}
                                    <Grid item xs={12}>
                                        <TextField
                                            autoComplete="given-name"
                                            name="firstName"
                                            required
                                            fullWidth
                                            id="firstName"
                                            label="First Name"
                                            className="custom-text-field"
                                            autoFocus
                                            value={first_name}
                                            onChange={(e) => setFirstName(e.target.value)

                                            }
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
                                            className="custom-text-field"
                                            onChange={(e) => setLastName(e.target.value)}
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
                                            className="custom-text-field"
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
                                            className="custom-text-field"
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
                                            className="custom-text-field"
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
                                            className="custom-text-field"
                                            value={position}
                                            onChange={(e) => setPosition(e.target.value)}
                                        />
                                    </Grid>

                                </Grid>

                            </div>
                            <Divider orientation="vertical" flexItem sx={{ backgroundColor: '#ad2069' }} />
                            <div style={{ flex: 1, paddingLeft: '1px' }}>
                                {/* Right Side */}
                                <Grid item xs={12} sx={{ width: '300px' }}>


                                    <Grid item xs={12}>
                                        <TextField
                                            required
                                            fullWidth
                                            id="skills"
                                            label="Skills"
                                            name="skills"
                                            autoComplete="skills"
                                            className="custom-text-field"
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
                                            className="custom-text-field"
                                            value={certifications}
                                            onChange={(e) => setCertifications(e.target.value)}
                                        />
                                    </Grid>
                                    <Grid item xs={12} className="custom-text-field">
                                        <InputLabel>Education</InputLabel>
                                        <Select
                                            fullWidth
                                            id="education"
                                            label="Education"
                                            name="education"

                                            value={education}
                                            onChange={(e) => setEducation(e.target.value)}
                                        >
                                            {educationOptions.map((option) => (
                                                <MenuItem key={option} value={option}>
                                                    {option}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </Grid>
                                    <Grid item xs={12} className="custom-text-field">
                                        <InputLabel>Work Experience</InputLabel>
                                        <Select
                                            fullWidth
                                            id="workExperience"
                                            label="Work Experience"
                                            name="workExperience"
                                            value={work_experience}
                                            onChange={(e) => setWorkExperience(e.target.value)}
                                        >
                                            {workExperienceOptions.map((option) => (
                                                <MenuItem key={option} value={option}>
                                                    {option}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </Grid>
                                    <Grid item xs={12} className="custom-text-field">
                                        <InputLabel>Gender</InputLabel>
                                        <Select
                                            fullWidth
                                            id="gender"
                                            label="Gender"
                                            name="gender"
                                            value={gender}
                                            onChange={(e) => setGender(e.target.value)}
                                        >
                                            {genderOptions.map((option) => (
                                                <MenuItem key={option} value={option}>
                                                    {option}
                                                </MenuItem>
                                            ))}
                                        </Select>

                                    </Grid>
                                    <Grid item xs={12} sx={{ display: 'flex', alignItems: 'center' }}>
                                        <div style={{ flex: 1 }}>
                                            <label htmlFor="cvUpload" style={{ cursor: 'pointer' }}>
                                                Upload CV
                                                <input
                                                    type="file"
                                                    id="cvUpload"
                                                    accept=".pdf,.doc,.docx"
                                                    style={{ display: 'none' }}
                                                    onChange={handleUploadCV}
                                                />
                                            </label>
                                        </div>
                                    </Grid>
                                </Grid>

                            </div>
                        </div>


                        <div style={{ textAlign: 'center', marginTop: '20px' }}>

                            <Button onClick={createCandidateAndApply} type="submit" fullWidth variant="contained" sx={{
                                backgroundColor: "#ad2069",
                                mt: 4, mb: 3, width: '20%',

                                '&:hover': {
                                    backgroundColor: '#b4269a',
                                },
                            }}>
                                Apply and Save
                            </Button>

                        </div>


                    </Box>
                </Box>
                <Copyright sx={{ mt: 5 }} />
                {/* Flash message Snackbar */}
                <Snackbar
                    open={flashMessage !== ''}
                    autoHideDuration={5000} // Adjust the duration as needed
                    onClose={() => setFlashMessage('')}
                >
                    <MuiAlert
                        elevation={6}
                        variant="filled"
                        onClose={() => setFlashMessage('')}
                        severity={flashSeverity}
                    >
                        {flashMessage}
                    </MuiAlert>
                </Snackbar>
            </Container>



        </div>
    );
}