import React from "react";
import { useChat } from "./ChatContext";

import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  TextField,
} from "@mui/material";
import ChatIcon from "@mui/icons-material/Chat";
import SearchIcon from "@mui/icons-material/Search";
import MemoryIcon from "@mui/icons-material/Memory";

const Sidebar = () => {
  const { chats, addNewChat, setActiveChatId, activeChatId } = useChat();
  const activeChatStyle = {
    bgcolor: "rgba(255, 255, 255, 0.2)", // Light white background for the active chat
    color: "white", // Keep text color white
  };

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: "20%",
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: "20%",
          boxSizing: "border-box",
          bgcolor: "rgb(173, 35, 67)",
          color: "white", // Set text color to white for all child components
          height: "100%", // Fill the height of the flex container
          marginTop: "64px",
        },
      }}
    >
      <List>
        <ListItem button onClick={addNewChat}>
          <ListItemIcon>
            <ChatIcon sx={{ color: "white" }} />
          </ListItemIcon>
          <ListItemText primary="New chat" sx={{ color: "white" }} />
        </ListItem>
        <ListItem>
          <TextField
            fullWidth
            placeholder="Search"
            variant="outlined"
            sx={{
              input: { color: "white" }, // Set text color inside the input field to white
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "white", // Set border color
                },
                "&:hover fieldset": {
                  borderColor: "white", // Set border color on hover
                },
                "&.Mui-focused fieldset": {
                  borderColor: "white", // Set border color on focus
                },
              },
            }}
            InputProps={{
              endAdornment: <SearchIcon sx={{ color: "white" }} />,
            }}
          />
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <MemoryIcon sx={{ color: "white" }} />
          </ListItemIcon>
          <ListItemText primary="My Memory" sx={{ color: "white" }} />
        </ListItem>
        {chats.map((chat, index) => (
          <ListItem
            button
            key={chat.id}
            onClick={() => setActiveChatId(chat.id)}
            sx={chat.id === activeChatId ? activeChatStyle : {}}
          >
            <ListItemText
              primary={`Chat ${index + 1}`}
              sx={{ color: chat.id === activeChatId ? "inherit" : "white" }}
            />
          </ListItem>
        ))}
      </List>
      <Divider sx={{ bgcolor: "white" }} />
    </Drawer>
  );
};

export default Sidebar;
