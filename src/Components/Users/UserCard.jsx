
// import React, { useState, useEffect } from 'react';
// import { Container, Box, Card, CircularProgress, Typography, colors } from '@mui/material';
// import axios from 'axios';
// import JobApplicationStatus from './JobApplicationStatus';
// import "../../styles/User.css";

// export default function UserCard(props) {
//   const [showJobDetails, setShowJobDetails] = useState(false);
//   const [selectedJob, setSelectedJob] = useState(null);
//   const [appliedJobs, setAppliedJobs] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [Jobs, setJobs] = useState([]);
//   const candidateIdFromLocalStorage = localStorage.getItem('candidate_id'); // Get candidate ID from local storage
//   // Determine the candidate ID to use (from local storage or props)
//   const candidateId = candidateIdFromLocalStorage || props.candidate_id;

//   // Fetch applied job data from the API
//   const fetchAppliedJobs = async () => {
//     try {
//       const response = await axios.get(`http://localhost:5000/view_applyed/${candidateId}`, {
//         headers: {
//           Authorization: 'Bearer ' + props.token,
//         },
//       });

   

//       if (response.status === 200) {
       
//         setAppliedJobs(response.data.applications);
//         setJobs(response.data.jobs);
//       } else {
//         console.log('Error fetching applied jobs:', response.statusText);
//       }
//     } catch (error) {
//       console.error('Error:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     // Fetch applied jobs when the component mounts
//     fetchAppliedJobs();
//   }, [props.candidate_id, props.token]);

//   const handleJobDetailsClick = async (job) => {
//     setSelectedJob(job);
//     setShowJobDetails(true);
//   };

//   const handleBackToProfile = () => {
//     setShowJobDetails(false);
//     setSelectedJob(null);
//   };

//   const welcomeMessage = props.username || `${JSON.parse(localStorage.getItem('savedApplication')).first_name} ${JSON.parse(localStorage.getItem('savedApplication')).last_name}`;
//   return (
//     <>
//       <Container maxWidth="sm" sx={{ marginTop: '15%', borderRadius: '15px'}}>
//         <Card className="UserCard">
//           {showJobDetails && selectedJob && (
//             <JobApplicationStatus
//               jobTitle={selectedJob.job_title}
//               jobStatus={selectedJob.status}
//               appliedDate={selectedJob.application_date}
//               onBack={handleBackToProfile}
//             />
//           )}
//           <Typography sx={{ paddingTop: '30px', fontSize: '20px' }} variant="h4">
//             Welcome {welcomeMessage}!
//           </Typography>
//           {!showJobDetails && (
//             <Box className="user-card">
//               <Typography sx={{ paddingTop: '30px', fontSize: '30px' }} variant="h5">
//                 You have applied for the following positions:
//               </Typography>
//               {loading ? (
//                 <Box textAlign="center" mt={4}>
//                   <CircularProgress color="primary" />
//                 </Box>
//               ) : (
//                 appliedJobs.map((job) => (
//                   <div className="applied-job-item" key={job.job_id}>
//                     <Typography sx={{ paddingTop: '20px', fontSize: '20px' }} variant="body1" color={colors.purple[700]}>
//                       Job Title: {Jobs.find((j) => j.job_id === job.job_id).job_title}
//                     </Typography>
//                     <Typography sx={{ paddingTop: '8px', fontSize: '15px' }} variant="body2">
//                       Status: {job.status}
//                     </Typography>
//                     <Typography sx={{ paddingTop: '8px', fontSize: '15px' }} variant="body2">
//                       Applied Date: {job.application_date}
//                     </Typography>
//                   </div>
//                 ))
//               )}
//             </Box>
//           )}
//         </Card>
//       </Container>
//     </>
//   );
// }

// import React, { useState, useEffect } from 'react';
// import {
//   Container,
//   Card,
//   Typography,
//   CircularProgress,
// } from '@mui/material';
// import { API, graphqlOperation } from 'aws-amplify';
// import { getCandidateJobs } from '../../graphql/queries';

// function UserCard(props) {
//   const [appliedJobs, setAppliedJobs] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchAppliedJobs = async () => {
//       try {
//         const response = await API.graphql(
//           graphqlOperation(getCandidateJobs, {
//             id: props.candidateId,
//           })
//         );

//         if (response.data.getCandidateJobs) {
//           setAppliedJobs(response.data.getCandidateJobs);
//         } else {
//           console.log('No applied jobs found for the candidate');
//         }
//       } catch (error) {
//         console.error('Error fetching applied jobs:', error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     // Fetch applied jobs when the component mounts
//     fetchAppliedJobs();
//   }, [props.candidateId]);

//   return (
//     <Container maxWidth="sm" sx={{ marginTop: '15%', borderRadius: '15px' }}>
//       <Card className="UserCard">
//         <Typography sx={{ paddingTop: '30px', fontSize: '20px' }} variant="h4">
//           Welcome {props.username}!
//         </Typography>
//         <Typography
//           sx={{ paddingTop: '30px', fontSize: '30px' }}
//           variant="h5"
//         >
//           You have applied for the following positions:
//         </Typography>
//         {loading ? (
//           <Container textAlign="center" mt={4}>
//             <CircularProgress color="primary" />
//           </Container>
//         ) : (
//           appliedJobs.map((job) => (
//             <div className="applied-job-item" key={job.id}>
//               <Typography
//                 sx={{ paddingTop: '20px', fontSize: '20px' }}
//                 variant="body1"
//                 color={colors.purple[700]}
//               >
//                 Job Title: {job.jobs.job_title}
//               </Typography>
//               <Typography
//                 sx={{ paddingTop: '8px', fontSize: '15px' }}
//                 variant="body2"
//               >
//                 Status: {job.status}
//               </Typography>
//               <Typography
//                 sx={{ paddingTop: '8px', fontSize: '15px' }}
//                 variant="body2"
//               >
//                 Applied Date: {job.createdAt}
//               </Typography>
//             </div>
//           ))
//         )}
//       </Card>
//     </Container>
//   );
// }

