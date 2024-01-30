import React, {useState} from "react";
import axios from 'axios'
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
  Paper
} from "@mui/material";
import ChatInput from "./ChatInput";
import './ChatInterface.css';

const ChatInterface = () => {

  const [messages, setMessages] = useState([]);

  const handleMessageSubmit = async (message) => {
    try {
      const response = await axios.post('http://127.0.0.1:5000/query', { message });

      setMessages(prevMessages => [
        ...prevMessages, 
        { text: message, sender: "user" },
        { text: response.data.response, sender: "server" }
      ]);
    } catch (error) {
      console.error("Error sending message to server:", error);
    }
  };


  return (
      <Box className="chat-container">
        <Box>
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
                   You can ask the chat systema any queries regarding Vanguard's system.
               <Typography variant="body2" color="textSecondary" component="p">
               </Typography>
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
          <List className="list-start">
            {messages.map((message, index) => (
              <ListItem key={index} className={`message-item ${message.sender === "user" ? 'align-right' : 'align-left'}`}>
                <Paper className={message.sender === "user" ? 'user-message' : 'server-message'}>
                  <Typography variant="body1">{message.text}</Typography>
                </Paper>
              </ListItem>
            ))}
          </List>
        </Box>
  
        <Box>
          <ChatInput onMessageSubmit={handleMessageSubmit}/>
        </Box>
      </Box>

  );
};
export default ChatInterface;