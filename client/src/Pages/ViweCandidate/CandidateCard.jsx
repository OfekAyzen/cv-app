
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

import Header from '../../Components/Header';
import { DataGrid } from '@mui/x-data-grid';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';


const CandidateCard = ({ userRole },{candidates}) => {
 
  const getRowClassName = (params) => {
    return 'rounded-row';
  };

  return (
    <>
 
     
      <Container fixed >
            <h1>candidate card :</h1>
      </Container>
    </>
  );
};

export default CandidateCard;
