

// // import React, { useState, useEffect } from 'react';
// // import axios from 'axios';
// // import { v4 as uuidv4 } from 'uuid';
// // import './LandingPage.css';
// // import Header from '../../Components/Header';
// // import { DataGrid } from '@mui/x-data-grid';
// // import Container from '@mui/material/Container';
// // import Typography from '@mui/material/Typography';
// // import CssBaseline from '@mui/material/CssBaseline';
// // import Button from '@mui/material/Button';

// // import {

// //   GridToolbarContainer,

// //   GridToolbarFilterButton,
// //   GridToolbarExport,

// // } from '@mui/x-data-grid';
// // import Candidate_details from './Candidate_details';
// // import { Link } from 'react-router-dom';
// // const Toolbar =()=>{

// // return(
// //     <>
// //     <Typography  className='toolbar'>
// //         <nav>
// //           <ul>
// //             <li>
// //               <Link underline="hover" to="/Position">Position</Link>
// //             </li>
// //             <li>
// //               <Link underline="hover" to="/HomePage">Candidate</Link>
// //             </li>
// //           </ul>
// //         </nav>
       
// //       </Typography>
// //     </>
// // );

// // };
// // export default Toolbar;
// import * as React from 'react';
// import axios from "axios";
// import AppBar from '@mui/material/AppBar';
// import Box from '@mui/material/Box';
// import Toolbar from '@mui/material/Toolbar';
// import IconButton from '@mui/material/IconButton';
// import Typography from '@mui/material/Typography';
// import Menu from '@mui/material/Menu';
// import MenuIcon from '@mui/icons-material/Menu';
// import Container from '@mui/material/Container';
// import Avatar from '@mui/material/Avatar';
// import Button from '@mui/material/Button';
// import Tooltip from '@mui/material/Tooltip';
// import MenuItem from '@mui/material/MenuItem';
// import AdbIcon from '@mui/icons-material/Adb';
// import logo from '../../Components/images/logo_tech19.png';
// import "../../styles/ToolBar.css";
// const pages = ['Candidate', 'Position'];
// import { Outlet, Link } from "react-router-dom";
// import { useNavigate } from 'react-router-dom';


// const settings = [ 'Logout' ,'Jobs'];

// function ToolBars(props) {
//   const [anchorElNav, setAnchorElNav] = React.useState(null);
//   const [anchorElUser, setAnchorElUser] = React.useState(null);
//   const navigate = useNavigate();

//   const handleOpenNavMenu = (event) => {
//     setAnchorElNav(event.currentTarget);
//   };
//   const handleOpenUserMenu = (event) => {
//     setAnchorElUser(event.currentTarget);
//   };

//   const handleCloseNavMenu = () => {
//     setAnchorElNav(null);
//   };

//   //logout 
//   const handleCloseUserMenu = () => {

    
//     setAnchorElUser(null);
    
//   };

//   return (
//     <AppBar position="static" className='toolbar'>
//       <div className='div-bar' position="static" >
//              <img src={logo} />
//             </div>
//       <Container maxWidth="xl">
//         <Toolbar disableGutters>
//           {/* <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
//           <Typography
//             variant="h6"
//             noWrap
//             component="a"
//             href="/"
//             sx={{
//               mr: 2,
//               display: { xs: 'none', md: 'flex' },
//               fontFamily: 'monospace',
//               fontWeight: 700,
//               letterSpacing: '.3rem',
//               color: 'inherit',
//               textDecoration: 'none',
//             }}
//           >
//             <img src={logo} />
//           </Typography> */}
         
//           <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
//             <IconButton
//               size="large"
//               aria-label="account of current user"
//               aria-controls="menu-appbar"
//               aria-haspopup="true"
//               onClick={handleOpenNavMenu}
//               color="inherit"
//             >
//               <MenuIcon />
//             </IconButton>
//             <Menu
//               id="menu-appbar"
//               anchorEl={anchorElNav}
//               anchorOrigin={{
//                 vertical: 'bottom',
//                 horizontal: 'left',
//               }}
//               keepMounted
//               transformOrigin={{
//                 vertical: 'top',
//                 horizontal: 'left',
//               }}
//               open={Boolean(anchorElNav)}
//               onClose={handleCloseNavMenu}
//               sx={{
//                 display: { xs: 'block', md: 'none' },
//               }}
//             >
//             <MenuItem>
//                 <ul>
//                     <li>
//                     <Link token={props.token} underline="hover" to="/Position">Position</Link>
//                     </li>
                   
//                 </ul>
//             </MenuItem>
              
//             </Menu>
//           </Box>
          
