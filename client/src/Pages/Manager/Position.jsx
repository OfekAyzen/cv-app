
// // import React, { useState, useEffect } from 'react';


// // import Header from '../../Components/Header';
// // import ToolBars from './ToolBars';

// // import { Button } from '@mui/material';
// // import HomePage from '../../Components/Users/HomePage';
// // const Position = (props) => {

// //   return (
// //     <>
// //     <Header/>
// //     <h1>position</h1>
    
// //     </>
// //   );
// // };

// // export default Position;
// import React, { useState, useEffect } from 'react';
// import { Button, Card, CardContent, Dialog, DialogContent, DialogTitle, FormControl, InputLabel, MenuItem, Select, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from '@mui/material';
// import DeleteIcon from '@mui/icons-material/Delete';
// import AddIcon from '@mui/icons-material/Add';
// import EditIcon from '@mui/icons-material/Edit';
// import ToolBars from './ToolBars';
// import Header from '../../Components/Header';
// import CandidateDataService from './CandidateDataService';
// import {List,Box} from '@mui/material';
// import "../../styles/Profilemanager.css";
// function Position(props) {
//   const [positions, setPositions] = useState([]);
//   const [open, setOpen] = useState(false);
//   const [positionName, setPositionName] = useState('');
//   const [selectedPosition, setSelectedPosition] = useState(null);
//   const [editing, setEditing] = useState(false);
//   const [editedJobDescription, setEditedJobDescription] = useState('');
//   const [editedQualifications, setEditedQualifications] = useState('');
//   const [editedName, setEditedName] = useState('');
//   useEffect(() => {
//     fetchPositions();
//   }, []);

//   const fetchPositions = async () => {
//     try {
//       const response = await CandidateDataService.getAllPositions(props.token);
//       console.log("DATA RESPONSE :",response.data)
//       setPositions(response.data);
//       console.log("positions : ",positions);
//     } catch (error) {
//       console.error('Error fetching positions:', error);
//     }
//   };

//   const handleDeletePosition = async (positionId) => {
//     try {
//       await CandidateDataService.deletePosition(positionId, props.token);
//       fetchPositions();
//     } catch (error) {
//       console.error('Error deleting position:', error);
//     }
//   };
 

//   const handleAddPosition = () => {
//     setPositionName('');
//     setEditing(false);
//     setOpen(true);
//   };

