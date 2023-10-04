

import * as React from 'react';
import Box from '@mui/material/Box';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Header from '../Header';
import logo2 from '../images/tech.jpg';
import ViewJobs from './ViewJobs';
import { Link } from 'react-router-dom';
import UserCard from './UserCard';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Typography, Card, Grid, Button, Toolbar } from '@mui/material';
import logo from "../images/logo_tech19.png";
import { API, graphqlOperation } from 'aws-amplify';
import { createJobs, updateJobs, deleteJobs } from '../../graphql/mutations';
import { listJobs } from '../../graphql/queries';
import { Auth } from 'aws-amplify';
import "../../styles/User.css";
import MaterialIcon from './MaterialIcon';
const defaultTheme = createTheme();

export default function ProfileUser(props) {
  const [status, setStatus] = useState('');
  const [isMobileView, setIsMobileView] = useState(window.innerWidth < 600);
  const Jobs = { job_title: "My fdh", job_description: "Hello world!", qualifications: "slkdfh dsfkjsdfkj saflsdjkf" };
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [jobs, setJobs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        await Auth.currentAuthenticatedUser();
        setIsAuthenticated(true); // User is authenticated
      } catch (error) {
        setIsAuthenticated(false); // User is not authenticated
      }
    };

    checkAuthentication();
  }, []);



  useEffect(() => {
    const handleResize = () => {
        setIsMobileView(window.innerWidth < 600);
    };

    window.addEventListener('resize', handleResize);

    return () => {
        window.removeEventListener('resize', handleResize);
    };
}, []);


  useEffect(() => {
    fetchJobs();
  }, []);

  async function fetchJobs() {
    try {
      const response = await API.graphql(graphqlOperation(listJobs));
      const jobList = response.data.listJobs.items;
      setJobs(jobList);
    } catch (error) {
      console.error('Error fetching jobs:', error);
    }
  }

  const handleLogin = () => {

    navigate('/Login');
  }
  return (
    < >

      {isAuthenticated ? (
        <>
          <Header
            token={props.token}
            onApplicationSubmit={props.onApplicationSubmit}
            status={status}
            candidate_id={props.candidate_id}
            userRole={props.userRole}
            setToken={props.setToken}
            username={props.username}
          />


        </>
      ) : (
        // If the user is not authenticated
        <>
          <Toolbar sx={{ justifyContent: 'space-between', backgroundColor: 'black' }}>
            <div sx={{ display: 'flex', alignItems: 'center' }}>



              <img src={logo} alt="Tech19 Logo" style={{ maxWidth: '300px', backgroundColor: 'black' }} />
            </div>

            <div>
              <Button onClick={handleLogin} color="inherit" sx={{ color: 'white' }}>
                Login
              </Button>


            </div>
          </Toolbar>

        </>
      )}


      <Grid container alignItems="center" sx={{ backgroundColor: 'whitesmoke', width: '100%', height:isMobileView? '200px': '350px' }}>
       
        <Grid item xs={6} sm={6} sx={{ textAlign: 'left' }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '10px', height: '80%', }}>
            <Typography variant="h3" sx={{ color:'black',fontFamily:'"Calibri", sans-serif',textAlign: 'center', marginBottom: '10px', fontSize:isMobileView? '25px' : '50px', fontWeight: 'bold', }}>
              Advanced Engineering
            </Typography>
            <Typography variant="h4" sx={{ color:'#ad2069',fontFamily:'"Calibri", sans-serif',textAlign: 'center',  fontSize:isMobileView? '15px' : '30px', fontWeight: 'bold' }}>
              Solutions
            </Typography>
          
          </Box>
        </Grid>
       
        <Grid item xs={6} sm={6} sx={{ textAlign: 'right' }}>
          <Box sx={{ padding: '0px', height: '300px', }}>
            <img className="img-user" src={logo2} alt="img" style={{ maxWidth: '100%', height:isMobileView?'200px': '400px' }} />
          </Box>
        </Grid>
         {/* <Grid  sx={{ display:'flex',justifyContent:'center',textAlign: 'center' }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '10px', height: '80%', }}>
            <Typography variant="h3" sx={{ color:'black',fontFamily:'"Calibri", sans-serif',textAlign: 'center', marginBottom: '10px', fontSize:isMobileView? '25px' : '50px', fontWeight: 'bold', }}>
              Advanced Engineering
            </Typography>
            <Typography variant="h4" sx={{ color:'#ad2069',fontFamily:'"Calibri", sans-serif',textAlign: 'center',  fontSize:isMobileView? '15px' : '30px', fontWeight: 'bold' }}>
              Solutions
            </Typography>
          
          </Box>
        </Grid>
        */}
       
      </Grid>




      <ViewJobs></ViewJobs>
      <MaterialIcon></MaterialIcon>
    </>
  );
}





