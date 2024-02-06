import React from "react";
import { AppBar, Toolbar, Typography, IconButton } from "@mui/material";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <AppBar position="static" style={{ backgroundColor: "lightgray" }}>
      <Toolbar>
        {/* Wrap Typography in Link and apply styling */}
        <Link
          to="/"
          style={{ flexGrow: 1, color: "inherit", textDecoration: "none" }}
        >
          <Typography variant="h6">Vanguard AI Helper</Typography>
        </Link>
        <IconButton color="inherit">
          <HelpOutlineIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
