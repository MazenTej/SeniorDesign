import React from "react";
import Navbar from "../../src/components/Navbar";
import { CssBaseline, Box, Typography } from "@mui/material";
import "./Landing.css";
import { useNavigate } from "react-router-dom";

const Landing = () => {
  let navigate = useNavigate(); // Initialize the useNavigate hook

  return (
    <>
      <CssBaseline />
      <Box sx={{ display: "flex", flexDirection: "column", height: "100vh" }}>
        <Navbar />
        <Box className="vanguard-container">
          <Typography variant="h4" align="center" gutterBottom>
            Vanguard AI Helper
          </Typography>
          <div className="buttons-container">
            <button onClick={() => navigate("/chat")}>New Chat</button>
            <button onClick={() => navigate("/faq")}>FAQ</button>
          </div>
        </Box>
      </Box>
    </>
  );
};

export default Landing;
