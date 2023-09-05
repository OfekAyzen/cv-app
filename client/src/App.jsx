
import React, { useState,useEffect } from 'react';
import { BrowserRouter , Route, Routes, Navigate, Outlet, Link } from 'react-router-dom';

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





function App() {
  const { token, removeToken, setToken } = useToken();
  const [userId, setUserId] = useState(null);
  const [candidateId,setCandidateId]=useState(null);
  const [userRole ,setUserRole]=useState('');
  const [username ,setUserName]=useState('');
  //store the jobapplication data
  const [candidateData, setCandidateData] = useState([]);

  const handleJobApplication = (applicationData) => {
    setCandidateData([...candidateData, applicationData]);
  };


  useEffect(() => {
   
    setUserRole(userRole);
    setUserName(username);
    
    // Check userRole and set userId based on role
    if (userRole === "candidate") {
      // Set userId for candidate
     
      setCandidateId(candidateId); // Replace with actual candidate ID
    } else if (userRole === "manager") {
      // Set userId for manager
   
      setUserId(userId); // Replace with actual manager ID
    }
  }, [userRole]);


  
 
  const handleLogin = (role,candidateId) => {
 
    setUserRole(role);
    setUserName(username);
   
    if (userRole === "candidate") {
      // Set userId for candidate
      
       localStorage.setItem('candidateId', candidateId);
      setCandidateId(candidateId); // Replace with actual candidate ID
    } else if (userRole === "manager") {
      // Set userId for manager
   
      setUserId(userId); // Replace with actual manager ID
    }
    //setUserId(userId);
    
  };

  
  return (
    <>
    <BrowserRouter>
    <div style={{width:'100%'}}>
        {token && token !== '' && token !== undefined }
        <Routes>
          {!token && token !== '' && token !== undefined ? (
            <Route path="/Login" element={<Login setUserName={setUserName} setToken={setToken} onLogIn={handleLogin} setUserId={setUserId} setCandidateId={setCandidateId} />} />
          ) : (
            <>
              <Route path="/" element={<Navigate to="/Login" replace />} />
              <Route path="/Profile" element={<ProfileManager username={username} userId={userId} token={token} userRole={userRole} setToken={setToken} />} />
              {/* Other routes */}
              <Route path="/HomePage" element={<ProfileUser username={username} onApplicationSubmit={handleJobApplication} candidate_id={candidateId} token={token} userRole={userRole} setToken={setToken} />} />
              <Route path="/Apply/:job_id" element={<JobApplication  onApplicationSubmit={handleJobApplication} candidate_id={candidateId} token={token} userRole={userRole} setToken={setToken} />} />
              <Route path="/Position" element={<Position token={token} onLogIn={handleLogin} setUserId={setUserId} setCandidateId={setCandidateId} />} />
            </>
          )}
          <Route path="/SignUp" element={<SignUp></SignUp>} />
          <Route path="/Logout" element={<Logout  token={removeToken}/>} />
          <Route path="/Login" element={<Login setUserName={setUserName} setToken={setToken} onLogIn={handleLogin} setUserId={setUserId} setCandidateId={setCandidateId} />} />
          <Route path="/HomePage" element={<ProfileUser username={username} onApplicationSubmit={handleJobApplication} candidate_id={candidateId} token={token} userRole={userRole} setToken={setToken} />} />
            <Route path="/forgot_password" element={<ForgotPassword/>} />
            <Route path="*" element={<Navigate to="/Login" replace />} />
        </Routes>
    </div>

  </BrowserRouter>
  
  </>

  );
}

export default App;


