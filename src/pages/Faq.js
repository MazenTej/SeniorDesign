import React from "react";
import { Box, Typography, Paper, Button, Container } from "@mui/material";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";

const Faq = () => {
  const navigate = useNavigate();

  return (
    <>
      <Navbar />
      <Container maxWidth="md">
        <Box my={4} textAlign="center">
          <Typography variant="h2" gutterBottom>
            Frequently Asked Questions
          </Typography>
          <Typography variant="subtitle1">
            Got questions? We're more than happy to assist you!
          </Typography>
        </Box>

        <Paper elevation={0} variant="outlined" sx={{ my: 2, p: 2 }}>
          <Typography variant="h6">
            What Should I Do If the Chatbot Doesn't Understand My Question?
          </Typography>
          <Typography variant="body1">
            Try rephrasing your question or use simpler language. Use keywords
            relevant to your query.
          </Typography>
        </Paper>

        {/* Repeat the Paper component for each FAQ entry */}
        {/* ... Other FAQ Entries ... */}

        <Paper elevation={0} variant="outlined" sx={{ my: 2, p: 2 }}>
          <Typography variant="h6">
            How Do I Interact with the AI Chatbot?
          </Typography>
          <Typography variant="body1">
            Simply type your question in the chat window and press 'Enter' to
            receive a response.
          </Typography>
        </Paper>

        <Box textAlign="center" my={4}>
          <Button
            onClick={() => navigate("/chat")}
            variant="contained"
            sx={{ bgcolor: "rgb(173, 35, 67)" }}
          >
            Chat Now
          </Button>
        </Box>
      </Container>
    </>
  );
};

export default Faq;
