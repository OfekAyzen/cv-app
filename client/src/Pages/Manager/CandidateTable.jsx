

// import React, { useState } from "react";
// import { TableRow, TableCell, Button, TableBody } from "@mui/material";
// import MailOutlineIcon from '@mui/icons-material/MailOutline';
// import LocalPhoneOutlinedIcon from '@mui/icons-material/LocalPhoneOutlined';
// import WcOutlinedIcon from '@mui/icons-material/WcOutlined';
// import AddLocationAltOutlinedIcon from '@mui/icons-material/AddLocationAltOutlined';
// import StatusChangeForm from './StatusChangeForm';
// import NoteForm from "./NoteForm";
// import DownloadCV from "./DownloadCV";

// const CandidateRow = ({ candidate, appliedJob, selectedJobId, handleViewCandidate, handleDeleteApplication }) => {
//   const [isRowClicked, setIsRowClicked] = useState(false);

//   const handleRowClick = () => {
//     setIsRowClicked(!isRowClicked);
//   };

//   return (
//     <TableRow
//       key={appliedJob.job_id}
//       sx={{
//         borderRadius: "10px",
//         transition: "box-shadow 0.3s",
//         boxShadow: isRowClicked ? "0px 0px 5px 3px #ad2069" : "none",
//         '&:hover': {
//           boxShadow: "0px 0px 5px 3px #ad2069",
//           cursor: "pointer",
//         },
//       }}
//       onClick={() => handleViewCandidate(candidate, appliedJob.job_id)}
//     >
//       <TableCell>{new Date(appliedJob.application_date).toLocaleDateString("en-GB")}</TableCell>
//       <TableCell>{candidate.first_name} {candidate.last_name}</TableCell>
//       <TableCell>{candidate.location}</TableCell>
//       <TableCell>{candidate.gender}</TableCell>
//       <TableCell>{appliedJob.job_title}</TableCell>
//       <TableCell>{candidate.education}</TableCell>
//       <TableCell>{candidate.work_experience}</TableCell>
//       <TableCell>{candidate.skills}</TableCell>
//       <TableCell>{appliedJob.status}</TableCell>
//       {/* <TableCell>
//         <Button variant="contained" color="primary" onClick={() => handleViewCandidate(candidate, appliedJob.job_id)}>
//           View Candidate
//         </Button>
//       </TableCell> */}
//       <TableCell>
//         <Button variant="contained" color="secondary" onClick={() => handleDeleteApplication(candidate.id, appliedJob.application)}>
//           Delete
//         </Button>
//       </TableCell>
//     </TableRow>
//   );
// };

// const CandidateTable = ({ candidates, selectedJobId, handleViewCandidate, handleDeleteApplication }) => {
//   return (
//     <TableBody>
//       {candidates.map((candidate) => (
//         candidate.appliedJobs.map((appliedJob) => (
//           <CandidateRow
//             key={appliedJob.job_id}
//             candidate={candidate}
//             appliedJob={appliedJob}
//             selectedJobId={selectedJobId}
//             handleViewCandidate={handleViewCandidate}
//             handleDeleteApplication={handleDeleteApplication}
//           />
//         ))
//       ))}
//     </TableBody>
//   );
// };

// export default CandidateTable;





// import React, { useState } from "react";
// import { TableRow, TableCell, Button, TableBody,TableHead } from "@mui/material";
// import MailOutlineIcon from '@mui/icons-material/MailOutline';
// import LocalPhoneOutlinedIcon from '@mui/icons-material/LocalPhoneOutlined';
// import WcOutlinedIcon from '@mui/icons-material/WcOutlined';
// import AddLocationAltOutlinedIcon from '@mui/icons-material/AddLocationAltOutlined';
// import StatusChangeForm from './StatusChangeForm';
// import NoteForm from "./NoteForm";
// import DownloadCV from "./DownloadCV";
// import { FormControl, InputLabel, Select, MenuItem, Box } from "@mui/material";
// const CandidateRow = ({ candidate, appliedJob, selectedJobId, handleViewCandidate, handleDeleteApplication }) => {
//   const [isRowClicked, setIsRowClicked] = useState(false);

