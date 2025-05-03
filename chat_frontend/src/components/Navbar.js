import React, { useContext } from "react";
import {
  AppBar,
  Avatar,
  Box,
  Button,
  Container,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import {
  ForumOutlined,
  PersonAddOutlined,
  QuestionAnswer,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { store } from "../providers/AuthProvider";

function Navbar({ showAddFriend, showDashboard }) {
  const navigate = useNavigate();

  const { socket } = useContext(store);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const settings = [
    {
      name: "Profile",
      onClick: () => handleProfileClick(),
    },
    {
      name: "Logout",
      onClick: () => handleLogout(),
    },
  ];

  const handleProfileClick = () => {
    navigate("/profile");
  };

  const handleLogout = () => {
    socket.disconnect()
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="static" sx={{ background: "#0B69F4" }}>
      <Container maxWidth="xl">
        <Toolbar
          disableGutters
          sx={{ display: "flex", justifyContent: "space-between" }}
        >
          <QuestionAnswer
            sx={{
              display: { xs: "flex", md: "flex" },
              mr: 1,
              height: "40px",
              width: "40px",
            }}
          />

          <Box sx={{ display: "flex", gap: "12px" }}>
            {showAddFriend && (
              <Tooltip title="Search for friends">
                <IconButton
                  onClick={() => navigate("/add-friend")}
                  sx={{ p: 0, display: "flex", gap: "8px" }}
                >
                  <span style={{ color: "#FFFFFF", fontSize: "12px" }}>
                    Add a friend
                  </span>
                  <PersonAddOutlined sx={{ color: "#FFFFFF" }} />
                </IconButton>
              </Tooltip>
            )}
            {showDashboard && (
              <Tooltip title="Search for friends">
                <IconButton
                  onClick={() => navigate("/dashboard")}
                  sx={{ p: 0, display: "flex", gap: "8px" }}
                >
                  <span style={{ color: "#FFFFFF", fontSize: "12px" }}>
                    Open my chats
                  </span>
                  <ForumOutlined sx={{ color: "#FFFFFF" }} />
                </IconButton>
              </Tooltip>
            )}
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
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
                <MenuItem key={setting} onClick={setting?.onClick}>
                  <Typography sx={{ textAlign: "center" }}>
                    {setting?.name}
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Navbar;
