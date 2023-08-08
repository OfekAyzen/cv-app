import React, { useState } from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import LoginPage from './Pages/Login/LoginPage';
import LandingPage from './Pages/ViweCandidate/LandingPage';
import SignUp from './Components/SignUp/SignUp';
import HomePage from './Components/Users/HomePage';
import Apply from './Components/Users/Apply';
import UploadApplication from './Components/Users/UploadApplication';
import Position from './Pages/ViweCandidate/Position';
function App() {
  const [userRole, setUserRole] = useState(null);

  const handleLogin = (role) => {
    console.log("user role:", role);
    setUserRole(role);
  };

  const getInitialPath = () => {
    if (userRole === "manager") {
      return "/ViewCandidate";
    }if (userRole === "candidate") {
      return "/HomePage";
    } else {
      return "/Login";
    }
  };

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Navigate to={getInitialPath()} />} />
          <Route path="/ViewCandidate" element={<LandingPage userRole={userRole} />} />
          <Route path="/Login" element={<LoginPage onLogIn={handleLogin} />} />
          <Route path="/SignUp" element={<SignUp></SignUp>} />
          <Route path="/HomePage" element={<HomePage userRole={userRole}></HomePage>} />
          <Route exact path="/apply/:jobId" component={Apply} />
          <Route exact path="/upload/:jobId" component={UploadApplication} />
          <Route exact path="/Position" element={<Position></Position>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;



/**
 *  {userRole ? (
        <LandingPage userRole={userRole} />
      ) : (
        <LoginPage onLogIn={handleLogin} />
      )}
 * 
 */


/** 
import Login from './Pages/Login/Login'
import { useUserUpdate } from './UserContext'
import { useState, useEffect } from 'react'
import {BrowserRouter, Route, Routes, NavLink, Navigate, useNavigate } from 'react-router-dom'
import Candidates from "./Pages/ViweCandidate/Candidates.jsx";
// import Login_k from './Pages/Login/Login_k'
// import Vi from './Pages/ViweCandidate/ViweCandidate'
import LoginPage from './Pages/Login/LoginPage';


function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [userName, setUserName] = useState('')
  const userUpdated = useUserUpdate();
  // useEffect(() => {
  //   const user = JSON.parse(localStorage.getItem('logged_user'))
  //   if (user !== undefined) {
  //     if (userUpdate){
  //       userUpdate(user)
  //     }
  //     handleLogin(user)
  //   }
  // }, [])


  const handleSubmit = (user) => {
    setIsLoggedIn(user !== undefined);
    setUserName(user?.username ?? '');
    userUpdated(user);
  }
  function getNav(){
    if (isLoggedIn){
        return (
            <nav>
                <ul className="navbar">

                </ul>
            </nav>
        )
    }
  }

  return (
      <BrowserRouter>
        {getNav()}
        <Routes>
          <Route exact path="/" element={ isLoggedIn ? <Navigate to="/UserInfo" /> : <Navigate to="/Login" />}>
          </Route>
          <Route path="/LandingPage" exact component={LandingPage} />
          <Route path="/Login" element={<LoginPage onLogIn={handleSubmit} isLoggedIn={isLoggedIn} />} />
            <Route path="/ViewCandidate">
                <Route index element={<Candidates />} />


            </Route>

        </Routes>
      </BrowserRouter>
  )
}

export default App
*/