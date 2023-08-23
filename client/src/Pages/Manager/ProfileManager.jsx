


import React, { useState, useEffect } from "react";
import axios from "axios";
import CandidateDataService from "./CandidateDataService";
import CandidateFilterForm from "./CandidateFilterForm";
import Card from "@mui/material/Card";
import { CSVLink } from "react-csv";
import { Typography, Button, Table, TableHead, TableRow, TableCell, TableBody, TableContainer, SvgIcon, CardContent } from "@mui/material";
import { FormControl, InputLabel, Select, MenuItem, Box } from "@mui/material";
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import LocalPhoneOutlinedIcon from '@mui/icons-material/LocalPhoneOutlined';
import WcOutlinedIcon from '@mui/icons-material/WcOutlined';
import AddLocationAltOutlinedIcon from '@mui/icons-material/AddLocationAltOutlined';
import StatusChangeForm from './StatusChangeForm';
import Position from "../Manager/Position";
import Header from "../../Components/Header";
import CandidateStatus from './CandidateStatus';
import DownloadCV from "./DownloadCV";
import {


Divider,
  Dialog,
  DialogTitle,
  DialogContent,
  Slide,

} from "@mui/material";
import HomePage from "../../Components/Users/HomePage";
import CircularProgress from "@mui/material/CircularProgress"; // Import the CircularProgress component
import ToolBars from "./ToolBars";

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
  });
  const [sortOrder, setSortOrder] = useState("asc");
  const [loading, setLoading] = useState(true);
  const [sortByField, setSortByField] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; //ten applicants per page 
  const [selectedJobId, setSelectedJobId] = useState(null);
  const [newCandidateStatus, setNewCandidateStatus] = useState("");
  const [statusChangeMessage, setStatusChangeMessage] = useState("");
  const [statusChangeMessageColor, setStatusChangeMessageColor] = useState("black");
  const [updatedStatus, setUpdatedStatus] = useState("");
  const [updatedCandidateIndex, setUpdatedCandidateIndex] = useState(null);



  useEffect(() => {
    fetchCandidatesData();
  }, []);

  const fetchCandidatesData = async () => {
    try {
      const response = await CandidateDataService.getAllCandidates(props.token);
      const dataWithIds = response.data.candidates.map((candidate) => ({
        ...candidate,
        id: candidate.candidate_id,
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

  const sortedCandidates = filteredCandidates.slice().sort((a, b) => {
    const key = sortOrder === "asc" ? 1 : -1;
  
    if (sortByField === "education") {
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
    } else if (sortByField === "dateApply") { // Add this block for sorting by application date
      const dateA = a.appliedJobs.find(job => job.job_id === selectedJobId)?.application_date || '';
      const dateB = b.appliedJobs.find(job => job.job_id === selectedJobId)?.application_date || '';
      return key * (dateA.localeCompare(dateB));
    }
  
    return 0;
  });
  // Calculate the indexes of the items to display on the current page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentCandidates = sortedCandidates.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(sortedCandidates.length / itemsPerPage);


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
  
  
 
  return (
    <div className="profile-div">
    <ToolBars token={props.token} userRole={props.userRole}/>
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
                <MenuItem value="workExperience">Work Experience</MenuItem>
                <MenuItem value="skills">Skills</MenuItem>
                <MenuItem value="gender">Gender</MenuItem>
                <MenuItem value="location">Location</MenuItem>
                <MenuItem value="dateApply">Date</MenuItem>
              </Select>
            </FormControl>
            </div>
        </div>
        
        <div className="candidates-list">
        {loading ? ( <CircularProgress style={{ margin: "100px auto", display: "block" }} /> // Display loading spinner
        ):(
             <Table>
            <TableHead>
              <TableRow>
              <TableCell>Date Apply</TableCell>
                <TableCell>Full Name</TableCell>
                <TableCell>Location</TableCell>
                <TableCell>Gender</TableCell>
                <TableCell>Position</TableCell>
                <TableCell>Education</TableCell>
                <TableCell>Work Experience</TableCell>
                <TableCell>Skills</TableCell>
                
                
                <TableCell>Status</TableCell>
               
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {currentCandidates.map((candidate) => (
                <React.Fragment key={candidate.id}>
                  {candidate.appliedJobs.map((appliedJob) => (
                        <TableRow className="tr-candidate" key={appliedJob.job_id}  sx={{
                          '&:hover': {
                            borderColor: 'pink', // Change this to the desired hover border color
                            borderWidth: '2px', // Add a border width to make the border more noticeable
                            borderRadius: '8px', // Add border radius to the TableRow
                          },
                        }}
                        >
                            <TableCell>{appliedJob.application_date}</TableCell>
                            <TableCell>{candidate.first_name} {candidate.last_name}</TableCell>
                            <TableCell>{candidate.location}</TableCell>
                            <TableCell>{candidate.gender}</TableCell>
                            <TableCell>{appliedJob.job_title}</TableCell>
                            <TableCell>{candidate.education}</TableCell>
                            <TableCell>{candidate.work_experience}</TableCell>
                            <TableCell>{candidate.skills}</TableCell>
                            
                            <TableCell>
                              {updatedStatus !== "" ? updatedStatus : appliedJob.status}
                            </TableCell>
                            <TableCell>
                              <Button
                                variant="contained"
                                color="primary"
                                onClick={() => handleViewCandidate(candidate, appliedJob.job_id)} // Pass the job ID
                              >
                                View Candidate
                              </Button>
                            </TableCell>
                      </TableRow>
                  ))}
                </React.Fragment>
              ))}
            </TableBody>
          </Table>
        )}

        </div>
        <div className="pagination">
        <Button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(currentPage - 1)}
        >
          Previous
        </Button>
        <span>Page {currentPage}</span>
        <Button
          disabled={indexOfLastItem >= sortedCandidates.length}
          onClick={() => setCurrentPage(currentPage + 1)}
        >
          Next
        </Button>
      {/* {renderPaginationButtons()} */}
      </div>
        <Button className="csv-export-button"> {/**download csv of all the candidate */}
          <CSVLink
            data={csvData}
            filename={"candidates.csv"}
            className="btn btn-primary"
          >
            Download CSV
          </CSVLink>
        </Button>
      </Box>
      
      <Dialog
        open={open}
        onClose={handleCloseDialog}
        style={{
          width: '50%', // Adjust the width as needed
          maxWidth: 'none', // Remove maxWidth
          position: 'fixed', // Position the dialog absolutely
          right: 1, // Position from the left edge of the screenpxpx
          top: 0, // Position from the top edge of the screen
          height: '100%', // Take up the full height
          borderRadius: 0, // Remove border radius
        }}
        maxWidth="xl"
        fullWidth
      >
         <Button
              
              color="primary"
              onClick={handleCloseDialog}
              style={{ marginTop: "16px", height:"30px",width:"10px",position:"fixed" }}
            >
            X
          </Button>
        
          {/* <DialogTitle style={{ textAlign: "center" }}>View Candidate Details</DialogTitle> */}
          <DialogContent className="profilePopUp">
              
            {
              selectedCandidate ? (<>
          <Card className="candidate-card-profile" style={{ height: '100%' }}>
            <CardContent style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', height: '100%', padding: '16px' }}>
              <Typography variant="h4"  sx={{paddingTop:'15px',fontSize: '40px'}} >
                {selectedCandidate.first_name} {selectedCandidate.last_name} cv
              </Typography>
              <Typography sx={{paddingTop:'35px',fontSize: '18px'}}>
                <MailOutlineIcon fontSize="small" /> Email: {selectedCandidate.email}
              </Typography>
              <Typography sx={{paddingTop:'5px',fontSize: '18px'}}>
                <LocalPhoneOutlinedIcon fontSize="small" /> Phone: {selectedCandidate.phone_number}
              </Typography>
              <Typography sx={{paddingTop:'5px',fontSize: '18px'}}>
                <AddLocationAltOutlinedIcon fontSize="small" /> Location: {selectedCandidate.location}
              </Typography>
              <Typography sx={{paddingTop:'5px',fontSize: '18px'}}>
                <WcOutlinedIcon fontSize="small" /> Gender: {selectedCandidate.gender}
              </Typography>
              <Typography sx={{paddingTop:'5px',fontSize: '18px'}}>
                Name: {selectedCandidate.first_name} {selectedCandidate.last_name}
              </Typography>
              <Typography sx={{paddingTop:'5px',fontSize: '18px'}} >
                ID Candidate: {selectedCandidate.candidate_id}
              </Typography>
              <Typography sx={{paddingTop:'5px',fontSize: '18px'}}>
                Application ID: {selectedCandidate.application_id}
              </Typography>
              <Typography sx={{paddingTop:'5px',fontSize: '18px'}}>
                Position: {selectedCandidate.position}
              </Typography>
              <Typography sx={{paddingTop:'5px',fontSize: '18px'}}>
                Education: {selectedCandidate.education}
              </Typography >
              <Typography sx={{paddingTop:'5px',fontSize: '18px'}}>
                Experience: {selectedCandidate.work_experience}
              </Typography>
              <Typography sx={{paddingTop:'5px',fontSize: '18px'}}>
                Skills: {selectedCandidate.skills}
              </Typography>
              <Typography sx={{paddingTop:'5px',fontSize: '18px'}}>
                Certification: {selectedCandidate.certifications}
              </Typography>
              <Typography sx={{paddingTop:'5px',fontSize: '18px'}}>
                Department: {selectedCandidate.position}
              </Typography>
            
              <div style={{ display: 'flex', alignItems: 'center', marginTop: '16px' }}>
              <StatusChangeForm
                token={props.token}
                selectedJobId={selectedJobId}
                handleStatusChangeSuccess={(message, color, newStatus) => {
                  handleStatusChangeSuccess(message, color, newStatus);
                }}
                handleStatusChangeError={handleStatusChangeError}
                currentStatus={
                  selectedCandidate.appliedJobs.find((job) => job.job_id === selectedJobId)?.status || ''
                }
                selectedCandidate={selectedCandidate} // Pass the selected candidate here
              />
              <Typography style={{ color: statusChangeMessageColor, marginLeft: '16px' }}>
                {statusChangeMessage}
              </Typography>
            </div>
              <Divider style={{ margin: '16px 0' ,color:'grey'}} />
              <DownloadCV
                token={props.token}
                setToken={props.setToken}
                candidate_id={selectedCandidate.candidate_id}
              />
            </CardContent>
          </Card>
              </>
              ) : (<h1>No candidate data found</h1>)
            }
            
           
          </DialogContent>
      </Dialog>
 
     
    </div>
  );
}

export default ProfileManager;