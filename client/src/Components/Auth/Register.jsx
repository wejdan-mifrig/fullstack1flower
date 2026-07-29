import React, { useState } from "react";
import {
  Box,
  Paper,
  TextField,
  Button,
  Typography,
} from "@mui/material";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { FaApple } from "react-icons/fa";
import videoBg from "../../assets/video/register.mp4";
import { useAuth } from "../../Hooks/useAuth";

const mainColor = "#3e4a3a";

export default function Register() {
  const { register } = useAuth();

  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    // التحقق من تطابق كلمة المرور
    if (userData.password !== userData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      setLoading(true);
      await register(userData);
      // الدالة register تقوم بتسجيل الدخول ودمج السلة تلقائياً
    } catch (error) {
      console.error('Register error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        bgcolor: "#f3efe6",
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
            bgcolor: "white",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <Typography
            variant="h4"
            sx={{
              fontWeight: "bold",
              color: mainColor,
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
              startIcon={<FcGoogle size={22} />}
              fullWidth
              sx={{
                py: 1,
                border: "1px solid #ddd",
                color: "#333",
                textTransform: "none",
              }}
            >
              Google
            </Button>

            <Button
              startIcon={<FaApple size={22} />}
              fullWidth
              sx={{
                py: 1,
                border: "1px solid #ddd",
                color: "#333",
                textTransform: "none",
              }}
            >
              Apple
            </Button>
          </Box>

          <Typography sx={{ mt: 2, fontSize: 13, textAlign: "center", color: "#666" }}>
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
              disabled={loading}
              sx={{
                mt: 1,
                bgcolor: mainColor,
                "&:hover": { bgcolor: "#2f3a2e" },
                py: 1,
              }}
            >
              {loading ? "Loading..." : "Register"}
            </Button>

            <Typography sx={{ mt: 1, textAlign: "center", fontSize: 13 }}>
              Already have an account?{" "}
              <Link
                to="/login"
                style={{
                  color: mainColor,
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