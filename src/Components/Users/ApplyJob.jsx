

import React, { useState } from 'react';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import axios from 'axios';

export default function ApplyJob(props) {
  const [flashMessage, setFlashMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
  

    // try {
  
    
    //   const response = await axios.post(
    //     `http://localhost:5000/apply/${props.job_id}`,
    //     {},
    //     {
    //       headers: {
    //         Authorization: 'Bearer ' + props.token,
    //         'Content-Type': 'application/json',
    //       },
    //     }
    //   );
  
    //   if (response.status === 200) {
       
       
    //     props.setOpen(false);
    //   } else {
    //     setFlashMessage(response.data.message);
    //     setErrorSnackbarOpen(true);
    //   }
    // } catch (error) {
    //   if (error.response) {
    //     setFlashMessage(error.response.data.message);
    //     setErrorSnackbarOpen(true);
    //   } else {
    //     setFlashMessage('Error applying for the job.');
    //     setErrorSnackbarOpen(true);
    //   }
    // }
  };

  const handleApply = async (event) => {
    handleSubmit(event);

    if (typeof props.handleApplyJob === 'function') {
      props.handleApplyJob(event);
    }

    props.setOpen(false);
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }}>
      <Button onClick={handleApply} type="submit" fullWidth variant="contained" sx={{ backgroundColor:"#ad2069",
        mt: 4, mb:  3,width:'20%' }}>
        Apply and Save
      </Button>
      {flashMessage && (
        <Typography variant="body1" color="error" align="center">
          {flashMessage}
        </Typography>
      )}
    </div>
  );
}