import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

import { DataGrid } from '@mui/x-data-grid';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Button from '@mui/material/Button';
import { GridToolbarContainer, GridToolbarFilterButton, GridToolbarExport } from '@mui/x-data-grid';
import Candidate_details from './Candidate_details';
import "../../styles/Profilemanager.css";
import ToolBars from './ToolBars'; // Update the import with the correct file name
const VISIBLE_FIELDS = [
  'first_name',
  'last_name',
  'location',
  'gender',
  'position',
  'education',
  'work_experience',
  'skills',
  'certifications',
];


function ProfileManager(props) {
  const [candidatesData, setCandidatesData] = useState([]);
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  //const [profileData, setProfileData] = useState(null)
  useEffect(() => {
    const fetchCandidatesData = async () => {
      axios({
        method: "GET",
        url: "http://localhost:5000/view_all_candidates",
        headers: {
          Authorization: 'Bearer ' + props.token
        }
      })
        .then((response) => {
          console.log("RESPONSE ", response.data.candidates)
          const res = response.data.candidates
          res.access_token && props.setToken(res.access_token)
          if (response.data && response.data.candidates) {
            const dataWithIds = response.data.candidates.map((candidate) => ({
              ...candidate,
              id: uuidv4(),
            }));
            setCandidatesData(dataWithIds);
            setLoading(false);
          } else {

            setLoading(false);
          }
        }).catch((error) => {

          if (error.response) {
            console.log(error.response)
            console.log(error.response.status)
            console.log(error.response.headers)
          }
        })
    };

    fetchCandidatesData();
  }, []);

  function CustomToolbar() {
    return (
      <GridToolbarContainer>

        <GridToolbarFilterButton />

        <GridToolbarExport />
      </GridToolbarContainer>
    );
  }
  const getRowClassName = (params) => {
    return 'rounded-row';
  };

  const columns = VISIBLE_FIELDS.map((field) => ({
    field,
    headerName: field === 'position' ? 'Position' : field,

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
    <div className="Profile">
      
      <ToolBars userRole={props.userRole}></ToolBars>



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
      {selectedCandidate && (
        <div className="candidate-details">
          <Button className="close-btn" onClick={handleClosePopup}>
            X
          </Button>
          <Candidate_details token={props.token} setToken={props.setToken} selectedCandidate={selectedCandidate} />
        </div>

      )}
    </div>
  );
}

export default ProfileManager;
