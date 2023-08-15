// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { v4 as uuidv4 } from 'uuid';

// import { DataGrid } from '@mui/x-data-grid';
// import Container from '@mui/material/Container';
// import CssBaseline from '@mui/material/CssBaseline';
// import Button from '@mui/material/Button';
// import { GridToolbarContainer, GridToolbarFilterButton, GridToolbarExport } from '@mui/x-data-grid';
// import Candidate_details from './Candidate_details';
// import "../../styles/Profilemanager.css";
// import ToolBars from './ToolBars'; // Update the import with the correct file name
// const VISIBLE_FIELDS = [
//   'first_name',
//   'last_name',
//   'location',
//   'gender',
//   'position',
//   'education',
//   'work_experience',
//   'skills',
//   'certifications',
// ];


// function ProfileManager(props) {
//   const [candidatesData, setCandidatesData] = useState([]);
//   const [selectedCandidate, setSelectedCandidate] = useState(null);
//   const [isShifted, setIsShifted] = useState(false); // Declare and initialize isShifted state

//   //const [profileData, setProfileData] = useState(null)
//   useEffect(() => {
//     const fetchCandidatesData = async () => {
//       axios({
//         method: "GET",
//         url: "http://localhost:5000/view_all_candidates",
//         headers: {
//           Authorization: 'Bearer ' + props.token
//         }
//       })
//         .then((response) => {
//           console.log("RESPONSE ", response.data.candidates)
//           const res = response.data.candidates
//           res.access_token && props.setToken(res.access_token)
//           if (response.data && response.data.candidates) {
//             const dataWithIds = response.data.candidates.map((candidate) => ({
//               ...candidate,
//               id: uuidv4(),
//             }));
//             setCandidatesData(dataWithIds);
//             setLoading(false);
//           } else {

//             setLoading(false);
//           }
//         }).catch((error) => {

//           if (error.response) {
//             console.log(error.response)
//             console.log(error.response.status)
//             console.log(error.response.headers)
//           }
//         })
//     };

//     fetchCandidatesData();
//   }, []);

//   function CustomToolbar() {
//     return (
//       <GridToolbarContainer>

//         <GridToolbarFilterButton />

//         <GridToolbarExport />
//       </GridToolbarContainer>
//     );
//   }
//   const getRowClassName = (params) => {
//     return 'rounded-row';
//   };

//   const columns = VISIBLE_FIELDS.map((field) => ({
//     field,
//     headerName: field === 'position' ? 'Position' : field,

//     width: 200,

//   }));


//   const handleRowClick = (params) => {
//     // Get the selected candidate data from the row
//     const selectedCandidateData = params.row;
//     setSelectedCandidate(selectedCandidateData);
//     setIsShifted(!isShifted);
//   };


//   const handleClosePopup = () => {
//     setSelectedCandidate(null);
//   };


//   return (
//     <div className="Profile">
//       {console.log("manager profile user _ id :", props.userId)}
//       <ToolBars userRole={props.userRole}></ToolBars>



//       <CssBaseline />

//       <Container fixed >


//         {candidatesData.length > 0 ? (
//           <div className="data-grid-container">

//             <DataGrid
//               slots={{ toolbar: CustomToolbar }}
//               getRowClassName={getRowClassName}
//               rows={candidatesData}
//               columns={columns}
//               onRowClick={handleRowClick} // Add the row click event handler
//             />
//           </div>
//         ) : (
//           <p>No candidate data available.</p>
//         )}

//       </Container>
//       {selectedCandidate && (
//         <div className="candidate-details">
//           <Button className="close-btn" onClick={handleClosePopup}>
//             X
//           </Button>
//           <Candidate_details token={props.token} setToken={props.setToken} selectedCandidate={selectedCandidate} />
//         </div>

//       )}
//     </div>
//   );
// }

// export default ProfileManager;import React, { useState, useEffect } from "react";
import React, { useState, useEffect } from "react";
import CandidateDataService from "./CandidateDataService";
import CandidateFilterForm from "./CandidateFilterForm";
import Card from "@mui/material/Card";
import { CSVLink } from "react-csv";
import { Typography ,Button,Table,TableHead,TableRow ,TableCell,TableBody } from "@mui/material";

