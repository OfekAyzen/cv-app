import { Card } from "@mui/material";
import React, { useState } from "react";
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

  return (
    <div>
       
            <label>Education:
                <select value={education} onChange={(e) => setEducation(e.target.value)}>
                <option value="">All</option>
                <option value="High School">High School</option>
                <option value="Bachelor's Degree">Bachelor's Degree</option>
                <option value="Master's Degree">Master's Degree</option>
                {/* Add more education options */}
                </select>
            </label>
            
            <label>Work Experience:
                <select value={workExperience} onChange={(e) => setWorkExperience(e.target.value)}>
                <option value="">All</option>
                <option value="Less than 1 year">Less than 1 year</option>
                <option value="1-3 years">1-3 years</option>
                <option value="3-5 years">3-5 years</option>
                {/* Add more work experience options */}
                </select>
            </label>
            
            <label>Skills:
                <input type="text" value={skills} onChange={(e) => setSkills(e.target.value)} />
            </label>
            
            <label>Gender:
                <select value={gender} onChange={(e) => setGender(e.target.value)}>
                <option value="">All</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="Other">Other</option>
                </select>
            </label>
            
            <label>Location:
                <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} />
            </label>
            
            <button onClick={handleFilter}>Apply Filters</button>
     
    </div>
    
  );
}

export default CandidateFilterForm;
