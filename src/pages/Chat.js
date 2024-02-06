import React from "react";
import Navbar from "../../src/components/Navbar";
import Sidebar from "../../src/components/Sidebar";
import ChatInterface from "../../src/components/ChatInterface";
import { CssBaseline, Box } from "@mui/material";

const Chat = () => {
  return (
    <>
      <CssBaseline />
      <Box sx={{ display: "flex", flexDirection: "column", height: "100vh" }}>
        <Navbar />
        <Box sx={{ display: "flex", flexGrow: 1 }}>
          <Sidebar />
          <ChatInterface />
        </Box>
      </Box>
    </>
  );
};

export default Chat;
