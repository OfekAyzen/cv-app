import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, FormControl, InputLabel, MenuItem, Select ,Grid } from '@mui/material';

function StatusChangeForm(props) {
  const [newStatus, setNewStatus] = useState('');

  // Set the initial newStatus based on the currentStatus prop
  useEffect(() => {
    setNewStatus(props.currentStatus);
  }, [props.currentStatus]);

  const handleStatusChange = async () => {
    try {
      const response = await axios.post(
        'http://localhost:5000/update_status',
        {
          job_id: props.selectedJobId,
          status: newStatus,
        },
        {
          headers: {
            Authorization: `Bearer ${props.token}`,
          },
        }
      );
  
      props.handleStatusChangeSuccess(
        response.data.message,
        response.status === 200 ? 'green' : 'red',
        newStatus
      );
    } catch (error) {
      console.error('Error updating status:', error);
      props.handleStatusChangeError('Error updating status.', 'red');
    }
  };

  return (
    <Grid container alignItems="center" spacing={1}>
    <Grid item>
      <FormControl variant="outlined">
        <InputLabel>Status</InputLabel>
        <Select
          value={newStatus || ''} // Use an empty string as the fallback
          onChange={(e) => setNewStatus(e.target.value)}
          label="Status"
        >
          <MenuItem value="Accepted" selected={newStatus === 'Accepted'}>
            Accepted
          </MenuItem>
          <MenuItem value="Pending" selected={newStatus === 'Pending'}>
            Pending
          </MenuItem>
          <MenuItem value="Application Received" selected={newStatus === 'Application Received'}>
          Application Received
          </MenuItem>
          <MenuItem value="Application Under Review" selected={newStatus === 'Application Under Review'}>
          Application Under Review
          </MenuItem>
          <MenuItem value="Interview Scheduled" selected={newStatus === 'Interview Scheduled'}>
          Interview Scheduled
          </MenuItem>
          <MenuItem value="Assessment/Testing" selected={newStatus === 'Assessment/Testing'}>
          Assessment/Testing
          </MenuItem>
          <MenuItem value="Application Unsuccessful" selected={newStatus === 'Application Unsuccessful'}>
          Application Unsuccessful
          </MenuItem>
               
              
              
        </Select>
      </FormControl>
      </Grid>
      <Grid item>
        <Button variant="contained" color="primary" onClick={handleStatusChange}>
          Save
        </Button>
      </Grid>
    </Grid>
  );
}

export default StatusChangeForm;