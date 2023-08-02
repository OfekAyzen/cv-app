import React, { useState } from 'react';
import axios from 'axios';

const LoginPage = ({ onLogIn }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');




  

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/login',{
        username: username,
        password: password,
      }
      ,{withCredentials: true}
      
      );

      if (response.status === 200) {
        
        // Login successful
        onLogIn(response.data.role); // Notify parent component that user is logged in with role
      } else {
        // Login failed
        setLoginError('Incorrect username or password');
      }
    } catch (error) {
      // Error occurred
      console.log(error);
      setLoginError('Error logging in');
    }
  };

  return (
    <div >
      <form onSubmit={handleLogin}>
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <p>{loginError}</p>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginPage;