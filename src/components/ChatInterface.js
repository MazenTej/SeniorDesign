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
  const activeChat = chats.find((chat) => chat.id === activeChatId) || {
    messages: [],
  };
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const handleMessageSubmit = async (message) => {
    // Add user message immediately
    addMessageToChat(message, "user");

    setIsLoading(true); // Start loading

    // Encode the message to ensure the URL is correctly formatted
    const encodedMessage = encodeURIComponent(message);
    const url = `https://qwq4uzmkaq6tmmj7afeozfguke0ulend.lambda-url.us-east-1.on.aws/?query=${encodedMessage}`;

    try {
      const response = await fetch(url, {
        method: "GET", // Update to GET request
        headers: {
          Accept: "application/json", // Ensure we are accepting JSON
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json(); // Assuming the response is JSON

      // Assuming the API returns a JSON object with a response key
      addMessageToChat(data.response, "server");
    } catch (error) {
      console.error("Error fetching data:", error);
    }

    setIsLoading(false); // Stop loading
  };

  // const handleMessageSubmit = async (message) => {
  //   // Add user message immediately
  //   addMessageToChat(message, "user");

  //   setIsLoading(true); // Start loading

  //   try {
  //     const response = await axios.post("http://127.0.0.1:5000/query", {
  //       message,
  //     });

  //     addMessageToChat(response.data.response, "server");
  //   } catch (error) {
  //     console.error("Error sending message to server:", error);
  //   }

  //   setIsLoading(false); // Stop loading
  // };
  // useEffect(() => {
  //   messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  // }, [activeChat.messages]);

  useEffect(() => {
    console.log(chats);
  }, [chats]);
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
                <Typography variant="body1">{message.text}</Typography>
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
