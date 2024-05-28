import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useChat } from "./ChatContext";

import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  List,
  ListItem,
  Paper,
  CircularProgress,
} from "@mui/material";
import ChatInput from "./ChatInput";
import "./ChatInterface.css";

const ChatInterface = () => {
  const { chats, activeChatId, addMessageToChat } = useChat();
  const { searchQuery } = useChat(); // Get searchQuery from context

  const activeChat = chats.find((chat) => chat.id === activeChatId) || {
    messages: [],
  };
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const highlightSearchTerm = (text, searchTerm) => {
    if (!searchTerm.trim()) return text; // Return original text if search term is empty

    const parts = text.split(new RegExp(`(${searchTerm})`, "gi"));
    return parts.map((part, index) =>
      part.toLowerCase() === searchTerm.toLowerCase() ? (
        <span key={index} className="highlight">
          {part}
        </span>
      ) : (
        part
      )
    );
  };

  

  const handleMessageSubmit = async (message) => {
    // Add user message immediately
    addMessageToChat(message, "user");

    setIsLoading(true); // Start loading

    try {
      const response = await axios.post("http://127.0.0.1:5000/query", {
        message,
      });

      addMessageToChat(response.data.response, "server");
    } catch (error) {
      console.error("Error sending message to server:", error);
    }

    setIsLoading(false); // Stop loading
  };
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [activeChat.messages]);
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [activeChat.messages]);

  return (
    <Box className="chat-container">
      <Box my={6} textAlign="center">
        {" "}
        {/* Increased the margin here */}
        <Typography variant="h4" align="center" gutterBottom>
          Vanguard AI Helper
        </Typography>
        <Box className="card-layout">
          <Grid>
            <Card variant="outlined">
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                  Examples
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  1) How to transfer money into Vanguard <br />
                  2) I am getting married, what are my next steps?
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small" color="primary">
                  Learn More
                </Button>
              </CardActions>
            </Card>
          </Grid>

          <Grid>
            <Card variant="outlined">
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                  Capabilities
                </Typography>
                You can ask the chat systema any queries regarding Vanguard's
                system.
                <Typography
                  variant="body2"
                  color="textSecondary"
                  component="p"
                ></Typography>
              </CardContent>
              <CardActions>
                <Button size="small" color="primary">
                  Learn More
                </Button>
              </CardActions>
            </Card>
          </Grid>
        </Box>
      </Box>

      <Box className="message-list">
        <List>
          {activeChat.messages.map((message, index) => (
            <ListItem key={index} className={`message-item`}>
              <Paper
                className={
                  message.sender === "user" ? "user-message" : "server-message"
                }
              >
                <Typography variant="body1">
                  {highlightSearchTerm(message.text, searchQuery)}
                </Typography>
              </Paper>
            </ListItem>
          ))}
        </List>
        <div ref={messagesEndRef} /> {/* Add this line */}
        {isLoading && (
          <div style={{ marginLeft: "10px" }}>
            {" "}
            <CircularProgress />
          </div>
        )}{" "}
        {/* Loading icon */}
      </Box>

      <Box className="chat-input-container">
        <ChatInput onMessageSubmit={handleMessageSubmit} />
      </Box>
    </Box>
  );
};
export default ChatInterface;
