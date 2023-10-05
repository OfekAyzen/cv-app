
import React, { useState, useEffect } from 'react';
import { Typography, Divider, Button, CircularProgress, Container } from '@mui/material';
import { API, graphqlOperation } from 'aws-amplify';
import { getJobs } from '../../graphql/queries';  // Update the import path
import JobApplication from './JobApplication';
import logo from "../images/logo_tech19.png";
import { useNavigate } from 'react-router-dom';
import "../../styles/User.css";

import { Link, RouterLink } from 'react-router-dom';
import MaterialIcon from './MaterialIcon';
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
        localStorage.removeItem('selectedJobId');
        navigate("/HomePage");
    };
    return (
        <div

            style={{
                // position: 'fixed',
                // top: 0,
                // left: 0,
                width: '100%',
                
                // height: '100vh', // Adjusted to 100vh to fill viewport height
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
                <div style={{height: isMobileView? '900px':'1200px',width:isMobileView?'400px':'100%',backgroundColor:'white', color: '#ad2069' }}>
                     <CircularProgress style={{backgroundColor:'white', color: '#ad2069' ,display:'flex',marginLeft:'50%',marginTop:'20%' }} />
                    </div>
               
            ) : (
                <div style={{ width: isMobileView?'420px':'100%', paddingTop: isMobileView ? '2%' : '2%' }}>

                    <Button
                        onClick={onClose}
                        style={{
                            color: '#ad2069',
                            marginLeft:'5%',
                            // marginTop: '20px', // Adjust the margin as needed
                            width: 'fit-content'
                        }}
                    >
                        ← Back
                    </Button>
                    {jobDetails && (
                        <div style={{ display: 'flex', ackgroundColor: 'white', width: '100%', padding: '20px' }}>
                            <Container style={{
                                backgroundColor: 'white',
                                // padding: 0,
                                paddingLeft:'10%',
                                paddingRight:'10%',
                                
                                display: 'flex',
                                flexDirection: isMobileView ? 'column' : 'column',
                                alignItems: 'center',
                                width: '100%',
                                // maxWidth: '1200px',
                            }}>

                                <Typography variant="h4" style={{ paddingBottom: '5%' }}>
                                    {jobDetails.job_title}
                                </Typography>
                                <Typography variant="h4" style={{ fontSize: '14px', color: 'grey ', justifyContent: 'flex-start' }}>
                                    Full-time  ·  Yeruham, israel
                                </Typography>
                                <Typography className='position-text' variant="body1">{jobDetails.job_description}</Typography>
                                <Divider style={{ margin: '16px 0' }} />
                                <Typography className='position-text' variant="body1">Qualifications: {jobDetails.qualifications}</Typography>
                                <Typography variant="body1" style={{ fontSize: '16px', marginTop: '15px', color: 'purple' }}>
                                    <Link style={{ fontFamily: '"Calibri", sans-serif' }} to="/Login" variant="body2">
                                        {" To apply for this job, you need to Login"}
                                    </Link>
                                </Typography>
                                <JobApplication job_id={(selectedJob && selectedJob.id) || jobID} onCloseSnackbar={handleCloseSnackbar} />
                                <div style={{display:'flex',alignItems:'center'  }}>
                                    {!isMobileView && ( <MaterialIcon ></MaterialIcon> )}
                               
                                </div>
                               
                            </Container>
                        </div>
                    )}

                </div>
            )}
            
        </div>





    );
};

export default JobDetailsPage;


