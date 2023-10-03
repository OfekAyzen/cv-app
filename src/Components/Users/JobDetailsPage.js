// import React, { useState, useEffect } from 'react';
// import { Typography, Divider, Button } from '@mui/material';
// import JobApplication from './JobApplication';



// const JobDetailsPage = ({ selectedJob, onClose }) => {
//     const [selectedJobId, setSelectedJobId] = useState(null);

//     useEffect(() => {
//       // Extract the selectedJobId from local storage
//       const savedSelectedJobId = localStorage.getItem('selectedJobId');
//       if (savedSelectedJobId) {
//         setSelectedJobId(savedSelectedJobId);
//         // localStorage.removeItem('selectedJobId'); // Remove from local storage once extracted
//       }
//     }, []);
//   return (
//     <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'white', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 999 }}>
//     <div style={{ width: '80%' }}>
//         {console.log("selectedJobId :",selectedJobId)}
    
//       <Typography variant="h4">{selectedJob.job_title}</Typography>
      
//       <Typography variant="body1">{selectedJob.job_description}</Typography>
//       <Divider style={{ marginTop: '16px', marginBottom: '16px' }} />
//       <Typography variant="body1">Qualifications: {selectedJob.qualifications}</Typography>
//       <JobApplication //apply to specific job
//                         job_id={selectedJobId}
//                         // onClose={handleClose} //
//                         // onApplicationSuccess={handleApplicationSuccess}
//                       />
//       <Button onClick={onClose} color="primary">
//         Close
//       </Button>
//     </div>
//   </div>
//   );
// };

// export default JobDetailsPage;
// import React, { useState, useEffect } from 'react';
// import { Typography, Divider, Button } from '@mui/material';
// import { API, graphqlOperation } from 'aws-amplify';
// import { getJobs } from '../../graphql/queries';  // Update the import path
// import JobApplication from './JobApplication';
// const JobDetailsPage = ({  onClose }) => {
//   const [jobDetails, setJobDetails] = useState(null);
//     const [selectedJobId, setSelectedJobId] = useState(null);

//     // useEffect(() => {
//     //   // Extract the selectedJobId from local storage
//     //   const savedSelectedJobId = localStorage.getItem('selectedJobId');
//     //   if (savedSelectedJobId) {
//     //     setSelectedJobId(savedSelectedJobId);
//     //     // localStorage.removeItem('selectedJobId'); // Remove from local storage once extracted
//     //   }
//     //   else{
//     //     console.log("no selectedjob id ")
//     //   }
//     // }, []);
    
//   useEffect(() => {
//     const fetchJobDetails = async () => {
//       console.log("selected jobid",selectedJobId)
//       if (!selectedJobId) return;
//       try {
//         const response = await API.graphql(graphqlOperation(getJobs, { id: selectedJobId }));
//         console.log("response",response);
//         const jobDetails = response.data.getJobs;
//         console.log("jobDetails",jobDetails);
//         setJobDetails(jobDetails);
//       } catch (error) {
//         console.error('Error fetching job details:', error);
//       }
//     };

//     fetchJobDetails();
//   }, [selectedJobId]);

//   return (
//     <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'white', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 999 }}>
//       <div style={{ width: '80%' }}>
//         {jobDetails && (
//           <>
//             <Typography variant="h4">{jobDetails.job_title}</Typography>
//             <Typography variant="body1">{jobDetails.job_description}</Typography>
//             <Divider style={{ marginTop: '16px', marginBottom: '16px' }} />
//             <Typography variant="body1">Qualifications: {jobDetails.qualifications}</Typography>
//             <JobApplication //apply to specific job
//                         job_id={selectedJobId}
//                         // onClose={handleClose} //
//                         // onApplicationSuccess={handleApplicationSuccess}
//                       />
//           </>
//         )}
         
//         <Button onClick={onClose} color="primary">
//           Close
//         </Button>
//       </div>
//     </div>
//   );
// };

// export default JobDetailsPage;
import React, { useState, useEffect } from 'react';
import { Typography, Divider, Button } from '@mui/material';
import { API, graphqlOperation } from 'aws-amplify';
import { getJobs } from '../../graphql/queries';  // Update the import path
import JobApplication from './JobApplication';
import logo from "../images/logo_tech19.png";
const JobDetailsPage = ({ job ,onClose }) => {


  const [jobDetails, setJobDetails] = useState(null);
    const [jobID,setJobID]=useState();

  useEffect(() => {
    // Extract the selectedJobId from local storage
    const savedSelectedJobId = localStorage.getItem('selectedJobId');

    const fetchJobDetails = async () => {
      if (!savedSelectedJobId) return;
      try {
        const response = await API.graphql(graphqlOperation(getJobs, { id: savedSelectedJobId }));
        const jobDetails = response.data.getJobs;
        setJobID(savedSelectedJobId);
        setJobDetails(jobDetails);
      } catch (error) {
        console.error('Error fetching job details:', error);
      }
    };

    fetchJobDetails();
  }, []);

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'white', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 999 }}>
        {/* <div style={{ display: 'flex', alignItems: 'center', width: '100%', padding: '8px', backgroundColor: 'black' }}>
                <img src={logo} alt="Tech19 Logo" style={{ maxWidth: '100%', height: 'auto' }} />
            </div> */}
      <div style={{ width: '100%' }}>
      <div style={{ display: 'flex', alignItems: 'center', width: '100%', backgroundColor: 'black' }}>
                <img src={logo} alt="Tech19 Logo" style={{ maxWidth: '100%', height: 'auto' }} />
            </div>
      <Button onClick={onClose} style={{color:'#ad2069'}}>
         Back
        </Button>
        <div style={{ width: '100%',display:'flex', justifyContent:'center' }}>
        {console.log("jobDetails",jobDetails)}
        {jobDetails && (
          <div style={{backgroundColor:"white",width:'60%'}}>
            <Typography style={{paddingTop:'30px'}} variant="h4">{jobDetails.job_title}</Typography>
            <Typography variant="body1">{jobDetails.job_description}</Typography>
            <Divider style={{ marginTop: '16px', marginBottom: '16px' }} />
            <Typography variant="body1">Qualifications: {jobDetails.qualifications}</Typography>
            <Typography variant="body1" style={{display:'flex',textAlign:'center',
            justifyContent:'center',fontSize:'20px',paddingTop:'15px',color:'purple'}}>To applying to this job you need to Login</Typography>
            <JobApplication job_id={jobID} />
          </div>
        )}
         </div>
        
      </div>
    </div>
  );
};

export default JobDetailsPage;
