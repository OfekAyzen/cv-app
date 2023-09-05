

import React, { useState, useEffect } from "react";
// import axios from "axios";
import CandidateDataService from "./CandidateDataService";
import CandidateFilterForm from "./CandidateFilterForm";
// import Card from "@mui/material/Card";
// import Pagination from '@mui/material/Pagination';
import { CSVLink } from "react-csv";
import { Typography, Button, Table, TableHead, TableRow, TableCell, TableBody, Input, TableContainer, SvgIcon, CardContent } from "@mui/material";
import { FormControl, InputLabel, Select, MenuItem, Box } from "@mui/material";
// import MailOutlineIcon from '@mui/icons-material/MailOutline';
// import LocalPhoneOutlinedIcon from '@mui/icons-material/LocalPhoneOutlined';
// import WcOutlinedIcon from '@mui/icons-material/WcOutlined';
// import AddLocationAltOutlinedIcon from '@mui/icons-material/AddLocationAltOutlined';
// import StatusChangeForm from './StatusChangeForm';
// import Position from "../Manager/Position";
// import Header from "../../Components/Header";
// import CandidateStatus from './CandidateStatus';
// import DownloadCV from "./DownloadCV";
import Stack from '@mui/material/Stack';
import PaginationItem from '@mui/material/PaginationItem';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CandidateDialog from "./CandidateDialog";
import CandidatePagination from "./CandidatePagination";
import Link from '@mui/material/Link';
// import {


//   Divider,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   Slide,

// } from "@mui/material";
// import HomePage from "../../Components/Users/HomePage";
import CircularProgress from "@mui/material/CircularProgress"; // Import the CircularProgress component
import ToolBars from "./ToolBars";
import NoteForm from "./NoteForm";
import { useNavigate } from 'react-router-dom';
import CandidateTable from "./CandidateTable";

