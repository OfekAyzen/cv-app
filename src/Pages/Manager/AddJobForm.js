
import React, { useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField  ,Snackbar ,Alert,Typography} from '@mui/material';

import { API, graphqlOperation } from 'aws-amplify';
import "../../styles/Profilemanager.css";
import { createJobs } from '../../graphql/mutations';


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
    console.log("ADD POSITION", "  jobTitle",jobTitle,"  jobDescription",jobDescription,"  qualifications",qualifications);

    try{
      await API.graphql(graphqlOperation(createJobs, {input: {job_description: jobDescription,qualifications: qualifications ,job_title: jobTitle }}));

      handleClose();
      setSuccessSnackbarOpen(true);
      props.onJobAdded(); // Notify parent component to fetch updated positions
    } catch (error) {
      console.error('Error adding job:', error);
    }
  };

  return (
    <div>
     
      <Button style={{fontFamily:'"Calibri", sans-serif'}} variant="contained" color="primary" onClick={handleClickOpen} className="button-position">
       + Add Position
      </Button>
      <Dialog
      
        open={open}
        onClose={handleClose}
        fullWidth // Make the dialog occupy full width
        maxWidth="md" // Set maximum width to medium (adjust as needed)
        PaperProps={{ style: { overflowY: 'visible', borderRadius: '0' } } } // Custom styles
      >
        
        <DialogContent>
        <DialogTitle  sx={{display:'flex'}} >Add New Position</DialogTitle>
          <DialogContentText sx={{paddingLeft:'20px'}}>
            Fill in the details of the new job.
          </DialogContentText>
          <TextField
           className="custom-select"
        
            autoFocus
            margin="dense"
            label="Job Title"
            fullWidth
            value={jobTitle}
            onChange={(e) => setJobTitle(e.target.value)}
          />
          <TextField
           className="custom-select"
          
            margin="dense"
            label="Job Description"
            fullWidth
            multiline
            rows={6}
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
          />
          <TextField
           className="custom-select"
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
          <Button onClick={handleClose} color="primary" sx={{color:'#ad2069 '}}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary" sx={{color:'#ad2069 '}}>
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