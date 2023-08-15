
import React, { useState } from 'react';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import axios from 'axios';

export default function ApplyJob(props) {
  const [flashMessage, setFlashMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("job id is: ", props.job_id);

    try {
      console.log("at try ");
      const response = await axios.post( //apply for cv_id status candidate_id job_id and application_id
        `http://localhost:5000/apply/${props.job_id}`,
        {},  // Empty data object
        {
          headers: {
            Authorization: 'Bearer ' + props.token,
            'Content-Type': 'application/json',
          },
        }
      );
  
      
      if (response.status === 200) {
        console.log("Response apply:", response.data); // Log the response data
  
        
        //props.setStatus(response.data.status)
        setFlashMessage('Job application added successfully!');
        //props.setTitle()
        props.setOpen(false);
      } else {
        setFlashMessage('Error saving application.');
      }
    } catch (error) {
      console.error("Error:", error); // Log the error
      if (error.response) {
        setFlashMessage(error.response.data.message);
      } else {
        setFlashMessage('Error saving application.');
      }
    }
  };

  const handleApply = async (event) => {
    // Call the handleSubmit function to handle the application submission
    handleSubmit(event);

    // Call the handleApplyJob function from the props
    if (typeof props.handleApplyJob === 'function') {
      props.handleApplyJob(event); // Pass the event object if needed
    }

    // Close the dialog using the setOpen function
    props.setOpen(false);
  };

  return (
    <div>
      <Button onClick={handleApply} type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
        Apply and Save
      </Button>
      {flashMessage && (
        <Typography variant="body1" color="error" align="center">
          apply {flashMessage}
        </Typography>
      )}
    </div>
  );
}
