import * as React from 'react';
import Box from '@mui/material/Box';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Header from '../Header';
import logo2 from '../images/tapet2.jpg';
import ViewJobs from './ViewJobs';


const defaultTheme = createTheme();

export default function ProfileUser(props) {
  return (
    <ThemeProvider theme={defaultTheme}>
      
      <Header></Header>
      <Box className="Box-userprofile">
        <img className="img-user" src= {logo2} alt="img"/>
        <h3 className='h3-user'>Advanced Engineering</h3>
        <h4 className='h4-user'>Solutions</h4>
      </Box>
      {console.log("propfile id ",props.candidate_id)}
      {console.log("propfile user : ",props)}
      {
        props.userRole==='candidate' ? (<ViewJobs  onApplicationSubmit={props.onApplicationSubmit} 
          candidate_id={props.candidate_id} 
          token={props.token} 
          userRole={props.userRole} setToken={props.setToken}  ></ViewJobs>):
        (
          <h2>please loddein </h2>
        )
      }
      
    </ThemeProvider>
  );
}
