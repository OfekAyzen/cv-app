
import React, { useState, useEffect } from 'react';


import Header from '../../Components/Header';
import ToolBars from './ToolBars';

import { Button } from '@mui/material';
import HomePage from '../../Components/Users/HomePage';
const Position = ({userRole}) => {

  return (
    <>
    
    <HomePage userRole={userRole}></HomePage>
    
    </>
  );
};

export default Position;
