// AddCandidateForm.js
import React, { useState,useEffect } from 'react';
import { TextField, Button, Container } from '@mui/material';
import { API, graphqlOperation } from 'aws-amplify';
import { createCandidate }  from '../../graphql/mutations';  // Adjust the import path
import { Typography} from "@mui/material";
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

  const handleFieldChange = (fieldName) => (event) => {
    setCandidateData({ ...candidateData, [fieldName]: event.target.value });
  };

//   const handleAddCandidate = async () => {
//     try {
//       // Create a new candidate using the createCandidate mutation
//       const newCandidate = {
//         input: {
//           ...candidateData,
//         },
//       };

//       const response = await API.graphql(
//         graphqlOperation(createCandidate, {
//           input: newCandidate.input,
//         })
//       );

//       console.log('New Candidate created:', response);
//       window.location.reload();
//       // TODO: Handle success and update UI if needed
//     } catch (error) {
//       console.error('Error creating new candidate:', error);
//       // TODO: Handle error and notify the user
//     }
//   };
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
      window.location.reload();
      // TODO: Handle success and update UI if needed
    } catch (error) {
      console.error('Error creating new candidate:', error);
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
  return (
    <div className='addcandidate-form' style={{backgroundColor:'white',display:'flex',paddingBottom:'30px'}}>
        <Container style={{backgroundColor:'white', width:'50%',paddingTop:'50px'}}>
            <Typography sx={{paddingBottom:'5%',fontSize:'30px',fontFamily:`'Calibri', sans-serif`,display:'flex',textAlign:'center',justifyContent:'center'}}>
                Add new candidate 
            </Typography>
      <TextField
      sx={{paddingBottom:'5px',fontFamily:`'Calibri', sans-serif`}}
      className='custom-select'
     
        label="First Name"
        value={candidateData.first_name}
        onChange={handleFieldChange('first_name')}
        fullWidth
      />
      <TextField
      sx={{paddingBottom:'5px',fontFamily:`'Calibri', sans-serif`}}
      className='custom-select'
        label="Last Name"
        value={candidateData.last_name}
        onChange={handleFieldChange('last_name')}
        fullWidth
      />
      {/* Add more fields as needed */}
      <TextField
      sx={{paddingBottom:'5px',fontFamily:`'Calibri', sans-serif`}}
      className='custom-select'
        label="Location"
        value={candidateData.location}
        onChange={handleFieldChange('location')}
        fullWidth
      />
      <TextField
     sx={{paddingBottom:'5px',fontFamily:`'Calibri', sans-serif`}}
      className='custom-select'
        label="Email"
        value={candidateData.email}
        onChange={handleFieldChange('email')}
        fullWidth
      />
      <TextField
     sx={{paddingBottom:'5px',fontFamily:`'Calibri', sans-serif`}}
      className='custom-select'
        label="Phone Number"
        value={candidateData.phone_number}
        onChange={handleFieldChange('phone_number')}
        fullWidth
      />
      <TextField
     sx={{paddingBottom:'5px',fontFamily:`'Calibri', sans-serif`}}
      className='custom-select'
        label="Gender"
        value={candidateData.gender}
        onChange={handleFieldChange('gender')}
        fullWidth
      />
      <TextField
     sx={{paddingBottom:'5px',fontFamily:`'Calibri', sans-serif`}}
      className='custom-select'
      
        label="Education"
        value={candidateData.education}
        onChange={handleFieldChange('education')}
        fullWidth
      />
      <TextField
     sx={{paddingBottom:'5px',fontFamily:`'Calibri', sans-serif`}}
      className='custom-select'
        label="Work Experience"
        value={candidateData.work_experience}
        onChange={handleFieldChange('work_experience')}
        fullWidth
      />
      <TextField
      sx={{paddingBottom:'5px',fontFamily:`'Calibri', sans-serif`}}
      className='custom-select'
        label="Skills"
        value={candidateData.skills}
        onChange={handleFieldChange('skills')}
        fullWidth
      />
      <TextField
      sx={{paddingBottom:'5px',fontFamily:`'Calibri', sans-serif`}}
      className='custom-select'
        label="Position"
        value={candidateData.position}
        onChange={handleFieldChange('position')}
        fullWidth
      />
      <TextField
      sx={{paddingBottom:'5px',fontFamily:`'Calibri', sans-serif`}}
      className='custom-select'
        label="Certifications"
        value={candidateData.certifications}
        onChange={handleFieldChange('certifications')}
        fullWidth
      />
    
      <TextField
      sx={{paddingBottom:'5px',fontFamily:`'Calibri', sans-serif`}}
      className='custom-select'
        label="Note"
        value={candidateData.note}
        onChange={handleFieldChange('note')}
        fullWidth
      />
      <TextField
      sx={{paddingBottom:'5px',fontFamily:`'Calibri', sans-serif`}}
      className='custom-select'
        label="Status"
        value={candidateData.status}
        onChange={handleFieldChange('status')}
        fullWidth
      />
     <label htmlFor="cvUpload" style={{ cursor: 'pointer', color: '#ad2069'}}>
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
                                
                           
      <Button variant="contained" sx={{backgroundColor: '#9c27b0','&:hover': {
      backgroundColor: 'purple'
    }}} onClick={handleAddCandidate}>
        Add Candidate
      </Button>
      </Container>
    </div>
  );
};

export default AddCandidateForm;