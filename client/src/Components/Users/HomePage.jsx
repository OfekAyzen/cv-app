import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../Pages/Manager/LandingPage.css';
import Header from '../../Components/Header';
import { DataGrid } from '@mui/x-data-grid';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Button from '@mui/material/Button';
import {

  GridToolbarContainer,

  GridToolbarFilterButton,
  GridToolbarExport,

} from '@mui/x-data-grid';

import Apply from './Apply';
import Dialog from '@mui/material/Dialog';
import ListItemText from '@mui/material/ListItemText';
import ListItem from '@mui/material/ListItem';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import ViewJobs from './ViewJobs';
import ViewJobsManger from '../../Pages/Manager/ViewJobsManger';
const VISIBLE_FIELDS = ['job_title', 'job_description', 'qualifications', 'apply'];
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
const HomePage = ({ userRole }) => {



  return (
    <>
      
      <CssBaseline />

     {userRole=='candidate'? (<ViewJobs userRole={userRole}/> ): (<h1></h1>)}
     {userRole=='manager'? (<ViewJobsManger userRole={userRole}/> ): (<h1></h1>)}
   
  
  

    </>
  );
};

export default HomePage;
