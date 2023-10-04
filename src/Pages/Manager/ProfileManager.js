


import React, { useState, useEffect } from "react";
import { CSVLink } from "react-csv";
import { Typography, Button ,Container,Grid,Paper} from "@mui/material";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CandidateDialog from "./CandidateDialog";
import Link from '@mui/material/Link';
import CircularProgress from "@mui/material/CircularProgress"; // Import the CircularProgress component
import ToolBars from "./ToolBars";
import { useNavigate } from 'react-router-dom';
import CandidateTable from "./CandidateTable";
import { API, graphqlOperation } from 'aws-amplify';
import { listCandidateJobs } from '../../graphql/queries'; // Import your GraphQL query
import "../../styles/Profilemanager.css";
import { listCandidates } from '../../graphql/queries'; // Import the query to get candidate data
import { getJobs } from '../../graphql/queries'; //


const defaultTheme = createTheme();
function ProfileManager() {
  const [candidatesData, setCandidatesData] = useState([]);
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [open, setOpen] = useState(false);


  const [loading, setLoading] = useState(true);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9; //ten applicants per page 
  const [selectedJobId, setSelectedJobId] = useState(null);

  const [sortByField, setSortByField] = useState("application_date"); // Sort initially by application date
  const [sortOrder, setSortOrder] = useState("desc"); // Sort in descending order by default
  const [statusChangeMessage, setStatusChangeMessage] = useState("");
  const [statusChangeMessageColor, setStatusChangeMessageColor] = useState("black");
  const [combinedData, setCombideData] = useState([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);


  const navigate = useNavigate();

  // useEffect(() => {
  //   const fetchCandidatesData = async () => {
  //     try {
  //       // Use the listCandidateJobs query to fetch candidate jobs
  //       const response = await API.graphql(
  //         graphqlOperation(listCandidateJobs)
  //       );

  //       // Extract the items from the response
  //       const candidateJobs = response.data.listCandidateJobs.items;

  //       // Filter out candidate jobs with _deleted: true
  //       const activeCandidateJobs = candidateJobs.filter(
  //         (candidateJob) => !candidateJob._deleted
  //       );
  //         console.log("candidate jobs ",candidateJobs);
  //       // Create an array to hold combined job and candidate data
  //       const combinedData = [];

  //       // Now, for each active candidate job, fetch the full data of the candidate and job
  //       await Promise.all(
  //         activeCandidateJobs.map(async (candidateJob) => {
  //           // Fetch the candidate data
  //           const candidateResponse = await API.graphql(
  //             graphqlOperation(getCandidate, { id: candidateJob.candidateId })
  //           );

  //           // Fetch the job data
  //           const jobResponse = await API.graphql(
  //             graphqlOperation(getJobs, { id: candidateJob.jobsId })
  //           );

  //           // Combine the candidate and job data into a single object
  //           const combinedItem = {
  //             candidate: candidateResponse.data.getCandidate,
  //             job: jobResponse.data.getJobs,
  //             candidateJob: candidateJob, // You can also include the original candidate job data
  //           };

  //           // Add the combined data to the array
  //           combinedData.push(combinedItem);
  //         })
  //       );

      

  //       setCombideData(combinedData);
  //       setLoading(false);
  //     } catch (error) {
  //       console.error('Error fetching candidate jobs:', error);
  //       setLoading(false);
  //     }
  //   };

  //   // Fetch applied jobs when the component mounts
  //   fetchCandidatesData();
  // }, []); // Empty dependency array to run once on mount

  // useEffect(() => {
  //   const fetchCandidatesData = async () => {
  //     try {
  //       // Use the listCandidates query to fetch all candidates
  //       const candidatesResponse = await API.graphql(
  //         graphqlOperation(listCandidates)
  //       );
    
  //       // Extract the items from the response
  //       const candidates = candidatesResponse.data.listCandidates.items;
    
  //       // Use the listCandidateJobs query to fetch candidate jobs
  //       const response = await API.graphql(
  //         graphqlOperation(listCandidateJobs)
  //       );
    
  //       // Extract the items from the response
  //       const candidateJobs = response.data.listCandidateJobs.items;
    
  //       // Create an array to hold combined job and candidate data
  //       const combinedData = [];
    
  //       // Iterate through candidates and check if they have candidate jobs
  //       for (const candidate of candidates) {
  //         const candidateJob = candidateJobs.find(
  //           (job) => job.candidateId === candidate.id
  //         );
    
  //         if (candidateJob) {
  //           // Fetch the job data
  //           const jobResponse = await API.graphql(
  //             graphqlOperation(getJobs, { id: candidateJob.jobsId })
  //           );
   
  //           // Combine the candidate and job data into a single object
  //           const combinedItem = {
  //             candidate: candidate,
  //             job: jobResponse.data.getJobs,
  //             candidateJob: candidateJob,
  //           };
    
  //           combinedData.push(combinedItem);
  //         } else {
  //           // Candidate has no candidate jobs
  //           const combinedItem = {
  //             candidate: candidate,
  //             job: null,
  //             candidateJob: null,
  //           };
    
  //           combinedData.push(combinedItem);
  //         }
  //       }
    
  //       setCombideData(combinedData);
  //       setLoading(false);
  //     } catch (error) {
  //       console.error('Error fetching candidate data:', error);
  //       setLoading(false);
  //     }
  //   };
  
  //   // Fetch candidates and candidate jobs when the component mounts
  //   fetchCandidatesData();
  // }, []); // Empty dependency array to run once on mount
  useEffect(() => {
    const fetchCandidatesData = async () => {
      try {
        const candidatesResponse = await API.graphql(graphqlOperation(listCandidates));
        const candidates = candidatesResponse.data.listCandidates.items;
//   console.log("candidatesResponse",candidates);
//           // Filter out candidate jobs with _deleted: true
//         const activeCandidate = candidates.filter(
//           (candidateJob) => !candidateJob._deleted
//         );
// console.log("activeCandidate",activeCandidate);
        // Fetch candidate jobs for all candidates in parallel
        const candidateJobResponses = await Promise.all(
          candidates.map(candidate =>
            API.graphql(
              graphqlOperation(listCandidateJobs, {
                filter: {
                  candidateId: { eq: candidate.id }
                }
              })
            )
          )
        );
  
        // Create a map of candidate jobs by candidate ID for efficient lookup
        const candidateJobMap = {};
        candidateJobResponses.forEach((response, index) => {
          const candidateId = candidates[index].id;
          candidateJobMap[candidateId] = response.data.listCandidateJobs.items;
        });
  
        // Fetch job data for all candidate jobs in parallel
        const jobResponses = await Promise.all(
          Object.values(candidateJobMap).flatMap(candidateJobs =>
            candidateJobs.map(candidateJob =>
              API.graphql(graphqlOperation(getJobs, { id: candidateJob.jobsId }))
            )
          )
        );
  
        // Combine the data
        const combinedData = candidates.map(candidate => {
          const candidateId = candidate.id;
          const candidateJobs = candidateJobMap[candidateId] || [];
          const jobData = candidateJobs.map(candidateJob => {
            const jobResponse = jobResponses.find(
              response => response.data.getJobs.id === candidateJob.jobsId
            );
            return jobResponse ? jobResponse.data.getJobs : null;
          });
  
          return {
            candidate,
            job: jobData.length > 0 ? jobData : null,
            candidateJobs
          };
        });
         // Filter out candidate jobs with _deleted: true
         console.log("combied date",combinedData);
         const activeCombind =combinedData.filter(
          (candidateJob) => !candidateJob.candidate._deleted
        );
        console.log("active combied",activeCombind);
        setCombideData(activeCombind);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching candidate data:', error);
        setLoading(false);
      }
    };
  
    // Fetch candidates and candidate jobs when the component mounts
    fetchCandidatesData();
  }, []);
  useEffect(() => {
   
  }, [candidatesData]);





  const handleViewCandidate = (candidate, jobId) => {
   
    setSelectedCandidate(candidate.candidate);
    setSelectedJobId(jobId);
    // Set isDialogOpen to true to open the dialog
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setSelectedCandidate(null);
    // setStatusChangeMessage('');
    // Set isDialogOpen to false to close the dialog
    setIsDialogOpen(false);
  };
  const [selectedCandidateStatus, setSelectedCandidateStatus] = useState("");





  //download csv for the manager 
  const csvData = combinedData.map((candidate) => ({
    First_Name: candidate.candidate.first_name,
    Last_Name: candidate.candidate.last_name,
    Gender: candidate.candidate.gender,
    Education: candidate.candidate.education,
    Work_Experience: candidate.candidate.work_experience,
    Skills: candidate.candidate.skills,
    Location: candidate.candidate.location,
  }));


  const handleStatusChangeSuccess = (message, color, newStatus) => {
    // Implement your logic for success here, such as displaying a success message
    console.log(message);
    console.log(`New status: ${newStatus}`);
  };

  const handleStatusChangeError = (message, color) => {
    // Implement your logic for error here, such as displaying an error message
    console.error(message);
  };


  const handleNoteAddSuccess = (message, color, note) => {

    // Handle success logic here
    console.log(message, color, note);
  };

  const handleNoteAddError = (message, color) => {

    // Handle error logic here
    console.error(message, color);
  };

  const handleStatusChange = (candidate, newStatus) => {
 

    console.log("Changing status for candidate ID", candidate.candidate.id, "to", newStatus);

   
  };

  return (
    <div>
    <Container style={{ backgroundColor: "rgb(224, 224, 224)",display:'contents' }}>
      <Grid container spacing={3}  className="grid-container">
        <Grid item xs={12} >
          <ToolBars />
          <Typography variant="h4" style={{ paddingTop: "30px", fontWeight: "bold",paddingLeft:'5%' ,fontFamily:'"Calibri", sans-serif',}}>
            Applicants 
          </Typography>
        </Grid>
        <Grid item xs={6} sm={9} md={10} className="grid-candidateTable">
          
            
              {loading ? (
                <CircularProgress
                  style={{
                    margin: "100px auto",
                    display: "flex",
                    color: "rgb(174, 43, 91)",
                  }}
                />
              ) : (
                <CandidateTable 
                  candidates={combinedData}
                  selectedJobId={selectedJobId}
                  handleViewCandidate={handleViewCandidate}
                  // handleDeleteApplication={handleDeleteApplication}
                  handleStatusChange={handleStatusChange}
                  open={isDialogOpen}
                />
              )}
           
          
        </Grid>
        <Grid item xs={12} >
          <Button
            className="csv-export-button"
            sx={{ color: "#ad2069", marginTop: "16px" ,display:'flex',paddingLeft:'47%'}}
          >
            <CSVLink data={csvData} filename={"candidates.csv"} sx={{ color: "#ad2069",fontFamily:'"Calibri", sans-serif', }}>
              Download CSV
            </CSVLink>
          </Button>
        </Grid>
        <CandidateDialog open={isDialogOpen}
            selectedCandidate={selectedCandidate}
            selectedJobId={selectedJobId}
            handleClose={handleCloseDialog}
            statusChangeMessage={statusChangeMessage}
            statusChangeMessageColor={statusChangeMessageColor}
            handleStatusChangeSuccess={handleStatusChangeSuccess}
            handleStatusChangeError={handleStatusChangeError}



            handleNoteAddSuccess={handleNoteAddSuccess}
            handleNoteAddError={handleNoteAddError}
            // handleDeleteApplication={handleDeleteApplication}
          ></CandidateDialog>
       
        <Grid item xs={12}>
          <Typography
            variant="body2"
            color="text.secondary"
            align="center"
            style={{ backgroundColor: "rgb(224, 224, 224)", padding: "8px" }}
          >
            {'Copyright © '}
            <Link color="inherit" href="">
              Tech 19
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
          </Typography>
        </Grid>
      </Grid>
    </Container>
  </div>
  );

}

export default ProfileManager;