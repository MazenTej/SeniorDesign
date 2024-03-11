import React, { useEffect } from "react";
import { useChat } from "./ChatContext";
import { IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete"; // Import MUI Delete icon

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
  const {
    chats,
    addNewChat,
    setActiveChatId,
    activeChatId,
    setSearchQuery,
    searchQuery,
    removeChat,
  } = useChat();
  const activeChatStyle = {
    bgcolor: "rgba(255, 255, 255, 0.2)", // Light white background for the active chat
    color: "white", // Keep text color white
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value.toLowerCase()); // This updates the context's search query
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
          color: "white",
          height: "100%",
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
            value={searchQuery}
            onChange={handleSearchChange}
            sx={{
              input: { color: "white" },
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "white",
                },
                "&:hover fieldset": {
                  borderColor: "white",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "white",
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
        {chats.map((chat, index) => {
          // Check if the chat contains any messages that match the search query
          const isChatIncludedInSearch =
            searchQuery === "" ||
            chat.messages.some((message) =>
              message.text.toLowerCase().includes(searchQuery)
            );

          return isChatIncludedInSearch ? (
            <ListItem
              button
              key={chat.id}
              onClick={() => setActiveChatId(chat.id)}
              sx={chat.id === activeChatId ? activeChatStyle : {}}
            >
              <ListItemText
                primary={`Chat ${index + 1}`} // Keep original numbering
                sx={{ color: chat.id === activeChatId ? "inherit" : "white" }}
              />
              <IconButton
                edge="end"
                aria-label="delete"
                onClick={() => removeChat(chat.id)}
              >
                <DeleteIcon />
              </IconButton>
            </ListItem>
          ) : null; // Don't render the chat if it doesn't match the search query
        })}
      </List>
      <Divider sx={{ bgcolor: "white" }} />
    </Drawer>
  );
};

export default Sidebar;
