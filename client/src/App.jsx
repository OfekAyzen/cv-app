// import React, { useState } from 'react';
// import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
// import LoginPage from './Pages/Login/LoginPage';
// import LandingPage from './Pages/ViweCandidate/LandingPage';
// import SignUp from './Components/SignUp/SignUp';
// import HomePage from './Components/Users/HomePage';
// import Apply from './Components/Users/Apply';
// import UploadApplication from './Components/Users/UploadApplication';
// import Position from './Pages/ViweCandidate/Position';
// function App() {
//   const [userRole, setUserRole] = useState(null);

//   const handleLogin = (role) => {
//     console.log("user role:", role);
//     setUserRole(role);
//   };

//   const getInitialPath = () => {
//     if (userRole === "manager") {
//       return "/ViewCandidate";
//     }if (userRole === "candidate") {
//       return "/HomePage";
//     } else {
//       return "/Login";
//     }
//   };

//   return (
//     <div>
//       <BrowserRouter>
//         <Routes>
//           <Route exact path="/" element={<Navigate to={getInitialPath()} />} />
//           <Route path="/ViewCandidate" element={<LandingPage userRole={userRole} />} />
//           <Route path="/Login" element={<LoginPage onLogIn={handleLogin} />} />
//           <Route path="/SignUp" element={<SignUp></SignUp>} />
//           <Route path="/HomePage" element={<HomePage userRole={userRole}></HomePage>} />
//           <Route exact path="/apply/:jobId" component={Apply} />
//           <Route exact path="/upload/:jobId" component={UploadApplication} />
//           <Route exact path="/Position" element={<Position userRole={userRole}></Position>} />
//         </Routes>
//       </BrowserRouter>
//     </div>
//   );
// }

// export default App;
import React, { useState,useEffect } from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'
import Login from '../src/Pages/Login/Login';

import Logout from '../src/Pages/Login/Logout'
import useToken from './useToken';
import ProfileManager from "./Pages/Manager/ProfileManager";
import ProfileUser from './Components/Users/ProfileUser';
import ApplyJob from './Components/Users/ApplyJob';

function App() {
  const { token, removeToken, setToken } = useToken();
  const [userId, setUserId] = useState(null);
  const [candidateId,setCandidateId]=useState(null);
  const [userRole ,setUserRole]=useState('');
  //store the jobapplication data
  const [candidateData, setCandidateData] = useState([]);

  const handleJobApplication = (applicationData) => {
    setCandidateData([...candidateData, applicationData]);
  };


  useEffect(() => {
    console.log("user roles:", userRole);
    setUserRole(userRole);
    
    // Check userRole and set userId based on role
    if (userRole === "candidate") {
      // Set userId for candidate
      console.log("user id candidate :", candidateId);
      setCandidateId(candidateId); // Replace with actual candidate ID
    } else if (userRole === "manager") {
      // Set userId for manager
      console.log("user id manager :", userId);
      setUserId(userId); // Replace with actual manager ID
    }
  }, [userRole]);


  
 
  const handleLogin = (role) => {
    console.log("user role:", role);
    setUserRole(role);
    setUserId(userId);
  };

  
  return (
    <BrowserRouter>
      <div className="App">
        <Logout token={removeToken} />
        
        {!token && token !== "" && token !== undefined ? (
          <Login setToken={setToken} onLogIn={handleLogin} setUserId={setUserId} setCandidateId={setCandidateId} />
        ) : (
          <Routes>
            <Route path="/" element={<Login setToken={setToken} onLogIn={handleLogin} setUserId={setUserId} setCandidateId={setCandidateId} />} />
            {userRole === "manager" ? (
              <Route path="/Profile" element={<ProfileManager userId={userId} token={token} userRole={userRole} setToken={setToken} />} />
            ) : (
              <Route path="*" element={<h1>Not Authorized</h1>} />
            )}
            {/* Other routes */}
            <Route path="/UserProfile" element={<ProfileUser   onApplicationSubmit={handleJobApplication}
            candidate_id={candidateId}  token={token} userRole={userRole} setToken={setToken} />} />
            <Route path="/Apply" element={<ApplyJob  onApplicationSubmit={handleJobApplication}
             candidate_id={candidateId}  token={token} userRole={userRole} setToken={setToken} />} />
            
          </Routes>
        )}
      </div>
    </BrowserRouter>
  );
}

export default App;



// <Routes>
//               <Route exact path="/Home" element={<LandingPage token={token} setToken={setToken}/>}></Route>
//             </Routes>