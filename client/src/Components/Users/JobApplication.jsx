

// import * as React from 'react';

// import { styled } from '@mui/material/styles';
// import Dialog from '@mui/material/Dialog';

// import { useState, useEffect } from 'react';

// import logo from "../images/logo_tech19.png";
// import Typography from '@mui/material/Typography';
// import axios from 'axios';
// import UserCard from './UserCard';
// import CssBaseline from '@mui/material/CssBaseline';
// import TextField from '@mui/material/TextField';
// import { useParams } from 'react-router-dom';
// import Link from '@mui/material/Link';
// import Grid from '@mui/material/Grid';
// import Box from '@mui/material/Box';
// import { useNavigate } from 'react-router-dom';
// import Header from '../Header';
// import Container from '@mui/material/Container';
// import Divider from '@mui/material/Divider';
// import { createTheme, ThemeProvider } from '@mui/material/styles';
// import UploadCV from './UploadCV';
// import ApplyJob from './ApplyJob';
// import {
//     InputLabel,
//     Select,
//     Snackbar,
//     MenuItem
// } from '@mui/material';
// function Copyright(props) {
//     return (
//         <Typography variant="body2" color="text.secondary" align="center" {...props}>
//             {'Copyright © '}
//             <Link color="inherit" href="">
//                 Tech 19
//             </Link>{' '}
//             {new Date().getFullYear()}
//             {'.'}
//         </Typography>
//     );
// }

// const defaultTheme = createTheme();

// const BootstrapDialog = styled(Dialog)(({ theme }) => ({
//     '& .MuiDialogContent-root': {
//         padding: theme.spacing(2),
//     },
//     '& .MuiDialogActions-root': {
//         padding: theme.spacing(1),
//     },
// }));





// export default function JobApplication(props) {
//     const [email, setEmail] = useState('');
//     const [first_name, setFirstName] = useState('');
//     const [last_name, setLastName] = useState('');
//     const [flashMessage, setFlashMessage] = useState('');
//     const [location, setLocation] = useState('');
//     const [phone_number, setPhoneNumber] = useState('');
//     const [gender, setGender] = useState('');
//     const [education, setEducation] = useState('');
//     const [work_experience, setWorkExperience] = useState('');
//     const [candidate_id, setCandidateId] = useState('');
//     const [skills, setSkills] = useState('');
//     const [position, setPosition] = useState('');
//     const [certifications, setCertifications] = useState('');
//     const [data, setData] = useState('');
//     const [successSnackbarOpen, setSuccessSnackbarOpen] = useState(false);
//     const [errorSnackbarOpen, setErrorSnackbarOpen] = useState(false);
//     const { job_id } = useParams();
//     const [formSubmitted, setFormSubmitted] = useState(false);

//     const navigate = useNavigate();
//     const [open, setOpen] = useState(false);
//     const applyJobJobId = job_id || props.job_id;
//     const educationOptions = [
//         "All",
//         "High School",
//         "Bachelor's Degree",
//         "Master's Degree"
//     ];

//     const workExperienceOptions = [
//         "All",
//         "Less than 1 year",
//         "1-3 years",
//         "3-5 years"
//     ];

//     const genderOptions = ["All", "Female", "Male", "Other"];


//     const handleSubmit = async (event) => {
//         event.preventDefault();
//         setFormSubmitted(true); // Mark the form as submitted

//         // Validate all fields before proceeding
//         if (
//             !first_name ||
//             !last_name ||
//             !location ||
//             !email ||
//             !phone_number ||
//             !gender ||
//             !education ||
//             !work_experience ||
//             !skills ||
//             !position ||
//             !certifications
//         ) {
//             setFlashMessage('Please fill out all fields.');
//             return; // Stop submission if any field is missing
//         }

//         // Check if any field is empty
//         const fieldsToCheck = [
//             first_name,
//             last_name,
//             location,
//             email,
//             phone_number,
//             gender,
//             education,
//             work_experience,
//             skills,
//             position, // Include 'position' in the fields to check
//             certifications,
//         ];

//         if (fieldsToCheck.some(field => field === '')) {
//             setFlashMessage('Please fill out all fields.');
//             return;
//         }
//         const data = new FormData(event.currentTarget);

//         const candidateData = {
//             first_name: data.get('firstName'),
//             last_name: data.get('lastName'),
//             gender: data.get('gender'),
//             location: data.get('location'),
//             phone_number: data.get('phoneNumber'),
//             email: data.get('email'),
//             position: data.get('position'),
//             education: data.get('education'),
//             work_experience: data.get('workExperience'),
//             skills: data.get('skills'),
//             certifications: data.get('certifications'),
//         };

