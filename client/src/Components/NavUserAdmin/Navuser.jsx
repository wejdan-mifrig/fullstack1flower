import React, { useState, useContext } from "react";

import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  IconButton,
  Drawer,
  Divider,
  Avatar,
} from "@mui/material";

import {
  Menu as MenuIcon,
  Close,
  KeyboardArrowDown,
  KeyboardArrowUp,
} from "@mui/icons-material";

import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

import { UserContext } from "../../Context/AuthContext.jsx";

const navItems = [
  { label: "HOME", path: "/user" },
  { label: "EVENT DECORATION", path: "/eventsuser" },
  { label: "BOOK AN EVENT", path: "/bookuser" },
  { label: "SHOP", path: "/shopuser" },
  { label: "ABOUT", path: "/aboutuser" },
  { label: "CONTACT US", path: "/contactuser" },
  { label: "CUSTOMER REVIEWS", path: "/reviewsuser" },
];

const eventTypes = [
  { label: "WEDDING", path: "/weddinguser" },
  { label: "BIRTHDAY", path: "/birthdayuser" },
  { label: "GRADUATION", path: "/graduationuser" },
  { label: "NEWBORN", path: "/newbornuser" },
];

export default function NavbarUser() {
  const [open, setOpen] = useState(false);
  const [eventsOpen, setEventsOpen] = useState(false);

  const navigate = useNavigate();

  const { user, logout } = useContext(UserContext);

  const handleNav = (path) => {
    navigate(path);
    setOpen(false);
  };

  const handleLogout = async () => {
    await logout();
    setOpen(false);
  };

  return (
    <>
      <AppBar
        position="absolute"
        elevation={0}
        sx={{
          bgcolor: "transparent",
          zIndex: 10,
        }}
      >
        <Toolbar
          sx={{
            justifyContent: "space-between",
            px: { xs: 2, md: 5 },
            py: 2,
          }}
        >
          <IconButton
            onClick={() => setOpen(true)}
            sx={{ color: "#f4f1ea" }}
          >
            <MenuIcon />
          </IconButton>

          <Typography
            onClick={() => handleNav("/user")}
            sx={{
              color: "#f4f1ea",
              fontFamily: "'Cormorant Garamond', serif",
              letterSpacing: { xs: 5, md: 10 },
              fontWeight: 600,
              cursor: "pointer",
              fontSize: { xs: "1.4rem", md: "1.8rem" },
            }}
          >
            FLORA
          </Typography>

          <Typography
            onClick={() => handleNav("/shopuser")}
            sx={{
              color: "#f4f1ea",
              fontSize: ".85rem",
              letterSpacing: 3,
              cursor: "pointer",
              position: "relative",

              "&:after": {
                content: '""',
                position: "absolute",
                left: 0,
                bottom: -3,
                width: 0,
                height: "1px",
                bgcolor: "#fff",
                transition: "0.3s",
              },

              "&:hover:after": {
                width: "100%",
              },
            }}
          >
            STORE
          </Typography>
        </Toolbar>
      </AppBar>

      <Drawer
        anchor="left"
        open={open}
        onClose={() => setOpen(false)}
        PaperProps={{
          sx: {
            width: {
              xs: "100%",
              md: 380,
            },
            bgcolor: "rgba(244,241,234,0.95)",
            backdropFilter: "blur(12px)",
          },
        }}
      >
        <Box
          sx={{
            p: 4,
            display: "flex",
            flexDirection: "column",
            height: "100%",
          }}
        >
          {/* HEADER */}

          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              mb: 3,
            }}
          >
            <Typography
              onClick={() => handleNav("/user")}
              sx={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "2rem",
                fontWeight: 600,
                cursor: "pointer",
              }}
            >
              FLORA
            </Typography>

            <IconButton onClick={() => setOpen(false)}>
              <Close />
            </IconButton>
          </Box>

          {/* USER INFO */}

          {user && (
            <Box
              sx={{
                mb: 3,
                p: 2,
                borderRadius: 3,
                display: "flex",
                alignItems: "center",
                gap: 2,
                background:
                  "linear-gradient(135deg,#fff,#f7f4ef)",
                boxShadow:
                  "0 8px 20px rgba(0,0,0,0.05)",
              }}
            >
              <Avatar sx={{ bgcolor: "#c98f6b" }}>
                {user.name?.charAt(0)?.toUpperCase()}
              </Avatar>

              <Box>
                <Typography sx={{ fontWeight: 600 }}>
                  {user.name}
                </Typography>

                <Typography
                  sx={{
                    fontSize: ".75rem",
                    color: "#777",
                  }}
                >
                  Premium Member
                </Typography>
              </Box>
            </Box>
          )}

          <Divider sx={{ mb: 2 }} />

          <Typography
            sx={{
              fontSize: ".7rem",
              color: "#999",
              mb: 1,
              letterSpacing: 2,
            }}
          >
            NAVIGATION
          </Typography>

          {navItems.map((item, index) => (
            <motion.div
              key={item.label}
              initial={{
                opacity: 0,
                x: -20,
              }}
              animate={{
                opacity: 1,
                x: 0,
              }}
              transition={{
                delay: index * 0.03,
              }}
            >
              <Box
                onClick={() => {
                  if (
                    item.label ===
                    "EVENT DECORATION"
                  ) {
                    setEventsOpen((prev) => !prev);
                  } else {
                    handleNav(item.path);
                  }
                }}
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  py: 1.2,
                  cursor: "pointer",
                  borderLeft: "2px solid transparent",
                  pl: 1,

                  "&:hover": {
                    borderLeft: "2px solid #c98f6b",
                    pl: 2,
                    color: "#c98f6b",
                  },

                  transition: "0.2s",
                }}
              >
                <Typography
                  sx={{
                    fontSize: ".9rem",
                    letterSpacing: 1,
                  }}
                >
                  {item.label}
                </Typography>

                {item.label ===
                  "EVENT DECORATION" &&
                  (eventsOpen ? (
                    <KeyboardArrowUp />
                  ) : (
                    <KeyboardArrowDown />
                  ))}
              </Box>

              {item.label ===
                "EVENT DECORATION" &&
                eventsOpen && (
                  <Box sx={{ ml: 2 }}>
                    {eventTypes.map((event) => (
                      <Typography
                        key={event.label}
                        onClick={() =>
                          handleNav(event.path)
                        }
                        sx={{
                          fontSize: ".85rem",
                          color: "#666",
                          py: 0.5,
                          cursor: "pointer",

                          "&:hover": {
                            color: "#c98f6b",
                            pl: 1,
                          },
                        }}
                      >
                        {event.label}
                      </Typography>
                    ))}
                  </Box>
                )}
            </motion.div>
          ))}

          <Divider sx={{ my: 2 }} />

          {/* USER LINKS */}

          {user && (
            <Box sx={{ mb: 2 }}>
              {[
                "MY PROFILE",
                "MY BOOKINGS",
                "CART",
              ].map((text) => (
                <Typography
                  key={text}
                  onClick={() =>
                    handleNav(
                      text === "MY PROFILE"
                        ? "/myprofile"
                        : text === "MY BOOKINGS"
                        ? "/mybooking"
                        : "/cart"
                    )
                  }
                  sx={{
                    py: 1,
                    cursor: "pointer",

                    "&:hover": {
                      color: "#c98f6b",
                      pl: 1,
                    },
                  }}
                >
                  {text}
                </Typography>
              ))}
            </Box>
          )}

          <Box sx={{ flexGrow: 1 }} />

          {/* LOGOUT */}

          {user && (
            <Box
              onClick={handleLogout}
              sx={{
                mt: "auto",
                py: 1.5,
                textAlign: "center",
                borderRadius: 2,
                background:
                  "linear-gradient(135deg,#1c1b18,#2b2824)",
                color: "#fff",
                cursor: "pointer",
                letterSpacing: 2,
                fontSize: ".8rem",
                transition: "0.3s",

                "&:hover": {
                  transform: "translateY(-2px)",
                  opacity: 0.9,
                },
              }}
            >
              SIGN OUT
            </Box>
          )}

          <Box
            sx={{
              mt: 4,
              textAlign: "center",
            }}
          >
            <Typography
              sx={{
                fontSize: ".7rem",
                color: "#999",
              }}
            >
              Luxury Floral Experience
            </Typography>
          </Box>
        </Box>
      </Drawer>
    </>
  );
}