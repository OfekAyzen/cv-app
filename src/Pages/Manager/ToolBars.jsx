
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Logout from '../Log/Logout';
import logo from '../../Components/images/logo_tech19.png'; 
import {  useNavigate } from "react-router-dom";
import { createTheme, ThemeProvider } from '@mui/material/styles';

const defaultTheme = createTheme();

export default function ToolBars(props) {
  const navigate = useNavigate(); // Initialize useNavigate


  const handleJobs = () => {
        navigate('/Position');
      };
  const handleCandidates = () => {
        navigate('/Profile');
      };   
  const handleLogout=()=>{
    navigate('/Login');
  } ;  
  return (
    // <ThemeProvider theme={defaultTheme}>
    // <Box  sx={{ flexGrow: 1 }}>
    //   <AppBar position="static">
    //     <Toolbar sx={{}}>
    //       <IconButton
    //         size="large"
    //         edge="start"
    //         color="inherit"
    //         aria-label="menu"
    //         sx={{ mr: 2 }}
    //       >
          
    //       </IconButton>
    //       <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
    //       <img src={logo} alt="Tech19 Logo" style={{ maxWidth: '300px' }} />
    //       </Typography>
          
    //       <Button  onClick={handleJobs } color="inherit">Jobs</Button>
    //       <Button onClick={handleCandidates } color="inherit">Applicants</Button>
    //       <Button color="inherit" onClick={handleLogout } ><Logout token={props.token}></Logout></Button>
    //     </Toolbar>
    //   </AppBar>
    // </Box>
    // </ThemeProvider>
    <ThemeProvider theme={defaultTheme}>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar sx={{ justifyContent: 'space-between' }}>
            <div sx={{ display: 'flex', alignItems: 'center' }}>
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{ mr: 2 }}
              >
                <MenuIcon />
              </IconButton>
              <img src={logo} alt="Tech19 Logo" style={{ maxWidth: '300px' }} />
            </div>

            <div>
              <Button onClick={handleJobs} color="inherit">
                Jobs
              </Button>
              <Button onClick={handleCandidates} color="inherit">
                Applicants
              </Button>
              <Button color="inherit" onClick={handleLogout}>
                <Logout token={props.token} />
              </Button>
            </div>
          </Toolbar>
        </AppBar>
      </Box>
    </ThemeProvider>
  );
}
