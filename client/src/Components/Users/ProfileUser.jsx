// import * as React from 'react';
// import Box from '@mui/material/Box';
// import { createTheme, ThemeProvider } from '@mui/material/styles';
// import Header from '../Header';
// import logo2 from '../images/tapet2.jpg';
// import ViewJobs from './ViewJobs';
// import { Link } from 'react-router-dom';
// import UserCard from './UserCard';
// import { useState, useEffect} from 'react';
// import { useNavigate } from 'react-router-dom';
// import { Typography,Card ,Grid} from '@mui/material';
// import logo from "../images/logo_tech19.png";
// const defaultTheme = createTheme();

// export default function ProfileUser(props) {
//   const [status,setStatus]=useState('');

//   return (
//     <ThemeProvider theme={defaultTheme}>
       
    
      
//         {/* Show the header only if the user is logged in */}
//         {props.token? (
//         <Header
//           token={props.token}
//           onApplicationSubmit={props.onApplicationSubmit}
//           status={status}
//           candidate_id={props.candidate_id}
//           userRole={props.userRole}
//           setToken={props.setToken}
//           username={props.username}
//         />
//       ):(
//         <Typography variant="h6" component="div" sx={{ flexGrow: 1, backgroundColor: 'black' }}>
//         <img src={logo} alt="Tech19 Logo" style={{ maxWidth: '300px' }} />
//     </Typography>
//       )}
        
      
//         <Grid container alignItems="center" sx={{backgroundColor:'#1e1c1c',width:'100%' }}>
//         {/* Left side: Advanced Engineering Solutions */}
//             <Grid item xs={6} sm={6} sx={{ textAlign: 'left' }}>
//               <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px', height: '90%',  }}>
//                 <Typography variant="h3" sx={{textAlign:'center', marginBottom: '10px', fontSize: '80px', fontWeight: 'bold' ,color:'#f500ec'}}>
//                   Advanced Engineering
//                 </Typography>
//                 <Typography variant="h4" sx={{textAlign:'center',color:'white', fontSize: '60px', fontWeight: 'bold' }}>
//                   Solutions
//                 </Typography>
//               </Box>
//             </Grid>
//             {/* Right side: Logo Image */}
//             <Grid item xs={6} sm={6} sx={{ textAlign: 'right' }}>
//               <Box sx={{ padding: '20px', height: '100%', }}>
//                 <img className="img-user" src={logo2} alt="img" style={{ maxWidth: '100%', height: 'auto' }} />
//               </Box>
//             </Grid>
//         </Grid>
          
          
          
//           <ViewJobs setStatus={setStatus} onApplicationSubmit={props.onApplicationSubmit} 
//             candidate_id={props.candidate_id} 
//             token={props.token} 
//             userRole={props.userRole} setToken={props.setToken} 
//             username={props.username} ></ViewJobs>
            
          
      
//     </ThemeProvider>
//   );
// }

import * as React from 'react';
import Box from '@mui/material/Box';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Header from '../Header';
import logo2 from '../images/tapet2.jpg';
import ViewJobs from './ViewJobs';
import { Link } from 'react-router-dom';
import UserCard from './UserCard';
import { useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import { Typography,Card ,Grid} from '@mui/material';
import logo from "../images/logo_tech19.png";
import { API, graphqlOperation } from 'aws-amplify';
import { createJobs, updateJobs, deleteJobs } from '../../graphql/mutations';
import { listJobs } from '../../graphql/queries';
const defaultTheme = createTheme();

export default function ProfileUser(props) {
  const [status,setStatus]=useState('');

  const Jobs = {job_title: "My fdh", job_description: "Hello world!",qualifications:"slkdfh dsfkjsdfkj saflsdjkf" };

  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    fetchJobs();
  }, []);

  async function fetchJobs() {
    try {
      const response = await API.graphql(graphqlOperation(listJobs));
      const jobList = response.data.listJobs.items;

      console.log(jobList);
      setJobs(jobList);
    } catch (error) {
      console.error('Error fetching jobs:', error);
    }
  }

  // const addJob = async ()=>{
  //   console.log("add jobs ");
  //   await API.graphql(graphqlOperation(createJobs, {input: Jobs}));
  // };

  return (
    <ThemeProvider theme={defaultTheme}>
       
     {/* <AddJob></AddJob> */}
      {/* <button in onClick={addJob}>add jobs</button>
      <h1>List of Jobs</h1>
      <ul>
        {jobs.map((job) => (
          <li key={job.id}>
            <h2>{job.job_title}</h2>
            <p>{job.job_description}</p>
            <p>{job.qualifications}</p>
          </li>
        ))}
      </ul> */}
      {console.log(":props : ",props )}
        <Header
          token={props.token}
          onApplicationSubmit={props.onApplicationSubmit}
          status={status}
          candidate_id={props.candidate_id}
          userRole={props.userRole}
          setToken={props.setToken}
          username={props.username}
        />
     
        {/* <Typography variant="h6" component="div" sx={{ flexGrow: 1, backgroundColor: 'black' }}>
        <img src={logo} alt="Tech19 Logo" style={{ maxWidth: '300px' }} />
    </Typography> */}
      
        
      
        <Grid container alignItems="center" sx={{backgroundColor:'#1e1c1c',width:'100%' }}>
        {/* Left side: Advanced Engineering Solutions */}
            <Grid item xs={6} sm={6} sx={{ textAlign: 'left' }}>
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px', height: '90%',  }}>
                <Typography variant="h3" sx={{textAlign:'center', marginBottom: '10px', fontSize: '80px', fontWeight: 'bold' ,color:'#f500ec'}}>
                  Advanced Engineering
                </Typography>
                <Typography variant="h4" sx={{textAlign:'center',color:'white', fontSize: '60px', fontWeight: 'bold' }}>
                  Solutions
                </Typography>
              </Box>
            </Grid>
            {/* Right side: Logo Image */}
            <Grid item xs={6} sm={6} sx={{ textAlign: 'right' }}>
              <Box sx={{ padding: '20px', height: '100%', }}>
                <img className="img-user" src={logo2} alt="img" style={{ maxWidth: '100%', height: 'auto' }} />
              </Box>
            </Grid>
        </Grid>
          
          
{/*           
          <ViewJobs setStatus={setStatus} onApplicationSubmit={props.onApplicationSubmit} 
            candidate_id={props.candidate_id} 
            token={props.token} 
            userRole={props.userRole} setToken={props.setToken} 
            username={props.username} ></ViewJobs>
             */}
          
      <ViewJobs></ViewJobs>
    </ThemeProvider>
  );
}





