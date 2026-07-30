import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Button,
  Drawer,
  List,
  ListItemButton,
  ListItemText,
  IconButton,
  Divider,
  Stack,
} from "@mui/material";

import MenuIcon from "@mui/icons-material/Menu";
import { useNavigate } from "react-router-dom";

const AdminNavbar = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const menuItems = [
    { title: "Dashboard", path: "/admin" },
    { title: "Manage Users", path: "/admin/users" },
    { title: "Manage Categories", path: "/admin/categories" },
    { title: "Manage Products", path: "/admin/products", highlight: true },
    { title: "Orders", path: "/admin/orders", highlight: true },
    { title: "Reviews", path: "/admin/reviews", highlight: true },
    { title: "Messages", path: "/admin/messages", highlight: true },
  ];

  return (
    <>
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          zIndex: 1300,
          backgroundColor: "rgba(255,255,255,0.10)",
          backdropFilter: "blur(3px)",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        <Toolbar sx={{ position: "relative", display: "flex" }}>
          <IconButton
            onClick={() => setOpen(true)}
            sx={{
              color: "#fff",
              borderRadius: 2,
              "&:hover": {
                backgroundColor: "rgba(255,255,255,0.08)",
              },
            }}
          >
            <MenuIcon />
          </IconButton>

          <Typography
            variant="h4"
            sx={{
              position: "absolute",
              left: "50%",
              transform: "translateX(-50%)",
              fontWeight: 900,
              letterSpacing: 6,
              color: "#fff",
            }}
          >
            FLORA
          </Typography>

          <Box sx={{ marginLeft: "auto" }}>
            <Button
              onClick={handleLogout}
              sx={{
                color: "#fff",
                border: "1px solid #fff",
                borderRadius: 3,
                px: 3,
                backgroundColor: "transparent",
                "&:hover": {
                  backgroundColor: "rgba(255,255,255,0.08)",
                },
              }}
            >
              Logout
            </Button>
          </Box>
        </Toolbar>
      </AppBar>

      <Drawer
        anchor="left"
        open={open}
        onClose={() => setOpen(false)}
        sx={{
          zIndex: 1400,
          "& .MuiDrawer-paper": {
            width: 280,
            backgroundColor: "#fff",
            color: "#333",
          },
        }}
      >
        <Box
          sx={{
            width: 280,
            height: "100%",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Box sx={{ textAlign: "center", py: 4 }}>
            <Typography
              variant="h5"
              fontWeight="bold"
              sx={{ color: "#6f8a67", letterSpacing: 3 }}
            >
              FLORA
            </Typography>

            <Typography variant="body2" sx={{ color: "#777", mt: 0.5 }}>
              Admin Panel
            </Typography>
          </Box>

          <Divider sx={{ borderColor: "#e5e5e5" }} />

          <List sx={{ mt: 2 }}>
            {menuItems.map((item) => (
              <ListItemButton
                key={item.title}
                onClick={() => {
                  navigate(item.path);
                  setOpen(false);
                }}
                sx={{
                  mx: 2,
                  my: 1,
                  borderRadius: 2,
                  transition: ".25s",
                  fontWeight: 600,
                  backgroundColor: item.highlight ? "#6f8a67" : "transparent",
                  color: item.highlight ? "#fff" : "#444",
                  "&:hover": {
                    backgroundColor: item.highlight ? "#a7c4a0" : "#6f8a67",
                    color: "#fff",
                    transform: "translateX(5px)",
                  },
                }}
              >
                <ListItemText
                  primary={item.title}
                  primaryTypographyProps={{
                    fontSize: "0.96rem",
                    fontWeight: 600,
                  }}
                />
              </ListItemButton>
            ))}
          </List>

          <Box
            sx={{
              mt: "auto",
              p: 3,
              textAlign: "center",
              borderTop: "1px solid #eee",
            }}
          >
            <Typography fontWeight="bold" sx={{ color: "#6f8a67" }}>
              FLORA Admin
            </Typography>

            <Typography variant="caption" sx={{ color: "#777" }}>
              Manage everything easily
            </Typography>
          </Box>
        </Box>
      </Drawer>
    </>
  );
};

export default AdminNavbar;
