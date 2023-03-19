import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import LocalDiningIcon from "@mui/icons-material/LocalDining";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import UserProfileModal from "./userProfileModal";
import { useEffect } from "react";
import Axios from "axios";

const pages = ["Recipes", "My Recipes"];
const settings = ["Profile", "Favourites", "Logout"];

const MainNavBar = () => {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [show, setShow] = useState(false);
  const [userData, setUserData] = useState({
    user_name: "",
    first_name: "",
    last_name: "",
    preference_one: "",
    preference_two: "",
    preference_three: "",
    user_picture: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    if (!sessionStorage.getItem("authenticated")) {
      navigate("/");
    } else {
      fetchUserData();
    }
  }, []);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const fetchUserData = () => {
    Axios.post("http://localhost:5000/userData", {
      userID: sessionStorage.getItem("authenticated"),
    }).then((response) => {
      if (response.data === "invalid") {
        alert("Username or password don't match. \nPlease try again!");
      } else {
        setUserData({
          user_name: response.data[0]["user_name"],
          first_name: response.data[0]["first_name"],
          last_name: response.data[0]["last_name"],
          preference_one: response.data[0]["preference_one"],
          preference_two: response.data[0]["preference_two"],
          preference_three: response.data[0]["preference_three"],
          user_picture: response.data[0]["user_picture"],
        });
        // console.log(userData);
      }
    });
  };

  const navigateTo = (page) => {
    if (page === "Recipes") {
      navigate("/home");
    }
    if (page === "My Recipes") {
      navigate("/myRecipes");
    }
  };

  function toggleShow() {
    setShow(!show);
  }

  const settingOptions = (setting) => {
    if (setting === "Profile") {
      fetchUserData();
      handleCloseUserMenu();
      toggleShow();
    }
    if (setting === "Favourites") {
      // TODO
    }
    if (setting === "Logout") {
      sessionStorage.clear();
      navigate("/");
    }
  };

  return (
    <>
      <div style={{ paddingBottom: 10 }}>
        <AppBar position="static" style={{ paddingLeft: 50, paddingRight: 50 }}>
          <Toolbar disableGutters>
            <Typography
              variant="h5"
              noWrap
              component="a"
              href="/home"
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              EasyBytes
            </Typography>
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="/home"
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              <IconButton aria-label="favourite">
                <LocalDiningIcon style={{ color: "white" }} fontSize="large" />
              </IconButton>
            </Typography>

            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: "block", md: "none" },
                }}
              >
                {pages.map((page) => (
                  <MenuItem key={page} onClick={handleCloseNavMenu}>
                    <Typography textAlign="center">{page}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
            <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
            <Typography
              variant="h5"
              noWrap
              component="a"
              href=""
              sx={{
                mr: 2,
                display: { xs: "flex", md: "none" },
                flexGrow: 1,
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              LOGO
            </Typography>

            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              {pages.map((page) => (
                <Button
                  key={page}
                  onClick={() => navigateTo(page)}
                  sx={{ my: 2, color: "white", display: "block" }}
                >
                  {page}
                </Button>
              ))}
            </Box>
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt="Easy Bytes" src={userData["user_picture"]} />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map((setting) => (
                  <MenuItem
                    key={setting}
                    onClick={() => settingOptions(setting)}
                  >
                    <Typography textAlign="center">{setting}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          </Toolbar>
        </AppBar>
      </div>
      {show && (
        <UserProfileModal
          show={show}
          toggleShow={toggleShow}
          userData={userData}
        />
      )}
    </>
  );
};

export default MainNavBar;