//   const handleRowClick = () => {
//     setIsRowClicked(!isRowClicked);
//   };

//   return (
//     <TableRow
//       key={candidate.candidate.id}
//       sx={{
//         borderRadius: "10px",
//         transition: "box-shadow 0.3s",
//         boxShadow: isRowClicked ? "0px 0px 5px 3px #ad2069" : "none",
//         '&:hover': {
//           boxShadow: "0px 0px 5px 3px #ad2069",
//           cursor: "pointer",
//         },
//       }}
//       onClick={() => handleViewCandidate(candidate, candidate.job.id)}
//     >
//       {console.log("candidate name  : ",candidate.candidate.first_name)}
//       <TableCell>{candidate.candidate.createdAt}</TableCell>
//       <TableCell>{candidate.candidate.first_name} {candidate.candidate.last_name}</TableCell>
//       <TableCell>{candidate.candidate.location}</TableCell>
//       <TableCell>{candidate.candidate.gender}</TableCell>
//       <TableCell>{candidate.job.job_title}</TableCell>
//       <TableCell>{candidate.candidate.education}</TableCell>
//       <TableCell>{candidate.candidate.work_experience}</TableCell>
//       <TableCell>{candidate.candidate.skills}</TableCell>
//       <TableCell></TableCell>
//       {/* <TableCell>
//         <Button variant="contained" color="primary" onClick={() => handleViewCandidate(candidate, appliedJob.job_id)}>
//           View Candidate
//         </Button>
//       </TableCell> */}
//       <TableCell>
//         <Button variant="contained" color="secondary" onClick={() => handleDeleteApplication(candidate.id, appliedJob.application)}>
//           Delete
//         </Button>
//       </TableCell>
//     </TableRow>
//   );
// };



// const CandidateTable = ({ candidates, selectedJobId, handleViewCandidate, handleDeleteApplication}) => {
//   const [sortByField, setSortByField] = useState(""); // State to hold the sorting field
//   const [sortOrder, setSortOrder] = useState("asc"); // State to hold the sorting order (asc or desc)

//   // Create a function to sort candidates based on the selected sorting criteria
//   const sortCandidates = (candidates) => {
//     return candidates.slice().sort((a, b) => {
//       let comparison = 0;

//       if (sortByField === "education") {
//         comparison = a.candidate.education.localeCompare(b.candidate.education);
//       } else if (sortByField === "skills") {
//         comparison = a.candidate.skills.localeCompare(b.candidate.skills);
//       } else if (sortByField === "gender") {
//         comparison = a.candidate.gender.localeCompare(b.candidate.gender);
//       } else if (sortByField === "location") {
//         comparison = a.candidate.location.localeCompare(b.candidate.location);
//       } else if (sortByField === "application_date") {
//         const dateA = new Date(a.candidate.createdAt).getTime();
//         const dateB = new Date(b.candidate.createdAt).getTime();
//         comparison = dateA - dateB;
//       }

//       // Apply sortOrder (ascending or descending)
//       return sortOrder === "asc" ? comparison : -comparison;
//     });
//   };

//   const sortedCandidates = sortCandidates(candidates);

//   const handleSortByChange = (field) => {
//     if (field === sortByField) {
//       // Toggle the sorting order if the same field is selected
//       setSortOrder(sortOrder === "asc" ? "desc" : "asc");
//     } else {
//       // Set the new sorting field and default to ascending order
//       setSortByField(field);
//       setSortOrder("asc");
//     }
//   };

