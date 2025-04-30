import * as React from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Toolbar from "@mui/material/Toolbar";
import { Navigate, Outlet, useLocation, useNavigate } from "react-router-dom";
import ToolBar from "../ToolBar/ToolBar";
import Drawerr from "../Drawer/Drawerr";
import Appbarui from "../AppBar/Appbarui";
import ListUi from "../ListUi/ListUi";
import MyCart from "../MyCart/MyCart";
import { useDispatch, useSelector } from "react-redux";

const ResponsiveDrawer = (props) => {
  const { pathname } = useLocation();
  let drawerWidth = 240;
  if (pathname === "/pos") drawerWidth = 350;
  const { window } = props;
  const { changeTheMode, modee } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div>
      <ToolBar changeTheMode={changeTheMode} modee={modee} />
      <Divider />
      {pathname === "/pos" ? <MyCart /> : <ListUi />}
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <Appbarui
        drawerWidth={drawerWidth}
        handleDrawerToggle={handleDrawerToggle}
      />
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        <Drawerr
          mobileOpen={mobileOpen}
          handleDrawerToggle={handleDrawerToggle}
          drawerWidth={drawerWidth}
          drawer={drawer}
        />
      </Box>
      {/* main content  */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Toolbar />
        <Outlet />
      </Box>
    </Box>
  );
};

ResponsiveDrawer.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default ResponsiveDrawer;
