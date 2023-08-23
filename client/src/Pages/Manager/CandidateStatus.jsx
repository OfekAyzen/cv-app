
import React from "react";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";

function CandidateStatus({ token, candidate_id, selectedJobId, currentStatus, onStatusChange }) {
  const handleChange = (event) => {
    onStatusChange(event.target.value); // Update the selected status
    // Code to update the status in the backend (you'll need to implement this)
  };

  return (
    <FormControl variant="outlined">
      <InputLabel>Status</InputLabel>
      <Select
        value={currentStatus}
        onChange={handleChange}
        label="Status"
      >
       <MenuItem value={"Accepted"}>Accepted</MenuItem>
      <MenuItem value={"Pending"}>Pending</MenuItem>
      <MenuItem value={"Application Received"}>Application Received</MenuItem>
      <MenuItem value={"Application Under Review"}>Application Under Review</MenuItem>
      <MenuItem value={"Interview Scheduled"}>Interview Scheduled</MenuItem>
      <MenuItem value={"Assessment/Testing"}>Assessment/Testing</MenuItem>
      <MenuItem value={"Application Unsuccessful"}>Application Unsuccessful</MenuItem>
      </Select>
    </FormControl>
  );
}

export default CandidateStatus;