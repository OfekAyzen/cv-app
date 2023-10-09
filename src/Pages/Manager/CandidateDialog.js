


import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  Button,
  Card,
  CardContent,
  Typography,
  Divider,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
} from "@mui/material";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import LocalPhoneOutlinedIcon from "@mui/icons-material/LocalPhoneOutlined";
import WcOutlinedIcon from "@mui/icons-material/WcOutlined";
import AddLocationAltOutlinedIcon from "@mui/icons-material/AddLocationAltOutlined";
import { API, graphqlOperation } from "aws-amplify";
import { updateCandidate } from "../../graphql/mutations";
import { getCandidate } from "../../graphql/queries"; // Import your query here
import DownloadCV from "./DownloadCV";
import { Storage } from 'aws-amplify';
// import { Storage } from "@aws-amplify/storage";
// import awsConfig from './aws-configuration';
import { Amplify } from '@aws-amplify/core';
import "../../styles/Profilemanager.css";
import TextareaAutosize from '@mui/material/TextareaAutosize'; 
// Amplify.configure(awsConfig);

const CandidateDialog = ({
  open,
  handleClose,
  selectedCandidate,
  selectedJobId,
  handleNoteAddSuccess,
  handleNoteAddError,
}) => {
  const [newStatus, setNewStatus] = useState("");
  const [note, setNote] = useState("");
  const [statusChangeMessage, setStatusChangeMessage] = useState("");
  const [noteMessage, setNoteMessage] = useState("");

  useEffect(() => {
    // Fetch the candidate data when the dialog opens
    if (open && selectedCandidate) {
      fetchCandidateData(selectedCandidate.id);
    }
  }, [open, selectedCandidate]);

  const fetchCandidateData = async (candidateId) => {
    try {
      const response = await API.graphql(
        graphqlOperation(getCandidate, {
          id: candidateId,
        })
      );

      const candidateData = response.data.getCandidate;
      setNote(candidateData.note);
    } catch (error) {
      setStatusChangeMessage("Error fetching candidate data");
      // Clear the note message after 3 seconds (3000 milliseconds)
      setTimeout(() => {
        setNoteMessage("");
      }, 3000); // Adjust the delay as needed

      console.error("Error fetching candidate data:", error);
      
    }
  };

  const handleStatusChange = async () => {
    try {
      const input = {
        id: selectedCandidate.id,
        status: newStatus,
      };

      const response = await API.graphql(
        graphqlOperation(updateCandidate, { input })
      );

      console.log("Candidate status updated:", response.data.updateCandidate);
      setStatusChangeMessage("Status updated successfully");
      // Clear the note message after 3 seconds (3000 milliseconds)
      setTimeout(() => {
        setStatusChangeMessage("");
      }, 3000); // Adjust the delay as needed

      //   handleNoteAddSuccess("Status updated successfully", "green");
    } catch (error) {
      console.error("Error updating status:", error);
      setStatusChangeMessage("Error updating status");
      //   handleNoteAddError("Error updating status", "red");
    }
  };

  const handleNoteChange = (e) => {
    setNote(e.target.value);
  };

  const handleSaveNote = async () => {
    try {
      const input = {
        id: selectedCandidate.id,
        note: note,
      };

      const response = await API.graphql(
        graphqlOperation(updateCandidate, { input })
      );

      console.log("Note saved:", response.data.updateCandidate);
      setNoteMessage("Note saved successfully");
      // handleNoteAddSuccess("Note saved successfully", "green");
      // Clear the note message after 3 seconds (3000 milliseconds)
      setTimeout(() => {
        setNoteMessage("");
      }, 3000); // Adjust the delay as needed
    } catch (error) {
      console.error("Error saving note:", error);
      setNoteMessage("Error saving note");
      handleNoteAddError("Error saving note", "red");
    }
  };

  // const handleDownloadCV = async () => {
  //   if (selectedCandidate && selectedCandidate.cv) {

  //     try {

  //       // Construct the download URL using the cvFileKey
  //       const downloadUrl = await Storage.get(`${selectedCandidate.cv}`);

  //       // Create a hidden anchor element
  //       const link = document.createElement('a');
  //       link.href = downloadUrl;
  //       link.target = '_blank';
  //       link.download = `CV_${selectedCandidate.first_name}_${selectedCandidate.last_name}.pdf`; // Adjust the desired download file name

  //       // Append the anchor to the body and programmatically click it to initiate the download
  //       document.body.appendChild(link);
  //       link.click();

  //       // Clean up: remove the anchor from the DOM
  //       document.body.removeChild(link);
  //     } catch (error) {
  //       console.error("Error downloading CV:", error);
  //     }
  //   }
  //   else {
  //     setNoteMessage("No CV to the candidate");

  //   }
  // };
  const handleDownloadCV = async () => {
    if (!selectedCandidate || !selectedCandidate.cv) {
      setNoteMessage("No CV for the candidate");
      return;
    }
  
    try {
     // Ensure AWS configuration is properly set up
      Amplify.configure({
        Storage: {
          AWSS3: {
            bucket: 'amplify-amplify20e2396a2d654-staging-72154-storages3cvmanagementappstorage7140768f-OWEDL5NTQVQ3',
            region: 'US East (Ohio) us-east-2',
          },
        },
      });
  
      // Construct the download URL using the cvFileKey
      const downloadUrl = await Storage.get(selectedCandidate.cv);
  
      // Create a hidden anchor element
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.target = '_blank';
      link.download = `CV_${selectedCandidate.first_name}_${selectedCandidate.last_name}.pdf`;
  
      // Append the anchor to the body and programmatically click it to initiate the download
      document.body.appendChild(link);
      link.click();
  
      // Clean up: remove the anchor from the DOM
      document.body.removeChild(link);
    } catch (error) {
      console.error("Error downloading CV:", error);
    }
  };
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      className="dialog-style"
      maxWidth="xl"
      fullWidth
    >
      <Button
        color="primary"
        onClick={handleClose}
        style={{
          marginTop: "16px",
          height: "30px",
          width: "10px",
          position: "fixed",
          color: "black",
         
        }}
      >
        X
      </Button>

      <DialogContent className="profilePopUp">
        {selectedCandidate ? (
          <Card className="candidate-card-profile" style={{ height: "100%" }}>
            <CardContent
             className="card-contentDialog"
            >
              <Typography variant="h4" sx={{ paddingTop: "15px", fontSize: "40px" }}>
                {selectedCandidate.first_name} {selectedCandidate.last_name} cv
              </Typography>
              <Typography sx={{ paddingTop: "35px", fontSize: "18px", fontFamily:'"Calibri", sans-serif',}}>
                <MailOutlineIcon fontSize="small" /> Email: {selectedCandidate.email}
              </Typography>
              <Typography sx={{ paddingTop: "5px", fontSize: "18px", fontFamily:'"Calibri", sans-serif', }}>
                <LocalPhoneOutlinedIcon fontSize="small" /> Phone: {selectedCandidate.phone_number}
              </Typography>
              <Typography sx={{ paddingTop: "5px", fontSize: "18px", fontFamily:'"Calibri", sans-serif', }}>
                <AddLocationAltOutlinedIcon fontSize="small" /> Location: {selectedCandidate.location}
              </Typography>
              <Typography sx={{ paddingTop: "5px", fontSize: "18px", fontFamily:'"Calibri", sans-serif', }}>
                <WcOutlinedIcon fontSize="small" /> Gender: {selectedCandidate.gender}
              </Typography>
              <hr />
              <Typography sx={{ paddingTop: "5px", fontSize: "18px", fontFamily:'"Calibri", sans-serif', }}>
                Position: {selectedCandidate.position || 'No Job Title'}
              </Typography>
              <Typography sx={{ paddingTop: "5px", fontSize: "18px" , fontFamily:'"Calibri", sans-serif',}}>
                Education: {selectedCandidate.education}
              </Typography>
              <Typography sx={{ paddingTop: "5px", fontSize: "18px" , fontFamily:'"Calibri", sans-serif',}}>
                Experience: {selectedCandidate.work_experience}
              </Typography>
              <Typography sx={{ paddingTop: "5px", fontSize: "18px" , fontFamily:'"Calibri", sans-serif',}}>
                Skills: {selectedCandidate.skills}
              </Typography>
              <Typography sx={{ paddingTop: "5px", fontSize: "18px", fontFamily:'"Calibri", sans-serif', }}>
                Certification: {selectedCandidate.certifications}
              </Typography>
              <Typography sx={{ paddingTop: "5px", fontSize: "18px" , fontFamily:'"Calibri", sans-serif',}}>
                Department: {selectedCandidate.position}
              </Typography>

              <hr />

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  marginTop: "16px",
                }}
              >
                <FormControl variant="outlined" sx={{ width: "395px" }} className="custom-text-field">
                  <InputLabel style={{ fontFamily:'"Calibri", sans-serif',}}>Status</InputLabel>
                  <Select
                    value={newStatus || ""}
                    onChange={(e) => setNewStatus(e.target.value)}
                    label="Status"
                    sx={{width:'80%'}}
                  >

                    <MenuItem value={"Accepted"}>Accepted</MenuItem>
                    <MenuItem value={"Pending"}>Pending</MenuItem>
                    <MenuItem value={"Application Received"}>Application Received</MenuItem>
                    <MenuItem value={"Application Under Review"}>Application Under Review</MenuItem>
                    <MenuItem value={"Interview Scheduled"}>Interview Scheduled</MenuItem>
                    <MenuItem value={"Assessment/Testing"}>Assessment/Testing</MenuItem>
                    <MenuItem value={"Application Unsuccessful"}>Application Unsuccessful</MenuItem>
                  </Select >
                </FormControl>
             
                <Button
                  variant="contained"
                  color="primary"
                  size="small"
                  sx={{fontFamily:'"Calibri", sans-serif',
                    backgroundColor: "#ad2069",
                    "&:hover": {
                      backgroundColor: "#ff98b5",
                    },
                    marginTop: "16px",
                  }}
                  onClick={handleStatusChange}
                >
                  Save Status
                </Button>
                <Typography style={{ color: "green", marginLeft: "16px" }}>{statusChangeMessage}</Typography>

                <TextareaAutosize
                  className="custom-text-field"
                 
                  multiline
                  rows={4}
                  variant="outlined"
                  value={note}
                  onChange={handleNoteChange}
                  style={{ marginTop: "16px", width: "98%" ,height:'50px',borderBlockColor:'lightgrey',
                borderRadius:'5px', "&:hover": {
                  backgroundColor: "pink",
                },
                }}
                />
                <Button
                  variant="contained"
                  color="primary"
                  size="small"
                  sx={{
                     fontFamily:'"Calibri", sans-serif',
                    backgroundColor: "#ad2069",
                    "&:hover": {
                      backgroundColor: "#ff98b5",
                    },
                    marginTop: "16px",
                    width: "28%",
                  }}
                  onClick={handleSaveNote}
                >
                  Save Note
                </Button>
                
                
                <Typography style={{ color: "green", marginLeft: "16px" }}>{noteMessage}</Typography>
              </div>
              {selectedCandidate.cv ? (<Button

                onClick={handleDownloadCV} // Attach the download function to the button click event
              >
                Download CV
              </Button>) : (
                <Typography style={{ color: "Grey", marginLeft: "16px" }}>No cv for the candidate</Typography>
              )}

              <Divider style={{ margin: "16px 0", color: "grey" }} />
            </CardContent>
          </Card>
        ) : (
          <h1>No candidate data found</h1>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default CandidateDialog;

