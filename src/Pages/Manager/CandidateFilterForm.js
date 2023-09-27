
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

//candidate filter 
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
 
<Card className="filter-card">
      <Button
        onClick={clearFilters}
        sx={{
          display: "flex",
          marginLeft: "20px",
          marginTop: "20px",
          color: "Grey",
        }}
      >
        Clear Filters
      </Button>
      <CardContent>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={2}>
            <FormControl fullWidth variant="outlined" className="custom-select">
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
          <Grid item xs={12} sm={6} md={2}>
            <FormControl fullWidth variant="outlined" className="custom-select">
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
          <Grid item xs={12} sm={6} md={2}>
            <FormControl fullWidth variant="outlined" className="custom-select">
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
          <Grid item xs={12} sm={6} md={2}>
            <FormControl fullWidth variant="outlined" className="custom-select">
            <TextField
              fullWidth
              label="Location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              variant="outlined"
            />
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6} md={2}>
            <FormControl fullWidth variant="outlined" className="custom-select">
            <TextField
              fullWidth
              label="Skills"
              value={skills}
              onChange={(e) => setSkills(e.target.value)}
              variant="outlined"
            />
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6} md={2}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleFilter}
              fullWidth
              sx={{
                height: "50%",
                width: '150px',
                backgroundColor: '#ad2069',
                marginTop: '15px',
                '&:hover': {
                  backgroundColor: '#9c27b0',
                },
              }}
            >
              Apply Filters
            </Button>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}

export default CandidateFilterForm;