//         setData(candidateData);
//     };

//     const handleClose = (event) => {
//         props.setOpen(false);


//     }
//     useEffect(() => {
//         // Load the stored application data when the component mounts
//         const storedApplication = localStorage.getItem('savedApplication');
//         if (storedApplication) {
//             const savedData = JSON.parse(storedApplication);
//             setFirstName(savedData.first_name);
//             setLastName(savedData.last_name);
//             setLocation(savedData.location);
//             setEmail(savedData.email);
//             setPhoneNumber(savedData.phone_number);
//             setGender(savedData.gender);
//             setEducation(savedData.education);
//             setWorkExperience(savedData.work_experience);
//             setSkills(savedData.skills);
//             setPosition(savedData.position);
//             setCertifications(savedData.certifications);
//         }
//     }, []);

//     const handleSaveApp = async (event) => {
//         event.preventDefault();

//         const applicationData = {
//             first_name: first_name,
//             last_name: last_name,
//             location: location,
//             email: email,
//             phone_number: phone_number,
//             gender: gender,
//             education: education,
//             work_experience: work_experience,
//             skills: skills,
//             position: position,
//             certifications: certifications
//         };
//         localStorage.setItem('savedApplication', JSON.stringify(applicationData));

//         try {
//             const response = await axios.post('http://localhost:5000/add_candidate', applicationData, {
//                 headers: {
//                     Authorization: 'Bearer ' + props.token, // Include the JWT in the headers
//                     'Content-Type': 'application/json',
//                 },
//             });

//             if (response.status === 200) {
//                 props.onApplicationSubmit(applicationData);
//                 setSuccessSnackbarOpen(true);

//                 setFlashMessage(response.data.message);
//                 navigate('/HomePage');
//                 props.setOpen(false);


//             } else {
//                 console.log('Error saving application');
//                 setFlashMessage(response.data.message);
//                 setErrorSnackbarOpen(true);
//                 // Handle error, if needed
//             }
//         } catch (error) {
//             if (error.response) {
//                 setFlashMessage(error.response.data.message); // Set the error message from the server
//                 setErrorSnackbarOpen(true); // Open the error snackbar
//             } else {
//                 setFlashMessage('Error saving application.');
//                 setErrorSnackbarOpen(true);
//             }
//             // Handle specific error cases for missing fields, invalid email, and invalid phone number
//             if (error.response && error.response.status === 400) {
//                 const errorMessage = error.response.data.message;
//                 if (errorMessage.includes('Missing')) {
//                     // Handle missing field error
//                     console.log('Missing field:', errorMessage);
//                 } else if (errorMessage === 'Invalid email address.') {
//                     // Handle invalid email error
//                     console.log('Invalid email address');
//                 } else if (errorMessage === 'Invalid phone number.') {
//                     // Handle invalid phone number error
//                     console.log('Invalid phone number');
//                 }
//             }
//         }
//     };
//     const handleUploadCV = (event) => {
//         console.log("File selected:", event.target.files[0]);
//         props.setOpen(false);


//     }
//     const handleApplyJob = () => {
//         // Call the handleSaveApp function when the Apply button is clicked in the applyjob component 

//         handleSaveApp();
//     };


//     return (
//         <div style={{ backgroundColor: 'rgba(255, 255, 255, 0.9)' }}>

//             <Typography variant="h6" component="div" sx={{ flexGrow: 1, backgroundColor: 'black' }}>
//                 <img src={logo} alt="Tech19 Logo" style={{ maxWidth: '300px' }} />
//             </Typography>




//             <Container component="main" maxWidth="xs">
//                 <CssBaseline />
//                 <Box
//                     sx={{
//                         marginTop: 8,
//                         display: 'flex',
//                         flexDirection: 'column',
//                         alignItems: 'center',

//                         backgroundColor: 'rgba(255, 255, 255, 0.9)',

//                     }}
//                 >
//                     <h1 style={{ textAlign: 'center' }}>Join our team!</h1>
//                     <Typography component="h1" variant="h4">
//                         Job Application
//                     </Typography>
//                     <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
//                         <div
//                             style={{
//                                 display: 'flex',
//                                 justifyContent: 'space-between',
//                                 alignItems: 'stretch',
//                                 gap: '120px', // Increased gap
//                                 padding: '0 30px', // Added padding
//                             }}
//                         >
//                             <div style={{ flex: 1 }} >

