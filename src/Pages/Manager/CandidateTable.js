

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
import { deleteCandidateJobs } from "../../graphql/mutations";
import Snackbar from "@mui/material/Snackbar";
import TablePagination from "@mui/material/TablePagination";
import MuiAlert from "@mui/material/Alert";

const CandidateRow = ({ candidate,
  appliedJob, selectedJobId, handleViewCandidate,
  handleDeleteApplication, onDeleteCandidate, }) => {
  const [isRowClicked, setIsRowClicked] = useState(false);

  const handleRowClick = () => {
    setIsRowClicked(!isRowClicked);
  };

  const handleDelete = async () => {
    try {


      const input = {
        id: candidate.candidateJob.id,
        _version: 1,
      };

      // Perform the delete operation
      const response = await API.graphql(
        graphqlOperation(deleteCandidateJobs, { input })
      );


      // Check if the delete operation was successful
      if (response.data && response.data.deleteCandidateJobs) {
        // Notify the parent component (CandidateTable) of the successful deletion

        onDeleteCandidate(candidate.candidateJob.id);
      } else {
        // Handle the case where the delete operation did not succeed
        handleNotification("Error deleting candidate job", "error");
      }
    } catch (error) {
      console.error("Error deleting candidate job:", error);
      handleNotification("Error deleting candidate job", "error");
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
      onClick={() => handleViewCandidate(candidate, candidate.job.id)}
    >

      <TableCell className="fullWidthCell">{formatDate(candidate.candidate.createdAt)}</TableCell>
      <TableCell className="fullWidthCell">{candidate.candidate.first_name} {candidate.candidate.last_name}</TableCell>
      <TableCell className="fullWidthCell">{candidate.candidate.location}</TableCell>
      <TableCell className="fullWidthCell">{candidate.candidate.gender}</TableCell>
      <TableCell className="fullWidthCell">{candidate.job.job_title}</TableCell>
      <TableCell className="fullWidthCell">{candidate.candidate.education}</TableCell>
      <TableCell className="fullWidthCell">{candidate.candidate.work_experience}</TableCell>
      <TableCell className="fullWidthCell">{candidate.candidate.skills}</TableCell>
      <TableCell className="fullWidthCell">{candidate.candidate.status}</TableCell>
      <TableCell className="fullWidthCell">
        <Button variant="contained" color="secondary" onClick={handleDelete}>
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

  const [notification, setNotification] = useState(null);
  const [page, setPage] = useState(0); // Current page
  const [rowsPerPage, setRowsPerPage] = useState(10); // Rows per page
  // Create a function to sort candidates based on the selected sorting criteria
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

  const handleDeleteCandidate = (deletedCandidateId) => {
    const confirmation = window.confirm("Are you sure you want to delete this candidate?");
    if (confirmation) {
      // Update the table data by filtering out the deleted candidate
      const updatedCandidates = candidates.filter(
        (candidate) => candidate.candidateJob.id !== deletedCandidateId
      );

      // Display a success notification
      handleNotification("Candidate job deleted successfully", "success");

      // Reload the page
      window.location.reload();
    }
  };



  const handleNotification = (message, type) => {
    // Set the notification state
    setNotification({ message, type });
    const timer = setTimeout(() => {
      setNotification(null);
    }, 5000);

    return () => clearTimeout(timer);
  };
  return (

    <div style={{display:'block',backgroundColor:'white',
   
    borderRadius:'7px'}} >
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
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
         width:'140%',
          // backgroundColor: 'white',
          height:'215px',
         


        }}
      >
        <div  style={{backgroundColor:'white',padding:'15px',    width: '1155x',}} >
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
        <Table sx={{ width: '140%', backgroundColor: 'white' }}>
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
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {displayedCandidates.map((candidate) => (
              <CandidateRow
                key={candidate.candidate.id}
                candidate={candidate}
                selectedJobId={selectedJobId}
                handleViewCandidate={handleViewCandidate}
                onDeleteCandidate={handleDeleteCandidate}
              />
            ))}
          </TableBody>
        </Table>
     
        <TablePagination
        sx={{display:'flex',width:'140%',backgroundColor:'white'}}
          component="div"
          count={sortedCandidates.length} // Use sortedCandidates.length
          page={page}
          onPageChange={handleChangePage} // Ensure handleChangePage is called
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage} // Ensure handleChangeRowsPerPage is called
          labelRowsPerPage="Rows per page:"
          rowsPerPageOptions={[10, 25, 50]}
        />
     
      </Container>
    </div>
  );
}
export default CandidateTable;