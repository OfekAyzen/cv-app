

import React, { useState, useEffect } from 'react';
import { API, graphqlOperation } from 'aws-amplify';
import { listJobs } from '../../graphql/queries';
import { styled } from '@mui/material/styles';
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CircularProgress,
  Container,
  CssBaseline,
  Grid,
  Typography,
  Snackbar,
  Alert,
  DialogTitle,
  IconButton,
  Divider,

  DialogContent,
  DialogActions,

} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { Auth } from 'aws-amplify';
import { useNavigate } from 'react-router-dom';
import Dialog from '@mui/material/Dialog';
// import "../../styles/User.css";
import PropTypes from 'prop-types';
import JobApplication from './JobApplication';
import JobDetailsPage from './JobDetailsPage';

import Stack from "@mui/material/Stack";
import InstagramIcon from "@mui/icons-material/Instagram";
import YouTubeIcon from "@mui/icons-material/YouTube";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import PinterestIcon from "@mui/icons-material/Pinterest";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import MaterialIcon from './MaterialIcon';
const ViewJobs = (props) => {
  const [open, setOpen] = React.useState(false);
  const [selectedJobId, setSelectedJobId] = useState('');
  const [error, setError] = useState(null);
  const [jobsData, setJobsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [isMobileView, setIsMobileView] = useState(window.innerWidth < 600);
  const [successMessage, setSuccessMessage] = useState('');
  useEffect(() => {
    fetchJobs();
  }, []);

  // async function fetchJobs() {
  //   try {
  //     const response = await API.graphql(graphqlOperation(listJobs));
  //     const jobList = response.data.listJobs.items;
  //     console.log("joblost :",jobList);
  //     setJobsData(jobList);
  //     setLoading(false); // Set loading to false when data is fetched
  //   } catch (error) {
  //     console.error('Error fetching jobs:', error);
  //     setError('Error fetching jobs'); // Set an error message
  //     setLoading(false); // Set loading to false in case of an error
  //   }
  // }

  const [selectedJob, setSelectedJob] = useState(null);

  const handleJobClick = (job) => {
    setSelectedJob(job);
    setOpen(true);
  };
  async function fetchJobs() {
    try {
      const response = await API.graphql(graphqlOperation(listJobs));
      const jobList = response.data.listJobs.items.filter(job => !job._deleted); // Filter out deleted jobs
      
      setJobsData(jobList);
      setLoading(false); // Set loading to false when data is fetched
    } catch (error) {
      console.error('Error fetching jobs:', error);
      setError('Error fetching jobs'); // Set an error message
      setLoading(false); // Set loading to false in case of an error
    }
  }

  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth < 600);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleClose = () => {
    setOpen(false);
  };
  const handleButtonClick = async (job,job_id) => {
    console.log("job : ",job , "job id :",job_id);
    setSelectedJob(job);
    setSelectedJobId(job_id);

    try {
      // Check if the user is authenticated using Amplify Auth
      const user = await Auth.currentAuthenticatedUser();
      localStorage.setItem('selectedJobId', job_id);
      navigate(`/Apply/${job_id}`);
      // If the user is authenticated, open the dialog 
      setOpen(true);
    } catch (error) {
      // If the user is not authenticated, store the selected job ID in localStorage
      localStorage.setItem('selectedJobId', job_id);
      navigate(`/Apply/${job_id}`);
      // Redirect the user to the login page
     
    }
  };

  const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
      padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
      padding: theme.spacing(1),
    },
  }));

  const handleApplicationSuccess = (message) => {
    setSuccessMessage(message);
  };


  function BootstrapDialogTitle(props) {
    const { children, onClose, ...other } = props;



    return (
      <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
        {children}
        {onClose ? (
          <IconButton
            aria-label="close"
            onClick={onClose}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        ) : null}
      </DialogTitle>
    );
  }

  BootstrapDialogTitle.propTypes = {
    children: PropTypes.node,
    onClose: PropTypes.func.isRequired,
  };


  return (
    <div style={{ backgroundColor: 'black', width: '100%', display: 'flex' }}>
     
      {loading ? (
        <Container
        className="container-user"
      // sx={{
      //   display: 'flex',
      //   justifyContent: 'center',
      //   alignItems: 'center',
      //   height: '100vh',
      // }}
      >
        <CircularProgress sx={{ color: 'purple' }} />
      </Container>
      ) : error ? (
        <div>{error}</div>
      ) : jobsData.length > 0 ? (
        <Container className="container-user">
          <Typography
            variant="h2"
            align="center"
            color="Black"
            gutterBottom
            sx={{ paddingTop: '60px', fontSize: '40px' ,paddingBottom:'50px', fontFamily:'"Calibri", sans-serif',}}
          >
            Careers
          </Typography>
          {/* <Typography
            variant="h5"
            align="center"
            color="white"
            paragraph
            sx={{ fontSize: '40px', color: 'yellow', paddingBottom: '25px' }}
          >
            Open Jobs
          </Typography> */}
          <Grid container spacing={1}>
            {jobsData.map((job) => (
              <Grid item key={job.id} sm={6} md={4} sx={{ paddingBottom: '2%' }}>
                <Card
                  sx={{
                    
                    height: '100%',
                    width: '80%',
                    display: 'flex',
                    marginLeft: '10%',
                    flexDirection: 'column',
                    backgroundColor: 'rgb(243 243 243)',
                    paddingLeft: '5%',
                    boxShadow:
                      '-15px 12px 0px 0px rgba(0, 0, 0, 0.2), 0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 1px 3px 0px rgba(0, 0, 0, 0.12)',
                  }}
                >
                  <CardContent sx={{ flexGrow: 1 ,minWidth:'30px' }} className="jobs-cards">
                    <Typography gutterBottom variant="h4" sx={{ fontFamily:'"Calibri", sans-serif',color: 'black',fontSize:'19px' }}>
                      {job.job_title}
                    </Typography>
                    <Typography gutterBottom variant="h6" sx={{ fontFamily:'"Calibri", sans-serif',color: '#6d6363',fontSize:'16px' }}>
                     
                    Full-time  ·  Yeruham, israel                                                
                    </Typography>
                  </CardContent>
                  <CardActions
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      backgroundColor: 'rgb(243 243 243)',
                      padding: '0 16px',
                    }}
                  >
                    
                    <Button
                      
                      onClick={() => handleButtonClick(job,job.id)}
                      sx={{fontFamily:'"Calibri", sans-serif',
                        color: 'rgb(224, 104, 154)',
                        borderBlockColor: ' rgb(224, 104, 154)',
                        marginBottom:'5%',
                      }}
                    >
                     apply
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        
        </Container>
      ) : (
        <p>No job data available.</p>
      )}
{console.log("before passed : ",selectedJob)}
{/* {selectedJob && (
  
      <JobDetailsPage selectedJob={selectedJob} onClose={() => setSelectedJob(null)} />
    )} */}
    </div>
  );
};

export default ViewJobs;
