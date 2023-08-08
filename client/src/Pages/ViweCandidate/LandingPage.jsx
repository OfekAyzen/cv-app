
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import './LandingPage.css';
import Header from '../../Components/Header';
import { DataGrid } from '@mui/x-data-grid';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import CssBaseline from '@mui/material/CssBaseline';
import Button from '@mui/material/Button';

import {

  GridToolbarContainer,

  GridToolbarFilterButton,
  GridToolbarExport,

} from '@mui/x-data-grid';
import Candidate_details from './Candidate_details';
import { Link } from 'react-router-dom';
import ToolBar from './ToolBar';
const VISIBLE_FIELDS = ['first_name', 'last_name', 'location', 'gender', 'position',
'education',
'workExperience' ,
'skills',
'gender',
'location',

];

const LandingPage = ({ userRole }) => {
  const [candidatesData, setCandidatesData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCandidate, setSelectedCandidate] = useState(null);

  function CustomToolbar() {
    return (
      <GridToolbarContainer>
   
        <GridToolbarFilterButton />
       
        <GridToolbarExport />
      </GridToolbarContainer>
    );
  }
  useEffect(() => {
    const fetchCandidatesData = async () => {
      console.log('fetch data role =', userRole);
      if (userRole === 'manager') {
        try {
          const response = await axios.get('http://localhost:5000/view_all_candidates', {
            withCredentials: true,
          });
          // Adding unique id to each row based on the candidate_id
          const dataWithIds = response.data.candidates.map((candidate) => ({
            ...candidate,
            id: uuidv4(), // Generate a unique id using uuid
          }));
          setCandidatesData(dataWithIds);
          console.log(dataWithIds);
        } catch (error) {
          console.log('Error fetching candidates:', error.message, 'user role =', userRole);
          setError('Error fetching candidates');
        }
      } else {
        setError('You are not authorized to view candidate data.');
      }
      setLoading(false);
    };

    fetchCandidatesData();
  }, [userRole]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  } 

  const getRowClassName = (params) => {
    return 'rounded-row';
  };

  const columns = VISIBLE_FIELDS.map((field) => ({
    field,
    headerName: field === 'position' ? 'Position' : field,
   // field:'first_name',hideable: false ,//
   // headerName: field === 'first_name' ? hideable: false ,
    width: 200,
   
  }));

  

  const handleRowClick = (params) => {
    // Get the selected candidate data from the row
    const selectedCandidateData = params.row;
    setSelectedCandidate(selectedCandidateData);
    setIsShifted(!isShifted);
  };

  const handleClosePopup = () => {
    setSelectedCandidate(null);
  };
  return (
    <>
      
      <ToolBar></ToolBar>
         
          
  
      <CssBaseline />
      <Container fixed >
        
       
        {candidatesData.length > 0 ? (
          <div className="data-grid-container">
            
            <DataGrid
              slots={{ toolbar: CustomToolbar }}
              getRowClassName={getRowClassName}
              rows={candidatesData}
              columns={columns}
              onRowClick={handleRowClick} // Add the row click event handler
            />
          </div>
        ) : (
          <p>No candidate data available.</p>
        )}


      </Container>
      {/* Render the candidate data in a pop-up or right-side display */}
      
      {selectedCandidate && (
        <div className="candidate-details">
          <Button className="close-btn" onClick={handleClosePopup}>
            X
          </Button>
          <Candidate_details selectedCandidate={selectedCandidate}/>
        </div>
       
      )}
      
    </>
  );
};

export default LandingPage;
