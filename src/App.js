import React from "react";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import ChatInterface from "./components/ChatInterface";
import { CssBaseline, Box } from "@mui/material";

const App = () => {
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

export default App;
