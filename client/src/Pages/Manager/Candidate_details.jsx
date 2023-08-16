

import React, { useState } from 'react';


import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import axios from 'axios';
import "../../styles/Profilemanager.css";
const Candidate_details = (props) => {
 
  const handleDownload = () => {
    // Code to generate and download the file
    

    axios({
      method: 'GET',
      url: 'http://localhost:5000/download/' + props.candidate_id,
      headers: {
        Authorization: 'Bearer ' + props.token
    },
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
        {console.log("candidate id at details : ",props.candidate_id)}
          <div className='button-cv'>
          <Button onClick={handleDownload}  sx={{ backgroundColor: ' rgb(174, 43, 91)' }} className='download-button' variant="contained">Download cv</Button>
          </div>
    </>
  );
};

export default Candidate_details;


{/* <h2 className='h2-candidate-details'>Candidate Details and cv</h2>
          
<h3>{`${props.selectedCandidate.first_name} ${props.selectedCandidate.last_name}`}</h3>

<Card className='inner-card'>
<p>Name: {`${props.selectedCandidate.first_name} ${props.selectedCandidate.last_name}`}</p>
<p>Phone:{props.selectedCandidate.phone_number}</p>
<p>Position: {props.selectedCandidate.position}</p>
<p>Gender:{props.selectedCandidate.gender}</p>
  <p>Location: {props.selectedCandidate.location}</p>
  
  <p>Email: {props.selectedCandidate.email}</p>
  
  
  <p>Education:{props.selectedCandidate.education}</p>
  <p>Experience:{props.selectedCandidate.experience}</p>
  <p>Skills:{props.selectedCandidate.skills}</p>
  <p>Department:{props.selectedCandidate.department}</p>
  <p>Certification:{props.selectedCandidate.certification}</p>
{/* Add more candidate data as needed */}


