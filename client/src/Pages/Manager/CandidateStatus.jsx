// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { Select, MenuItem, Button } from "@mui/material";

// function CandidateStatus(props) {
//   const [applications, setApplications] = useState([]);
//   const [jobs, setJobs] = useState([]);
//   const [newStatus, setNewStatus] = useState(""); // State to store the new status
//   const [message, setMessage] = useState(""); // State to store server messages
//   const [messageColor, setMessageColor] = useState("black"); // State to store message color

//   useEffect(() => {
//     fetchAppliedJobs();
//   }, []);

//   const fetchAppliedJobs = async () => {
//     try {
//       const response = await axios.get(
//         `http://localhost:5000/view_applyed/${props.candidate_id}`,
//         {
//           headers: {
//             Authorization: `Bearer ${props.token}`,
//           },
//         }
//       );

//       const { applications, jobs } = response.data;
//       console.log("response : ", response);
//       setApplications(applications);
//       setJobs(jobs);
//     } catch (error) {
//       console.error("Error fetching applied jobs:", error);
//     }
//   };

//   const handleStatusChange = async (applicationId, newStatus) => {
//     try {
//       // Make an API call to update the status
//       const response =await axios.post(
//         `http://localhost:5000/update_status`,
//         {
//           application_id: applicationId,
//           status: newStatus,
//         },
//         {
//           headers: {
//             Authorization: `Bearer ${props.token}`,
//           },
//         }
//       );

//       // Update the newStatus for the specific application
      
//       setApplications((prevApplications) =>
//         prevApplications.map((application) =>
//           application.application_id === applicationId
//             ? { ...application, newStatus }
//             : application
//         )
//       );
//        setMessageColor(response.status === 200 ? "green" : "red");
//        setMessage(response.data.message);
   
//     } catch (error) {
//       console.error("Error updating status:", error);
//     }
//   };

//   return (
//     <div>
//       <hr />
    
//         {applications.map((application, index) => (
//           <div key={index}>
           
//             <p>Job Title: {jobs.find((job) => job.job_id === application.job_id)?.job_title}</p>
//             <p>Application Date: {application.application_date}</p>
//             <p>
//               Status: {application.newStatus ? application.newStatus : application.status}
//             </p>
//             {/* Dropdown menu for selecting the new status */}
//             <Select style={{height:"30px"}}
//               value={application.newStatus || application.status}
//               onChange={(e) => setNewStatus(e.target.value)}
//             >
//               <MenuItem value={"Accepted"}>Accepted</MenuItem>
//               <MenuItem value={"Pending"}>Pending</MenuItem>
//               <MenuItem value={"Application Received"}>Application Received</MenuItem>
//               <MenuItem value={"Application Under Review"}>Application Under Review</MenuItem>
//               <MenuItem value={"Interview Scheduled"}>Interview Scheduled</MenuItem>
//               <MenuItem value={"Assessment/Testing"}>Assessment/Testing</MenuItem>
//               <MenuItem value={"Application Unsuccessful"}>Application Unsuccessful</MenuItem>
//               {/* Add more status options as needed */}
//             </Select>
            
//             <Button style= {{color:"#ad2069 " }} onClick={() => handleStatusChange(application.application_id, newStatus)}>
//               Change Status
//             </Button>
           
//           </div>
//         ))}
//         <p style={{ color: messageColor }}>{message}</p> {/* Display the response message */}
     
//     </div>
//   );
// }

//export default CandidateStatus;
import React from "react";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";

function CandidateStatus({ token, candidate_id, selectedJobId, currentStatus, onStatusChange }) {
  const handleChange = (event) => {
    onStatusChange(event.target.value); // Update the selected status
    // Code to update the status in the backend (you'll need to implement this)
  };

  return (
    <FormControl variant="outlined">
      <InputLabel>Status</InputLabel>
      <Select
        value={currentStatus}
        onChange={handleChange}
        label="Status"
      >
       <MenuItem value={"Accepted"}>Accepted</MenuItem>
      <MenuItem value={"Pending"}>Pending</MenuItem>
      <MenuItem value={"Application Received"}>Application Received</MenuItem>
      <MenuItem value={"Application Under Review"}>Application Under Review</MenuItem>
      <MenuItem value={"Interview Scheduled"}>Interview Scheduled</MenuItem>
      <MenuItem value={"Assessment/Testing"}>Assessment/Testing</MenuItem>
      <MenuItem value={"Application Unsuccessful"}>Application Unsuccessful</MenuItem>
      </Select>
    </FormControl>
  );
}

export default CandidateStatus;