

import React, { useState, useEffect } from "react";
import {
  TableRow,
  TableCell,
  Button,
  TableBody,
  TableHead,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Table,
  Box,
  Container,
} from "@mui/material";
import CandidateFilterForm from "./CandidateFilterForm"; // Import the CandidateFilterForm component
import "../../styles/Profilemanager.css";
import { API, graphqlOperation } from "aws-amplify";
import { deleteCandidate } from "../../graphql/mutations";
import Snackbar from "@mui/material/Snackbar";
import TablePagination from "@mui/material/TablePagination";
import MuiAlert from "@mui/material/Alert";
import AddCandidateForm from "./AddCandidateForm";
import Dialog from '@mui/material/Dialog';

const CandidateRow = ({ candidate,
  appliedJob, selectedJobId, handleViewCandidate,
  handleDeleteApplication, onDeleteCandidate, }) => {


  const [isRowClicked, setIsRowClicked] = useState(false);

  // const handleRowClick = () => {
  //   setIsRowClicked(!isRowClicked);
  // };

  // const handleDelete = async (deletedCandidateId) => {
  //   console.log("handle delete :",deletedCandidateId);
  //   try {
      
  //     const input = {
  //       id: candidate.candidateJob.id ,
  //       _version: 1,
  //     };

  //     // Perform the delete operation
  //     const response = await API.graphql(
  //       graphqlOperation(deleteCandidateJobs, { input })
  //     );


  //     // Check if the delete operation was successful
  //     if (response.data && response.data.deleteCandidateJobs) {
  //       // Notify the parent component (CandidateTable) of the successful deletion

  //       onDeleteCandidate(candidate.candidateJob.id);
  //     } else {
  //       // Handle the case where the delete operation did not succeed
  //       handleNotification("Error deleting candidate job", "error");
  //     }
  //   } catch (error) {
  //     console.error("Error deleting candidate job:", error);
  //     handleNotification("Error deleting candidate job", "error");
  //   }
  // };
  const handleDelete = async (deletedCandidateId) => {
    // Ask for confirmation before deleting the candidate
    const confirmed = window.confirm("Are you sure you want to delete this candidate?");
    
    if (!confirmed) {
      // If not confirmed, do nothing
      return;
    }
  
    try {
      const input = {
        id: deletedCandidateId,  // Use id field for candidate ID
        _version: 1,
      };
  
      // Perform the delete operation
      const response = await API.graphql(
        graphqlOperation(deleteCandidate, { input })
      );
  
      // Check if the delete operation was successful
      if (response.data && response.data.deleteCandidate) {
        // Notify the parent component (CandidateTable) of the successful deletion
        console.log("Candidate deleted successfully");
        window.location.reload();
      } else {
        // Handle the case where the delete operation did not succeed
        handleNotification("Error deleting candidate", "error");
      }
    } catch (error) {
      console.error("Error deleting candidate:", error);
      handleNotification("Error deleting candidate", "error");
    }
  };
  
  const handleNotification = (message, type) => {
    // Implement your notification logic here

  };

  const formatDate = (isoDate) => {
    const date = new Date(isoDate);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-based
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };



  const handleRowClick = () => {
    if (candidate.job && candidate.job.id) {
      handleViewCandidate(candidate, candidate.job.id);
    } else {
      // Handle the case where candidate.job or candidate.job.id is null or undefined
      // For example, you can display a message or take appropriate action
      handleViewCandidate(candidate, null);
    }
  };
  return (


    <TableRow
      key={candidate.candidate.id}
      sx={{
        borderRadius: "10px",
        transition: "box-shadow 0.3s",
        boxShadow: isRowClicked ? "0px 0px 5px 3px #ad2069" : "none",

        "&:hover": {
          boxShadow: "0px 0px 5px 3px #ad2069",
          cursor: "pointer",
        },
      }}
      // onClick={() => handleViewCandidate(candidate, candidate.job.id)}
      onClick={handleRowClick}
    >

      <TableCell   className="my-font">{formatDate(candidate.candidate.createdAt)}</TableCell>
      <TableCell   className="my-font">{candidate.candidate.first_name} {candidate.candidate.last_name}</TableCell>
      <TableCell   className="my-font">{candidate.candidate.location}</TableCell>
      <TableCell    className="my-font">{candidate.candidate.gender}</TableCell>
     
      {/* <TableCell className="fullWidthCell">{candidate.job.job_title}</TableCell> */}
      <TableCell   className="my-font">
        {candidate.job?.job_title || candidate.candidate.position || 'No job title'}
      </TableCell> {/* Render 'No Job Title' if job_title is null or undefined */}
      <TableCell    className="my-font">{candidate.candidate.education}</TableCell>
      <TableCell    className="my-font">{candidate.candidate.work_experience}</TableCell>
      <TableCell   className="my-font">{candidate.candidate.skills}</TableCell>
      <TableCell   className="my-font">{candidate.candidate.status}</TableCell>
      <TableCell   className="fullWidthCell">
        <Button variant="contained" color="secondary" style={{fontFamily:'"Calibri", sans-serif',}} onClick={() => handleDelete(candidate.candidate.id)}>
          Delete
        </Button>
      </TableCell>
    </TableRow>
  );
};