//                                 <Grid item xs={12}  sx={{width:'300px'}}>
//                                     {/* Left Side */}
//                                     <Grid item xs={12}>
//                                         <TextField
//                                             autoComplete="given-name"
//                                             name="firstName"
//                                             required
//                                             fullWidth
//                                             id="firstName"
//                                             label="First Name"
//                                             autoFocus
//                                             value={first_name}
//                                             onChange={(e) => setFirstName(e.target.value)

//                                             }
//                                         />
//                                     </Grid>
//                                     <Grid item xs={12} >
//                                         <TextField
//                                             required
//                                             fullWidth
//                                             id="lastName"
//                                             label="Last Name"
//                                             name="lastName"
//                                             autoComplete="family-name"
//                                             value={last_name}
//                                             onChange={(e) => setLastName(e.target.value)}
//                                         />
//                                     </Grid>

//                                     <Grid item xs={12}>
//                                         <TextField
//                                             required
//                                             fullWidth
//                                             id="location"
//                                             label="Location"
//                                             name="location"
//                                             autoComplete="location"
//                                             value={location}
//                                             onChange={(e) => setLocation(e.target.value)}
//                                         />
//                                     </Grid>
//                                     <Grid item xs={12}>
//                                         <TextField
//                                             required
//                                             fullWidth
//                                             id="phoneNumber"
//                                             label="Phone Number"
//                                             name="phoneNumber"
//                                             autoComplete="phone-number"
//                                             value={phone_number}
//                                             onChange={(e) => setPhoneNumber(e.target.value)}
//                                         />
//                                     </Grid>
//                                     <Grid item xs={12}>
//                                         <TextField
//                                             required
//                                             fullWidth
//                                             id="email"
//                                             label="Email Address"
//                                             name="email"
//                                             autoComplete="email"
//                                             value={email}
//                                             onChange={(e) => setEmail(e.target.value)}
//                                         />
//                                     </Grid>
//                                     <Grid item xs={12}>
//                                         <TextField
//                                             required
//                                             fullWidth
//                                             id="position"
//                                             label="Position"
//                                             name="position"
//                                             autoComplete="position"
//                                             value={position}
//                                             onChange={(e) => setPosition(e.target.value)}
//                                         />
//                                     </Grid>

//                                 </Grid>

//                             </div>
//                             <Divider orientation="vertical" flexItem sx={{ backgroundColor: '#ad2069' }} />
//                             <div style={{ flex: 1, paddingLeft: '1px' }}>
//                                 {/* Right Side */}
//                                 <Grid item xs={12}  sx={{width:'300px'}}>


//                                     <Grid item xs={12}>
//                                         <TextField
//                                             required
//                                             fullWidth
//                                             id="skills"
//                                             label="Skills"
//                                             name="skills"
//                                             autoComplete="skills"
//                                             value={skills}
//                                             onChange={(e) => setSkills(e.target.value)}

//                                         />
//                                     </Grid>
//                                     <Grid item xs={12}>
//                                         <TextField
//                                             required
//                                             fullWidth
//                                             id="certifications"
//                                             label="Certifications"
//                                             name="certifications"
//                                             autoComplete="certifications"
//                                             value={certifications}
//                                             onChange={(e) => setCertifications(e.target.value)}
//                                         />
//                                     </Grid>
//                                     <Grid item xs={12}>
//                                         <InputLabel>Education</InputLabel>
//                                         <Select
//                                             fullWidth
//                                             id="education"
//                                             label="Education"
//                                             name="education"
//                                             value={education}
//                                             onChange={(e) => setEducation(e.target.value)}
//                                         >
//                                             {educationOptions.map((option) => (
//                                                 <MenuItem key={option} value={option}>
//                                                     {option}
//                                                 </MenuItem>
//                                             ))}
//                                         </Select>
//                                     </Grid>
//                                     <Grid item xs={12}>
//                                         <InputLabel>Work Experience</InputLabel>
//                                         <Select
//                                             fullWidth
//                                             id="workExperience"
//                                             label="Work Experience"
//                                             name="workExperience"
//                                             value={work_experience}
//                                             onChange={(e) => setWorkExperience(e.target.value)}
//                                         >
//                                             {workExperienceOptions.map((option) => (
//                                                 <MenuItem key={option} value={option}>
//                                                     {option}
//                                                 </MenuItem>
//                                             ))}
//                                         </Select>
//                                     </Grid>
//                                     <Grid item xs={12}>
//                                         <InputLabel>Gender</InputLabel>
//                                         <Select
//                                             fullWidth
//                                             id="gender"
//                                             label="Gender"
//                                             name="gender"
//                                             value={gender}
//                                             onChange={(e) => setGender(e.target.value)}
//                                         >
//                                             {genderOptions.map((option) => (
//                                                 <MenuItem key={option} value={option}>
//                                                     {option}
//                                                 </MenuItem>
//                                             ))}
//                                         </Select>

