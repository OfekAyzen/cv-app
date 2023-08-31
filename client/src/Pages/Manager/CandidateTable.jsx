
// import React from "react";
// import { TableRow, TableCell, Button, TableBody } from "@mui/material";
// import MailOutlineIcon from '@mui/icons-material/MailOutline';
// import LocalPhoneOutlinedIcon from '@mui/icons-material/LocalPhoneOutlined';
// import WcOutlinedIcon from '@mui/icons-material/WcOutlined';
// import AddLocationAltOutlinedIcon from '@mui/icons-material/AddLocationAltOutlined';
// import StatusChangeForm from './StatusChangeForm';
// import NoteForm from "./NoteForm";
// import DownloadCV from "./DownloadCV";

// const CandidateRow = ({ candidate, appliedJob, selectedJobId, handleViewCandidate, handleDeleteApplication }) => {
//   return (
//     <TableRow key={appliedJob.job_id}>
//       <TableCell>{new Date(appliedJob.application_date).toLocaleDateString("en-GB")}</TableCell>
//       <TableCell>{candidate.first_name} {candidate.last_name}</TableCell>
//       <TableCell>{candidate.location}</TableCell>
//       <TableCell>{candidate.gender}</TableCell>
//       <TableCell>{appliedJob.job_title}</TableCell>
//       <TableCell>{candidate.education}</TableCell>
//       <TableCell>{candidate.work_experience}</TableCell>
//       <TableCell>{candidate.skills}</TableCell>
//       <TableCell>{appliedJob.status}</TableCell>
//       <TableCell>
//         <Button variant="contained" color="primary" onClick={() => handleViewCandidate(candidate, appliedJob.job_id)}>
//           View Candidate
//         </Button>
//       </TableCell>
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
//         transition: "background-color 0.3s",
//         backgroundColor: isRowClicked ? "#ad2069635" : "transparent",
//         '&:hover': {
//           backgroundColor: "#ad206963",
          
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

import React, { useState } from "react";
import { TableRow, TableCell, Button, TableBody } from "@mui/material";
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import LocalPhoneOutlinedIcon from '@mui/icons-material/LocalPhoneOutlined';
import WcOutlinedIcon from '@mui/icons-material/WcOutlined';
import AddLocationAltOutlinedIcon from '@mui/icons-material/AddLocationAltOutlined';
import StatusChangeForm from './StatusChangeForm';
import NoteForm from "./NoteForm";
import DownloadCV from "./DownloadCV";

const CandidateRow = ({ candidate, appliedJob, selectedJobId, handleViewCandidate, handleDeleteApplication }) => {
  const [isRowClicked, setIsRowClicked] = useState(false);

  const handleRowClick = () => {
    setIsRowClicked(!isRowClicked);
  };

  return (
    <TableRow
      key={appliedJob.job_id}
      sx={{
        borderRadius: "10px",
        transition: "box-shadow 0.3s",
        boxShadow: isRowClicked ? "0px 0px 5px 3px #ad2069" : "none",
        '&:hover': {
          boxShadow: "0px 0px 5px 3px #ad2069",
          cursor: "pointer",
        },
      }}
      onClick={() => handleViewCandidate(candidate, appliedJob.job_id)}
    >
      <TableCell>{new Date(appliedJob.application_date).toLocaleDateString("en-GB")}</TableCell>
      <TableCell>{candidate.first_name} {candidate.last_name}</TableCell>
      <TableCell>{candidate.location}</TableCell>
      <TableCell>{candidate.gender}</TableCell>
      <TableCell>{appliedJob.job_title}</TableCell>
      <TableCell>{candidate.education}</TableCell>
      <TableCell>{candidate.work_experience}</TableCell>
      <TableCell>{candidate.skills}</TableCell>
      <TableCell>{appliedJob.status}</TableCell>
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

const CandidateTable = ({ candidates, selectedJobId, handleViewCandidate, handleDeleteApplication }) => {
  return (
    <TableBody>
      {candidates.map((candidate) => (
        candidate.appliedJobs.map((appliedJob) => (
          <CandidateRow
            key={appliedJob.job_id}
            candidate={candidate}
            appliedJob={appliedJob}
            selectedJobId={selectedJobId}
            handleViewCandidate={handleViewCandidate}
            handleDeleteApplication={handleDeleteApplication}
          />
        ))
      ))}
    </TableBody>
  );
};

export default CandidateTable;