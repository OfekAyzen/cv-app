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
import ApplyJob from './ApplyJob';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import PropTypes from 'prop-types';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

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

    const [error, setError] = useState(null);
    const [jobsData, setJobsData] = useState('');

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

                    console.log("RESPONSE ", response.data)
                    const res = response.data
                    // setJobsData(response.data)
                    res.access_token && props.setToken(res.access_token)
                    
                    
                    const initialData = response.data.map((job) => ({
                        job_id: job.job_id,
                        job_title: job.job_title,
                        job_description: job.job_description,
                        qualifications: job.qualifications,
                    }));
                   
                    setJobsData(initialData);
                    
                }).catch((error) => {

                    if (error.response) {
                        console.log(error.response)
                        console.log(error.response.status)
                        console.log(error.response.headers)
                    }
                })
        };

        fetchJobsData();
    }, []);





    if (error) {
        return <div>{error}</div>;
    }

  
    const handleButtonClick = () => {
        console.log("clicked");
        setOpen(true);
      };
    const handleClose=()=>{
        setOpen(false);
    }
    return (
        <>
           
            <CssBaseline />
            {console.log("view jobs id :",props._id)}
            <Box
                    sx={{
                        bgcolor: 'background.paper',
                        pt: 8,
                        pb: 6,
                    }}
                >
                <Container maxWidth="sm">
                    <Typography
                        component="h1"
                        variant="h2"
                        align="center"
                        color="text.primary"
                        gutterBottom
                    >
                        Join hour team {props.userId}
                    </Typography>
                    <Typography variant="h5" align="center" color="text.secondary" paragraph>
                        We are hiring!
                    </Typography>
                    <Stack
                        sx={{ pt: 4 }}
                        direction="row"
                        spacing={2}
                        justifyContent="center"
                    >
                        {/*<Button variant="contained">Apply</Button>*/}

                    </Stack>
                    </Container>
                </Box>

            {jobsData.length > 0 ? (
          
                <Container className='container-user'  >
                    {/* End hero unit */}
                    <Grid container spacing={1} sx={{alignContent:'center'}}>
                        {console.log("jobsData type:", typeof jobsData)}
                        
                    {jobsData.map((job) => (
                            <Grid item key={job.job_id}  sm={6} md={4}>
                                {console.log("jobsData id:",job.job_id)}
                                <Card
                                    sx={{ height: '100%',width:'80%', display: 'flex', flexDirection: 'column' }}
                                >
                                    <CardMedia
                                        component="div"
                                        sx={{
                                            // 16:9
                                            pt: '70.25%',
                                        }}
                                        image="https://source.unsplash.com/random?wallpapers"
                                    />
                                    <CardContent sx={{ flexGrow: 1 }}>
                                        <Typography gutterBottom variant="h4" component="h2">
                                            {job.job_title} {job.job_id}
                                        </Typography>
                                        <Typography variant="h6" component="h4">
                                            Description: {job.job_description}
                                        </Typography>
                                        <Typography  variant="h6" component="h4">
                                            Qualification: {job.qualifications}
                                        </Typography>
                                    </CardContent>
                                    <CardActions>
                                        <Button variant="outlined" onClick={handleButtonClick}  sx={{color: 'rgb(224, 104, 154)',borderBlockColor:' rgb(224, 104, 154)'}}>Apply</Button>
                                        
                                        <BootstrapDialog
                                                onClose={handleClose}
                                                aria-labelledby="customized-dialog-title"
                                                open={open}
                                            >
                                                {console.log("view props : ",props)}
                                            <ApplyJob onApplicationSubmit={props.onApplicationSubmit} 
                                             candidate_id={props.candidate_id}  token={props.token} 
                                             userRole={props.userRole} setToken={props.setToken}
                                              open={open} setOpen={setOpen} job_id={job.job_id}></ApplyJob>
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

