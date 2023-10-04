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
import { Typography, Divider, Button, CircularProgress, Container } from '@mui/material';
import { API, graphqlOperation } from 'aws-amplify';
import { getJobs } from '../../graphql/queries';  // Update the import path
import JobApplication from './JobApplication';
import logo from "../images/logo_tech19.png";
import { useNavigate } from 'react-router-dom';
import "../../styles/User.css";
const JobDetailsPage = ({ selectedJob }) => {
    const navigate = useNavigate();
    const [isMobileView, setIsMobileView] = useState(window.innerWidth < 600);
    const [jobDetails, setJobDetails] = useState(null);
    const [jobID, setJobID] = useState();
    const [loading, setLoading] = useState(true);
    const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);
    const handleCloseSnackbar = () => {
        setIsSnackbarOpen(false);
      };
   
    
    // useEffect(() => {
    //     // Extract the selectedJobId from local storage
    //     const savedSelectedJobId = localStorage.getItem('selectedJobId');
    //     console.log("savedSelectedJobId",savedSelectedJobId);
    //     const fetchJobDetails = async () => {
    //         if (!savedSelectedJobId) return;
    //         try {
    //             const response = await API.graphql(graphqlOperation(getJobs, { id: savedSelectedJobId }));
    //             const jobDetails = response.data.getJobs;
    //             setJobID(savedSelectedJobId);
    //             setJobDetails(jobDetails);
    //             setLoading(false);
    //             // localStorage.removeItem('selectedJobId');
    //         } catch (error) {
    //             console.error('Error fetching job details:', error);
    //             setLoading(true);
    //         }
    //     };

    //     fetchJobDetails();
    // }, []);
    // useEffect(() => {
    //     // Extract the selectedJobId from local storage
    //     // const savedSelectedJobId = localStorage.getItem('selectedJobId');
    //     console.log("savedSelectedJobId",selectedJob.id);
    //     const fetchJobDetails = async () => {
    //         if (!selectedJob.id) return;
    //         try {
    //             const response = await API.graphql(graphqlOperation(getJobs, { id: selectedJob.id }));
    //             const jobDetails = response.data.getJobs;
    //             setJobID(selectedJob.id);
    //             setJobDetails(jobDetails);
    //             setLoading(false);
    //             // localStorage.removeItem('selectedJobId');
    //         } catch (error) {
    //             console.error('Error fetching job details:', error);
    //             setLoading(true);
    //         }
    //     };

    //     fetchJobDetails();
    // }, []);
    useEffect(() => {
        const fetchJobDetails = async () => {
            let jobIdToFetch = selectedJob?.id;
    
            // If selectedJob.id is undefined or null, use the one from localStorage
            if (!jobIdToFetch) {
                const savedSelectedJobId = localStorage.getItem('selectedJobId');
                if (savedSelectedJobId) {
                    jobIdToFetch = savedSelectedJobId;
                }
            }
    
            if (!jobIdToFetch) return;
    
            try {
                const response = await API.graphql(graphqlOperation(getJobs, { id: jobIdToFetch }));
                const jobDetails = response.data.getJobs;
                setJobID(jobIdToFetch);
                setJobDetails(jobDetails);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching job details:', error);
                setLoading(true);
            }
        };
    
        fetchJobDetails();
    }, [selectedJob]);
    
    useEffect(() => {
        const handleResize = () => {
            setIsMobileView(window.innerWidth < 600);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const onClose = () => {
       navigate("/HomePage");
      };
    return (
        <div
       
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100vh', // Adjusted to 100vh to fill viewport height
                backgroundColor: 'white',
                display: 'flex',
                flexDirection: 'column',
                overflowY: isMobileView ? 'auto' : 'hidden',
                justifyContent: 'center',
                alignItems: 'center',
                zIndex: 999
            }}
        >
            
            {loading ? (
                <CircularProgress style={{ color: '#ad2069' }} />
            ) : (
                <div style={{ width: '100%', paddingTop: isMobileView ? '230%' : '10%' }}>
                  
                    <Button
                        onClick={onClose}
                        style={{
                            color: '#ad2069',
                            marginTop: '20px', // Adjust the margin as needed
                            width: 'fit-content'
                        }}
                    >
                        ← Back
                    </Button>
                    {jobDetails && (
                        <div style={{ backgroundColor: 'white', width: '100%', padding: '20px'}}>
                            <Container style={{
                            backgroundColor: 'white',
                            padding: 0,
                            display: 'flex',
                            flexDirection: isMobileView ? 'column' : 'column',
                            alignItems: 'center',
                            width: '100%',
                            maxWidth: '1200px',
                            }}>
                               
                            <Typography variant="h4" style={{ paddingBottom: '10px' }}>
                                {jobDetails.job_title}
                            </Typography>
                            <Typography variant="h4" style={{ fontSize: '10px',color:'grey ',justifyContent:'flex-start' }}>
                            Full-time  ·  Yeruham, israel 
                            </Typography>
                            <Typography className='position-text' variant="body1">{jobDetails.job_description}</Typography>
                            <Divider style={{ margin: '16px 0' }} />
                            <Typography className='position-text' variant="body1">Qualifications: {jobDetails.qualifications}</Typography>
                            <Typography variant="body1" style={{ fontSize: '16px', marginTop: '15px', color: 'purple' }}>
                                To apply for this job, you need to login
                            </Typography>
                            <JobApplication job_id={(selectedJob && selectedJob.id) || jobID} onCloseSnackbar={handleCloseSnackbar} />
                            </Container>
                        </div>
                    )}

                </div>
            )}
        </div>





    );
};

