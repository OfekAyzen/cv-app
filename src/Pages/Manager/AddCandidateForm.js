// AddCandidateForm.js
import React, { useState, useEffect } from 'react';
import { Snackbar } from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';

import { TextField, Button, Container } from '@mui/material';
import { API, graphqlOperation } from 'aws-amplify';
import { createCandidate } from '../../graphql/mutations';  // Adjust the import path
import { Typography } from "@mui/material";
import "../../styles/Profilemanager.css";
import { Storage } from 'aws-amplify';
import UploadCV from '../../Components/Users/UploadCV';
const AddCandidateForm = () => {
    const [cvFile, setCvFile] = useState('');
    const [cvFileKey, setCvFileKey] = useState(null);
    const [candidateData, setCandidateData] = useState({
        first_name: '',
        last_name: '',
        location: '',
        email: '',
        phone_number: '',
        gender: '',
        education: '',
        work_experience: '',
        skills: '',
        position: '',
        certifications: '',
        cv: '',
        // cognitoSub: '',
        note: '',
        status: '',
    });
    const [error, setError] = useState(null);
    const [education, setEducation] = useState('');
    const [workExperience, setWorkExperience] = useState('');
    const [gender, setGender] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('success'); // Added severity state
    const handleSnackbarClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setError(null);
    };
    const handleFieldChange = (fieldName) => (event) => {
        const value = event.target.value;
        switch (fieldName) {
            case 'education':
                setEducation(value);
                setCandidateData({ ...candidateData, education: value });
                break;
            case 'work_experience':
                setWorkExperience(value);
                setCandidateData({ ...candidateData, work_experience: value });
                break;
            case 'gender':
                setGender(value);
                setCandidateData({ ...candidateData, gender: value });
                break;
            default:
                setCandidateData({ ...candidateData, [fieldName]: value });
        }
    };

   
    const handleAddCandidate = async () => {
        try {
            // Create a new candidate using the createCandidate mutation
            const newCandidate = {
                input: {
                    ...candidateData,
                    cv: cvFileKey,  // Include the CV file key
                },
            };

            const response = await API.graphql(
                graphqlOperation(createCandidate, {
                    input: newCandidate.input,
                })
            );

            console.log('New Candidate created:', response);
            setSnackbarSeverity('success');
            setError('New Candidate created');

            window.location.reload();
            // TODO: Handle success and update UI if needed
        } catch (error) {
            console.error('Error creating new candidate:', error);
            setSnackbarSeverity('error');
            setError('An error occurred while adding the candidate.Please check the email \ phone number');
            // TODO: Handle error and notify the user
        }
    };
    const handleUploadCV = (event) => {
        const selectedCvFile = event.target.files[0];
        if (selectedCvFile) {
            // console.log('Selected CV File:', selectedCvFile);
            setCvFile(selectedCvFile);
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
                setError('CV uploaded successfully');
                console.log('CV uploaded successfully!');
                // Update cvFileKey and save it
                setCvFileKey(newCvFileKey);
                localStorage.setItem('cvFileKey', newCvFileKey);  // Save in localStorage
            } catch (error) {
                console.error('Error uploading CV:', error);

            }
        };


        // Call uploadCV if cvFile is not null
        if (cvFile) {
            uploadCV();
        }
    }, [cvFile, setCvFileKey]);
    const areAllFieldsFilled = () => {
        const requiredFields = [
            'first_name',
            'last_name',
            'location',
            'email',
            'phone_number',
            'gender',
            'education',
            'work_experience',
            'skills',
            'position',
            'certifications',
            
        ];
        return requiredFields.every(field => candidateData[field]);
    };
    return (
        <div  style={{ backgroundColor: 'white', display: 'flex', paddingBottom: '30px' }}>
            <Container style={{ backgroundColor: 'white', width: '70%', paddingTop: '50px' }}>
                <Typography sx={{ paddingBottom: '5%', fontSize: '30px', fontFamily: '"Calibri", sans-serif', display: 'flex', textAlign: 'center', justifyContent: 'center' }}>
                    Add new candidate
                </Typography>
                <TextField
                    sx={{ paddingBottom: '5px', fontFamily: `'Calibri', sans-serif` }}
                    className='custom-select'

                    label="First Name"
                    value={candidateData.first_name}
                    onChange={handleFieldChange('first_name')}
                    fullWidth
                />
                <TextField
                    sx={{ paddingBottom: '5px', fontFamily: `'Calibri', sans-serif` }}
                    className='custom-select'
                    label="Last Name"
                    value={candidateData.last_name}
                    onChange={handleFieldChange('last_name')}
                    fullWidth
                />
                {/* Add more fields as needed */}
                <TextField
                    sx={{ paddingBottom: '5px', fontFamily: `'Calibri', sans-serif` }}
                    className='custom-select'
                    label="Location"
                    value={candidateData.location}
                    onChange={handleFieldChange('location')}
                    fullWidth
                />
                <TextField
                    sx={{ paddingBottom: '5px', fontFamily: `'Calibri', sans-serif` }}
                    className='custom-select'
                    label="Email"
                    value={candidateData.email}
                    onChange={handleFieldChange('email')}
                    fullWidth
                />
                <TextField
                    sx={{ paddingBottom: '5px', fontFamily: `'Calibri', sans-serif` }}
                    className='custom-select'
                    label="Phone Number"
                    value={candidateData.phone_number}
                    onChange={handleFieldChange('phone_number')}
                    fullWidth
                />
                {/* <TextField
                    sx={{ paddingBottom: '5px', fontFamily: `'Calibri', sans-serif` }}
                    className='custom-select'
                    label="Gender"
                    value={candidateData.gender}
                    onChange={handleFieldChange('gender')}
                    fullWidth
                />
                <TextField
                    sx={{ paddingBottom: '5px', fontFamily: `'Calibri', sans-serif` }}
                    className='custom-select'

                    label="Education"
                    value={candidateData.education}
                    onChange={handleFieldChange('education')}
                    fullWidth
                /> */}
                {/* <TextField
                    sx={{ paddingBottom: '5px', fontFamily: `'Calibri', sans-serif` }}
                    className='custom-select'
                    label="Work Experience"
                    value={candidateData.work_experience}
                    onChange={handleFieldChange('work_experience')}
                    fullWidth
                /> */}
                 <FormControl  fullWidth variant="outlined" className="custom-select" style={{ width: '360px' ,paddingBottom:'6px'}}>
      <InputLabel>Education</InputLabel>
      <Select
        value={education}
        onChange={handleFieldChange('education')}
        label="Education"
      >
        <MenuItem value="">
          <em>All</em>
        </MenuItem>
        <MenuItem value="High School">High School</MenuItem>
        <MenuItem value="Bachelor's Degree">Bachelor's Degree</MenuItem>
        <MenuItem value="Master's Degree">Master's Degree</MenuItem>
      </Select>
    </FormControl>

    <FormControl fullWidth variant="outlined" className="custom-select" style={{ width: '360px',paddingBottom:'6px' }}>
      <InputLabel>Work Experience</InputLabel>
      <Select
        value={workExperience}
         onChange={handleFieldChange('work_experience')}
        label="Work Experience"
      >
        <MenuItem value="">
          <em>All</em>
        </MenuItem>
        <MenuItem value="Less than 1 year">Less than 1 year</MenuItem>
        <MenuItem value="1-3 years">1-3 years</MenuItem>
        <MenuItem value="3-5 years">3-5 years</MenuItem>
      </Select>
    </FormControl>

    <FormControl fullWidth variant="outlined" className="custom-select" style={{ width: '360px',paddingBottom:'6px' }}>
      <InputLabel>Gender</InputLabel>
      <Select
        value={gender}
        onChange={handleFieldChange('gender')}
        label="Gender"
      >
        <MenuItem value="">
          <em>All</em>
        </MenuItem>
        <MenuItem value="male">Male</MenuItem>
        <MenuItem value="female">Female</MenuItem>
        <MenuItem value="Other">Other</MenuItem>
      </Select>
    </FormControl>

                <TextField
                    sx={{ paddingBottom: '5px', fontFamily: '"Calibri", sans-serif', }}
                    className='custom-select'
                    label="Skills"
                    value={candidateData.skills}
                    onChange={handleFieldChange('skills')}
                    fullWidth
                />
                <TextField
                    sx={{ paddingBottom: '5px', fontFamily: `'Calibri', sans-serif` }}
                    className='custom-select'
                    label="Position"
                    value={candidateData.position}
                    onChange={handleFieldChange('position')}
                    fullWidth
                />
                <TextField
                    sx={{ paddingBottom: '5px', fontFamily: `'Calibri', sans-serif` }}
                    className='custom-select'
                    label="Certifications"
                    value={candidateData.certifications}
                    onChange={handleFieldChange('certifications')}
                    fullWidth
                />

                <TextField
                    sx={{ paddingBottom: '5px', fontFamily: `'Calibri', sans-serif` }}
                    className='custom-select'
                    label="Note"
                    value={candidateData.note}
                    onChange={handleFieldChange('note')}
                    fullWidth
                />
                <TextField
                    sx={{ paddingBottom: '5px', fontFamily:'"Calibri", sans-serif', }}
                    className='custom-select'
                    label="Status"
                    value={candidateData.status}
                    onChange={handleFieldChange('status')}
                    fullWidth
                />
    <div style={{display:'flex',flexDirection:'column'}}>
    <label htmlFor="cvUpload" style={{ fontFamily:'"Calibri", sans-serif',cursor: 'pointer', color: '#ad2069',marginTop:'5%' }}>
                    Upload CV
                    <input
                        value={candidateData.cv}
                        type="file"
                        id="cvUpload"
                        accept=".pdf,.doc,.docx"
                        style={{ display: 'none' }}
                        onChange={handleUploadCV}
                    />
                </label>

                <Button
                    variant="contained"
                    sx={{
                        fontFamily: '"Calibri", sans-serif',
                        backgroundColor: '#9c27b0',
                        '&:hover': {
                            backgroundColor: 'purple'
                        }
                    }}
                    onClick={handleAddCandidate}
                    disabled={!areAllFieldsFilled()}  // Disable the button if not all fields are filled
                >
                    Add Candidate
                </Button>
               {/* Snackbar to display error */}
               <Snackbar open={!!error} autoHideDuration={6000} onClose={handleSnackbarClose}>
                    <MuiAlert
                        elevation={6}
                        variant="filled"
                        severity={snackbarSeverity} // Use the severity state to determine color
                        onClose={handleSnackbarClose}
                    >
                        {error}
                    </MuiAlert>
                </Snackbar>

    </div>
               
            </Container>
        </div>
    );
};

export default AddCandidateForm;