// export default UserCard;


import React, { useState, useEffect } from 'react';
import { Container, Box, Card, CircularProgress, Typography, colors } from '@mui/material';
import axios from 'axios';
import JobApplicationStatus from './JobApplicationStatus';
import "../../styles/User.css";
import { Auth } from 'aws-amplify';
import { listCandidateJobs } from '../../graphql/queries'; // Import your GraphQL query
import { Link as RouterLink } from 'react-router-dom';
import { API, graphqlOperation } from 'aws-amplify'; // Import API and graphqlOperation
import { getCandidateJobs } from '../../graphql/queries'; // Import your GraphQL query

export default function UserCard(props) {
  const [appliedJobs, setAppliedJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState('');
  const [userFullName, setUserFullName] = useState('');
  const [userStatus, setUserStatus] = useState('');

  useEffect(() => {
    const getUsername = async () => {
      try {
        const user = await Auth.currentAuthenticatedUser();
        const username = user.username; // Use the username property to get the Cognito username
        setUsername(username);
        const givenName = user.attributes.given_name;
        const familyName = user.attributes.family_name;
        setUserFullName(`${givenName} ${familyName}`);
      } catch (error) {
        console.error('Error getting username:', error);
      }
    };

    getUsername();

    const fetchAppliedJobs = async () => {
      try {
        const response = await API.graphql(
          graphqlOperation(getCandidateJobs, {
            id: props.candidateId,
          })
        );

        if (response.data.getCandidateJobs) {
          const candidate = response.data.getCandidateJobs.candidate;
          setUserStatus(candidate.status);

          const jobs = response.data.getCandidateJobs.jobs;
          setAppliedJobs(jobs);
        } else {
          console.log('No applied jobs found for the candidate');
        }
      } catch (error) {
        console.error('Error fetching applied jobs:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAppliedJobs();
  }, [props.candidateId]);

  // useEffect(() => {
  //   // const getUsername = async () => {
  //   //   try {
  //   //     // Your code to get the username
  //   //   } catch (error) {
  //   //     console.error('Error getting username:', error);
  //   //   }
  //   // };

  //   getUsername(); // Call the getUsername function to get the username

  //   const fetchAppliedJobs = async () => {
  //     try {
  //       const response = await API.graphql(
  //         graphqlOperation(listCandidateJobs, {
  //           filter: {
  //             candidateId: { eq: props.candidateId }, // Filter jobs by candidateId
  //           },
  //         })
  //       );
  //         console.log("response list candidatejobs : ",response);
  //       if (response.data.listCandidateJobs.items.length > 0) {
  //         // If there are items in the list, set them in the state
  //         setAppliedJobs(response.data.listCandidateJobs.items);
  //       } else {
  //         console.log('No applied jobs found for the candidate');
  //       }
  //     } catch (error) {
  //       console.error('Error fetching applied jobs:', error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   // Fetch applied jobs when the component mounts
  //   fetchAppliedJobs();
  // }, [props.candidateId]);

  const getUsername = async () => {
    try {
      const user = await Auth.currentAuthenticatedUser();
      const username = user.attributes['cognito:username']; // Use the correct attribute name
      console.log('User attributes:', user.attributes); // Add this line to see all user attributes
      setUsername(username); // Set the username in state
    } catch (error) {
      console.error('Error getting username:', error);
    }
  };
  
  // const welcomeMessage = props.username || `${JSON.parse(localStorage.getItem('savedApplication')).first_name} ${JSON.parse(localStorage.getItem('savedApplication')).last_name}`;
  return (
    <>
      <Container maxWidth="sm" sx={{ marginTop: '15%', borderRadius: '15px'}}>
        <Card className="UserCard">
          {/* {showJobDetails && selectedJob && (
            <JobApplicationStatus
              jobTitle={selectedJob.job_title}
              jobStatus={selectedJob.status}
              appliedDate={selectedJob.application_date}
              onBack={handleBackToProfile}
            />
          )} */}
          {/* <Typography sx={{ paddingTop: '30px', fontSize: '20px' }} variant="h4">
            Welcome 
          </Typography>
          */}
          <Typography sx={{ paddingTop: '30px', fontSize: '20px' }} variant="h4">
          Welcome, {userFullName} 
        </Typography>
            <Box className="user-card">
              <Typography sx={{ paddingTop: '30px', fontSize: '30px' }} variant="h5">
                You have applied for the following positions:
              </Typography>
              {loading ? (
                <Box textAlign="center" mt={4}>
                  <CircularProgress color="primary" />
                </Box>
              ) : (
               <></>
                // appliedJobs.map((job) => (
                //   <div className="applied-job-item" key={job.job_id}>
                //     <Typography sx={{ paddingTop: '20px', fontSize: '20px' }} variant="body1" color={colors.purple[700]}>
                //     Job Title: {job.jobs.job_title}
                //     </Typography>
                //     <Typography sx={{ paddingTop: '8px', fontSize: '15px' }} variant="body2">
                //     Status: {job.status}
                //     </Typography>
                //     <Typography sx={{ paddingTop: '8px', fontSize: '15px' }} variant="body2">
                //     Applied Date: {job.createdAt}
                //     </Typography>
                //   </div>
                // ))
              )}
            </Box>
         
        </Card>
      </Container>
    </>
  );
}