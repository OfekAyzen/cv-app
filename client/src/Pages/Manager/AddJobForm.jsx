
import React, { useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField  ,Snackbar ,Alert,Typography} from '@mui/material';
import CandidateDataService from './CandidateDataService';

function AddJobForm(props) {
  const [open, setOpen] = useState(false);
  const [jobTitle, setJobTitle] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [qualifications, setQualifications] = useState('');
  const [successSnackbarOpen, setSuccessSnackbarOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleSnackbarClose = () => {
    setSuccessSnackbarOpen(false);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async () => {
    try {
      await CandidateDataService.addJob({
        job_title: jobTitle,
        job_description: jobDescription,
        qualifications: qualifications
      }, props.token);
      
      handleClose();
      setSuccessSnackbarOpen(true);
      props.onJobAdded(); // Notify parent component to fetch updated positions
    } catch (error) {
      console.error('Error adding job:', error);
    }
  };

  return (
    <div>
     
      <Button variant="contained" color="primary" onClick={handleClickOpen}>
       + Add Position
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        fullWidth // Make the dialog occupy full width
        maxWidth="md" // Set maximum width to medium (adjust as needed)
        PaperProps={{ style: { overflowY: 'visible', textAlign: 'right', borderRadius: '0' } }} // Custom styles
      >
        
        <DialogContent>
        <DialogTitle sx={{display:'flex',textAlign:'center',}}>Add New Position</DialogTitle>
          <DialogContentText>
            Fill in the details of the new job.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            label="Job Title"
            fullWidth
            value={jobTitle}
            onChange={(e) => setJobTitle(e.target.value)}
          />
          <TextField
            margin="dense"
            label="Job Description"
            fullWidth
            multiline
            rows={6}
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
          />
          <TextField
            margin="dense"
            label="Qualifications"
            fullWidth
            multiline
            rows={6}
            value={qualifications}
            onChange={(e) => setQualifications(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary">
            Add
          </Button>
        </DialogActions>
     
      </Dialog>
      <Snackbar
        open={successSnackbarOpen}
        autoHideDuration={4000} // Adjust the duration as needed
        onClose={handleSnackbarClose}
       
      
      >

            <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
            Job added successfully!
            </Alert>
        </Snackbar>
    </div>
  );
}

export default AddJobForm;