import Position from "../Manager/Position";
import Header from "../../Components/Header";
function ProfileManager(props) {
  const [candidatesData, setCandidatesData] = useState([]);
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [filters, setFilters] = useState({
    education: "",
    workExperience: "",
    skills: "",
    gender: "",
    location: "",
  });
  const [sortOrder, setSortOrder] = useState("asc");
  const [sortByField, setSortByField] = useState(""); // Added state for sorting field

  useEffect(() => {
    fetchCandidatesData();
  }, []);

  const fetchCandidatesData = async () => {
    try {
      const response = await CandidateDataService.getAllCandidates(
        props.token
      );
      const dataWithIds = response.data.candidates.map((candidate) => ({
        ...candidate,
        id: candidate.id,
      }));
      setCandidatesData(dataWithIds);
    } catch (error) {
      console.error("Error fetching candidates:", error);
    }
  };

  const handleFilter = (newFilters) => {
    setFilters(newFilters);
  };

  const handleSortOrderChange = () => {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  const handleSortByChange = (field) => {
    setSortByField(field); // Update the sorting field
  };

  const filteredCandidates = candidatesData.filter((candidate) => {
    const { education, workExperience, skills, gender, location } = filters;

    return (
      (education === "" || candidate.education === education) &&
      (workExperience === "" ||
        candidate.work_experience === workExperience) &&
      (skills === "" ||
        candidate.skills?.toLowerCase().includes(skills.toLowerCase())) &&
      (gender === "" || candidate.gender === gender) &&
      (location === "" ||
        candidate.location?.toLowerCase().includes(location.toLowerCase()))
    );
  });

  const sortedCandidates = filteredCandidates.slice().sort((a, b) => {
    const key = sortOrder === "asc" ? 1 : -1;

    if (sortByField === "education") {
      return (
        key *
        (a.education || "").toLowerCase().localeCompare(
          (b.education || "").toLowerCase()
        )
      );
    } else if (sortByField === "workExperience") {
      return key * ((a.work_experience || 0) - (b.work_experience || 0));
    } else if (sortByField === "skills") {
      return (
        key *
        (a.skills || "").toLowerCase().localeCompare((b.skills || "").toLowerCase())
      );
    } else if (sortByField === "gender") {
      return (
        key *
        (a.gender || "").toLowerCase().localeCompare((b.gender || "").toLowerCase())
      );
    } else if (sortByField === "location") {
      return (
        key *
        (a.location || "").toLowerCase().localeCompare((b.location || "").toLowerCase())
      );
    }

    return 0;
  });

  const csvData = sortedCandidates.map((candidate) => ({
    First_Name: candidate.first_name,
    Last_Name: candidate.last_name,
    Gender: candidate.gender,
    Education: candidate.education,
    Work_Experience: candidate.work_experience,
    Skills: candidate.skills,
    Location: candidate.location,
  }));

  return (
    <div className="profile-div">
  
      <Header></Header>
 
    <div className="profile-card" style={{  borderRadius: "8px"}}>
      <CandidateFilterForm onFilter={handleFilter} />
      <div className="sorting-options" >
          <label>
            Sort By:
            <select
              value={sortByField}
              onChange={(e) => handleSortByChange(e.target.value)}
            >
              <option value="">None</option>
              <option value="education">Education</option>
              <option value="workExperience">Work Experience</option>
              <option value="skills">Skills</option>
              <option value="gender">Gender</option>
              <option value="location">Location</option>
            </select>
          </label>
          <button onClick={handleSortOrderChange}>Toggle Sort</button>
        </div>
      
        </div>
      
        <div className="candidates-list">
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>First Name</TableCell>
            <TableCell>Last Name</TableCell>
            <TableCell>Gender</TableCell>
            <TableCell>Education</TableCell>
            <TableCell>Work Experience</TableCell>
            <TableCell>Skills</TableCell>
            <TableCell>Location</TableCell>
            <TableCell>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {sortedCandidates.map((candidate) => (
            <TableRow key={candidate.id} className="tr-candidate">
              <TableCell>{candidate.first_name}</TableCell>
              <TableCell>{candidate.last_name}</TableCell>
              <TableCell>{candidate.gender}</TableCell>
              <TableCell>{candidate.education}</TableCell>
              <TableCell>{candidate.work_experience}</TableCell>
              <TableCell>{candidate.skills}</TableCell>
              <TableCell>{candidate.location}</TableCell>
              <TableCell>
               
                  <Button variant="contained" color="primary">
                    View Candidate
                  </Button>
                
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
        <div className="csv-export-button">
          <CSVLink
            data={csvData}
            filename={"candidates.csv"}
            className="btn btn-primary"
          >
            Download CSV
          </CSVLink>
        </div>
     
    </div>
  );
}

export default ProfileManager;