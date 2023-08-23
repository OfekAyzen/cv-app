import * as React from 'react';
import Box from '@mui/material/Box';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Header from '../Header';
import logo2 from '../images/tapet2.jpg';
import ViewJobs from './ViewJobs';
import { Link } from 'react-router-dom';
import UserCard from './UserCard';
import { useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import { Typography,Card ,Grid} from '@mui/material';
const defaultTheme = createTheme();

export default function ProfileUser(props) {
  const [status,setStatus]=useState('');
  const navigate = useNavigate();
  
  return (
    <ThemeProvider theme={defaultTheme}>
      
      
      {console.log("propfile id ",props.candidate_id)}
      {console.log("propfile user : ",props)}
      {console.log("username profile : ",props.username)}
        {/* Show the header only if the user is logged in */}
        {props.token && (
        <Header
          token={props.token}
          onApplicationSubmit={props.onApplicationSubmit}
          status={status}
          candidate_id={props.candidate_id}
          userRole={props.userRole}
          setToken={props.setToken}
          username={props.username}
        />
      )}
        <Grid container alignItems="center" sx={{backgroundColor:'#1e1c1c',width:'100%' }}>
        {/* Left side: Advanced Engineering Solutions */}
            <Grid item xs={6} sm={6} sx={{ textAlign: 'left' }}>
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px', height: '90%',  }}>
                <Typography variant="h3" sx={{textAlign:'center', marginBottom: '10px', fontSize: '80px', fontWeight: 'bold' ,color:'#f500ec'}}>
                  Advanced Engineering
                </Typography>
                <Typography variant="h4" sx={{textAlign:'center',color:'white', fontSize: '60px', fontWeight: 'bold' }}>
                  Solutions
                </Typography>
              </Box>
            </Grid>
            {/* Right side: Logo Image */}
            <Grid item xs={6} sm={6} sx={{ textAlign: 'right' }}>
              <Box sx={{ padding: '20px', height: '100%', }}>
                <img className="img-user" src={logo2} alt="img" style={{ maxWidth: '100%', height: 'auto' }} />
              </Box>
            </Grid>
        </Grid>
          
          <Grid container>
            {/* Left side: About Us */}
            <Grid item xs={12} sm={6}>
              <Card sx={{ textAlign: 'left', backgroundColor: 'black', padding: '20px', height: '100%' , borderRadius: 0, border: 'none' }}>
              <Typography variant="h1" sx={{textAlign:'center' ,color:'white',marginTop:'40px'}} gutterBottom>
                <bold>About Us</bold>
                </Typography>
                  <hr/>
              </Card>
            </Grid>
            {/* Right side: Second Card */}
            <Grid item xs={12} sm={6}>
              <Card sx={{ textAlign: 'left', backgroundColor: 'grey', padding: '20px',height: '100%' , borderRadius: 0, border: 'none', }}>
                  
            <Typography sx={{paddingLeft:'15px',fontSize: '20px'}}>
            Tech19 provides comprehensive engineering solutions to drones, robotics, and security industries. We have a team of experts in HW, Software, and 3D Tech that provides customized solutions in varied business models.
            </Typography>
            <Typography sx={{paddingLeft:'15px',fontSize: '20px'}}>
            Our commitment is to Quality (ISO 9001 Certified), customer focus, partnership & collaboration.
            </Typography>
            <Typography sx={{paddingLeft:'15px',fontSize: '20px'}}>
              
                Tech19 provides comprehensive engineering solutions to drones, robotics, and security industries. We have a team of experts in HW, Software, and 3D Tech that provides customized solutions in varied business models.

            Our commitment is to Quality (ISO 9001 Certified),   </Typography>
            <Typography sx={{paddingLeft:'15px',fontSize: '20px'}}>
            customer focus, partnership & collaboration.

 

                Tech19 is part of Group 19 which promotes quality career opportunities for women in Israel's periphery. Group19 holds five companies with more than 150 employees in Mizpe Ramon, Sderot, Ofakim & Zfat that provides accounting, digital marketing,
         
            </Typography>
            <Typography sx={{paddingLeft:'15px',fontSize: '20px'}}>
            website development, and back-office solutions. 
            </Typography>
              </Card>
            </Grid>
          </Grid>
          
          <ViewJobs setStatus={setStatus} onApplicationSubmit={props.onApplicationSubmit} 
            candidate_id={props.candidate_id} 
            token={props.token} 
            userRole={props.userRole} setToken={props.setToken} 
            username={props.username} ></ViewJobs>
            
          
      
    </ThemeProvider>
  );
}
