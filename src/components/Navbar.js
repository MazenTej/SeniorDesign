import React from "react";
import { AppBar, Toolbar, Typography, IconButton } from "@mui/material";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";

const Navbar = () => {
  return (
    <AppBar position="static" style={{ backgroundColor: "lightgray" }}>
      <Toolbar>
        <Typography variant="h6" flexGrow={1}>
          Vanguard AI Helper
        </Typography>
        <IconButton color="inherit">
          <HelpOutlineIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
