import React, { useState, useEffect } from "react";
import {
  Button,
  Snackbar,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
  Link,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import Header from "../../Components/Header";
// import CandidateDataService from './CandidateDataService';
import { Box, Alert } from "@mui/material";
import "../../styles/Profilemanager.css";
import AddJobForm from "./AddJobForm";
import CircularProgress from "@mui/material/CircularProgress";
import ToolBars from "./ToolBars";
import { API, graphqlOperation } from "aws-amplify";
import { listJobs } from "../../graphql/queries";
import { createJobs, updateJobs, deleteJobs } from "../../graphql/mutations";

function Position(props) {
  const [positions, setPositions] = useState([]);
  const [open, setOpen] = useState(false);
  const [positionName, setPositionName] = useState("");
  const [selectedPosition, setSelectedPosition] = useState(null);
  const [editedJobDescription, setEditedJobDescription] = useState("");
  const [editedQualifications, setEditedQualifications] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchJobs();
  }, []);

  async function fetchJobs() {
    try {
      const response = await API.graphql(graphqlOperation(listJobs));
      const jobList = response.data.listJobs.items.filter(
        (job) => !job._deleted
      ); // Filter out deleted jobs

      setPositions(jobList);
      setIsLoading(false); // Set loading to false when data is fetched
    } catch (error) {
      console.error("Error fetching jobs:", error);
      setIsLoading(false); // Set loading to false in case of an error
    }
  }

  const handleDeletePosition = async (position) => {
    try {
      // Perform the deletion
      const response = await API.graphql(
        graphqlOperation(deleteJobs, {
          input: { id: position.id, _version: position._version },
        })
      );

      if (!response.errors) {
        setPositions((prevPositions) =>
          prevPositions.filter((p) => p.id !== position.id)
        );
        setSnackbarOpen(true); // Open the success snackbar
        // Refresh the page after successful deletion
        window.location.reload();
      } else {
        console.error("Error deleting position:", response.errors);
      }
    } catch (error) {
      console.error("Error deleting position:", error);
    }
  };
  const handleAddPosition = () => {
    setPositionName("");
    setEditedJobDescription("");
    setEditedQualifications("");
    setSelectedPosition(null);
    setOpen(true);
  };

  const handleEditPosition = (position) => {
    setPositionName(position.job_title);
    setSelectedPosition(position);
    setEditedJobDescription(position.job_description);
    setEditedQualifications(position.qualifications);
    setOpen(true);
  };

  const handleSaveChanges = async (position) => {
    try {
      const response = await API.graphql(
        graphqlOperation(updateJobs, {
          input: {
            id: position.id, // Provide the ID of the job you want to update
            job_description: editedJobDescription,
            qualifications: editedQualifications,
            job_title: positionName,
            _version: position._version,
            // Add other fields you want to update
          },
        })
      );

      setOpen(false);
      fetchJobs();
      setSnackbarOpen(true); // Open the success snackbar
    } catch (error) {
      console.error("Error updating job:", error);

      // Handle error - you can display an error message to the user
    }
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false); // Close the snackbar
  };

  const handleJobAdded = () => {
    fetchJobs(); // Fetch updated positions after adding a new job
  };

  return (
    <div>
      <ToolBars />

      <Typography
        sx={{
          display: "flex",
          textAlign: "start",
          fontSize: "35px",
          paddingLeft: "6%",
          paddingTop: "1%",
          paddingBottom: "1%",
          fontFamily: '"Calibri", sans-serif',
          fontWeight: "bold",
        }}
      >
        Manage Job list
      </Typography>

      {isLoading ? (
        <div style={{ display: "flex", height: "1500px", marginLeft: "5%" }}>
          {" "}
          <CircularProgress
            style={{
              margin: "100px auto",
              display: "flex",
              color: "rgb(174, 43, 91)",
            }}
          />
        </div>
      ) : (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Box className="Box-profile">
            <div
              className="candidates-list"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <TableContainer style={{}}>
                <Table>
                  <TableHead>
                    <TableRow>
                      {/* <TableCell>Job id</TableCell> */}
                      <TableCell
                        style={{
                          fontFamily: '"Calibri", sans-serif',
                          width: "750px",
                        }}
                      >
                        Position Name
                      </TableCell>
                      <TableCell
                        style={{
                          fontFamily: '"Calibri", sans-serif',
                          width: "750px",
                        }}
                      >
                        Description
                      </TableCell>
                      <TableCell
                        style={{
                          fontFamily: '"Calibri", sans-serif',
                          width: "750px",
                        }}
                      >
                        Qualifications
                      </TableCell>
                      <TableCell></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {positions.map((position) => (
                      <TableRow key={position.id} sx={{ borderRadius: "50px" }}>
                        {/* <TableCell>{position.id}</TableCell> */}

                        <TableCell>
                          {selectedPosition === position ? (
                            <TextField
                              className="custom-select"
                              value={positionName}
                              multiline // Enable multiline input
                              rows={3} // Adjust the number of rows as needed
                              fullWidth // Expand to fit the container width
                              onChange={(e) => setPositionName(e.target.value)}
                            />
                          ) : (
                            <Typography
                              style={{ fontFamily: '"Calibri", sans-serif' }}
                            >
                              {" "}
                              {position.job_title}
                            </Typography>
                          )}
                        </TableCell>
                        <TableCell>
                          {selectedPosition === position ? (
                            <TextField
                              className="custom-select"
                              value={editedJobDescription}
                              multiline // Enable multiline input
                              rows={3} // Adjust the number of rows as needed
                              fullWidth // Expand to fit the container width
                              onChange={(e) =>
                                setEditedJobDescription(e.target.value)
                              }
                            />
                          ) : (
                            <Typography
                              style={{ fontFamily: '"Calibri", sans-serif' }}
                            >
                              {" "}
                              {position.job_description}
                            </Typography>
                          )}
                        </TableCell>
                        <TableCell>
                          {selectedPosition === position ? (
                            <TextField
                              className="custom-select"
                              value={editedQualifications}
                              multiline // Enable multiline input
                              rows={3} // Adjust the number of rows as needed
                              fullWidth // Expand to fit the container width
                              onChange={(e) =>
                                setEditedQualifications(e.target.value)
                              }
                            />
                          ) : (
                            <Typography
                              style={{ fontFamily: '"Calibri", sans-serif' }}
                            >
                              {" "}
                              {position.qualifications}
                            </Typography>
                          )}
                        </TableCell>
                        <TableCell>
                          {selectedPosition === position ? (
                            <Button
                              variant="contained"
                              color="secondary"
                              onClick={() => handleSaveChanges(position)}
                              sx={{
                                fontFamily: '"Calibri", sans-serif',
                                backgroundColor: "#ad2069",
                              }}
                              multiline // Enable multiline input
                              rows={3} // Adjust the number of rows as needed
                              fullWidth // Expand to fit the container width
                            >
                              Save
                            </Button>
                          ) : (
                            <>
                              <Button
                                color="secondary"
                                style={{ fontFamily: '"Calibri", sans-serif' }}
                                startIcon={<DeleteIcon />}
                                onClick={() => handleDeletePosition(position)}
                              >
                                Delete
                              </Button>
                              <Button
                                style={{ fontFamily: '"Calibri", sans-serif' }}
                                color="primary"
                                startIcon={<EditIcon />}
                                onClick={() => handleEditPosition(position)}
                              >
                                Edit
                              </Button>
                            </>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>

              <Snackbar
                open={snackbarOpen}
                autoHideDuration={3000}
                onClose={handleSnackbarClose}
              >
                <Alert severity="success" sx={{ width: "100%" }}>
                  Operation successful!
                </Alert>
              </Snackbar>
            </div>
            <AddJobForm token={props.token} onJobAdded={handleJobAdded} />
          </Box>
        </div>
      )}
      <Typography
        sx={{
          backgroundColor: "rgb(235 231 231)",
          paddingTop: "5%",
          marginTop: "130px",
        }}
        variant="body2"
        color="text.secondary"
        align="center"
        {...props}
      >
        {"Copyright © "}
        <Link color="inherit" href="">
          Tech 19
        </Link>{" "}
        {new Date().getFullYear()}
        {"."}
      </Typography>
    </div>
  );
}

export default Position;
