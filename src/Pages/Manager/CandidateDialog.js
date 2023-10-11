


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
import { updateCandidate,updateCandidateJobs } from "../../graphql/mutations";
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
  handleNoteAddSuccess,
  handleNoteAddError,
}) => {
  const [newStatus, setNewStatus] = useState("");
  const [note, setNote] = useState("");
  const [statusChangeMessage, setStatusChangeMessage] = useState("");
  const [noteMessage, setNoteMessage] = useState("");

  useEffect(() => {
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
      setNote(candidateData.note || "");
    } catch (error) {
      console.error("Error fetching candidate data:", error);
    }
  };

  const handleStatusChange = async () => {
    console.log("handleStatusChange");
    try {
      const input = {
        id: selectedCandidate.id,
        status: newStatus,
        _version: selectedCandidate._version, // Include the _version field
      };
      console.log('API Input:', input);  // Log the input
  
      const response = await API.graphql(
        graphqlOperation(updateCandidate, { input })
      );
  
      console.log('API Response:', response);  // Log the response
      // Check if the status has been updated
      if (response?.data?.updateCandidate?.status === newStatus) {
        console.log('Candidate status updated successfully');
        setStatusChangeMessage('Status updated successfully');
      } else {
        console.error('Error updating status: Status not updated');
        setStatusChangeMessage('Error updating status: Status not updated');
      }
  
      setTimeout(() => {
        setStatusChangeMessage("");
      }, 3000);
    } catch (error) {
      console.error("Error updating status:", error);
      setStatusChangeMessage("Error updating status");
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
        _version: selectedCandidate._version, // Include the _version field
      };
  
      const response = await API.graphql(
        graphqlOperation(updateCandidate, { input })
      );
  
      setNoteMessage("Note saved successfully");
      setTimeout(() => {
        setNoteMessage("");
      }, 3000);
    } catch (error) {
      console.error("Error saving note:", error);
      setNoteMessage("Error saving note");
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
                <FormControl
            variant="outlined"
            sx={{ width: "395px", }}
            className="custom-text-field"
          >
            <InputLabel>Status</InputLabel>
            <Select
              value={newStatus || ""}
              onChange={(e) => setNewStatus(e.target.value)}
              label="Status"
              style={{
                width: '350px',
                borderColor: '#ccc',
                '&:hover': {
                  borderColor: '#b4269a',
                },
                '&:focus': {
                  borderColor: '#b4269a',
                },
              }}
            >
              <MenuItem value={"Accepted"}>Accepted</MenuItem>
              <MenuItem value={"Pending"}>Pending</MenuItem>
              <MenuItem value={"Application Received"}>Application Received</MenuItem>
              {/* ... add more status options ... */}
            </Select>
          </FormControl>

          <Button
            variant="contained"
            color="primary"
            size="small"
            sx={{
              fontFamily: '"Calibri", sans-serif',
              backgroundColor: "#ad2069",
              width: '100px',
              marginTop: "16px",
            }}
            onClick={handleStatusChange}
          >
            Save Status
          </Button>
          <Typography style={{ color: "green", marginLeft: "16px" }}>
            {statusChangeMessage}
          </Typography>

          <TextareaAutosize
            className="custom-text-field"
            multiline
            rows={4}
            variant="outlined"
            value={note}
            onChange={handleNoteChange}
            style={{
              marginTop: "16px",
              width: "350px",
              height: '50px',
              borderBlockColor: 'lightgrey',
              borderRadius: '5px',
            }}
          />

          <Button
            variant="contained"
            color="primary"
            size="small"
            sx={{
              fontFamily: '"Calibri", sans-serif',
              backgroundColor: "#ad2069",
              marginTop: "16px",
              width: "100px",
            }}
            onClick={handleSaveNote}
          >
            Save Note
          </Button>

          <Typography style={{ color: "green", marginLeft: "16px" }}>
            {noteMessage}
          </Typography>
              </div>
              {selectedCandidate.cv ? (<Button

                // onClick={handleDownloadCV} // Attach the download function to the button click event
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

