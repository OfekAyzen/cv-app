import Login from './Pages/Login/Login'
import { useUserUpdate } from './UserContext'
import { useState, useEffect } from 'react'
import {BrowserRouter, Route, Routes, NavLink, Navigate, useNavigate } from 'react-router-dom'
import Candidates from "./Pages/ViweCandidate/Candidates.jsx";
// import Login_k from './Pages/Login/Login_k'
// import Vi from './Pages/ViweCandidate/ViweCandidate'



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
          <Route path="/Login" element={<Login onLogIn={handleSubmit} isLoggedIn={isLoggedIn} />} />
            <Route path="/ViewCandidate">
                <Route index element={<Candidates />} />


            </Route>

        </Routes>
      </BrowserRouter>
  )
}

export default App
