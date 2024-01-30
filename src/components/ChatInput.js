import React, { useState } from "react";
// import { Box, TextField, IconButton } from "@mui/material";
// import SendIcon from "@mui/icons-material/Send";

const ChatInput = ({onMessageSubmit}) => {
  const [inputValue, setInputValue] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onMessageSubmit(inputValue);
    setInputValue('');
  };

  return (
    <form onSubmit={handleSubmit}>
    <input type="text" value={inputValue} onChange={e => setInputValue(e.target.value)} />
    <button type="submit">Send</button>
  </form> 
  );
};

export default ChatInput;