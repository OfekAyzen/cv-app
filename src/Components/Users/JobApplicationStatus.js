import React from 'react';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

export default function JobApplicationStatus(props) {
  const { jobTitle, jobStatus, appliedDate, onBack,job_description } = props;

  return (
    <Box m={2}>
      <Paper elevation={3} sx={{ padding: 3 }}>
        <Typography variant="h5" gutterBottom>
          Job Application Details
        </Typography>
        <Typography variant="h6" gutterBottom>
          Job Title: {jobTitle}
        </Typography>
        <Typography variant="body1" gutterBottom>
          Status: {jobStatus}
        </Typography>
        <Typography variant="body1" gutterBottom>
          Applied Date: {appliedDate}
        </Typography>
      
        <Button variant="contained" onClick={onBack}>
          Back
        </Button>
      </Paper>
    </Box>
  );
}