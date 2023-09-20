

import React, { useState,useEffect } from 'react';
import { BrowserRouter , Route, Routes, Navigate, Outlet, Link } from 'react-router-dom';

import { Amplify } from '@aws-amplify/core';


import '@aws-amplify/ui-react/styles.css';

import Login from './Pages/Log/Login';

import Logout from './Pages/Log/Logout'
import useToken from './useToken';
import ProfileManager from "./Pages/Manager/ProfileManager";
import ProfileUser from './Components/Users/ProfileUser';

import JobApplication from './Components/Users/JobApplication';
import Position from './Pages/Manager/Position';
import NotFound from './NotFound';
import SignUp from '../src/Components/SignUp/SignUp';
import ForgotPassword from './Components/Users/ForgotPassword';
import ConfirmSignUp from './Pages/Log/ConfirmSignUp';
import ConfirmForgotPassword from './Pages/Log/ConfirmForgotPassword';
import {  Storage } from 'aws-amplify';
import awsconfig from './aws-exports';
Amplify.configure(awsconfig);



function App() {
 
  const [candidateData, setCandidateData] = useState([]);

  const handleJobApplication = (applicationData) => {
    setCandidateData([...candidateData, applicationData]);
  };


  
  return (
    <>
    <BrowserRouter>
    <div style={{width:'100%'}}>
       
        <Routes>
        
            <Route path="/Login" element={<Login />} />
      
              <Route path="/" element={<Navigate to="/Login" replace />} />
              <Route path="/Profile" element={<ProfileManager  />} />
              {/* Other routes */}
              <Route path="/HomePage" element={<ProfileUser />} />
              <Route path="/Apply/:job_id"  element={<JobApplication/>}/>
              <Route path="/Position" element={<Position  />} />

              <Route path="/confirm-signup/:username" element={<ConfirmSignUp/>} />
              <Route path="/confirm_forgot_password/:username" element={<ConfirmForgotPassword/>} />
              <Route path="/SignUp" element={<SignUp></SignUp>} />
              <Route path="/Logout" element={<Logout />} />
            {/* <Route path="/HomePage" element={<ProfileUser username={username} onApplicationSubmit={handleJobApplication} candidate_id={candidateId} token={token} userRole={userRole} setToken={setToken} />} /> */}
            <Route path="/forgot_password" element={<ForgotPassword/>} />
            <Route path="*" element={<Navigate to="/Login" replace />} />

        </Routes>
    </div>

  </BrowserRouter>
  
  </>

  );
}

export default App;