//   const handleEditPosition = (position) => {
//     console.log("position  : ",position);
//     setPositionName(position.position_name);
//     setSelectedPosition(position);
//     setEditing(true);
//     setEditedJobDescription(position.job_description);
//     setEditedQualifications(position.qualifications);
//     setEditedName(position.job_title);
//     setOpen(true);
//   };

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     try {
//       if (editing) {
//         await CandidateDataService.updatePosition(selectedPosition.position_id, positionName, props.token);
//       } else {
//         await CandidateDataService.addPosition(positionName, props.token);
//       }
//       setOpen(false);
//       fetchPositions();
//     } catch (error) {
//       console.error('Error submitting position:', error);
//     }
//   };
//   const handleSaveChanges=async (positionId)=>{
//     try {
//       await CandidateDataService.updatePosition(positionId, positionName, editedJobDescription, editedQualifications, props.token);
//       setOpen(false);
//       fetchPositions();
//     } catch (error) {
//       console.error('Error saving position changes:', error);
//     }
//   }

//   return (
// <div className="profile-div">
//     {console.log("props : ",props)}
//     <Header />
//     <h1>Jobs list</h1>
//     <Box className="Box-profile">
//       <div className='candidates-list'>
     
//       <Button variant="contained" color="primary" startIcon={<AddIcon />} onClick={handleAddPosition}>
//         Add Position
//       </Button>
//       <TableContainer  >
//         <Table>
//           <TableHead >
//             <TableRow >
//               <TableCell>Job id</TableCell>
//               <TableCell>Position Name</TableCell>
//               <TableCell>Description</TableCell>
//               <TableCell>Qualifications</TableCell>
//               <TableCell></TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//               {positions.map((position) => (
//                 <TableRow key={position.position_id} sx={{ borderRadius: '50px' }}>
//                   <TableCell>{position.job_id}</TableCell>
//                   <TableCell>{editing ? (
//                     <TextField
//                       value={position.job_title}
//                       onChange={(e) => setPositionName(e.target.value)}
//                     />
//                   ) : (
//                     position.job_title
//                   )}</TableCell>
//                   <TableCell>
//                     {editing ? (
//                       <TextField
//                         value={editedJobDescription}
//                         onChange={(e) => setEditedJobDescription(e.target.value)}
//                       />
//                     ) : (
//                       position.job_description
//                     )}
//                   </TableCell>
//                   <TableCell>
//                     {editing ? (
//                       <TextField
//                         value={editedQualifications}
//                         onChange={(e) => setEditedQualifications(e.target.value)}
//                       />
//                     ) : (
//                       position.qualifications
//                     )}
//                   </TableCell>
//                   <TableCell>
//                     {editing ? (
//                       <Button
//                         variant="contained"
//                         color="primary"
//                         onClick={() => {
//                           handleSaveChanges(position.position_id);
//                         }}
//                       >
//                         Save
//                       </Button>
//                     ) : (
//                       <Button
//                         color="secondary"
//                         startIcon={<DeleteIcon />}
//                         onClick={() => handleDeletePosition(position.position_id)}
//                       >
//                         Delete
//                       </Button>
//                     )}
//                     <Button color="primary" startIcon={<EditIcon />} onClick={() => handleEditPosition(position)}>
//                       Edit
//                     </Button>
//                   </TableCell>
//                         </TableRow>
//                       ))}
//         </TableBody>
//         </Table>
//       </TableContainer>
//       </div>
//     </Box>
    
//   </div>
//   );
// }

// export default Position;

import React, { useState, useEffect } from 'react';
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import Header from '../../Components/Header';
import CandidateDataService from './CandidateDataService';
import { Box } from '@mui/material';
import "../../styles/Profilemanager.css";

function Position(props) {
  const [positions, setPositions] = useState([]);
  const [open, setOpen] = useState(false);
  const [positionName, setPositionName] = useState('');
  const [selectedPosition, setSelectedPosition] = useState(null);
  const [editing, setEditing] = useState(false);
  const [editedJobDescription, setEditedJobDescription] = useState('');
  const [editedQualifications, setEditedQualifications] = useState('');

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
      await CandidateDataService.deletePosition(positionId, props.token);
      fetchPositions();
    } catch (error) {
      console.error('Error deleting position:', error);
    }
  };

  const handleAddPosition = () => {
    setPositionName('');
    setEditing(false);
    setOpen(true);
  };

  const handleEditPosition = (position) => {
    console.log("handleEditPosition = (position) : ",position);
    setPositionName(position.job_title);
    setSelectedPosition(position);
    setEditing(true);
    setEditedJobDescription(position.job_description);
    setEditedQualifications(position.qualifications);
    setOpen(true);
  };

  const handleSaveChanges = async (positionId) => {
    console.log("job_id position sending : ",positionId)
    try {
      await CandidateDataService.updatePosition(
        positionId,
        positionName,
        editedJobDescription,
        editedQualifications,
        props.token
      );
      setOpen(false);
      fetchPositions();
    } catch (error) {
      console.error('Error saving position changes:', error);
    }
  };

  return (
    <div className="profile-div">
      <Header />
      <h1>Jobs list</h1>
      <Box className="Box-profile">
        <div className='candidates-list'>
          <Button variant="contained" color="primary" startIcon={<AddIcon />} onClick={handleAddPosition}>
            Add Position
          </Button>
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
                      {editing ? (
                        <TextField
                          value={positionName}
                          onChange={(e) => setPositionName(e.target.value)}
                        />
                      ) : (
                        position.job_title
                      )}
                    </TableCell>
                    <TableCell>
                      {editing ? (
                        <TextField
                          value={editedJobDescription}
                          onChange={(e) => setEditedJobDescription(e.target.value)}
                        />
                      ) : (
                        position.job_description
                      )}
                    </TableCell>
                    <TableCell>
                      {editing ? (
                        <TextField
                          value={editedQualifications}
                          onChange={(e) => setEditedQualifications(e.target.value)}
                        />
                      ) : (
                        position.qualifications
                      )}
                    </TableCell>
                    <TableCell>
                      {editing ? (
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={() => handleSaveChanges(position.job_id)}
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
                            onClick={() => handleEditPosition(position.job_id)}
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
        </div>
      </Box>
    </div>
  );
}

export default Position;