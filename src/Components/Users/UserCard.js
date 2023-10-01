


import React, { useState, useEffect } from 'react';
import { Container, Box, Card, CircularProgress, Typography, colors } from '@mui/material';
import axios from 'axios';
import JobApplicationStatus from './JobApplicationStatus';
import "../../styles/User.css";



import { Auth, API, graphqlOperation } from "aws-amplify";
import { listCandidateJobs, getCandidate, getJobs, listCandidates, getCandidateJobs, candidateJobsByCandidateId } from "../../graphql/queries"; // Replace with your GraphQL queries

export default function UserCard(props) {
  const [appliedJobs, setAppliedJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [candidatesData, setCandidatesData] = useState([]);

  const [username, setUsername] = useState("");

  useEffect(() => {
    const fetchUsername = async () => {
      try {
        const user = await Auth.currentAuthenticatedUser();
        setUsername(user.attributes.email); // Assuming email is the username
        
      } catch (error) {
        console.error("Error fetching username:", error);
      }
    };

    fetchUsername();
  }, []);

  const fetchJobsForCandidate = async (candidateId) => {
    try {
      const candidateJobsResponse = await API.graphql(
        graphqlOperation(candidateJobsByCandidateId, {
          candidateId: candidateId
        })
      );

      const candidateJobs = candidateJobsResponse.data.candidateJobsByCandidateId.items;
     
      const jobIds = candidateJobs.map(item => item.jobsId);

      const jobs = await Promise.all(jobIds.map(async (jobId) => {
        const jobResponse = await API.graphql(
          graphqlOperation(getJobs, {
            id: jobId
          })
        );
       
        return jobResponse.data.getJobs;
      }));

      return jobs;
    } catch (error) {
      console.error('Error fetching candidate jobs:', error);
      return [];
    }
  };

  useEffect(() => {
    const fetchCandidatesData = async () => {
      try {
        // Use the listCandidates query to fetch candidate data
        const response = await API.graphql(
          graphqlOperation(listCandidates, {
            filter: {
              email: {
                eq: username // Fetch candidates where email matches the authenticated user's email
              }
            }
          })
        );

        // Extract the items from the response
        const candidateData = response.data.listCandidates.items;
        // Filter out candidate jobs with _deleted: true
        const activeCandidate = candidateData.filter(
          (candidateData) => !candidateData._deleted
        );
        // Fetch jobs for each candidate
        const candidatesWithJobs = await Promise.all(
          activeCandidate.map(async (candidate) => {
            const jobs = await fetchJobsForCandidate(candidate.id);
            return { ...candidate, jobs };
          })
        );

       

        setCandidatesData(candidatesWithJobs);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching candidates data:', error);
        setLoading(false);
      }
    };

    // Fetch candidates data when the component mounts
    fetchCandidatesData();
  }, [username]); 



  useEffect(() => {
   
  }, [candidatesData]);

  
  const getUsername = async () => {
    try {
      const user = await Auth.currentAuthenticatedUser();
      const username = user.attributes['cognito:username']; 
      console.log('User attributes:', user.attributes); 
      setUsername(username); 
    } catch (error) {
      console.error('Error getting username:', error);
    }
  };

  const renderJobDetails = (jobs) => {
    if (jobs && jobs.length > 0) {
      return jobs.map((job, jobIndex) => (
        <div key={jobIndex}>
          <Typography variant="h6">Job Title:</Typography>
          <Typography>{job.job_title}</Typography>
          <Typography variant="h6">
          Apply date:
        </Typography>
        <Typography>{formatDate(job.createdAt)}</Typography>
         
        </div>
      ));
    } else {
      return <Typography>Your job application was deleted</Typography>;
    }
  };
  const renderCandidates = () => {
    return candidatesData.map((data, index) => (
      <div  style={{color:'black'}} key={index}>
        {renderJobDetails(data.jobs)}
        <Typography sx={{ color: 'green' }}> 
        Candidate Status: {data.status}
        <br />
      </Typography>
        <hr />
      </div>
    ));
  };
  const formatDate = (isoDate) => {
    const date = new Date(isoDate);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-based
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };
  
  return (
    <>
      
      {/* <Container maxWidth="sm" sx={{ marginTop: '15%', borderRadius: '15px' ,display:'flex',alignContent:'center',textAlign:'center'}}> */}
    
      <Box  style={{alignContent:'center',textAlign:'center'}} >
        <div style={{backgroundColor:'black' ,padding:'0px'}}>
            <Typography  sx={{paddingTop: '35px', fontSize: '20px' ,color:'purple'}}>
            Welcome {username} 
          </Typography>
            <Typography  sx={{ paddingTop: '30px', fontSize: '25px' ,color:'#ccadcc'}}>
              You have applied for the following positions:
            </Typography>
          </div>
     
        <div>
          <h3> </h3>
          {loading ? <CircularProgress /> : renderCandidates()}
        </div>
      </Box>
    
  {/* </Container> */}
    </>
  );
}