//           <Typography
//             variant="h5"
//             noWrap
//             component="a"
//             href=""
//             sx={{
//               mr: 2,
//               display: { xs: 'flex', md: 'none' },
//               flexGrow: 1,
//               fontFamily: 'monospace',
//               fontWeight: 700,
//               letterSpacing: '.3rem',
//               color: 'inherit',
//               textDecoration: 'none',
//             }}
//           >
//            <img src={logo} />
//           </Typography>
//           <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
         
//               <Button
                
//                 onClick={handleCloseNavMenu}
//                 sx={{ my: 2, color: 'white', display: 'block' }}
//               >   
//                 <Link underline="hover" to="/Position" >Position</Link>  
//               </Button>
//            {/*   <Button
                
//                 onClick={handleCloseNavMenu}
//                 sx={{ my: 2, color: 'white', display: 'block' }}
//               >   
//                 <Link underline="hover" to="/HomePage">Candidates</Link>  
//         </Button>*/}
           
//           </Box>

//           <Box sx={{ flexGrow: 0 }}>
//             <Tooltip title="Open settings">
//               <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
//                 <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
//               </IconButton>
//             </Tooltip>
//             <Menu
//               sx={{ mt: '45px' }}
//               id="menu-appbar"
//               anchorEl={anchorElUser}
//               anchorOrigin={{
//                 vertical: 'top',
//                 horizontal: 'right',
//               }}
//               keepMounted
//               transformOrigin={{
//                 vertical: 'top',
//                 horizontal: 'right',
//               }}
//               open={Boolean(anchorElUser)}
//               onClose={handleCloseUserMenu}
//             >
//               {settings.map((setting) => (
//                 <MenuItem key={setting} onClick={handleCloseUserMenu}>
//                   <Typography textAlign="center">{setting}</Typography>
//                 </MenuItem>
//               ))}
//             </Menu>
//           </Box>
//         </Toolbar>
//       </Container>
//     </AppBar>
//   );
// }
// export default ToolBars;


// import * as React from 'react';
// import axios from "axios";
// import AppBar from '@mui/material/AppBar';
// import Box from '@mui/material/Box';
// import Toolbar from '@mui/material/Toolbar';
// import IconButton from '@mui/material/IconButton';
// import Typography from '@mui/material/Typography';
// import Menu from '@mui/material/Menu';
// import MenuIcon from '@mui/icons-material/Menu';
// import Container from '@mui/material/Container';
// import Avatar from '@mui/material/Avatar';
// import Button from '@mui/material/Button';
// import Tooltip from '@mui/material/Tooltip';
// import MenuItem from '@mui/material/MenuItem';
// import AdbIcon from '@mui/icons-material/Adb';
// import logo from '../../Components/images/logo_tech19.png';
// import "../../styles/ToolBar.css";
// import { Link, useNavigate } from "react-router-dom"; // Import useNavigate

// const settings = ['Logout', 'Jobs'];

// function ToolBars(props) {
//   const [anchorElNav, setAnchorElNav] = React.useState(null);
//   const [anchorElUser, setAnchorElUser] = React.useState(null);
//   const navigate = useNavigate(); // Initialize useNavigate

//   const handleOpenNavMenu = (event) => {
//     setAnchorElNav(event.currentTarget);
//   };

//   const handleOpenUserMenu = (event) => {
//     setAnchorElUser(event.currentTarget);
//   };

//   const handleCloseNavMenu = () => {
//     setAnchorElNav(null);
//   };

//   const handleCloseUserMenu = () => {
//     setAnchorElUser(null);
//   };

//   const handleJobsClick = () => {
//     handleCloseUserMenu(); // Close the menu
//     navigate("/Position"); // Navigate to the Position page
//   };

//   return (
//     <AppBar position="static" className='toolbar'>
//       <div className='div-bar' position="static" >
//         <img src={logo} alt="Tech19 Logo" />
//         <Container maxWidth="l">
//         <Toolbar disableGutters>
//           <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
//             <IconButton
//               size="large"
//               aria-label="account of current user"
//               aria-controls="menu-appbar"
//               aria-haspopup="true"
//               onClick={handleOpenNavMenu}
//               color="inherit"
//             >
//               <MenuIcon />
//             </IconButton>
//             <Menu
//               id="menu-appbar"
//               anchorEl={anchorElNav}
//               anchorOrigin={{
//                 vertical: 'bottom',
//                 horizontal: 'left',
//               }}
//               keepMounted
//               transformOrigin={{
//                 vertical: 'top',
//                 horizontal: 'left',
//               }}
//               open={Boolean(anchorElNav)}
//               onClose={handleCloseNavMenu}
//               sx={{
//                 display: { xs: 'block', md: 'none' },
//               }}
//             >
//               <MenuItem>
//                 <ul>
//                   <li>
//                     <Link token={props.token} underline="hover" to="/Position">Jobs</Link>
//                   </li>
//                 </ul>
//               </MenuItem>
//             </Menu>
//           </Box>

  

