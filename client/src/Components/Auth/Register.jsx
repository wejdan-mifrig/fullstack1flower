import React, { useState } from "react";
import {
  Box,
  Paper,
  TextField,
  Button,
  Typography,
} from "@mui/material";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";

import { FcGoogle } from "react-icons/fc";
import { FaApple } from "react-icons/fa";

import videoBg from "../../assets/video/register.mp4";
import { useTheme } from "@mui/material/styles";
import { useAuth } from "../../Hooks/useAuth.js"; 

export default function Register() {
  const theme = useTheme();
  const navigate = useNavigate();
  const { register } = useAuth(); 

  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleRegister = () => {
    register(userData);
    setUserData({
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    });
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        bgcolor: theme.palette.secondary.main,
        px: 2,
      }}
    >
      <Paper
        component={motion.div}
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        elevation={12}
        sx={{
          width: "100%",
          maxWidth: 850,
          display: "flex",
          borderRadius: 4,
          overflow: "hidden",
        }}
      >
        <Box sx={{ flex: 1, position: "relative" }}>
          <video
            src={videoBg}
            autoPlay
            loop
            muted
            playsInline
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "center bottom",
              position: "absolute",
              top: 0,
              left: 0,
            }}
          />
        </Box>

        <Box
          sx={{
            flex: 1,
            p: 4,
            bgcolor: theme.palette.background.paper,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <Typography
            variant="h4"
            sx={{
              fontWeight: "bold",
              color: theme.palette.primary.main,
              mb: 2,
            }}
          >
            Create Account
          </Typography>

          <Typography sx={{ fontSize: 13, mb: 1, color: "#666" }}>
            Sign up with
          </Typography>

          <Box sx={{ display: "flex", flexDirection: "column", gap: 1.2 }}>
            <Button
              startIcon={<FcGoogle />}
              fullWidth
              sx={{
                py: 1,
                border: "1px solid #ddd",
                color: "#333",
                textTransform: "none",
                borderRadius: "4px",
                "&:hover": {
                  border: "1px solid #3e4a3a",
                  backgroundColor: "rgba(62, 74, 58, 0.05)",
                },
              }}
            >
              Google
            </Button>

            <Button
              startIcon={<FaApple />}
              fullWidth
              sx={{
                py: 1,
                border: "1px solid #ddd",
                color: "#333",
                textTransform: "none",
                borderRadius: "4px",
                "&:hover": {
                  border: "1px solid #3e4a3a",
                  backgroundColor: "rgba(62, 74, 58, 0.05)",
                },
              }}
            >
              Apple
            </Button>
          </Box>

          <Typography
            sx={{
              mt: 1.5,
              fontSize: 13,
              textAlign: "center",
              color: "#666",
            }}
          >
            or create an account
          </Typography>

          <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5, mt: 2 }}>
            <TextField 
              label="Full Name" 
              fullWidth 
              size="small" 
              value={userData.name}
              onChange={(e) => setUserData({ ...userData, name: e.target.value })}
            />
            <TextField 
              label="Email" 
              fullWidth 
              size="small" 
              value={userData.email}
              onChange={(e) => setUserData({ ...userData, email: e.target.value })}
            />
            <TextField 
              label="Password" 
              type="password" 
              fullWidth 
              size="small" 
              value={userData.password}
              onChange={(e) => setUserData({ ...userData, password: e.target.value })}
            />
            <TextField 
              label="Confirm Password" 
              type="password" 
              fullWidth 
              size="small" 
              value={userData.confirmPassword}
              onChange={(e) => setUserData({ ...userData, confirmPassword: e.target.value })}
            />

            <Button
              variant="contained"
              onClick={handleRegister} 
              sx={{
                mt: 1,
                bgcolor: theme.palette.primary.main,
                "&:hover": {
                  bgcolor: "#2f3a2e",
                },
                py: 1,
              }}
            >
              Register
            </Button>

            <Typography sx={{ mt: 1, textAlign: "center", fontSize: 13 }}>
              Already have an account?{" "}
              <Link
                to="/login"
                style={{
                  color: theme.palette.primary.main,
                  fontWeight: "bold",
                  textDecoration: "none",
                }}
              >
                Login
              </Link>
            </Typography>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
}