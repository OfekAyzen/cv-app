
import React, { useState, useEffect } from 'react';

import './LandingPage.css';
import Header from '../../Components/Header';
import ToolBars from './ToolBars';
import HomePage from '../../Components/Users/HomePage';
import { Button } from '@mui/material';

const Position = ({userRole}) => {

  return (
    <>
    
    <HomePage userRole={userRole}></HomePage>
    
    </>
  );
};

export default Position;
