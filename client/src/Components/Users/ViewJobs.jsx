import React, { useState, useEffect } from 'react';
import axios from 'axios';

import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Header from '../Header';
import '../../styles/User.css';
import { useNavigate } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import PropTypes from 'prop-types';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import logo from '../images/jobs.jpg';
import JobApplication from './JobApplication';
import UserCard from './UserCard';
// const VISIBLE_FIELDS = ['job_title', 'job_description', 'qualifications', 'apply'];
// const Transition = React.forwardRef(function Transition(props, ref) {
//     return <Slide direction="up" ref={ref} {...props} />;
// });

function Copyright() {
    return (
        <Typography variant="body2" color="text.secondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://mui.com/">
                Your Website
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

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


const ViewJobs = (props) => {
    const [open, setOpen] = React.useState(false);
    const [selectedJobId ,setSelectedJobId]=useState('');
    const [error, setError] = useState(null);
    const [jobsData, setJobsData] = useState('');
    const [job_title,setTitle]=useState('');
    const navigate=useNavigate();
    



    // useEffect(() => {
    //     const fetchJobsData = async () => {
    //         axios({
    //             method: "GET",
    //             url: "http://localhost:5000/view_jobs",
    //             headers: {
    //                 Authorization: 'Bearer ' + props.token
    //             }
    //         })
    //             .then((response) => {

                    
    //                 const res = response.data
    //                 // setJobsData(response.data)
    //                 res.access_token && props.setToken(res.access_token)


    //                 const initialData = response.data.map((job) => ({
    //                     job_id: job.job_id,
    //                     job_title: job.job_title,
    //                     job_description: job.job_description,
    //                     qualifications: job.qualifications,
    //                 }));

    //                 setJobsData(initialData);

    //             }).catch((error) => {

    //                 if (error.response) {
    //                     console.log(error.response)
    //                     console.log(error.response.status)
    //                     console.log(error.response.headers)
    //                 }
    //             })
    //     };

    //     fetchJobsData();
    // }, []);


    useEffect(() => {
        const fetchJobsData = async () => {
          axios({
            method: "GET",
            url: "http://localhost:5000/view_jobs",
            headers: {
              Authorization: 'Bearer ' + props.token
            }
          })
            .then((response) => {
              const res = response.data;
    
              res.access_token && props.setToken(res.access_token);
    
              const initialData = response.data.map((job) => ({
                job_id: job.job_id,
                job_title: job.job_title,
                job_description: job.job_description,
                qualifications: job.qualifications,
              }));
    
              setJobsData(initialData);
            }).catch((error) => {
              if (error.response) {
                console.log(error.response);
                console.log(error.response.status);
                console.log(error.response.headers);
              }
            });
        };
    
        fetchJobsData();
      }, []);


    if (error) {
        return <div>{error}</div>;
    }

    // const handleButtonClick = (job_id) => {
    //     if (props.token) {
    //         console.log("handle button clicked if logddein");
    //         console.log("props.token ",props.token);
    //         // User is already logged in, open the job application dialog
    //         setSelectedJobId(job_id);
    //         setOpen(true);
    //       } else {
    //         // User is not logged in, save the job ID and navigate to login
    //         sessionStorage.setItem('pendingJobId', job_id);
    //         navigate('/Login');
    //       }
       
    // };

    const handleButtonClick = (job_id) => {
        if (props.token) {
          setSelectedJobId(job_id);
          setOpen(true);
        } else {
          const candidateIdFromLocalStorage = localStorage.getItem('candidate_id');
          if (candidateIdFromLocalStorage) {
            // Candidate ID is available in local storage, use it
            setSelectedJobId(job_id);
            setOpen(true);
          } else {
            // User is not logged in, save the job ID and navigate to login
            sessionStorage.setItem('pendingJobId', job_id);
            navigate('/Login');
          }
        }
      };

    const handleClose = () => {
        setOpen(false);
    }




    return (
        <>

            <CssBaseline />
            {jobsData.length > 0 ? (

                <Container className='container-user'  >
                    {/* End hero unit */}
                    <Typography
                        component="h1"
                        variant="h2"
                        align="center"
                        color="white"
                        gutterBottom
                        sx={{paddingTop:'60px', fontSize:'70px'}}
                    >
                        Join hour team {props.userId}
                    </Typography>
                    <Typography variant="h5" align="center" color="white" paragraph sx={{ fontSize:'40px',color:'yellow',paddingBottom:'25px'}}   >
                        We are hiring!
                    </Typography>

                    <Grid container spacing={1} sx={{ alignContent: 'center' }}>
                      

                        {jobsData.map((job) => (
                            <Grid item key={job.job_id} sm={6} md={4}>
                               
                                <Card
                                    sx={{ height: '100%', width: '80%', display: 'flex', flexDirection: 'column' }}
                                >
                                    <CardContent sx={{ flexGrow: 1 }}>
                                    <Typography gutterBottom variant="h4" component="h2">
                                        {job.job_title}
                                    </Typography>
                                    <Typography variant="h6" component="h4">
                                        <Typography variant="h6" component="span" fontWeight="bold">
                                        Description:
                                        </Typography>{" "}
                                        {job.job_description}
                                    </Typography>
                                    <Typography variant="h6" component="h4">
                                        <Typography variant="h6" component="span" fontWeight="bold">
                                        Qualification:
                                        </Typography>{" "}
                                        {job.qualifications}
                                    </Typography>
                                    </CardContent>
                                    <CardActions sx={{ display: 'flex', justifyContent: 'center' }}>
                                            
                                        <Button variant="outlined" 
                                        onClick={() => handleButtonClick(job.job_id)} 
                                        sx={{ color: 'rgb(224, 104, 154)', borderBlockColor: ' rgb(224, 104, 154)' }}
                                        >Apply</Button>

                                            <BootstrapDialog
                                                onClose={handleClose}
                                                aria-labelledby="customized-dialog-title"
                                                open={open}
                                            >
                                            {console.log("canduaite id : ",props.candidate_id)}
                                                <JobApplication //apply to specific job
                                                setTitle={setTitle}
                                                setStatus={props.setStatus}
                                                    onApplicationSubmit={props.onApplicationSubmit}
                                                    candidate_id={props.candidate_id}
                                                    token={props.token}
                                                    userRole={props.userRole}
                                                    setToken={props.setToken}
                                                    open={open}
                                                    setOpen={setOpen}
                                                    job_id={selectedJobId} 
                                                    username={props.username}
                                                    // Pass the selected job_id
                                                />
                                            </BootstrapDialog>


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
            <Box sx={{ bgcolor: 'background.paper', p: 6 }} component="footer">
                <Typography variant="h6" align="center" gutterBottom>
                    TECH-19
                </Typography>
                <Typography
                    variant="subtitle1"
                    align="center"
                    color="text.secondary"
                    component="p"
                >

                    Contact Us
                    Address:

                    Zvi Burnstein, Yeruham

                    Israel

                    Email:

                    inbar.cohen@tech-19.com

                    Phone:

                    054 - 7886068
                </Typography>
                <Copyright ></Copyright>
            </Box>
            {/* End footer */}
        </>
    );
};

export default ViewJobs;