//                                     </Grid>
//                                     <Grid item xs={12} sx={{ display: 'flex', alignItems: 'center' }}>
//                                         <div style={{ flex: 1 }}>

//                                         <UploadCV
//                                         candidate_id={props.candidate_id} token={props.token}
//                                         userRole={props.userRole} setToken={props.setToken}
//                                         job_id={job_id}> </UploadCV>
//                                         </div>


//                                         </Grid>
//                                 </Grid>

//                             </div>
//                         </div>


//                         <div style={{ textAlign: 'center', marginTop: '20px' }}>
//                             {/* Center the ApplyJob component */}
//                             <ApplyJob
//                             setTitle={props.setTitle}
//                             setStatus={props.setStatus}
//                             candidate_id={props.candidate_id}
//                             token={props.token}
//                             userRole={props.userRole}
//                             setToken={props.setToken}
//                             job_id={applyJobJobId}
//                             handleApplyJob={handleSaveApp}
//                             setOpen={setOpen}
//                             candidateData={data}
//                             onApplicationSubmit={props.onApplicationSubmit}
//                             ></ApplyJob>
//                         </div>
//                         {/* Success Snackbar */}
//                         <Snackbar
//                             open={successSnackbarOpen}
//                             autoHideDuration={5000}
//                             onClose={() => setSuccessSnackbarOpen(false)}
//                             message="Application submitted successfully!"
//                             // Snackbar with a green color
//                             style={{ backgroundColor: '#4caf50' }}
//                         ></Snackbar>

//                         {/* Error Snackbar */}

//                         <Snackbar
//                             open={errorSnackbarOpen}
//                             autoHideDuration={5000}
//                             onClose={() => setErrorSnackbarOpen(false)}
//                             message={flashMessage}
//                             // Snackbar with a red color
//                             style={{ backgroundColor: '#f44336' }}
//                         ></Snackbar>

//                     </Box>
//                 </Box>
//                 <Copyright sx={{ mt: 5 }} />
//             </Container>



//         </div>
//     );
// }


import * as React from 'react';

import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';

import { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import logo from "../images/logo_tech19.png";
import Typography from '@mui/material/Typography';

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
import ApplyJob from './ApplyJob';
import { API, graphqlOperation } from 'aws-amplify';
import { createCandidate } from '../../graphql/mutations';
import { createCandidateJobs } from '../../graphql/mutations';
import { Auth } from 'aws-amplify';
import {
    InputLabel,
    Select,
    Snackbar,
    MenuItem
} from '@mui/material';
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
    const [candidate_id, setCandidateId] = useState('');
    const [skills, setSkills] = useState('');
    const [position, setPosition] = useState('');
    const [certifications, setCertifications] = useState('');
    const [data, setData] = useState('');
    const [successSnackbarOpen, setSuccessSnackbarOpen] = useState(false);
    const [errorSnackbarOpen, setErrorSnackbarOpen] = useState(false);
    const { job_id } = useParams();
    const [formSubmitted, setFormSubmitted] = useState(false);

    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const applyJobJobId = job_id || props.job_id;

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

    // const createCandidateAndApply = async () => {
    //     console.log("createCandidateAndApply");
    //     try {
    //       // Define the candidate data
    //       const candidateData = {
    //         input: {
    //           first_name: first_name,
    //           last_name: last_name,
    //           location: location,
    //           email: email,
    //           phone_number: phone_number,
    //           gender: gender,
    //           education: education,
    //           work_experience: work_experience,
    //           skills: skills,
    //           position: position,
    //           certifications: certifications,
    //         },
    //       };

    //       // Create the candidate
    //       const response = await API.graphql(graphqlOperation(createCandidate, candidateData));

    //       if (response.data.createCandidate) {
    //         // Candidate was successfully created
    //         const candidateId = response.data.createCandidate.id;
    //         console.log("candidateID :",candidateId);
    //         console.log("props job_id : ",props.job_id);
    //         handleapplyjob(candidateId); // Call the function to create CandidateJobs
    //       } else {
    //         // Handle candidate creation failure
    //         setErrorSnackbarOpen(true);
    //       }
    //     } catch (error) {
    //       // Handle GraphQL or other errors
    //       setErrorSnackbarOpen(true);
    //       console.error('Error creating candidate:', error);
    //     }
    //   };

    const createCandidateAndApply = async () => {
        console.log("createCandidateAndApply");
        try {
            // Get the Cognito User ID of the authenticated user
            const user = await Auth.currentAuthenticatedUser();
            const cognitoSub = user.attributes.sub;
            console.log("cognito sub :", cognitoSub);
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
                    cognitoSub: cognitoSub, // Set cognitoSub using the Cognito User ID
                },
            };

            // Create the candidate
            const response = await API.graphql(graphqlOperation(createCandidate, candidateData));

            if (response.data.createCandidate) {
                // Candidate was successfully created
                const candidateId = response.data.createCandidate.id;
                console.log("candidateID :", candidateId);
                console.log("props job_id : ", props.job_id);
                handleapplyjob(candidateId); // Call the function to create CandidateJobs
            } else {
                // Handle candidate creation failure
                setErrorSnackbarOpen(true);
            }
        } catch (error) {
            // Handle GraphQL or other errors
            setErrorSnackbarOpen(true);
            console.error('Error creating candidate:', error);
        }
    };


    const handleSubmit = async (event) => {
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
    // const handleapplyjob = async (candidateId) => {
    //     console.log("handleApplyJob");
    //     try {
    //       const candidateJobsData = {
    //         input: {
    //           candidateId: candidateId, // Replace with the actual candidate ID
    //           jobsId: props.job_id, // Replace with the actual job ID
    //         },
    //       };

    //       const response = await API.graphql(graphqlOperation(createCandidateJobs, candidateJobsData));

    //       if (response.data.createCandidateJobs) {
    //         // Application was successfully created
    //         setSuccessSnackbarOpen(true);
    //         setOpen(false);
    //       } else {
    //         // Handle application creation failure
    //         setErrorSnackbarOpen(true);
    //       }
    //     } catch (error) {
    //       // Handle GraphQL or other errors
    //       setErrorSnackbarOpen(true);
    //       console.error('Error applying for the job:', error);
    //     }
    //   };
    const handleapplyjob = async (candidateId) => {
        console.log("handleApplyJob");
        try {
            // Get the Cognito User ID of the authenticated user
            const user = await Auth.currentAuthenticatedUser();
            const cognitoSub = user.attributes.sub;
            console.log("cog sub ",cognitoSub)
            const candidateJobsData = {
                input: {
                    candidateId: candidateId, // Replace with the actual candidate ID
                    jobsId: props.job_id, // Replace with the actual job ID
                    // cognitoSub: cognitoSub, // Set cognitoSub using the Cognito User ID
                },
            };

            const response = await API.graphql(graphqlOperation(createCandidateJobs, candidateJobsData));
            console.log("GraphQL Response:", response);
            if (response.data.createCandidateJobs) {
                // Application was successfully created
                setSuccessSnackbarOpen(true);
                setOpen(false);
            } else {
                // Handle application creation failure
                setErrorSnackbarOpen(true);
            }
        } catch (error) {
            // Handle GraphQL or other errors
            setErrorSnackbarOpen(true);
            console.error('Error applying for the job:', error);
        }
    };

    const handleClose = (event) => {
        setOpen(false);


    }

    const handleUploadCV = (event) => {
        console.log("File selected:", event.target.files[0]);
        props.setOpen(false);


    }


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
                                    <Grid item xs={12}>
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
                                    <Grid item xs={12}>
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
                                    <Grid item xs={12}>
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

                                            <UploadCV
                                                candidate_id={props.candidate_id} token={props.token}
                                                userRole={props.userRole} setToken={props.setToken}
                                                job_id={job_id}> </UploadCV>
                                        </div>


                                    </Grid>
                                </Grid>

                            </div>
                        </div>


                        <div style={{ textAlign: 'center', marginTop: '20px' }}>

                            <Button onClick={createCandidateAndApply} type="submit" fullWidth variant="contained" sx={{
                                backgroundColor: "#ad2069",
                                mt: 4, mb: 3, width: '20%'
                            }}>
                                Apply and Save
                            </Button>

                        </div>
                        {/* Success Snackbar */}
                        <Snackbar
                            open={successSnackbarOpen}
                            autoHideDuration={5000}
                            onClose={() => setSuccessSnackbarOpen(false)}
                            message="Application submitted successfully!"
                            // Snackbar with a green color
                            style={{ backgroundColor: '#4caf50' }}
                        ></Snackbar>

                        {/* Error Snackbar */}

                        <Snackbar
                            open={errorSnackbarOpen}
                            autoHideDuration={5000}
                            onClose={() => setErrorSnackbarOpen(false)}
                            message={flashMessage}
                            // Snackbar with a red color
                            style={{ backgroundColor: '#f44336' }}
                        ></Snackbar>

                    </Box>
                </Box>
                <Copyright sx={{ mt: 5 }} />
            </Container>



        </div>
    );
}