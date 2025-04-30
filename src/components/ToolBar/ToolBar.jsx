import { Divider, IconButton, Toolbar } from "@mui/material";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import React from "react";

const ToolBar = ({ changeTheMode, modee }) => {
  return (
    <>
      <Toolbar>
        <IconButton
          sx={{ m: "auto" }}
          onClick={() => changeTheMode()}
          color="inherit"
        >
          {modee === "dark" ? (
            <Brightness7Icon sx={{ color: "orange" }} />
          ) : (
            <Brightness4Icon />
          )}
        </IconButton>
      </Toolbar>
      <Divider />
    </>
  );
};

export default ToolBar;
