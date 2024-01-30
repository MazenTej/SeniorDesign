import React from "react";
import {
  // Box,
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
  return (
    <Drawer
      variant="permanent"
      sx={{
        width: 240,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: 240,
          boxSizing: "border-box",
          bgcolor: "rgb(173, 35, 67)",
        },
      }}
    >
      <List>
        <ListItem button>
          <ListItemIcon>
            <ChatIcon />
          </ListItemIcon>
          <ListItemText primary="New chat" />
        </ListItem>
        <ListItem>
          <TextField
            fullWidth
            placeholder="Search"
            variant="outlined"
            InputProps={{ endAdornment: <SearchIcon /> }}
          />
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <MemoryIcon />
          </ListItemIcon>
          <ListItemText primary="My Memory" />
        </ListItem>
      </List>
      <Divider />
    </Drawer>
  );
};

export default Sidebar;