export default JobDetailsPage;



/**
 * <div style={{position: isMobileView ? 'fixed' : 'fixed' , top: 0, left: 0,
    marginBottom:'50px', width: '100%', height: '100%', backgroundColor: 'white', display: 'flex', justifyContent: 'center',
     alignItems: 'center', zIndex: 999,
     flexDirection: 'column', // Allow vertical scrolling
     overflowY: isMobileView ? 'auto' : 'hidden',
     
     
     }}>
      
        {loading ? (
            <CircularProgress style={{  color:'#ad2069'}} />
          ) : (<>
      <div style={{ width: '100%',height:'1080px' }}>
        {!isMobileView && ( <div style={{ display: 'flex', alignItems: 'center', width: '100%', backgroundColor: 'black' ,paddingTop:'3%'}}>
      <img src={logo} alt="Tech19 Logo" style={{ maxWidth: '100%', height: 'auto' }} />
            </div>)}
      
      
        <div style={{ width: '100%',display:'flex', justifyContent:'center' ,paddingTop: isMobileView ? '80%' : '0%'}}>
        {console.log("jobDetails",jobDetails)}
       
        {jobDetails && (
          <div style={{backgroundColor:"white",width:'80%'}}>
             <Button onClick={onClose} style={{color:'#ad2069'}}>
             ← Back
        </Button>
        <Typography className='position-text' style={{paddingTop:'30px'}} variant="h3"><strong>About the position</strong></Typography>
            <Typography className='position-text'  variant="h4">{jobDetails.job_title}</Typography>
            <Typography variant="body1" className='position-text'>{jobDetails.job_description}</Typography>
            <Divider style={{ marginTop: '16px', marginBottom: '16px' }} />
            <Typography className='position-text' variant="body1"><strong>Qualifications:</strong></Typography>
            <Typography className='position-text' variant="body1"> {jobDetails.qualifications}</Typography>
            <Typography  variant="body1" style={{display:'flex',textAlign:'center',
            justifyContent:'center',fontSize:'20px',paddingTop:'15px',color:'purple'}}>To applying to this job you need to Login</Typography>
            <JobApplication job_id={jobID} />
          </div>
        )}
         </div>
        
      </div>
      </>)}
    </div>
 */