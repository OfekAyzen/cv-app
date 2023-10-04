import * as React from "react";
import Stack from "@mui/material/Stack";
import { Container } from "@mui/material";
import InstagramIcon from "@mui/icons-material/Instagram";
import YouTubeIcon from "@mui/icons-material/YouTube";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import PinterestIcon from "@mui/icons-material/Pinterest";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import { Outlet, Link } from "react-router-dom";
export default function MaterialIcon() {
  return (
    <Container maxWidth="m" style={{backgroundColor:'white'}}>
      <Stack direction="row" alignItems="center" spacing={4} >
    
       
        <a href="https://www.facebook.com/TECH19YERUHAM"><FacebookIcon  sx={{ color: "grey", }} fontSize="large" /></a>
        <a href="https://www.linkedin.com/company/tech-19/mycompany/"><LinkedInIcon sx={{ color: "grey" }} fontSize="large"  /></a>
        <a href="https://instagram.com/tech__19?igshid=MzRlODBiNWFlZA=="><InstagramIcon fontSize="large" sx={{ color: "grey" }} /></a>
       
      </Stack>
    </Container>
  );
}