const defaultTheme = createTheme();
function ProfileManager(props) {
  const [candidatesData, setCandidatesData] = useState([]);
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [open, setOpen] = useState(false);
  const [filters, setFilters] = useState({
    education: "",
    workExperience: "",
    skills: "",
    gender: "",
    location: "",
    // application_date : new Date().toISOString().split("T")[0],
  });
  // const [sortOrder, setSortOrder] = useState("asc");
  const [loading, setLoading] = useState(true);
  // const [sortByField, setSortByField] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9; //ten applicants per page 
  const [selectedJobId, setSelectedJobId] = useState(null);
  const [newCandidateStatus, setNewCandidateStatus] = useState("");
  const [statusChangeMessage, setStatusChangeMessage] = useState("");
  const [statusChangeMessageColor, setStatusChangeMessageColor] = useState("black");
  const [updatedStatus, setUpdatedStatus] = useState("");
  const [updatedCandidateIndex, setUpdatedCandidateIndex] = useState(null);
  const [sortByField, setSortByField] = useState("application_date"); // Sort initially by application date
  const [sortOrder, setSortOrder] = useState("desc"); // Sort in descending order by default
  const [noteInput, setNoteInput] = useState(""); // State for note input
  const [selectedCandidateNotes, setSelectedCandidateNotes] = useState([]); // State for notes array
  const navigate = useNavigate();

  useEffect(() => {
    fetchCandidatesData();
  }, []);

  const fetchCandidatesData = async () => {
    try {
      const response = await CandidateDataService.getAllCandidates(props.token);
      const dataWithIds = response.data.candidates.map((candidate) => ({
        ...candidate,
        id: candidate.candidate_id,
        //notes:[],
      }));
      setCandidatesData(dataWithIds);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching candidates:", error);
      setLoading(false);
    }
  };

  const handleFilter = (newFilters) => {
    setFilters(newFilters);
  };

  const handleSortOrderChange = () => {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  const handleSortByChange = (field) => {
    setSortByField(field);
    if (field === "dateApply") {
      setSortByField("application_date");
      setSortOrder("desc"); // Always sort by descending order for date
    }
  };

  const handleViewCandidate = (candidate, jobId) => {


    setSelectedCandidate(candidate);
    setSelectedJobId(jobId);
    setSelectedCandidateStatus(
      candidate.appliedJobs.find((job) => job.job_id === jobId)?.status || ''
    );
    setNewCandidateStatus(
      candidate.appliedJobs.find((job) => job.job_id === jobId)?.status || ''
    );
    setUpdatedCandidateIndex(candidatesData.findIndex((c) => c.id === candidate.id));
    setOpen(true);
  };

  const handleCloseDialog = () => {
    setSelectedCandidate(null);
    setStatusChangeMessage('');
    setOpen(false);
  };
  const [selectedCandidateStatus, setSelectedCandidateStatus] = useState("");

 
  const handleDeleteApplication = (candidateId, applicationId) => {
    if (window.confirm("Are you sure you want to delete this application?")) {
      if (applicationId) {
        CandidateDataService.deleteApplication(applicationId, props.token)
          .then((response) => {
            // Update the state or handle success, if needed
            console.log("Application deleted successfully:", response.message);
            // Refresh the data after deleting
            fetchCandidatesData();
          })
          .catch((error) => {
            // Handle error, if needed
            console.error("Error deleting application:", error);
          });
      }
    }
  };
  //filter the candidates that applyes by  education, workExperience, skills, gender, location
  const filteredCandidates = candidatesData.filter((candidate) => {
    const { education, workExperience, skills, gender, location } = filters;

    return (
      (education === "" || candidate.education === education) &&
      (workExperience === "" || candidate.work_experience === workExperience) &&
      (skills === "" ||
        candidate.skills?.toLowerCase().includes(skills.toLowerCase())) &&
      (gender === "" || candidate.gender.toLowerCase() === gender.toLowerCase()) &&
      (location === "" ||
        candidate.location?.toLowerCase().includes(location.toLowerCase()))
    );
  });


  function parseApplicationDate(dateString) {
    return new Date(dateString).getTime();
  }
  const sortedCandidates = filteredCandidates.slice().sort((a, b) => {
    const key = sortOrder === "asc" ? 1 : -1;
    if (sortByField === "application_date") {

      const dateA = parseApplicationDate(a.appliedJobs.find(job => job.job_id === selectedJobId)?.application_date);
     
      const dateB = parseApplicationDate(b.appliedJobs.find(job => job.job_id === selectedJobId)?.application_date);
   

      return key * (dateB - dateA); // Sort by descending order of application date
    }



    else if (sortByField === "education") {
      return (
        key *
        (a.education || "").toLowerCase().localeCompare(
          (b.education || "").toLowerCase()
        )
      );
    } else if (sortByField === "workExperience") {
      return key * ((a.work_experience || 0) - (b.work_experience || 0));
    } else if (sortByField === "skills") {
      return (
        key *
        (a.skills || "").toLowerCase().localeCompare((b.skills || "").toLowerCase())
      );
    } else if (sortByField === "gender") {
      return (
        key *
        (a.gender || "").toLowerCase().localeCompare((b.gender || "").toLowerCase())
      );
    } else if (sortByField === "location") {
      return (
        key *
        (a.location || "").toLowerCase().localeCompare((b.location || "").toLowerCase())
      );
    }


    return 0;
  });




  // Calculate the indexes of the items to display on the current page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  
  const candidatesWithLatestDates = sortedCandidates.map(candidate => {
    const allApplicationDates = candidate.appliedJobs.map(job => new Date(job.application_date).getTime());
    const latestDate = Math.max(...allApplicationDates);
    return { candidate, latestDate };
  });

  const currentCandidates = candidatesWithLatestDates
    .filter(candidateData => candidateData.candidate.appliedJobs.length > 0)
    .sort((a, b) => b.latestDate - a.latestDate)
    .map(candidateData => candidateData.candidate)
    .slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(sortedCandidates.length / itemsPerPage);



  //download csv for the manager 
  const csvData = sortedCandidates.map((candidate) => ({
    First_Name: candidate.first_name,
    Last_Name: candidate.last_name,
    Gender: candidate.gender,
    Education: candidate.education,
    Work_Experience: candidate.work_experience,
    Skills: candidate.skills,
    Location: candidate.location,
  }));

  const handleStatusChangeSuccess = (message, color, newStatus) => {
    setStatusChangeMessage(message);
    setStatusChangeMessageColor(color);

    // Update the status of the selected candidate in the main list
    setCandidatesData((prevCandidatesData) =>
      prevCandidatesData.map((candidate) =>
        candidate.id === selectedCandidate.id
          ? {
            ...candidate,
            appliedJobs: candidate.appliedJobs.map((job) =>
              job.job_id === selectedJobId ? { ...job, status: newStatus } : job
            ),
            // notes: candidate.id === selectedCandidate.id ? selectedCandidateNotes : candidate.notes,
          }
          : candidate
      )
    );

    // Update the status of the selected candidate in the dialog
    setSelectedCandidate((prevSelectedCandidate) => ({
      ...prevSelectedCandidate,
      appliedJobs: prevSelectedCandidate.appliedJobs.map((job) =>
        job.job_id === selectedJobId ? { ...job, status: newStatus } : job
      ),
    }));
  };

  const handleStatusChangeError = (message, color) => {
    setStatusChangeMessage(message);
    setStatusChangeMessageColor(color);
  };

  const handleNoteAddSuccess = (message, color, note) => {

    // Handle success logic here
    console.log(message, color, note);
  };

  const handleNoteAddError = (message, color) => {

    // Handle error logic here
    console.error(message, color);
  };
  return (
    <ThemeProvider theme={defaultTheme}>
      <div className="profile-div">
        {props.token ? (
          <>
            <ToolBars token={props.token} userRole={props.userRole} />
            <Typography
              sx={{
                display: 'flex',
                textAlign: 'start',
                fontSize: '35px',
                paddingLeft: '6%',
                paddingTop: '2%',
                fontFamily: 'Roboto, Helvetica, Arial, sans-serif',
                fontWeight: 'bold',


              }}
            >
              Applicants
            </Typography>
            <Box className="Box-profile">

              <div className="filter-order" style={{ borderRadius: "20px" }}>
                <CandidateFilterForm onFilter={handleFilter} />
                <div className="orderby">

                  <FormControl variant="outlined">
                    <InputLabel>Sort By:</InputLabel>
                    <Select
                      value={sortByField}
                      onChange={(e) => handleSortByChange(e.target.value)}
                      label="Sort By:"
                    >
                      <MenuItem value="">
                        <em>None</em>
                      </MenuItem>
                      <MenuItem value="education">Education</MenuItem>
                      {/* <MenuItem value="workExperience">Work Experience</MenuItem> */}
                      <MenuItem value="skills">Skills</MenuItem>
                      <MenuItem value="gender">Gender</MenuItem>
                      <MenuItem value="location">Location</MenuItem>
                      <MenuItem value="application_date">Date</MenuItem>
                    </Select>
                  </FormControl>
                </div>
              </div>

              <div className="candidates-list">
                {loading ? (<CircularProgress style={{ margin: "100px auto", display: "block", color: 'rgb(174, 43, 91)' }} /> // Display loading spinner
                ) : (
                  <Table>
                    <CandidateTable
                      candidates={currentCandidates}
                      selectedJobId={selectedJobId}
                      handleViewCandidate={handleViewCandidate}
                      handleDeleteApplication={handleDeleteApplication}
                    />
                  </Table>
                )}

              </div>
              <div className="pagination">
                <Stack direction="row" spacing={2} alignItems="center">

                </Stack>
                <CandidatePagination
  totalPages={totalPages}
  currentPage={currentPage}
  onPageChange={(event, value) => setCurrentPage(value)}
  sortedCandidates={sortedCandidates} // Pass the sortedCandidates array
/>
              </div>
              <Button
                className="csv-export-button"
                sx={{color:'#ad2069'}}
              // Set the color style here
              >
                <CSVLink
                  data={csvData}
                  filename={"candidates.csv"}

                  sx={{ color: "#ad2069" }}
                >
                  Download CSV
                </CSVLink>
              </Button>






            </Box>

            <CandidateDialog
              open={open}
              handleClose={handleCloseDialog}
              selectedCandidate={selectedCandidate}
              selectedJobId={selectedJobId}
              statusChangeMessage={statusChangeMessage}
              statusChangeMessageColor={statusChangeMessageColor}
              handleStatusChangeSuccess={handleStatusChangeSuccess}
              handleStatusChangeError={handleStatusChangeError}
              handleNoteAddSuccess={handleNoteAddSuccess}
              handleNoteAddError={handleNoteAddError}
              handleDeleteApplication={handleDeleteApplication}
              token={props.token}
            />

          </>

        ) : (
          navigate('/Login')
        )}

<Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" href="">
                Tech 19
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>

      </div>
    </ThemeProvider>
  );
}

export default ProfileManager;