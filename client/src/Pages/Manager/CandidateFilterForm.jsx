
import React, { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
} from "@mui/material";
import "../../styles/Profilemanager.css";

function CandidateFilterForm({ onFilter }) {
  const [education, setEducation] = useState("");
  const [workExperience, setWorkExperience] = useState("");
  const [skills, setSkills] = useState("");
  const [gender, setGender] = useState("");
  const [location, setLocation] = useState("");

  const handleFilter = () => {
    const filters = {
      education,
      workExperience,
      skills,
      gender,
      location,
    };
    onFilter(filters);
  };
  const handleFilterChange = (field, value) => {
    onFilter((prevFilters) => ({
      ...prevFilters,
      [field]: value,
    }));
  };

  const clearFilters = () => {
    onFilter({
      education: "",
      workExperience: "",
      skills: "",
      gender: "",
      location: "",
    });
  };
  return (
    <Card className="FilterCard">
      
        <Button  onClick={clearFilters} sx={{display:"flex" ,
        marginLeft:'20px',
        marginTop:'20px',
        color:"Grey"

        
        }}>
              Clear Filters
            </Button>
      <CardContent>
        
        <Grid container spacing={2}>
          <Grid item xs={4} sm={2}>
            <FormControl fullWidth variant="outlined">
              <InputLabel>Education</InputLabel>
              <Select
                value={education}
                onChange={(e) => setEducation(e.target.value)}
                label="Education"
              >
                <MenuItem value="">
                  <em>All</em>
                </MenuItem>
                <MenuItem value="High School">High School</MenuItem>
                <MenuItem value="Bachelor's Degree">Bachelor's Degree</MenuItem>
                <MenuItem value="Master's Degree">Master's Degree</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={4} sm={2}>
            <FormControl fullWidth variant="outlined">
              <InputLabel>Work Experience</InputLabel>
              <Select
                value={workExperience}
                onChange={(e) => setWorkExperience(e.target.value)}
                label="Work Experience"
              >
                <MenuItem value="">
                  <em>All</em>
                </MenuItem>
                <MenuItem value="Less than 1 year">Less than 1 year</MenuItem>
                <MenuItem value="1-3 years">1-3 years</MenuItem>
                <MenuItem value="3-5 years">3-5 years</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={4} sm={2}>
            <TextField
              fullWidth
              label="Skills"
              value={skills}
              onChange={(e) => setSkills(e.target.value)}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={4} sm={2}>
            <FormControl fullWidth variant="outlined">
              <InputLabel>Gender</InputLabel>
              <Select
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                label="Gender"
              >
                <MenuItem value="">
                  <em>All</em>
                </MenuItem>
                <MenuItem value="male">Male</MenuItem>
                <MenuItem value="female">Female</MenuItem>
                <MenuItem value="Other">Other</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={2}>
            <TextField
              fullWidth
              label="Location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={2}>
            <Button variant="contained" color="primary" onClick={handleFilter}>
              Apply Filters
            </Button>
          
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}

export default CandidateFilterForm;