//           <Box sx={{ flexGrow: 0 }}>
//             <Tooltip title="Open settings">
//               <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
//                 <Avatar alt="Remy Sharp" src="" />
//               </IconButton>
//             </Tooltip>
//             <Menu
//               sx={{ mt: '45px' }}
//               id="menu-appbar"
//               anchorEl={anchorElUser}
//               anchorOrigin={{
//                 vertical: 'top',
//                 horizontal: 'right',
//               }}
//               keepMounted
//               transformOrigin={{
//                 vertical: 'top',
//                 horizontal: 'right',
//               }}
//               open={Boolean(anchorElUser)}
//               onClose={handleCloseUserMenu}
//             >
//               {settings.map((setting) => (
//                 <MenuItem key={setting} onClick={setting === 'Jobs' ? handleJobsClick : handleCloseUserMenu}>
//                   <Typography textAlign="center">{setting}</Typography>
//                 </MenuItem>
//               ))}
//             </Menu>
//           </Box>
//         </Toolbar>
//       </Container>
//       </div>
      
//     </AppBar>
//   );
// }

// export default ToolBars;

// import React, { useState } from 'react';
// import {
//   AppBar,
//   Avatar,
//   Box,
//   Container,
//   IconButton,
//   Menu,
//   MenuItem,
//   Toolbar,
//   Tooltip,
//   Typography,
// } from '@mui/material';
// import MenuIcon from '@mui/icons-material/Menu';
// import { Link } from 'react-router-dom';
// import {  useNavigate } from "react-router-dom"; 
// import logo from '../../Components/images/logo_tech19.png'; // Replace with your logo image path
// import Logout from '../Login/Logout';

// function ToolBars(props) {
//   const [anchorElUser, setAnchorElUser] = useState(null);
//   const navigate = useNavigate(); // Initialize useNavigate
//   const handleOpenUserMenu = (event) => {
//     setAnchorElUser(event.currentTarget);
//   };

//   const handleCloseUserMenu = () => {
//     setAnchorElUser(null);
//   };

//   const settings = ['Candidates', 'Jobs', 'Logout'];

//   const handleProfileClick = () => {
//     navigate("/Profile");
//   };

//   return (
//     <AppBar position="static" className="toolbar">
//       <Container maxWidth="lg">
//         <Toolbar disableGutters>
//           {/* Logo */}
//           <img src={logo} alt="Tech19 Logo" style={{ maxWidth: '100px' }} />

//           {/* Profile Settings */}
//           <Box
//             sx={{
//               display: 'flex',
//               alignItems: 'center',
//               ml: 'auto', // Move to the right
//             }}
//           >
//             <Tooltip title="Open settings">
//               <IconButton
//                 onClick={handleOpenUserMenu}
//                 sx={{ p: 0, ml: 2 }} // Add margin to separate from the logo
//               >
//                 <Avatar alt="Profile Avatar" src="" />
//               </IconButton>
//             </Tooltip>
//             <Menu
//               id="menu-appbar"
//               anchorEl={anchorElUser}
//               anchorOrigin={{
//                 vertical: 'top',
//                 horizontal: 'right',
//               }}
//               keepMounted
//               transformOrigin={{
//                 vertical: 'top',
//                 horizontal: 'right',
//               }}
//               open={Boolean(anchorElUser)}
//               onClose={handleCloseUserMenu}
//             >
//               {settings.map((setting) => (
//               <MenuItem
//                 key={setting}
//                 onClick={
//                   setting === 'Candidates'
//                     ? handleProfileClick
//                     : setting === 'Jobs'
//                     ? () => {
//                         handleCloseUserMenu();
//                         navigate('/Position'); // Navigate to the 'Position' page
//                       }
//                     : setting === 'Logout'
//                     ? () => {
//                         handleCloseUserMenu();
                        
//                         navigate('/Login'); // Navigate to the 'Logout' page
//                       }
//                     : handleCloseUserMenu
//                 }
//               >
//                 <Typography textAlign="center">{setting}</Typography>
                
//               </MenuItem>
              
//             ))}
//             </Menu>
//           </Box>
//         </Toolbar>
//       </Container>
//     </AppBar>
//   );
// }

// export default ToolBars;
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Logout from '../Login/Logout';
import logo from '../../Components/images/logo_tech19.png'; 
import {  useNavigate } from "react-router-dom"; 
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
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
          
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          <img src={logo} alt="Tech19 Logo" style={{ maxWidth: '300px' }} />
          </Typography>
          
          <Button  onClick={handleJobs } color="inherit">Jobs</Button>
          <Button onClick={handleCandidates } color="inherit">Applicants</Button>
          <Button color="inherit" onClick={handleLogout } ><Logout token={props.token}></Logout></Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
