

import React from 'react';

import './LandingPage.css';

import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import axios from 'axios';

const Candidate_details = ({selectedCandidate}) => {
 
  const handleDownload = () => {
    // Code to generate and download the file
    axios({
      method: 'GET',
      url: 'http://localhost:5000/download/' + selectedCandidate.candidate_id,
      responseType: 'blob',
      withCredentials: true,
    })
      .then(response => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'cv_file.pdf');
        document.body.appendChild(link);
        link.click();
      })
      .catch(error => {
        console.error('CV download failed:', error);
        // Handle the error here
      });
     


  };

  return (
    <>
   
          <h2 className='h2-candidate-details'>Candidate Details</h2>
          
          <h4>{`${selectedCandidate.first_name} ${selectedCandidate.last_name}`}</h4>
          <p>Name: {`${selectedCandidate.first_name} ${selectedCandidate.last_name}`}</p>
          <p>Phone:{selectedCandidate.phone_number}</p>
          <p>Position: {selectedCandidate.position}</p>
          <p>Gender:{selectedCandidate.gender}</p>
          <Card className='inner-card'>
            <p>Location: {selectedCandidate.location}</p>
            
            <p>Email: {selectedCandidate.email}</p>
            
            
            <p>Education:{selectedCandidate.education}</p>
            <p>Experience:{selectedCandidate.experience}</p>
            <p>Skills:{selectedCandidate.skills}</p>
            <p>Department:{selectedCandidate.department}</p>
            <p>Certification:{selectedCandidate.certification}</p>
          {/* Add more candidate data as needed */}
          
    
          </Card>
          
          <Button onClick={handleDownload}  sx={{ backgroundColor: ' rgb(174, 43, 91)' }} className='download-button' variant="contained">Download cv</Button>
      
    </>
  );
};

export default Candidate_details;

