import Login from './Components/Login/Login'
import topNav from "./Components/TopNav/TopNav.jsx";
import { useUserUpdate } from './UserContext'
import { useState, useEffect } from 'react'
import {BrowserRouter, Route, Routes, NavLink, Navigate, useNavigate } from 'react-router-dom'


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
        return (
            <nav>
                <ul className="navbar">

                    <li style={{ marginLeft: "auto" }}>
                    {userName}
                    </li>
                </ul>
            </nav>
        )

  }

  return (
      <BrowserRouter>
        {getNav()}
        <Routes>
          <Route exact path="/" element={ isLoggedIn ? <Navigate to="/UserInfo" /> : <Navigate to="/Login" />}>
          </Route>
          <Route path="/Login" element={<Login onLogIn={handleSubmit} isLoggedIn={isLoggedIn} />} />
          <Route path="/Register" element={<Register onRegister={handleSubmit} />} />
          <Route path="/UserInfo" element={ isLoggedIn ? <UserInfo /> : <Navigate to="/Login" />} />
        </Routes>
      </BrowserRouter>
  )
}

export default App
