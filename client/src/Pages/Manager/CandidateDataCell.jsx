

import React, { useState, useEffect } from "react";

import { Typography, Button, Table, TableHead, TableRow, TableCell, TableBody,Input, TableContainer, SvgIcon, CardContent } from "@mui/material";


function CandidateDataCell(){



    return(
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
  {currentCandidates
    .map((candidate) => {
      // Sort appliedJobs array for the candidate by application_date in descending order
      const sortedAppliedJobs = candidate.appliedJobs.slice().sort((a, b) => {
        const dateA = new Date(a.application_date).getTime();
        const dateB = new Date(b.application_date).getTime();
        return dateB - dateA; // Sort by descending order of application date
      });

      return { ...candidate, sortedAppliedJobs }; // Attach sortedAppliedJobs to the candidate object
    })
    .sort((a, b) => {
      // Sort candidates based on the latest application date within each candidate's sortedAppliedJobs
      const latestDateA = a.sortedAppliedJobs.length > 0 ? new Date(a.sortedAppliedJobs[0].application_date).getTime() : 0;
      const latestDateB = b.sortedAppliedJobs.length > 0 ? new Date(b.sortedAppliedJobs[0].application_date).getTime() : 0;
      return latestDateB - latestDateA; // Sort candidates by latest application date
    })
    .map((candidate) => (
      <React.Fragment key={candidate.id}>
        {candidate.sortedAppliedJobs.map((appliedJob) => (
          <TableRow className="trCandidate" key={appliedJob.job_id}>
            <TableCell>
              {appliedJob.application_date ? new Date(appliedJob.application_date).toLocaleDateString("en-GB") : ""}
            </TableCell>
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
    )
}
export default CandidateDataCell;