//   return (
//     <>
//       <div>
//       <div className="filter-order" style={{ borderRadius: "20px" }}>
//       <div className="orderby">
//         <FormControl variant="outlined">
//           <InputLabel>Sort By:</InputLabel>
//           <Select
//             value={sortByField}
//             onChange={(e) => handleSortByChange(e.target.value)}
//             label="Sort By:"
//           >
//             <MenuItem value="">
//               <em>None</em>
//             </MenuItem>
//             <MenuItem value="education">Education</MenuItem>
//             <MenuItem value="skills">Skills</MenuItem>
//             <MenuItem value="gender">Gender</MenuItem>
//             <MenuItem value="location">Location</MenuItem>
//             <MenuItem value="application_date">Date</MenuItem>
//           </Select>
//         </FormControl>
//       </div>
//       </div>
//       <TableHead>
//                        <TableRow>
//                          <TableCell>Date Apply</TableCell>
//                          <TableCell>Full Name</TableCell>
//                          <TableCell>Location</TableCell>
//                          <TableCell>Gender</TableCell>
//                          <TableCell>Position</TableCell>
//                          <TableCell>Education</TableCell>
//                          <TableCell>Work Experience</TableCell>
//                          <TableCell>Skills</TableCell>


//                          <TableCell>Status</TableCell>

//                          <TableCell>Action</TableCell>
                         
//                        </TableRow>
//                      </TableHead>
//       <TableBody>
//         {sortedCandidates.map((candidate) => (
//           <CandidateRow
//             key={candidate.candidate.id}
//             candidate={candidate}
//             selectedJobId={selectedJobId}
//             handleViewCandidate={handleViewCandidate}
//             handleDeleteApplication={handleDeleteApplication}
//           />
//         ))}
//       </TableBody>
//     </div>

// </>
//   );
// };

// export default CandidateTable;


import React, { useState } from "react";
import {
  TableRow,
  TableCell,
  Button,
  TableBody,
  TableHead,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
} from "@mui/material";
import CandidateFilterForm from "./CandidateFilterForm"; // Import the CandidateFilterForm component
import "../../styles/Profilemanager.css";

const CandidateRow = ({ candidate, appliedJob, selectedJobId, handleViewCandidate, handleDeleteApplication }) => {
  const [isRowClicked, setIsRowClicked] = useState(false);

  const handleRowClick = () => {
    setIsRowClicked(!isRowClicked);
  };

  return (
    <TableRow
      key={candidate.candidate.id}
      sx={{
        borderRadius: "10px",
        transition: "box-shadow 0.3s",
        boxShadow: isRowClicked ? "0px 0px 5px 3px #ad2069" : "none",
        '&:hover': {
          boxShadow: "0px 0px 5px 3px #ad2069",
          cursor: "pointer",
        },
      }}
      onClick={() => handleViewCandidate(candidate, candidate.job.id)}
    >
      {console.log("candidate name  : ",candidate.candidate.first_name)}
      <TableCell>{candidate.candidate.createdAt}</TableCell>
      <TableCell>{candidate.candidate.first_name} {candidate.candidate.last_name}</TableCell>
      <TableCell>{candidate.candidate.location}</TableCell>
      <TableCell>{candidate.candidate.gender}</TableCell>
      <TableCell>{candidate.job.job_title}</TableCell>
      <TableCell>{candidate.candidate.education}</TableCell>
      <TableCell>{candidate.candidate.work_experience}</TableCell>
      <TableCell>{candidate.candidate.skills}</TableCell>
      <TableCell></TableCell>
      {/* <TableCell>
        <Button variant="contained" color="primary" onClick={() => handleViewCandidate(candidate, appliedJob.job_id)}>
          View Candidate
        </Button>
      </TableCell> */}
      <TableCell>
        <Button variant="contained" color="secondary" onClick={() => handleDeleteApplication(candidate.id, appliedJob.application)}>
          Delete
        </Button>
      </TableCell>
    </TableRow>
  );
};

