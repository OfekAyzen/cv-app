import { useState, useEffect, useContext } from 'react'
import { useUserUpdate } from '../../UserContext.jsx'
import { useNavigate } from 'react-router-dom'
import '../../styles/Login.css';
import ApiContext from '../../ApiContext.jsx';
import TopNav from "../TopNav/TopNav.jsx";
import axios from 'axios';



// import background from '../../background/background.jpg';
// import tech19 from '../../background/tech19.png';

const Login = ({onLogIn, isLoggedIn}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');



  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');
  const [candidateId, setCandidateId] = useState(null);


  const handleLoginSuccess = (candidateId) => {
    setCandidateId(candidateId);
  };

  const userUpdatedFunction = useUserUpdate();
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn){
      userUpdatedFunction(null);
      onLogIn(undefined);
      localStorage.setItem('logged_user', null);
    }
  }, []);


  const handleLogin = async (event) => {
    event.preventDefault();
    navigate("/ViweCandidate");
    // //console.log(await getUsers())
    // if (username === '') {
    //   console.log('Login Failed');
    //   setLoginError('Please enter a username');
    //   return;
    // }
    // if (password === '') {
    //   console.log('Login Failed');
    //   setLoginError('Please enter a password');
    //   return;
    // }
    // try {
    //   const response = await axios.post('http://localhost:5000/login', {
    //     username: username,
    //     password: password
    //   });
    //
    //   if (response.status === 200) {
    //     // Login successful
    //     const candidateId = response.data.candidate_id;
    //     handleLoginSuccess(candidateId); // Call handleLoginSuccess with candidateId
    //     onLogIn(response.data.user);
    //     navigate("/Todos");
    //   } else {
    //     // Login failed
    //     setLoginError('Incorrect username or password');
    //   }
    // } catch (error) {
    //   // Error occurred
    //   console.log(error);
    //   setLoginError('Error logging in');
    // }
  };

  const handleSubmitRegister = (event) => {
    event.preventDefault();
    navigate("/Register");
  };

  return (
    <>
      {<TopNav/>}
      <main>
        <h1>Welcome back</h1>
        <h2>Welcome back! please enter your details.</h2>
        <div className="login-container">
          <form className="login-form" onSubmit={handleLogin}>
            <label className="login-label-user" htmlFor="username">Username:</label>
            <input
                className="login-input-user"
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            <label className="login-label-pass" htmlFor="password">Password:</label>
            <input
                className="login-input-pass"
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <p className='login-error'>{loginError}</p>
            <button className="submit-button-login" type="button" onClick={handleLogin}>Login</button>
            {/*<button className="submit-button-register" type="button" onClick={handleSubmitRegister} >Register</button>*/}
          </form>
        </div>
        {/*<img className="background" src={background} alt="Image 1" />*/}
        {/*<img className="logo" src={tech19} alt="Image 2" />*/}
      </main>
    </>
  );
};

export default Login