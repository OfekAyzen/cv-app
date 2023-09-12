

import React, { useState } from 'react';


import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import axios from 'axios';
import "../../styles/Profilemanager.css";
const DownloadCV = (props) => {
 
  const handleDownload = () => {
    // Code to generate and download the file
    

    // axios({
    //   method: 'GET',
    //   url: 'http://localhost:5000/download/' + props.candidate_id,
    //   headers: {
    //     Authorization: 'Bearer ' + props.token
    // },
    //   responseType: 'blob',
    //   withCredentials: true,
     
    // })
    //   .then(response => {
    //     const url = window.URL.createObjectURL(new Blob([response.data]));
  
    //     const link = document.createElement('a');
    //     link.href = url;
    //     link.setAttribute('download', 'cv_file.pdf');
    //     document.body.appendChild(link);
    //     link.click();
    //   })
    //   .catch(error => {
    //     console.error('CV download failed:', error);
       
    //     // Handle the error here
    //   });
     


  };

  return (
    <>
      
          <div className='button-cv'>
          <Button onClick={handleDownload}  sx={{ backgroundColor: ' rgb(174, 43, 91)' }} className='download-button' variant="contained">Download cv</Button>
          </div>
    </>
  );
};

export default DownloadCV;


