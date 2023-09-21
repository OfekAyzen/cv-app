

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
  

} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { Auth } from 'aws-amplify';
import { useNavigate } from 'react-router-dom';
import Dialog from '@mui/material/Dialog';
import "../../styles/User.css";
import PropTypes from 'prop-types';
import JobApplication from './JobApplication';

const ViewJobs = (props) => {
  const [open, setOpen] = React.useState(false);
  const [selectedJobId, setSelectedJobId] = useState('');
  const [error, setError] = useState(null);
  const [jobsData, setJobsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [successMessage, setSuccessMessage] = useState('');
  useEffect(() => {
    fetchJobs();
  }, []);

  async function fetchJobs() {
    try {
      const response = await API.graphql(graphqlOperation(listJobs));
      const jobList = response.data.listJobs.items;
      setJobsData(jobList);
      setLoading(false); // Set loading to false when data is fetched
    } catch (error) {
      console.error('Error fetching jobs:', error);
      setError('Error fetching jobs'); // Set an error message
      setLoading(false); // Set loading to false in case of an error
    }
  }


  const handleClose = () => {
    setOpen(false);
  };
  const handleButtonClick = async (job_id) => {
    setSelectedJobId(job_id);

    try {
      // Check if the user is authenticated using Amplify Auth
      const user = await Auth.currentAuthenticatedUser();

      // If the user is authenticated, open the dialog 
      setOpen(true);
    } catch (error) {
      // If the user is not authenticated, store the selected job ID in localStorage
      localStorage.setItem('selectedJobId', job_id);

      // Redirect the user to the login page
      navigate('/Login');
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
    <CssBaseline>
      {loading ? (
        <Container
          className="container-user"
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
          }}
        >
          <CircularProgress sx={{ color: 'purple' }} />
        </Container>
      ) : error ? (
        <div>{error}</div>
      ) : jobsData.length > 0 ? (
        <Container className="container-user">
          <Typography
            component="h1"
            variant="h2"
            align="center"
            color="white"
            gutterBottom
            sx={{ paddingTop: '60px', fontSize: '60px' }}
          >
            Join our team
          </Typography>
          <Typography
            variant="h5"
            align="center"
            color="white"
            paragraph
            sx={{ fontSize: '40px', color: 'yellow', paddingBottom: '25px' }}
          >
            We are hiring!
          </Typography>
          <Grid container spacing={1} sx={{ alignContent: 'center' }}>
            {jobsData.map((job) => (
              <Grid item key={job.id} sm={6} md={4}>
                <Card
                  sx={{
                    height: '100%',
                    width: '80%',
                    display: 'flex',
                    
                    flexDirection: 'column',
                  }}
                >
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h4" >
                      {job.job_title}
                    </Typography>
                    <Typography variant="h6" component="h6">
                      <Typography
                        variant="h6"
                        component="span"
                        fontWeight="bold"
                      >
                        Description:
                      </Typography>{' '}
                      {job.job_description}
                    </Typography>
                    <br></br>
                    <Typography variant="h6" >
                      <Typography
                        variant="h6"
                        component="span"
                        fontWeight="bold"
                      >
                        Qualification:
                      </Typography>{' '}
                      {job.qualifications}
                    </Typography>
                  </CardContent>
                 
                  <CardActions
                    sx={{ display: 'flex', justifyContent: 'center' }}
                  >
                    <Button
                      variant="outlined"
                      onClick={() => handleButtonClick(job.id)}
                      sx={{
                        color: 'rgb(224, 104, 154)',
                        borderBlockColor: ' rgb(224, 104, 154)',
                      }}
                    >
                      Apply
                    </Button>

                    <BootstrapDialog
                      onClose={handleClose}
                      aria-labelledby="customized-dialog-title"
                      open={open}
                      PaperProps={{
                        sx: {
                          width: '100%',
                          maxHeight: '90vh', // Set maximum height to 90% of viewport height

                        },
                      }}
                    >

                      <JobApplication //apply to specific job
                        job_id={selectedJobId}
                        onClose={handleClose} //
                        onApplicationSuccess={handleApplicationSuccess}
                      />


                    </BootstrapDialog>

                    {successMessage && (
                      <Snackbar open={!!successMessage} autoHideDuration={6000} onClose={() => setSuccessMessage('')}>
                        <Alert onClose={() => setSuccessMessage('')} severity="success">
                          {successMessage}
                        </Alert>
                      </Snackbar>
                    )}
                  </CardActions>
                  
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      ) : (
        <p>No job data available.</p>
      )}
      {/* Footer */}

    </CssBaseline>
  );
};

export default ViewJobs;
