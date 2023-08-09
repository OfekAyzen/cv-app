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

function App() {
  const { token, removeToken, setToken } = useToken();
 
  const [userRole, setUserRole] = useState(null);


  useEffect(() => {
    console.log("user role:",userRole);
    setUserRole(userRole);
  }, [userRole]);
  const handleLogin = (role) => {
    console.log("user role:", role);
    setUserRole(role);
  };

  
  return (
    <BrowserRouter>
      <div className="App">
        <Logout token={removeToken} />
        
        {!token && token !== "" && token !== undefined ? (
          <Login setToken={setToken} onLogIn={handleLogin} />
        ) : (
          <Routes>
            {userRole === "manager" ? (
              <Route path="/Profile" element={<ProfileManager token={token} userRole={userRole} setToken={setToken} />} />
            ) : (
              <Route path="*" element={<h1>Not Authorized</h1>} />
            )}
            {/* Other routes */}
            <Route path="/UserProfile" element={<ProfileUser token={token} userRole={userRole} setToken={setToken} />} />
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