import React, { useState, useEffect } from 'react';
import { Tabs, Tab, AppBar, Box, FormControlLabel, Checkbox, FormGroup, Grid, colors,Dialog } from '@mui/material';
import logo from '../Components/images/logo_tech19.png';
import Logout from '../Pages/Log/Logout';
import Button from '@mui/material/Button';
import {  useNavigate } from "react-router-dom"; 
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';

import '../styles/ToolBar.css';
import PersonIcon from '@mui/icons-material/Person';
import UserCard from './Users/UserCard';

const Header = (props) => {
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [isUserCardOpen, setUserCardOpen] = useState(false); // State for UserCard dialog
  const navigate = useNavigate();

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogout = () => {
    navigate('/Login');
  };

  const handleUserCardClick = () => {
    handleCloseUserMenu();
    setUserCardOpen(true);
  };

  const handleUserCardClose = () => {
    setUserCardOpen(false);
  };

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>

            <Typography variant="h6" component="div" sx={{ flexGrow: 1  }}>
                    <img src={logo} alt="Tech19 Logo" style={{ maxWidth: '300px' }} />
            </Typography>
            
            
            
            <Button sx={{color:'purple'} } onClick={handleLogout } ><Logout token={props.token}></Logout></Button>
            <PersonIcon
              onClick={handleUserCardClick} // Open the UserCard dialog
             
              sx={{ p: 0, ml: 2, '&:hover': { cursor: 'pointer', color: colors.purple[500] } }}
            >
                
            </PersonIcon>
          </Toolbar>
        </AppBar>
      </Box>

      {/* UserCard Dialog */}
      <Dialog
        open={isUserCardOpen}
        onClose={handleUserCardClose}
        fullWidth // Open dialog in full width
        maxWidth="md" // Limit max width to medium size
        PaperProps={{
            sx: {
              borderRadius: '5px',
              height: '98vh', // Set the height to 98% of the viewport height
            },
          }}
      >
        {/* Pass the required props to the UserCard component */}
        
        <UserCard
          candidate_id={props.candidate_id}
          token={props.token}
          username={props.username}
        />
      </Dialog>
    </>
  );
};

export default Header;