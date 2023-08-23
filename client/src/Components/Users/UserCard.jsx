


// import React, { useState, useEffect } from 'react';
// import Typography from '@mui/material/Typography';
// import Button from '@mui/material/Button';
// import { Container ,Box} from '@mui/material';
// import axios from 'axios';
// import Card from '@mui/material/Card';
// import JobApplicationStatus from './JobApplicationStatus';
// import "../../styles/User.css";
// export default function UserCard(props) {
//   const [showJobDetails, setShowJobDetails] = useState(false);
//   const [selectedJob, setSelectedJob] = useState(null);
//   const [appliedJobs, setAppliedJobs] = useState([]);
//   const [Jobs,setJobs]=useState([]);
//   // Fetch applied job data from the API
//   const fetchAppliedJobs = async () => {
//     try {
//       const response = await axios.get(`http://localhost:5000/view_applyed/${props.candidate_id}`, {
//         headers: {
//           Authorization: 'Bearer ' + props.token,
//         },
//       });

//       console.log('API Response:', response.data); // Log the response data

//       if (response.status === 200) {
//         console.log("response data is  : ",response);
//         setAppliedJobs(response.data.applications);
//         setJobs(response.data.jobs);
//       } else {
//         console.log('Error fetching applied jobs:', response.statusText);
//       }
//     } catch (error) {
//       console.error('Error:', error);
//     }
//   };

//   useEffect(() => {
//     // Fetch applied jobs when the component mounts
//     fetchAppliedJobs();
//   }, [props.candidate_id, props.token]);

//   const fetchJobTitle = async (jobId) => {
//     try {
//       const response = await axios.get("http://localhost:5000/view_jobs", {
//         headers: {
//           Authorization: 'Bearer ' + props.token,
//         },
//       });
  
//       const job = response.data.find((job) => job.job_id === jobId);
//       console.log('Fetched Job:', job);
//       return job ? job.job_title : 'Job Title Not Found';
//     } catch (error) {
//       console.error('Error fetching job title:', error);
//       return 'Job Title Error';
//     }
//   };
  
//   const handleJobDetailsClick = async (job) => {
//     const jobTitle = await fetchJobTitle(job.job_id);
//     setSelectedJob({ ...job, job_title: jobTitle });
//     setShowJobDetails(true);
//   };

//   const handleBackToProfile = () => {
//     setShowJobDetails(false);
//     setSelectedJob(null);
//   };

//   const handleNewApplication = async (newApplication) => {
//     // Call fetchAppliedJobs to update the applied jobs list when a new application is added
//     await fetchAppliedJobs();

//     // Prepend the new application to the appliedJobs array
//     setAppliedJobs([newApplication, ...appliedJobs]);
//   };

//   return (
//     <>
//      <Container maxWidth="sm" sx={{ marginBottom:'10px', borderRadius: '15px', boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)' }}>
//       <Card className="UserCard">
//         {showJobDetails && selectedJob && (
//           <JobApplicationStatus
//             jobTitle={selectedJob.job_title}
//             jobStatus={selectedJob.status}
//             appliedDate={selectedJob.application_date}
//             onBack={handleBackToProfile}
//           />
//         )}
//         {!showJobDetails && (
//           <Box className="user-card">
//             <Typography variant="h4">Welcome {props.username}!</Typography>
            
//             <Typography variant="h5">You are apply for the following positions:</Typography>
            
//               {appliedJobs.map((job) => (
//                 <div className="applied-job-item" key={job.job_id}>
//                   <Typography variant="body1">Job Title: {Jobs.find((j) => j.job_id === job.job_id).job_title}</Typography>
//                   <Typography variant="body2">Status: {job.status}</Typography>
//                   <Typography variant="body2">Applied Date: {job.application_date}</Typography>
//                   <Button  onClick={() => handleJobDetailsClick(job)}>
//                     View Details
//                   </Button>
//                 </div>
//               ))}
            
//           </Box>
//         )}
//       </Card>
//     </Container>
//     </>
//   );
// }

import React, { useState, useEffect } from 'react';
import { Container, Box, Card, CircularProgress, Typography, colors } from '@mui/material';
import axios from 'axios';
import JobApplicationStatus from './JobApplicationStatus';
import "../../styles/User.css";

export default function UserCard(props) {
  const [showJobDetails, setShowJobDetails] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [appliedJobs, setAppliedJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [Jobs, setJobs] = useState([]);
  const candidateIdFromLocalStorage = localStorage.getItem('candidate_id'); // Get candidate ID from local storage
// Determine the candidate ID to use (from local storage or props)
const candidateId = candidateIdFromLocalStorage || props.candidate_id;
console.log("candidateId = candidateIdFromLocalStorage || props.candidate_id;",candidateId);
  // Fetch applied job data from the API
  const fetchAppliedJobs = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/view_applyed/${candidateId}`, {
        headers: {
          Authorization: 'Bearer ' + props.token,
        },
      });

      console.log('API Response:', response.data); // Log the response data

      if (response.status === 200) {
        console.log("response data is  : ", response);
        setAppliedJobs(response.data.applications);
        setJobs(response.data.jobs);
      } else {
        console.log('Error fetching applied jobs:', response.statusText);
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Fetch applied jobs when the component mounts
    fetchAppliedJobs();
  }, [props.candidate_id, props.token]);

  const handleJobDetailsClick = async (job) => {
    setSelectedJob(job);
    setShowJobDetails(true);
  };

  const handleBackToProfile = () => {
    setShowJobDetails(false);
    setSelectedJob(null);
  };

  return (
    <>
      <Container maxWidth="sm" sx={{ marginTop: '15%', borderRadius: '15px'}}>
        <Card className="UserCard">
          {showJobDetails && selectedJob && (
            <JobApplicationStatus
              jobTitle={selectedJob.job_title}
              jobStatus={selectedJob.status}
              appliedDate={selectedJob.application_date}
              onBack={handleBackToProfile}
            />
          )}
          <Typography sx={{paddingTop:'30px',fontSize: '20px'}} variant="h4">Welcome {props.username}!</Typography>
          {!showJobDetails && (
            <Box className="user-card">
              {console.log("canduaite id at usercard: ",props.candidate_id)}

              <Typography sx={{paddingTop:'30px',fontSize: '30px'}}  variant="h5">You have applied for the following positions:</Typography>

              {loading ? (
                <Box textAlign="center" mt={4}>
                  <CircularProgress color="primary" />
                </Box>
              ) : (
                appliedJobs.map((job) => (
                  <div className="applied-job-item" key={job.job_id}>
                    <Typography  sx={{paddingTop:'20px',fontSize: '20px'}} variant="body1" color={colors.purple[700]}>
                      Job Title: {Jobs.find((j) => j.job_id === job.job_id).job_title}
                    </Typography>
                    <Typography  sx={{paddingTop:'8px',fontSize: '15px'}} variant="body2">Status: {job.status}</Typography>
                    <Typography  sx={{paddingTop:'8px',fontSize: '15px'}} variant="body2">Applied Date: {job.application_date}</Typography>
                  </div>
                ))
              )}
            </Box>
          )}
        </Card>
      </Container>
    </>
  );
}