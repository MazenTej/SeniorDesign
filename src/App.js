import React from "react";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import ChatInterface from "./components/ChatInterface";
import { CssBaseline, Box } from "@mui/material";
import Chat from "./pages/Chat";
import Landing from "./pages/Landing";
import Faq from "./pages/Faq";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ChatProvider } from "./components/ChatContext";

const App = () => {
  return (
    <ChatProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/faq" element={<Faq />} />
        </Routes>
      </Router>
    </ChatProvider>
  );
};

export default App;
