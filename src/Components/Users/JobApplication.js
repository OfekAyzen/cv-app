import * as React from "react";

import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";

import { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import logo from "../images/logo_tech19.png";
import Typography from "@mui/material/Typography";

import SnackbarContent from "@mui/material/SnackbarContent";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import { useParams } from "react-router-dom";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { useNavigate } from "react-router-dom";
import Header from "../Header";
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import UploadCV from "./UploadCV";
import MuiAlert from "@mui/material/Alert";
import { API, graphqlOperation } from "aws-amplify";
import { createCandidate } from "../../graphql/mutations";
import { getJobs } from "../../graphql/queries";
import { createCandidateJobs } from "../../graphql/mutations";
import { Auth } from "aws-amplify";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import "../../styles/User.css";
import { InputLabel, Select, MenuItem } from "@mui/material";
import { Storage } from "aws-amplify";
function Copyright(props) {
  return (
    <Typography
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
  );
}

const defaultTheme = createTheme();

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

export default function JobApplication(props) {
  const [email, setEmail] = useState("");
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");

  const [location, setLocation] = useState("");
  const [phone_number, setPhoneNumber] = useState("");
  const [gender, setGender] = useState("");
  const [education, setEducation] = useState("");
  const [work_experience, setWorkExperience] = useState("");
  const [candidateId, setCandidateId] = useState("");
  const [skills, setSkills] = useState("");
  const [position, setPosition] = useState("");
  const [certifications, setCertifications] = useState("");
  const [data, setData] = useState("");
  const [defaultPosition, setDefaultPosition] = useState("");

  const { job_id } = useParams();
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [cvFile, setCvFile] = useState("");
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const applyJobJobId = job_id || props.job_id;
  const [isMobileView, setIsMobileView] = useState(window.innerWidth < 600);
  //handling notifications
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  const educationOptions = [
    "High School",
    "Bachelor's Degree",
    "Master's Degree",
  ];

  const workExperienceOptions = ["Less than 1 year", "1-3 years", "3-5 years"];

  const genderOptions = ["Female", "Male", "Other"];
  const [cvFileKey, setCvFileKey] = useState(null);

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const showSnackbar = (message, severity) => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setSnackbarOpen(true);
  };

  const createCandidateAndApply = async () => {
    try {
      if (
        !first_name ||
        !last_name ||
        !location ||
        !email ||
        !phone_number ||
        !gender ||
        !education ||
        !work_experience ||
        !skills ||
        // !position ||
        !certifications
      ) {
        showSnackbar("Please fill out all fields.", "error");
        return; // Stop submission if any field is missing
      }
      // Set the final position to either the selected position or the default position
      const finalPosition = position || defaultPosition;

      // Update the condition to allow for the default position
      if (!finalPosition && finalPosition !== defaultPosition) {
        showSnackbar("Please select a position.", "error");
        return; // Stop submission if the position is missing
      }
      handleapplyjob(candidateId, finalPosition); // Call the function to create CandidateJobs
      navigate("/HomePage");

      localStorage.removeItem("cvFileKey");
    } catch (error) {
      // Handle errors
      console.error("Error creating candidate:", error);
    }
  };
  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth < 600);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    // Handle Snackbar display based on state
    if (snackbarOpen) {
      // Auto-close the Snackbar after 5 seconds
      const timer = setTimeout(() => {
        handleSnackbarClose();
      }, 15000);
      return () => clearTimeout(timer);
    }

    // Scroll to the top of the page
    window.scrollTo(0, 0);
  }, [snackbarOpen]);

  const uploadCV = async () => {
    try {
      if (!cvFile) return;

      const cvFileName = cvFile.name;
      const newCvFileKey = `${Date.now()}_${cvFileName}`;

      await Storage.put(newCvFileKey, cvFile, {
        contentType: cvFile.type,
      });

      console.log("CV uploaded successfully:", newCvFileKey);
      showSnackbar("CV uploaded successfully!", "success");

      // Return the new CV file key
      return newCvFileKey;
    } catch (error) {
      console.error("Error uploading CV:", error);
      showSnackbar("Error uploading CV", "error");
      return null;
    }
  };
  // Effect to log cvFileKey when it changes

  useEffect(() => {
    // console.log('CV . Key:', cvFileKey);
  }, [cvFileKey]);

  const handleapplyjob = async (candidateId, finalPosition) => {
    try {
      // Get the Cognito User ID of the authenticated user
      const user = await Auth.currentAuthenticatedUser();
      const cognitoSub = user.attributes.sub;

      const cvFileKeyFromStorage = await uploadCV();

      // Define the candidate data
      const candidateData = {
        input: {
          first_name: first_name,
          last_name: last_name,
          location: location,
          email: email,
          phone_number: phone_number,
          gender: gender,
          education: education,
          work_experience: work_experience,
          skills: skills,
          position: finalPosition,
          certifications: certifications,
          cv: cvFileKeyFromStorage, // Use the saved CV file key
        },
      };
      localStorage.setItem("cvFileKey", cvFileKeyFromStorage);

      // Update the createCandidate mutation to include cvFileKey
      const resp = await API.graphql(
        graphqlOperation(createCandidate, candidateData)
      );
      const candidateId = resp.data.createCandidate.id;
      const candidateJobsData = {
        input: {
          candidateId: candidateId,
          jobsId: props.job_id || job_id,
          // cognitoSub: cognitoSub, // Set cognitoSub using the Cognito User ID
        },
      };

      const response = await API.graphql(
        graphqlOperation(createCandidateJobs, candidateJobsData)
      );

      if (response.data.createCandidateJobs) {
        showSnackbar("Application submitted successfully!", "success");
        localStorage.removeItem("selectedJobId");
        navigate("/HomePage");
      } else {
        showSnackbar("Failed to submit application.", "error");
        console.log("Failed to submit application.");
      }
      console.log("Application submitted successfully!");
    } catch (error) {
      showSnackbar("Failed to submit application.", "error");
      console.error("Error applying for the job:", error);
      navigate("/Login");
    }
  };

  const handleUploadCV = (event) => {
    const selectedCvFile = event.target.files[0];
    if (selectedCvFile) {
      console.log("Selected CV File:", selectedCvFile);
      setCvFile(selectedCvFile);
    }
  };

  useEffect(() => {
    // Handle Snackbar display based on state
    if (snackbarOpen) {
      // Auto-close the Snackbar after 5 seconds
      const timer = setTimeout(() => {
        handleSnackbarClose();
      }, 15000);
      return () => clearTimeout(timer);
    }
  }, [snackbarOpen]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await API.graphql(
          graphqlOperation(getJobs, {
            id: localStorage.getItem("selectedJobId"),
          })
        );
        const job = response.data.getJobs;
        setDefaultPosition(job.job_title || "");
      } catch (error) {
        console.error("Error fetching job details:", error);
      }
    };

    fetchData();
  }, []);

  const fetchUserData = async () => {
    try {
      const user = await Auth.currentAuthenticatedUser();
      setEmail(user.attributes.email);
      setFirstName(user.attributes.given_name);
      setLastName(user.attributes.family_name);
    } catch (error) {
      console.log("It seems no user is connected");
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        height: "800px",
      }}
    >
      <Divider style={{ backgroundColor: "white" }} />
      <Container
        style={{
          backgroundColor: "white",
          padding: 0,
          display: "flex",
          flexDirection: isMobileView ? "column" : "row",
          alignItems: "center",
          width: "100%",
          maxWidth: isMobileView ? "380px" : "100%",
        }}
      >
        <div
          style={{
            flex: 1,
            paddingRight: "16px",
            paddingLeft: "16px",
            paddingTop: "30px",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "stretch",

              padding: "0 30px", // Added padding
            }}
          >
            <Grid
              item
              xs={12}
              sx={{ width: "350px", paddingTop: isMobileView ? "15px" : "0px" }}
            >
              {/* Left Side */}
              <Grid item xs={12}>
                <TextField
                  sx={{ paddingBottom: "15px" }}
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  className="custom-select"
                  autoFocus
                  value={first_name}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  sx={{ paddingBottom: "20px" }}
                  className="custom-select"
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                  value={last_name}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  sx={{ paddingBottom: "20px" }}
                  required
                  className="custom-select"
                  fullWidth
                  id="location"
                  label="Location"
                  name="location"
                  autoComplete="location"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  sx={{ paddingBottom: "20px" }}
                  required
                  fullWidth
                  className="custom-select"
                  id="phoneNumber"
                  label="Phone Number"
                  name="phoneNumber"
                  autoComplete="phone-number"
                  value={phone_number}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  sx={{ paddingBottom: "20px" }}
                  required
                  fullWidth
                  className="custom-select"
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Grid>
              {/* <Grid item xs={12}>
                                <TextField
                                    sx={{ paddingBottom: '20px' }}
                                    required
                                    fullWidth
                                    className="custom-select"
                                    id="position"
                                    label="Position"
                                    name="position"
                                    autoComplete="position"

                                    value={position}
                                    onChange={(e) => setPosition(e.target.value)}
                                />
                            </Grid> */}
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  className="custom-select"
                  id="position"
                  label="Position"
                  name="position"
                  autoComplete="position"
                  value={position || defaultPosition}
                  onChange={(e) => setPosition(defaultPosition)}
                />
              </Grid>
            </Grid>
          </div>
        </div>

        <div
          style={{
            flex: 1,
            paddingLeft: "16px",
            paddingRight: "16px",
            paddingTop: isMobileView ? "0px" : "60px",
          }}
        >
          {/* Right Side */}
          <Grid item xs={12} sx={{ width: "350px" }}>
            <Grid item xs={12}>
              <TextField
                required
                sx={{ paddingBottom: "15px" }}
                fullWidth
                id="skills"
                label="Skills"
                name="skills"
                autoComplete="skills"
                className="custom-select"
                value={skills}
                onChange={(e) => setSkills(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="certifications"
                label="Certifications"
                name="certifications"
                autoComplete="certifications"
                className="custom-select"
                value={certifications}
                onChange={(e) => setCertifications(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} className="custom-select">
              <InputLabel>Education</InputLabel>
              <Select
                fullWidth
                id="education"
                label="Education"
                name="education"
                value={education}
                onChange={(e) => setEducation(e.target.value)}
              >
                {educationOptions.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </Select>
            </Grid>
            <Grid item xs={12} className="custom-select">
              <InputLabel>Work Experience</InputLabel>
              <Select
                fullWidth
                id="workExperience"
                label="Work Experience"
                name="workExperience"
                value={work_experience}
                onChange={(e) => setWorkExperience(e.target.value)}
              >
                {workExperienceOptions.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </Select>
            </Grid>
            <Grid item xs={12} className="custom-select">
              <InputLabel>Gender</InputLabel>
              <Select
                fullWidth
                id="gender"
                label="Gender"
                name="gender"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
              >
                {genderOptions.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </Select>
            </Grid>
            <Grid item xs={12} sx={{ display: "flex", alignItems: "center" }}>
              <div style={{ flex: 1 }}>
                <label
                  htmlFor="cvUpload"
                  style={{
                    cursor: "pointer",
                    color: "#ad2069",
                    paddingTop: "25px",
                  }}
                >
                  Upload CV
                  <input
                    type="file"
                    id="cvUpload"
                    accept=".pdf,.doc,.docx"
                    style={{ display: "none" }}
                    onChange={handleUploadCV}
                  />
                </label>
              </div>
            </Grid>
          </Grid>

          <Button
            onClick={createCandidateAndApply}
            type="submit"
            fullWidth
            variant="contained"
            sx={{
              backgroundColor: "#ad2069",
              mt: 4,
              mb: 3,
              width: "50%",
              display: "flex",
              "&:hover": {
                backgroundColor: "#b4269a",
              },
            }}
            disabled={
              !first_name ||
              !last_name ||
              !location ||
              !email ||
              !phone_number ||
              !gender ||
              !education ||
              !work_experience ||
              !skills ||
              // !position ||
              !certifications
            }
          >
            Apply and Save
          </Button>
          {/* Snackbar for flash messages */}
        </div>
      </Container>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={5000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity={snackbarSeverity}
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
}