const CandidateTable = ({
  candidates,
  selectedJobId,
  handleViewCandidate,
  handleDeleteApplication,
}) => {
  const [sortByField, setSortByField] = useState("application_date"); // State to hold the sorting field
  const [sortOrder, setSortOrder] = useState("asc"); // State to hold the sorting order (asc or desc)
  const [filters, setFilters] = useState({
    education: "",
    workExperience: "",
    skills: "",
    gender: "",
    location: "",
  });
  const [showAddCandidateForm, setShowAddCandidateForm] = useState(false);
  const [notification, setNotification] = useState(null);
  const [page, setPage] = useState(0); // Current page
  const [rowsPerPage, setRowsPerPage] = useState(10); // Rows per page
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleAddCandidateClick = () => {
    setShowAddCandidateForm(!showAddCandidateForm);
    setDialogOpen(true); // Open the dialog when Add Candidate is clicked
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };


  // function to sort candidates based on the selected sorting criteria
  const sortCandidates = (candidates) => {
    return candidates.slice().sort((a, b) => {
      let comparison = 0;

      if (sortByField === "education") {
        comparison = a.candidate.education.localeCompare(b.candidate.education);
      } else if (sortByField === "skills") {
        comparison = a.candidate.skills.localeCompare(b.candidate.skills);
      } else if (sortByField === "gender") {
        comparison = a.candidate.gender.localeCompare(b.candidate.gender);
      } else if (sortByField === "location") {
        comparison = a.candidate.location.localeCompare(b.candidate.location);
      } else if (sortByField === "application_date") {
        const dateA = new Date(a.candidate.createdAt).getTime();
        const dateB = new Date(b.candidate.createdAt).getTime();
        comparison = dateA - dateB;
      }

      // Apply sortOrder (ascending or descending)
      return sortOrder === "dsc" ? comparison : -comparison;
    });
  };



  // const handleAddCandidateClick = () => {
  //   setShowAddCandidateForm(prevShowAddCandidateForm => !prevShowAddCandidateForm);
  // };


  const filteredCandidates = candidates.filter((candidate) => {
    const {
      education,
      workExperience,
      skills,
      gender,
      location,
    } = filters;

    return (
      (education === "" || candidate.candidate.education === education) &&
      (workExperience === "" ||
        candidate.candidate.work_experience === workExperience) &&
      (skills === "" ||
        candidate.candidate.skills
          .toLowerCase()
          .includes(skills.toLowerCase())) &&
      (gender === "" ||
        candidate.candidate.gender.toLowerCase() === gender.toLowerCase()) &&
      (location === "" ||
        candidate.candidate.location
          .toLowerCase()
          .includes(location.toLowerCase()))
    );
  });

  const sortedCandidates = sortCandidates(filteredCandidates);

  const startIndex = page * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const displayedCandidates = sortedCandidates.slice(startIndex, endIndex);


  const handleChangePage = (event, newPage) => {

    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    const newRowsPerPage = parseInt(event.target.value, 10);

    setRowsPerPage(newRowsPerPage);
    setPage(0); // Reset page to 0 when rows per page changes
  };








  //SORT

  const handleSortByChange = (field) => {
    if (field === sortByField) {
      // Toggle the sorting order if the same field is selected
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      // Set the new sorting field and default to ascending order
      setSortByField(field);
      setSortOrder("asc");
    }
  };

  const handleFilter = (newFilters) => {
    setFilters(newFilters);
  };

  // const handleDeleteCandidate = (deletedCandidateId) => {
    // console.log("handleDeleteCandidate __________________________________",deletedCandidateId);
    
    // const confirmation = window.confirm("Are you sure you want to delete this candidate?");
    // if (confirmation) {
    //   // Update the table data by filtering out the deleted candidate
    //   const updatedCandidates = candidates.filter(
    //     (candidate) => candidate.candidateJob.id !== deletedCandidateId
    //   );

    //   // Display a success notification
    //   handleNotification("Candidate job deleted successfully", "success");

    //   // Reload the page
    //   window.location.reload();
    // }
  // };



  const handleNotification = (message, type) => {
    // Set the notification state
    setNotification({ message, type });
    const timer = setTimeout(() => {
      setNotification(null);
    }, 5000);

    return () => clearTimeout(timer);
  };


  const AddCandidateDialog = ({ open, handleClose }) => {
    return (
      <Dialog  open={open} onClose={handleClose}>
        
      
          <AddCandidateForm />
      
      </Dialog>
    );
  };
  return (

    <div style={{ width: '1500px', height: '1200px' }}>
      <Snackbar
        open={notification !== null}
        autoHideDuration={5000}
        onClose={() => setNotification(null)}
      >
        <MuiAlert
          elevation={6}
          variant="filled"
          severity={notification?.type === "success" ? "success" : "error"}
          onClose={() => setNotification(null)}
        >
          {notification?.message}
        </MuiAlert>
      </Snackbar>


      <Container
        className="candidate-table"
    
      >
        <div className="container" style={{  padding: '15px',width: '140%'  }} >
          <CandidateFilterForm onFilter={handleFilter} />

          <div className="orderby">
            <FormControl variant="outlined" className="custom-select">
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
                <MenuItem value="skills">Skills</MenuItem>
                <MenuItem value="gender">Gender</MenuItem>
                <MenuItem value="location">Location</MenuItem>
                <MenuItem value="application_date">Date</MenuItem>
              </Select>
            </FormControl>
          </div>
        </div>
        {/* <Table sx={{ minWidth: 1024 ,backgroundColor:'white'}}> */}
        <Table className="table-style">
          <TableHead>
            <TableRow>
              <TableCell className="my-font">Date Apply</TableCell>
              <TableCell   className="my-font">Full Name</TableCell>
              <TableCell  className="my-font">Location</TableCell>
              <TableCell  className="my-font">Gender</TableCell>
              <TableCell  className="my-font">Position</TableCell>
              <TableCell  className="my-font">Education</TableCell>
              <TableCell   className="my-font">Work Experience</TableCell>
              <TableCell  className="my-font">Skills</TableCell>
              <TableCell  className="my-font">Status</TableCell>
              <TableCell  className="my-font">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {displayedCandidates.map((candidate) => (
              <CandidateRow
                key={candidate.candidate.id}
                candidate={candidate}
                selectedJobId={selectedJobId}
                handleViewCandidate={handleViewCandidate}
                // onDeleteCandidate={handleDeleteCandidate}
              />
            ))}
          </TableBody>
          
        </Table>

     
      
        <TablePagination
        
            sx={{ display: 'flex', width: '120%', backgroundColor: 'white'}}
            component="div"
            count={sortedCandidates.length} // Use sortedCandidates.length
            page={page}
            onPageChange={handleChangePage} // Ensure handleChangePage is called
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handleChangeRowsPerPage} // Ensure handleChangeRowsPerPage is called
            labelRowsPerPage="Rows per page:"
            rowsPerPageOptions={[10, 25, 50]}
          />
          <div style={{backgroundColor:'white',width:'120%',padding:'15px',
           borderBottomLeftRadius:'10px',borderBottomRightRadius:'15px',}}>
          <Button
        variant="contained"
        sx={{fontFamily:'"Calibri", sans-serif', backgroundColor: 'grey','&:hover': {
          backgroundColor: 'darkgrey'
        } }}
        onClick={handleAddCandidateClick}
      >
       Add Candidate
      </Button>
      </div>

      {showAddCandidateForm && (
        <AddCandidateDialog
          open={dialogOpen}
          handleClose={handleDialogClose}
        />
      )}
      </Container>
    </div>
  );
}
export default CandidateTable;