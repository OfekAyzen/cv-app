
import React, { useState, useEffect } from 'react';
import { Container, Box, Card, CircularProgress, Typography, colors } from '@mui/material';
import axios from 'axios';
import JobApplicationStatus from './JobApplicationStatus';
import "../../styles/User.css";

export default function UserCard(props) {
  const [showJobDetails, setShowJobDetails] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [appliedJobs, setAppliedJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [Jobs, setJobs] = useState([]);
  const candidateIdFromLocalStorage = localStorage.getItem('candidate_id'); // Get candidate ID from local storage
  // Determine the candidate ID to use (from local storage or props)
  const candidateId = candidateIdFromLocalStorage || props.candidate_id;

  // Fetch applied job data from the API
  const fetchAppliedJobs = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/view_applyed/${candidateId}`, {
        headers: {
          Authorization: 'Bearer ' + props.token,
        },
      });

   

      if (response.status === 200) {
       
        setAppliedJobs(response.data.applications);
        setJobs(response.data.jobs);
      } else {
        console.log('Error fetching applied jobs:', response.statusText);
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Fetch applied jobs when the component mounts
    fetchAppliedJobs();
  }, [props.candidate_id, props.token]);

  const handleJobDetailsClick = async (job) => {
    setSelectedJob(job);
    setShowJobDetails(true);
  };

  const handleBackToProfile = () => {
    setShowJobDetails(false);
    setSelectedJob(null);
  };

  const welcomeMessage = props.username || `${JSON.parse(localStorage.getItem('savedApplication')).first_name} ${JSON.parse(localStorage.getItem('savedApplication')).last_name}`;
  return (
    <>
      <Container maxWidth="sm" sx={{ marginTop: '15%', borderRadius: '15px'}}>
        <Card className="UserCard">
          {showJobDetails && selectedJob && (
            <JobApplicationStatus
              jobTitle={selectedJob.job_title}
              jobStatus={selectedJob.status}
              appliedDate={selectedJob.application_date}
              onBack={handleBackToProfile}
            />
          )}
          <Typography sx={{ paddingTop: '30px', fontSize: '20px' }} variant="h4">
            Welcome {welcomeMessage}!
          </Typography>
          {!showJobDetails && (
            <Box className="user-card">
              <Typography sx={{ paddingTop: '30px', fontSize: '30px' }} variant="h5">
                You have applied for the following positions:
              </Typography>
              {loading ? (
                <Box textAlign="center" mt={4}>
                  <CircularProgress color="primary" />
                </Box>
              ) : (
                appliedJobs.map((job) => (
                  <div className="applied-job-item" key={job.job_id}>
                    <Typography sx={{ paddingTop: '20px', fontSize: '20px' }} variant="body1" color={colors.purple[700]}>
                      Job Title: {Jobs.find((j) => j.job_id === job.job_id).job_title}
                    </Typography>
                    <Typography sx={{ paddingTop: '8px', fontSize: '15px' }} variant="body2">
                      Status: {job.status}
                    </Typography>
                    <Typography sx={{ paddingTop: '8px', fontSize: '15px' }} variant="body2">
                      Applied Date: {job.application_date}
                    </Typography>
                  </div>
                ))
              )}
            </Box>
          )}
        </Card>
      </Container>
    </>
  );
}