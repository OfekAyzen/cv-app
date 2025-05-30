
// import axios from "axios";
// import Button from '@mui/material/Button';
// import { useNavigate } from 'react-router-dom'
// import { colors} from '@mui/material';

// function Logout(props) {
//   const navigate = useNavigate();
  
//   function logMeOut() {
//     axios({
//       method: "POST",
//       url:"http://localhost:5000/lgout",
//     })
//     .then((response) => {
//        props.token();
//        navigate("/Login");
//     }).catch((error) => {
//       if (error.response) {
//         console.log(error.response)
//         console.log(error.response.status)
//         console.log(error.response.headers)
//         }
//     })}

//     return(
//         <header className="App-header"  style={{
//           backgroundColor:'black',
//           display: 'flex',
    
//     justifyContent: 'flex-end',
//         }}>
            
//             <Button 
//              sx={{ p: 0, ml: 2, '&:hover': { cursor: 'pointer', color: colors.purple[500] },color:'white' }}
//                   onClick={logMeOut}> 
//                 Logout
//             </Button>
//         </header>
//     )
// }

// export default Logout;

import axios from "axios";
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom'
import { colors} from '@mui/material';
import { Auth } from 'aws-amplify';
function Logout() {
  const navigate = useNavigate();
  
  async function signOut() {
    try {
      await Auth.signOut({ global: true });
      navigate('/Login');
    } catch (error) {
      console.log('error signing out: ', error);
    }
  }

    return(
        <header className="App-header"  style={{
          backgroundColor:'black',
          display: 'flex',
    
    justifyContent: 'flex-end',
        }}>
            
            <div
             sx={{ p: 0, ml: 2, '&:hover': { cursor: 'pointer', color: colors.purple[500] },color:'white' }}
                  onClick={signOut}> 
                Logout
            </div>
        </header>
    )
}

export default Logout;
