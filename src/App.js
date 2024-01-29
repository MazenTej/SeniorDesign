import React from "react";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import ChatInterface from "./components/ChatInterface";
import { CssBaseline, Box } from "@mui/material";

const App = () => {
  return (
    <>
      <CssBaseline />
      <Navbar />
      <Box display="flex" height="calc(100vh - 64px)">
        {" "}
        {/* Adjust the height to consider the navbar */}
        <Sidebar />
        <ChatInterface />
      </Box>
    </>
  );
};

export default App;
