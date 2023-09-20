

import React, { useState } from 'react';


import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import axios from 'axios';
import "../../styles/Profilemanager.css";
const DownloadCV = (props) => {
 
  const handleDownload = () => {
   


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


