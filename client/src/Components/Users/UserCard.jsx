
// import React, { useState, useEffect } from 'react';
// import Typography from '@mui/material/Typography';
// import Button from '@mui/material/Button';
// import axios from 'axios';
// import Card from '@mui/material/Card';
// import JobApplicationStatus from './JobApplicationStatus';
// import "../../styles/User.css";
// export default function UserCard(props) {
//   const [showJobDetails, setShowJobDetails] = useState(false);
//   const [selectedJob, setSelectedJob] = useState(null);
//   const [appliedJobs, setAppliedJobs] = useState([]);

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
//         setAppliedJobs(response.data.applications);
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
//       <Card className='UserCard'>
//         {showJobDetails && selectedJob && (
//           <JobApplicationStatus
//             jobTitle={selectedJob.job_title}
//             jobStatus={selectedJob.status}
//             appliedDate={selectedJob.application_date}
//             onBack={handleBackToProfile}
//           />
//         )}
//         {!showJobDetails && (
//           <div className='user-card'>
//             <Typography variant="h4">Welcome {props.username} !</Typography>
//             <Typography variant="h5">Your applied Jobs</Typography>
//             {console.log("applied job: ", appliedJobs)}
//             {appliedJobs && appliedJobs.map((job) => (
//               <div key={job.job_id}>
//                 <Typography>Applied Date :{job.application_date}</Typography>
//                 <Typography>Status: {job.status}</Typography>
//                 <Button onClick={() => handleJobDetailsClick(job)}>View Details</Button>
//               </div>
//             ))}
//           </div>
//         )}
//       </Card>
//     </>
//   );
// }

import React, { useState, useEffect } from 'react';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import axios from 'axios';
import Card from '@mui/material/Card';
import JobApplicationStatus from './JobApplicationStatus';
import "../../styles/User.css";
export default function UserCard(props) {
  const [showJobDetails, setShowJobDetails] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [appliedJobs, setAppliedJobs] = useState([]);

  // Fetch applied job data from the API
  const fetchAppliedJobs = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/view_applyed/${props.candidate_id}`, {
        headers: {
          Authorization: 'Bearer ' + props.token,
        },
      });

      console.log('API Response:', response.data); // Log the response data

      if (response.status === 200) {
        setAppliedJobs(response.data.applications);
      } else {
        console.log('Error fetching applied jobs:', response.statusText);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    // Fetch applied jobs when the component mounts
    fetchAppliedJobs();
  }, [props.candidate_id, props.token]);

  const fetchJobTitle = async (jobId) => {
    try {
      const response = await axios.get("http://localhost:5000/view_jobs", {
        headers: {
          Authorization: 'Bearer ' + props.token,
        },
      });
  
      const job = response.data.find((job) => job.job_id === jobId);
      console.log('Fetched Job:', job);
      return job ? job.job_title : 'Job Title Not Found';
    } catch (error) {
      console.error('Error fetching job title:', error);
      return 'Job Title Error';
    }
  };
  
  const handleJobDetailsClick = async (job) => {
    const jobTitle = await fetchJobTitle(job.job_id);
    setSelectedJob({ ...job, job_title: jobTitle });
    setShowJobDetails(true);
  };

  const handleBackToProfile = () => {
    setShowJobDetails(false);
    setSelectedJob(null);
  };

  const handleNewApplication = async (newApplication) => {
    // Call fetchAppliedJobs to update the applied jobs list when a new application is added
    await fetchAppliedJobs();

    // Prepend the new application to the appliedJobs array
    setAppliedJobs([newApplication, ...appliedJobs]);
  };

  return (
    <>
      <Card className='UserCard'>
        {showJobDetails && selectedJob && (
          <JobApplicationStatus
            jobTitle={selectedJob.job_title}
            jobStatus={selectedJob.status}
            appliedDate={selectedJob.application_date}
            
            onBack={handleBackToProfile}
          />
        )}
          {console.log("showJobDetails",showJobDetails)}
        {!showJobDetails && (
        
          <div className='user-card'>
            <Typography variant="h4">Welcome {props.username} !</Typography>
            <Typography variant="h5">Your applied Jobs</Typography>
            {console.log("applied job: ", appliedJobs)}
            {appliedJobs && appliedJobs.map((job) => (
              <div key={job.job_id}>
                
                <Typography>Status: {job.status}</Typography>
                <Button onClick={() => handleJobDetailsClick(job)}>View Details</Button>
              </div>
            ))}
          </div>
        )}
      </Card>
    </>
  );
}