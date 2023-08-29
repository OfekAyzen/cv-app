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
          
          
          
          <ViewJobs setStatus={setStatus} onApplicationSubmit={props.onApplicationSubmit} 
            candidate_id={props.candidate_id} 
            token={props.token} 
            userRole={props.userRole} setToken={props.setToken} 
            username={props.username} ></ViewJobs>
            
          
      
    </ThemeProvider>
  );
}



