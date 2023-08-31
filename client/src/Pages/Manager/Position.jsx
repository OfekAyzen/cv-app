
import React, { useState, useEffect } from 'react';
import { Button, Snackbar, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField,Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import Header from '../../Components/Header';
import CandidateDataService from './CandidateDataService';
import { Box,Alert } from '@mui/material';
import "../../styles/Profilemanager.css";
import AddJobForm from './AddJobForm';
import ToolBars from './ToolBars';
function Position(props) {
  const [positions, setPositions] = useState([]);
  const [open, setOpen] = useState(false);
  const [positionName, setPositionName] = useState('');
  const [selectedPosition, setSelectedPosition] = useState(null);
  const [editedJobDescription, setEditedJobDescription] = useState('');
  const [editedQualifications, setEditedQualifications] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  useEffect(() => {
    fetchPositions();
  }, []);

  const fetchPositions = async () => {
    try {
      const response = await CandidateDataService.getAllPositions(props.token);
      setPositions(response.data);
    } catch (error) {
      console.error('Error fetching positions:', error);
    }
  };

  const handleDeletePosition = async (positionId) => {
    try {
      const response = await CandidateDataService.deleteJob(positionId, props.token);
      console.log(response.data.message); // Log the response message
      fetchPositions();
      setSnackbarOpen(true); // Open the success snackbar
    } catch (error) {
      console.error('Error deleting position:', error);
    }
  }

  const handleAddPosition = () => {
    setPositionName('');
    setEditedJobDescription('');
    setEditedQualifications('');
    setSelectedPosition(null);
    setOpen(true);
  };

  const handleEditPosition = (position) => {
    setPositionName(position.job_title);
    setSelectedPosition(position);
    setEditedJobDescription(position.job_description);
    setEditedQualifications(position.qualifications);
    setOpen(true);
  };

  const handleSaveChanges = async () => {
    if (selectedPosition) {
      try {
        await CandidateDataService.updatePosition(
          selectedPosition.job_id,
          positionName,
          editedJobDescription,
          editedQualifications,
          props.token
        );
        setOpen(false);
        fetchPositions();
        setSnackbarOpen(true); // Open the success snackbar
      } catch (error) {
        console.error('Error saving position changes:', error);
      }
    }
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false); // Close the snackbar
  };

  const handleJobAdded = () => {
    fetchPositions(); // Fetch updated positions after adding a new job
  };
  
  return (
    <div className="profile-div">
      <ToolBars/>
      <Typography sx={{display:'flex', textAlign: 'start', 
      fontSize: '35px',paddingLeft:'6%',paddingTop:'2%',
      fontFamily:'Roboto","Helvetica","Arial",sans-serif;',fontWeight:'bold' }}>Manage Job list</Typography>
      <Box className="Box-profile">
        <div className='candidates-list'>
        
          <AddJobForm token={props.token} onJobAdded={handleJobAdded} /> {/* AddJobForm component */}
          <TableContainer>
          <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Job id</TableCell>
                  <TableCell>Position Name</TableCell>
                  <TableCell>Description</TableCell>
                  <TableCell>Qualifications</TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {positions.map((position) => (
                  <TableRow key={position.job_id} sx={{ borderRadius: '50px' }}>
                    <TableCell>{position.job_id}</TableCell>
                    <TableCell>
                      {selectedPosition === position ? (
                        <TextField
                          value={positionName}
                          multiline // Enable multiline input
                          rows={3} // Adjust the number of rows as needed
                          fullWidth // Expand to fit the container width
                          onChange={(e) => setPositionName(e.target.value)}
                        />
                      ) : (
                        position.job_title
                      )}
                    </TableCell>
                    <TableCell>
                      {selectedPosition === position ? (
                        <TextField
                          value={editedJobDescription}
                          multiline // Enable multiline input
                      rows={3} // Adjust the number of rows as needed
                      fullWidth // Expand to fit the container width
                          onChange={(e) => setEditedJobDescription(e.target.value)}
                        />
                      ) : (
                        position.job_description
                      )}
                    </TableCell>
                    <TableCell>
                      {selectedPosition === position ? (
                        <TextField
                          value={editedQualifications}
                          multiline // Enable multiline input
                      rows={3} // Adjust the number of rows as needed
                      fullWidth // Expand to fit the container width
                          onChange={(e) => setEditedQualifications(e.target.value)}
                        />
                      ) : (
                        position.qualifications
                      )}
                    </TableCell>
                    <TableCell>
                      {selectedPosition === position ? (
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={handleSaveChanges}
                          multiline // Enable multiline input
                      rows={3} // Adjust the number of rows as needed
                      fullWidth // Expand to fit the container width
                        >
                          Save
                        </Button>
                      ) : (
                        <>
                          <Button
                            color="secondary"
                            startIcon={<DeleteIcon />}
                            onClick={() => handleDeletePosition(position.job_id)}
                          >
                            Delete
                          </Button>
                          <Button
                            color="primary"
                            startIcon={<EditIcon />}
                            onClick={() => handleEditPosition(position)}
                          >
                            Edit
                          </Button>
                        </>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Snackbar
            open={snackbarOpen}
            autoHideDuration={3000}
            onClose={handleSnackbarClose}
          >
            <Alert severity="success" sx={{ width: '100%' }}>
              Operation successful!
            </Alert>
          </Snackbar>
        </div>
      </Box>
    </div>
  );
}

export default Position;


