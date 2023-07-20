import { useState } from 'react';
import axios from 'axios';

const Login = ({ onLogIn }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');



  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');
  const [candidateId, setCandidateId] = useState(null);


  const handleLoginSuccess = (candidateId) => {
    setCandidateId(candidateId);
  };

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Validate form fields before submitting
    if ( !file) {
      setMessage('Please fill in all the fields and select a file.');
      return;
    }

    try {
      // Create a new FormData object to send the form data as multipart/form-data
      const formData = new FormData();
    
     
      
      formData.append('inputFile', file);
      
      // Make a POST request to the server to handle file upload
      const response = await axios.post('http://localhost:5000/upload', formData);

      // Display the response message from the server
      setMessage(response.data.message);
    } catch (error) {
      console.error('Error:', error);
      setMessage('Error occurred during file upload. Please try again later.');
    }
  };




  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/login', {
        username: username,
        password: password
      });

      if (response.status === 200) {
        // Login successful
        const candidateId = response.data.candidate_id;
        handleLoginSuccess(candidateId); // Call handleLoginSuccess with candidateId
        onLogIn(response.data.user);
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
    <div>
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
        <button type="submit"   onLogIn={handleLoginSuccess}  >Login</button>

        
      </form>
      <h2>Upload File and Validate Before Save</h2>
      {message && <div className="alert alert-primary">{message}</div>}
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        
        
       
        <div>
          <label>Select a file:</label>
          <input type="file" name="inputFile" onChange={handleFileChange} required />
        </div>
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default Login;
