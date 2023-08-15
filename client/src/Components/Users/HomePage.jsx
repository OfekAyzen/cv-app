import React, { useState, useEffect } from 'react';

import CssBaseline from '@mui/material/CssBaseline';

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
