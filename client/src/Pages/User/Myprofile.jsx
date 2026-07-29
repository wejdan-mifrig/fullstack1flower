import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Paper,
  TextField,
  Button,
  Container,
  Avatar,
  Divider,
  Stack,
  CircularProgress,
  Fade,
  Slide,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import SaveRoundedIcon from "@mui/icons-material/SaveRounded";

import NavbarUser from "../../Components/NavUserAdmin/Navuser.jsx";
import Footer from "../../Components/Footer/Footer.jsx";
import { useAuth } from "../../Context/AuthContext.jsx";
import upImage from "../../assets/Images/up.jpg";

// Color Scheme
const colors = {
  primary: "#8B0000",
  primaryLight: "#ffffff",
  secondary: "#ffffff",
  accent: "#c9a84c",
  accentLight: "#e8d48a",
  textPrimary: "#000000",
  textSecondary: "rgba(0,0,0,0.8)",
  textMuted: "rgba(0,0,0,0.5)",
  gold: "#c9a84c",
  red: "#8B0000",
  darkRed: "#660000",
  lightRed: "#a52a2a",
};

export default function Myprofile() {
  const { user, updateProfile, loading } = useAuth();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [fadeIn, setFadeIn] = useState(true);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    setFadeIn(true);
  }, []);

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        email: user.email || "",
        password: "",
        confirmPassword: "",
      });
    }
  }, [user]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password && formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    await updateProfile({
      name: formData.name,
      email: formData.email,
      password: formData.password,
    });

    setSubmitted(true);
    setTimeout(() => {
      setFormData({
        ...formData,
        password: "",
        confirmPassword: "",
      });
      setSubmitted(false);
    }, 3000);
  };

  if (!user) {
    return (
      <Box
        sx={{
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          bgcolor: colors.primaryLight,
        }}
      >
        <CircularProgress
          sx={{
            color: colors.gold,
          }}
        />
      </Box>
    );
  }

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: colors.primaryLight,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <NavbarUser />

      {/* Hero Section - صورة كاملة */}
      <Box
        sx={{
          position: "relative",
          width: "100%",
          height: "100vh",
          overflow: "hidden",
          "&::after": {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "rgba(0,0,0,0.4)",
            zIndex: 2,
          },
        }}
      >
        {/* صورة الخلفية */}
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 1,
          }}
        >
          <img
            src={upImage}
            alt="Profile Background"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        </Box>

        {/* المحتوى - فقط Account Settings */}
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            zIndex: 3,
            textAlign: "center",
            width: "100%",
            px: 3,
          }}
        >
          <Fade in={fadeIn} timeout={800}>
            <Typography
              sx={{
                color: "#ffffff",
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: { xs: "2.5rem", md: "4rem" },
                fontWeight: 600,
                letterSpacing: 8,
                textShadow: "0 4px 40px rgba(0,0,0,0.6)",
                opacity: 0.95,
              }}
            >
              Account Settings
            </Typography>
          </Fade>
        </Box>

        {/* خط ذهبي في الأسفل */}
        <Box
          sx={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: "3px",
            background: `linear-gradient(90deg, transparent, ${colors.gold}, transparent)`,
            zIndex: 4,
          }}
        />
      </Box>

      {/* Main Content - White Background */}
      <Box
        sx={{
          position: "relative",
          zIndex: 1,
          bgcolor: "#ffffff",
          pt: { xs: 6, md: 8 },
          pb: { xs: 6, md: 8 },
          flex: 1,
        }}
      >
        <Container maxWidth="md">
          <Slide direction="up" in={fadeIn} timeout={600}>
            <Box
              sx={{
                width: "100%",
                display: "flex",
                flexDirection: "column",
                gap: 4,
              }}
            >
              {/* Profile Info Cards */}
              <Fade in={fadeIn} timeout={1000} style={{ transitionDelay: "200ms" }}>
                <Box
                  sx={{
                    display: "grid",
                    gridTemplateColumns: { xs: "1fr 1fr", sm: "repeat(3, 1fr)" },
                    gap: 2.5,
                  }}
                >
                  <Paper
                    elevation={0}
                    sx={{
                      bgcolor: colors.primary,
                      borderRadius: 3,
                      p: 2.5,
                      border: "1px solid rgba(201,168,76,0.3)",
                      transition: "all 0.3s ease",
                      textAlign: "center",
                      "&:hover": {
                        bgcolor: colors.darkRed,
                        borderColor: colors.gold,
                        transform: "translateY(-3px)",
                        boxShadow: "0 10px 30px rgba(139,0,0,0.3)",
                      },
                    }}
                  >
                    <Typography
                      sx={{
                        color: colors.gold,
                        fontFamily: "'Cormorant Garamond', serif",
                        fontSize: "0.6rem",
                        textTransform: "uppercase",
                        letterSpacing: 1.5,
                        fontWeight: 600,
                        mb: 0.5,
                      }}
                    >
                      Member Since
                    </Typography>
                    <Typography
                      sx={{
                        color: "#ffffff",
                        fontFamily: "sans-serif",
                        fontSize: "0.75rem",
                        fontWeight: 500,
                      }}
                    >
                      {new Date().getFullYear()}
                    </Typography>
                  </Paper>

                  <Paper
                    elevation={0}
                    sx={{
                      bgcolor: colors.primary,
                      borderRadius: 3,
                      p: 2.5,
                      border: "1px solid rgba(201,168,76,0.3)",
                      transition: "all 0.3s ease",
                      textAlign: "center",
                      "&:hover": {
                        bgcolor: colors.darkRed,
                        borderColor: colors.gold,
                        transform: "translateY(-3px)",
                        boxShadow: "0 10px 30px rgba(139,0,0,0.3)",
                      },
                    }}
                  >
                    <Typography
                      sx={{
                        color: colors.gold,
                        fontFamily: "'Cormorant Garamond', serif",
                        fontSize: "0.6rem",
                        textTransform: "uppercase",
                        letterSpacing: 1.5,
                        fontWeight: 600,
                        mb: 0.5,
                      }}
                    >
                      Account Status
                    </Typography>
                    <Typography
                      sx={{
                        color: "#ffffff",
                        fontFamily: "sans-serif",
                        fontSize: "0.75rem",
                        fontWeight: 500,
                      }}
                    >
                      Active ✓
                    </Typography>
                  </Paper>

                  <Paper
                    elevation={0}
                    sx={{
                      bgcolor: colors.primary,
                      borderRadius: 3,
                      p: 2.5,
                      border: "1px solid rgba(201,168,76,0.3)",
                      transition: "all 0.3s ease",
                      textAlign: "center",
                      "&:hover": {
                        bgcolor: colors.darkRed,
                        borderColor: colors.gold,
                        transform: "translateY(-3px)",
                        boxShadow: "0 10px 30px rgba(139,0,0,0.3)",
                      },
                    }}
                  >
                    <Typography
                      sx={{
                        color: colors.gold,
                        fontFamily: "'Cormorant Garamond', serif",
                        fontSize: "0.6rem",
                        textTransform: "uppercase",
                        letterSpacing: 1.5,
                        fontWeight: 600,
                        mb: 0.5,
                      }}
                    >
                      Profile Complete
                    </Typography>
                    <Typography
                      sx={{
                        color: "#ffffff",
                        fontFamily: "sans-serif",
                        fontSize: "0.75rem",
                        fontWeight: 500,
                      }}
                    >
                      100%
                    </Typography>
                  </Paper>
                </Box>
              </Fade>

              {/* Edit Form */}
              <Slide direction="up" in={fadeIn} timeout={800} style={{ transitionDelay: "400ms" }}>
                <Paper
                  elevation={0}
                  sx={{
                    bgcolor: colors.primary,
                    borderRadius: "20px",
                    border: "1px solid rgba(201,168,76,0.3)",
                    boxShadow: "0 15px 50px rgba(139,0,0,0.2)",
                    p: { xs: 3, md: 5 },
                    width: "100%",
                    position: "relative",
                    overflow: "hidden",
                    "&::before": {
                      content: '""',
                      position: "absolute",
                      top: 0,
                      left: 0,
                      right: 0,
                      height: "3px",
                      background: `linear-gradient(90deg, transparent, ${colors.gold}, transparent)`,
                    },
                  }}
                >
                  <Box sx={{ mb: 3, textAlign: "center" }}>
                    <Typography
                      sx={{
                        color: "#ffffff",
                        fontFamily: "'Cormorant Garamond', serif",
                        fontSize: { xs: "1.6rem", md: "2.2rem" },
                        fontWeight: 600,
                        mb: 0.5,
                      }}
                    >
                      Edit Profile
                    </Typography>
                    <Typography
                      sx={{
                        color: "rgba(255,255,255,0.7)",
                        fontFamily: "sans-serif",
                        fontSize: "0.75rem",
                      }}
                    >
                      Update your personal information
                    </Typography>
                    <Box
                      sx={{
                        width: 40,
                        height: 2,
                        bgcolor: colors.gold,
                        mx: "auto",
                        mt: 1.5,
                        borderRadius: 1,
                      }}
                    />
                  </Box>

                  <Box
                    component="form"
                    onSubmit={handleSubmit}
                    sx={{
                      width: "100%",
                      display: "flex",
                      flexDirection: "column",
                      gap: 2,
                    }}
                  >
                    <TextField
                      fullWidth
                      label="Full Name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      disabled={loading}
                      InputProps={{
                        startAdornment: (
                          <PersonIcon
                            sx={{
                              mr: 1,
                              color: colors.gold,
                              fontSize: "1.2rem",
                            }}
                          />
                        ),
                      }}
                      sx={{
                        "& .MuiInputBase-root": {
                          bgcolor: "transparent",
                          color: "#ffffff",
                          borderRadius: 0,
                          fontSize: "0.85rem",
                          transition: "all 0.3s ease",
                          borderBottom: "2px solid rgba(201,168,76,0.4)",
                          "&:hover": {
                            borderBottom: "2px solid rgba(201,168,76,0.8)",
                          },
                          "&.Mui-focused": {
                            borderBottom: "2px solid",
                            borderBottomColor: colors.gold,
                          },
                          "& fieldset": {
                            border: "none",
                          },
                        },
                        "& .MuiInputBase-input": {
                          color: "#ffffff",
                          padding: "12px 0",
                        },
                        "& .MuiInputLabel-root": {
                          color: "rgba(255,255,255,0.7)",
                          transform: "translate(0, -6px) scale(0.75)",
                        },
                        "& .MuiInputLabel-root.Mui-focused": {
                          color: colors.gold,
                        },
                      }}
                    />

                    <TextField
                      fullWidth
                      label="Email Address"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      type="email"
                      disabled={loading}
                      InputProps={{
                        startAdornment: (
                          <EmailIcon
                            sx={{
                              mr: 1,
                              color: colors.gold,
                              fontSize: "1.2rem",
                            }}
                          />
                        ),
                      }}
                      sx={{
                        "& .MuiInputBase-root": {
                          bgcolor: "transparent",
                          color: "#ffffff",
                          borderRadius: 0,
                          fontSize: "0.85rem",
                          transition: "all 0.3s ease",
                          borderBottom: "2px solid rgba(201,168,76,0.4)",
                          "&:hover": {
                            borderBottom: "2px solid rgba(201,168,76,0.8)",
                          },
                          "&.Mui-focused": {
                            borderBottom: "2px solid",
                            borderBottomColor: colors.gold,
                          },
                          "& fieldset": {
                            border: "none",
                          },
                        },
                        "& .MuiInputBase-input": {
                          color: "#ffffff",
                          padding: "12px 0",
                        },
                        "& .MuiInputLabel-root": {
                          color: "rgba(255,255,255,0.7)",
                          transform: "translate(0, -6px) scale(0.75)",
                        },
                        "& .MuiInputLabel-root.Mui-focused": {
                          color: colors.gold,
                        },
                      }}
                    />

                    <TextField
                      fullWidth
                      type="password"
                      label="New Password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      disabled={loading}
                      InputProps={{
                        startAdornment: (
                          <LockIcon
                            sx={{
                              mr: 1,
                              color: colors.gold,
                              fontSize: "1.2rem",
                            }}
                          />
                        ),
                      }}
                      sx={{
                        "& .MuiInputBase-root": {
                          bgcolor: "transparent",
                          color: "#ffffff",
                          borderRadius: 0,
                          fontSize: "0.85rem",
                          transition: "all 0.3s ease",
                          borderBottom: "2px solid rgba(201,168,76,0.4)",
                          "&:hover": {
                            borderBottom: "2px solid rgba(201,168,76,0.8)",
                          },
                          "&.Mui-focused": {
                            borderBottom: "2px solid",
                            borderBottomColor: colors.gold,
                          },
                          "& fieldset": {
                            border: "none",
                          },
                        },
                        "& .MuiInputBase-input": {
                          color: "#ffffff",
                          padding: "12px 0",
                        },
                        "& .MuiInputLabel-root": {
                          color: "rgba(255,255,255,0.7)",
                          transform: "translate(0, -6px) scale(0.75)",
                        },
                        "& .MuiInputLabel-root.Mui-focused": {
                          color: colors.gold,
                        },
                      }}
                    />

                    <TextField
                      fullWidth
                      type="password"
                      label="Confirm Password"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      disabled={loading}
                      sx={{
                        "& .MuiInputBase-root": {
                          bgcolor: "transparent",
                          color: "#ffffff",
                          borderRadius: 0,
                          fontSize: "0.85rem",
                          transition: "all 0.3s ease",
                          borderBottom: "2px solid rgba(201,168,76,0.4)",
                          "&:hover": {
                            borderBottom: "2px solid rgba(201,168,76,0.8)",
                          },
                          "&.Mui-focused": {
                            borderBottom: "2px solid",
                            borderBottomColor: colors.gold,
                          },
                          "& fieldset": {
                            border: "none",
                          },
                        },
                        "& .MuiInputBase-input": {
                          color: "#ffffff",
                          padding: "12px 0",
                        },
                        "& .MuiInputLabel-root": {
                          color: "rgba(255,255,255,0.7)",
                          transform: "translate(0, -6px) scale(0.75)",
                        },
                        "& .MuiInputLabel-root.Mui-focused": {
                          color: colors.gold,
                        },
                      }}
                    />

                    <Button
                      type="submit"
                      disabled={loading}
                      fullWidth
                      sx={{
                        mt: 3,
                        bgcolor: colors.gold,
                        color: "#000000",
                        py: 1.6,
                        borderRadius: 2.5,
                        fontWeight: 700,
                        textTransform: "none",
                        fontSize: "0.95rem",
                        letterSpacing: 0.5,
                        transition: "all 0.3s ease",
                        border: "2px solid transparent",
                        "&:hover": {
                          bgcolor: "#d4b85c",
                          color: "#000000",
                          transform: "translateY(-2px)",
                          boxShadow: "0 12px 35px rgba(201,168,76,0.3)",
                          borderColor: colors.gold,
                        },
                        "&:active": {
                          transform: "scale(0.98)",
                        },
                        "&.Mui-disabled": {
                          bgcolor: "rgba(255,255,255,0.1)",
                          color: "rgba(255,255,255,0.3)",
                        },
                      }}
                    >
                      {loading ? (
                        "Saving..."
                      ) : submitted ? (
                        <>
                          <CheckCircleRoundedIcon sx={{ mr: 1 }} />
                          Saved Successfully!
                        </>
                      ) : (
                        "Save Changes"
                      )}
                    </Button>
                  </Box>
                </Paper>
              </Slide>
            </Box>
          </Slide>
        </Container>
      </Box>

      <Footer />
    </Box>
  );
}