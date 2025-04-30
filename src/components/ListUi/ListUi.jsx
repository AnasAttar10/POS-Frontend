import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { ContentPaste, Create, Home, Logout } from "@mui/icons-material";

import React from "react";
import { useTheme } from "@emotion/react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/authSlice";

const ListUi = () => {
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const theme = useTheme();
  const navigate = useNavigate();
  const pages = ["Home", "Products", "Categories", "Units", "Pos", "Logout"];
  const paths = ["/", "/products", "/categories", "/units", "/pos", "#"];
  const Icons = [
    <Home sx={{ color: pathname === "/" ? "white" : "" }} />,
    <Create sx={{ color: pathname === paths[1] ? "white" : "" }} />,
    <Create sx={{ color: pathname === paths[2] ? "white" : "" }} />,
    <Create sx={{ color: pathname === paths[3] ? "white" : "" }} />,
    <ContentPaste sx={{ color: pathname === paths[4] ? "white" : "" }} />,
    <Logout sx={{ color: pathname === paths[5] ? "white" : "" }} />,
  ];
  return (
    <List>
      {pages.map((text, index) => (
        <ListItem
          key={text}
          disablePadding
          sx={{
            bgcolor:
              pathname === paths[index] ? theme.palette.activeLink.main : "",
            color: pathname === paths[index] ? "white" : "",
          }}
        >
          <ListItemButton
            onClick={() => {
              if (index === paths.length - 1) {
                dispatch(logout());
                navigate("/login");
              } else {
                navigate(paths[index]);
              }
            }}
          >
            <ListItemIcon>{Icons[index]}</ListItemIcon>
            <ListItemText primary={text} />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  );
};

export default ListUi;