const CandidateTable = ({
  candidates,
  selectedJobId,
  handleViewCandidate,
  handleDeleteApplication,
}) => {
  const [sortByField, setSortByField] = useState(""); // State to hold the sorting field
  const [sortOrder, setSortOrder] = useState("asc"); // State to hold the sorting order (asc or desc)
  const [filters, setFilters] = useState({
    education: "",
    workExperience: "",
    skills: "",
    gender: "",
    location: "",
  });

  // Create a function to sort candidates based on the selected sorting criteria
  const sortCandidates = (candidates) => {
    return candidates.slice().sort((a, b) => {
      let comparison = 0;

      if (sortByField === "education") {
        comparison = a.candidate.education.localeCompare(b.candidate.education);
      } else if (sortByField === "skills") {
        comparison = a.candidate.skills.localeCompare(b.candidate.skills);
      } else if (sortByField === "gender") {
        comparison = a.candidate.gender.localeCompare(b.candidate.gender);
      } else if (sortByField === "location") {
        comparison = a.candidate.location.localeCompare(b.candidate.location);
      } else if (sortByField === "application_date") {
        const dateA = new Date(a.candidate.createdAt).getTime();
        const dateB = new Date(b.candidate.createdAt).getTime();
        comparison = dateA - dateB;
      }

      // Apply sortOrder (ascending or descending)
      return sortOrder === "asc" ? comparison : -comparison;
    });
  };

  const filteredCandidates = candidates.filter((candidate) => {
    const {
      education,
      workExperience,
      skills,
      gender,
      location,
    } = filters;

    return (
      (education === "" || candidate.candidate.education === education) &&
      (workExperience === "" ||
        candidate.candidate.work_experience === workExperience) &&
      (skills === "" ||
        candidate.candidate.skills
          .toLowerCase()
          .includes(skills.toLowerCase())) &&
      (gender === "" ||
        candidate.candidate.gender.toLowerCase() === gender.toLowerCase()) &&
      (location === "" ||
        candidate.candidate.location
          .toLowerCase()
          .includes(location.toLowerCase()))
    );
  });

  const sortedCandidates = sortCandidates(filteredCandidates);

  const handleSortByChange = (field) => {
    if (field === sortByField) {
      // Toggle the sorting order if the same field is selected
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      // Set the new sorting field and default to ascending order
      setSortByField(field);
      setSortOrder("asc");
    }
  };

  const handleFilter = (newFilters) => {
    setFilters(newFilters);
  };

  return (
    <>
      <CandidateFilterForm onFilter={handleFilter} /> {/* Include the filter component */}
      <div>
        <div
          className="filter-order"
          style={{ borderRadius: "20px" }}
        >
          <div className="orderby">
            <FormControl variant="outlined">
              <InputLabel>Sort By:</InputLabel>
              <Select
                value={sortByField}
                onChange={(e) => handleSortByChange(e.target.value)}
                label="Sort By:"
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value="education">Education</MenuItem>
                <MenuItem value="skills">Skills</MenuItem>
                <MenuItem value="gender">Gender</MenuItem>
                <MenuItem value="location">Location</MenuItem>
                <MenuItem value="application_date">Date</MenuItem>
              </Select>
            </FormControl>
          </div>
        </div>
        <TableHead>
          <TableRow>
            <TableCell>Date Apply</TableCell>
            <TableCell>Full Name</TableCell>
            <TableCell>Location</TableCell>
            <TableCell>Gender</TableCell>
            <TableCell>Position</TableCell>
            <TableCell>Education</TableCell>
            <TableCell>Work Experience</TableCell>
            <TableCell>Skills</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {sortedCandidates.map((candidate) => (
            <CandidateRow
              key={candidate.candidate.id}
              candidate={candidate}
              selectedJobId={selectedJobId}
              handleViewCandidate={handleViewCandidate}
              handleDeleteApplication={handleDeleteApplication}
            />
          ))}
        </TableBody>
      </div>
    </>
  );
          }
  export default CandidateTable;