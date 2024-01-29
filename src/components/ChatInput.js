import React, { useState } from "react";
import { Box, TextField, IconButton } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";

const ChatInput = () => {
  const [message, setMessage] = useState("");

  const sendMessage = (e) => {
    e.preventDefault();
    // Implement your send message logic
  };

  return (
    <Box
      component="form"
      onSubmit={sendMessage}
      sx={{ display: "flex", alignItems: "center", width: "100%" }}
    >
      <TextField
        fullWidth
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Send a message"
        variant="outlined"
        sx={{ width: "80%" }} // You can adjust this width as needed
      />
      <IconButton color="primary" type="submit">
        <SendIcon />
      </IconButton>
    </Box>
  );
};

export default ChatInput;
