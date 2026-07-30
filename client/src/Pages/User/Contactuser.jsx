import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Slide,
  IconButton,
  Container,
  Fade,
  Paper,
} from "@mui/material";
import toast from "react-hot-toast";
import api from "../../api.js";

import contactImage from "../../assets/images/cont.jpg";
import NavbarUser from "../../Components/NavUserAdmin/Navuser.jsx";

// Icons
import SendRoundedIcon from "@mui/icons-material/SendRounded";
import PhoneRoundedIcon from "@mui/icons-material/PhoneRounded";
import EmailRoundedIcon from "@mui/icons-material/EmailRounded";
import LocationOnRoundedIcon from "@mui/icons-material/LocationOnRounded";
import AccessTimeRoundedIcon from "@mui/icons-material/AccessTimeRounded";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";

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

export default function Contactuser() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [fadeIn, setFadeIn] = useState(true);

  useEffect(() => {
    setFadeIn(true);
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.message) {
      return toast.error("All fields are required");
    }

    try {
      setLoading(true);
      await api.post("/messages", form);
      toast.success("Message sent successfully");
      setSubmitted(true);
      setTimeout(() => {
        setForm({ name: "", email: "", message: "" });
        setSubmitted(false);
      }, 3000);
    } catch (err) {
      toast.error(err.response?.data?.error || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const socialLinks = [
    { icon: <FacebookIcon />, label: "Facebook", color: "#1877F2" },
    { icon: <InstagramIcon />, label: "Instagram", color: "#E4405F" },
    { icon: <TwitterIcon />, label: "Twitter", color: "#1DA1F2" },
    { icon: <LinkedInIcon />, label: "LinkedIn", color: "#0A66C2" },
  ];

  const contactInfo = [
    { icon: <PhoneRoundedIcon />, label: "Phone", value: "+962 7 9000 0000" },
    { icon: <EmailRoundedIcon />, label: "Email", value: "info@flora.com" },
    {
      icon: <LocationOnRoundedIcon />,
      label: "Location",
      value: "Irbid, Jordan",
    },
    {
      icon: <AccessTimeRoundedIcon />,
      label: "Working Hours",
      value: "10:00 AM - 6:00 PM",
    },
  ];

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: colors.primaryLight }}>
      <Box
        sx={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          bgcolor: colors.primaryLight,
          zIndex: 0,
        }}
      />

      <Box
        sx={{
          position: "relative",
          width: "100%",
          height: "100vh",
          overflow: "hidden",
          zIndex: 1,
          "&::after": {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "rgba(0,0,0,0.3)",
            zIndex: 2,
          },
        }}
      >
        <img
          src={contactImage}
          alt="Luxury Events Contact"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />

        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 3,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
            px: { xs: 3, md: 6 },
          }}
        >
          <NavbarUser />

          <Box sx={{ mt: { xs: 10, md: 12 } }}>
            <Typography
              sx={{
                color: "#ffffff",
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: { xs: "1.8rem", md: "2.5rem" },
                fontWeight: 300,
                letterSpacing: 8,
                textShadow: "0 2px 30px rgba(0,0,0,0.5)",
                opacity: 0.95,
              }}
            >
              WELCOME
            </Typography>

            <Typography
              sx={{
                color: "#ffffff",
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: { xs: "1.2rem", md: "1.6rem" },
                fontWeight: 300,
                letterSpacing: 12,
                textShadow: "0 2px 30px rgba(0,0,0,0.5)",
                opacity: 0.8,
                mt: 0.5,
              }}
            >
              OUR CUSTOMER
            </Typography>
          </Box>
        </Box>
      </Box>

      <Box
        sx={{
          position: "relative",
          zIndex: 1,
          bgcolor: "#ffffff",
          pt: { xs: 4, md: 6 },
          pb: { xs: 6, md: 8 },
        }}
      >
        <Container maxWidth="lg">
          <Slide direction="up" in={fadeIn} timeout={600}>
            <Box
              sx={{
                width: "100%",
                display: "flex",
                flexDirection: "column",
                gap: 4,
              }}
            >
              <Fade
                in={fadeIn}
                timeout={1000}
                style={{ transitionDelay: "200ms" }}
              >
                <Box
                  sx={{
                    display: "grid",
                    gridTemplateColumns: {
                      xs: "1fr 1fr",
                      sm: "repeat(4, 1fr)",
                    },
                    gap: 2.5,
                  }}
                >
                  {contactInfo.map((item, index) => (
                    <Paper
                      key={index}
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
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          gap: 0.5,
                        }}
                      >
                        <Box
                          sx={{
                            color: colors.gold,
                            display: "flex",
                            alignItems: "center",
                            fontSize: "1.6rem",
                            mb: 0.5,
                          }}
                        >
                          {item.icon}
                        </Box>
                        <Typography
                          sx={{
                            color: "rgba(255,255,255,0.6)",
                            fontFamily: "sans-serif",
                            fontSize: "0.55rem",
                            textTransform: "uppercase",
                            letterSpacing: 1.5,
                            fontWeight: 600,
                          }}
                        >
                          {item.label}
                        </Typography>
                        <Typography
                          sx={{
                            color: "#ffffff",
                            fontFamily: "sans-serif",
                            fontSize: "0.75rem",
                            fontWeight: 500,
                          }}
                        >
                          {item.value}
                        </Typography>
                      </Box>
                    </Paper>
                  ))}
                </Box>
              </Fade>

              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
                  gap: 4,
                  alignItems: "start",
                }}
              >
                <Fade
                  in={fadeIn}
                  timeout={1000}
                  style={{ transitionDelay: "300ms" }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      gap: 3,
                      pt: { xs: 2, md: 4 },
                    }}
                  >
                    <Box>
                      <Typography
                        sx={{
                          color: "#000000",
                          fontFamily: "'Cormorant Garamond', serif",
                          fontSize: "1.6rem",
                          fontWeight: 600,
                          mb: 0.5,
                        }}
                      >
                        Connect With Us
                      </Typography>
                      <Box
                        sx={{
                          width: 35,
                          height: 2,
                          bgcolor: colors.gold,
                          mb: 2,
                          borderRadius: 1,
                        }}
                      />
                      <Typography
                        sx={{
                          color: "rgba(0,0,0,0.7)",
                          fontFamily: "sans-serif",
                          fontSize: "0.8rem",
                          mb: 2.5,
                        }}
                      >
                        Follow us on social media for inspiration, updates, and
                        behind-the-scenes content.
                      </Typography>
                    </Box>

                    <Box sx={{ display: "flex", gap: 1.5, flexWrap: "wrap" }}>
                      {socialLinks.map((social, index) => (
                        <IconButton
                          key={index}
                          sx={{
                            bgcolor: colors.primary,
                            color: "#ffffff",
                            border: "1px solid rgba(201,168,76,0.3)",
                            transition: "all 0.3s ease",
                            padding: "12px",
                            "&:hover": {
                              bgcolor: colors.gold,
                              color: "#000000",
                              borderColor: colors.gold,
                              transform: "translateY(-3px)",
                              boxShadow: `0 8px 25px rgba(201,168,76,0.3)`,
                            },
                          }}
                        >
                          {social.icon}
                        </IconButton>
                      ))}
                    </Box>

                    <Box
                      sx={{
                        mt: 1.5,
                        display: "flex",
                        flexDirection: "column",
                        gap: 1,
                      }}
                    >
                      {[
                        "100% Confidential",
                        "Response in 24h",
                        "Free Consultation",
                      ].map((badge, index) => (
                        <Box
                          key={index}
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 1.5,
                          }}
                        >
                          <CheckCircleRoundedIcon
                            sx={{
                              fontSize: "0.9rem",
                              color: colors.gold,
                            }}
                          />
                          <Typography
                            sx={{
                              color: "rgba(0,0,0,0.8)",
                              fontFamily: "sans-serif",
                              fontSize: "0.75rem",
                              letterSpacing: 0.3,
                            }}
                          >
                            {badge}
                          </Typography>
                        </Box>
                      ))}
                    </Box>
                  </Box>
                </Fade>

                <Slide
                  direction="up"
                  in={fadeIn}
                  timeout={800}
                  style={{ transitionDelay: "400ms" }}
                >
                  <Paper
                    elevation={0}
                    sx={{
                      bgcolor: colors.primary,
                      borderRadius: "20px",
                      border: "1px solid rgba(201,168,76,0.3)",
                      boxShadow: "0 15px 50px rgba(139,0,0,0.2)",
                      p: { xs: 3, md: 4 },
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
                    <Box sx={{ mb: 2.5, textAlign: "center" }}>
                      <Typography
                        sx={{
                          color: "#ffffff",
                          fontFamily: "'Cormorant Garamond', serif",
                          fontSize: { xs: "1.6rem", md: "2rem" },
                          fontWeight: 600,
                          mb: 0.5,
                        }}
                      >
                        Send a Message
                      </Typography>
                      <Typography
                        sx={{
                          color: "rgba(255,255,255,0.7)",
                          fontFamily: "sans-serif",
                          fontSize: "0.75rem",
                        }}
                      >
                        We'll get back to you within 24 hours
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
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        placeholder="Your Full Name"
                        fullWidth
                        disabled={loading}
                        sx={{
                          "& .MuiInputBase-root": {
                            bgcolor: "#ffffff",
                            color: "#000000",
                            borderRadius: 2,
                            fontSize: "0.85rem",
                            transition: "all 0.3s ease",
                            "& fieldset": {
                              borderColor: "rgba(201,168,76,0.4)",
                              borderWidth: "1.5px",
                            },
                            "&:hover fieldset": {
                              borderColor: colors.gold,
                            },
                            "&.Mui-focused fieldset": {
                              borderColor: colors.gold,
                              boxShadow: "0 0 20px rgba(201,168,76,0.1)",
                            },
                            "&:hover": {
                              bgcolor: "#f5f5f5",
                            },
                          },
                          "& .MuiInputBase-input": {
                            color: "#000000",
                          },
                          "& .MuiInputBase-input::placeholder": {
                            color: "rgba(0,0,0,0.4)",
                          },
                        }}
                      />

                      <TextField
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        placeholder="Your Email Address"
                        type="email"
                        fullWidth
                        disabled={loading}
                        sx={{
                          "& .MuiInputBase-root": {
                            bgcolor: "#ffffff",
                            color: "#000000",
                            borderRadius: 2,
                            fontSize: "0.85rem",
                            transition: "all 0.3s ease",
                            "& fieldset": {
                              borderColor: "rgba(201,168,76,0.4)",
                              borderWidth: "1.5px",
                            },
                            "&:hover fieldset": {
                              borderColor: colors.gold,
                            },
                            "&.Mui-focused fieldset": {
                              borderColor: colors.gold,
                              boxShadow: "0 0 20px rgba(201,168,76,0.1)",
                            },
                            "&:hover": {
                              bgcolor: "#f5f5f5",
                            },
                          },
                          "& .MuiInputBase-input": {
                            color: "#000000",
                          },
                          "& .MuiInputBase-input::placeholder": {
                            color: "rgba(0,0,0,0.4)",
                          },
                        }}
                      />

                      <TextField
                        name="message"
                        value={form.message}
                        onChange={handleChange}
                        placeholder="Tell us about your event..."
                        multiline
                        rows={4}
                        fullWidth
                        disabled={loading}
                        sx={{
                          "& .MuiInputBase-root": {
                            bgcolor: "#ffffff",
                            color: "#000000",
                            borderRadius: 2,
                            fontSize: "0.85rem",
                            transition: "all 0.3s ease",
                            "& fieldset": {
                              borderColor: "rgba(201,168,76,0.4)",
                              borderWidth: "1.5px",
                            },
                            "&:hover fieldset": {
                              borderColor: colors.gold,
                            },
                            "&.Mui-focused fieldset": {
                              borderColor: colors.gold,
                              boxShadow: "0 0 20px rgba(201,168,76,0.1)",
                            },
                            "&:hover": {
                              bgcolor: "#f5f5f5",
                            },
                          },
                          "& .MuiInputBase-input": {
                            color: "#000000",
                          },
                          "& .MuiInputBase-input::placeholder": {
                            color: "rgba(0,0,0,0.4)", // Black placeholder
                          },
                        }}
                      />

                      <Button
                        type="submit"
                        disabled={loading}
                        sx={{
                          mt: 0.5,
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
                          "Sending..."
                        ) : submitted ? (
                          <>
                            <CheckCircleRoundedIcon sx={{ mr: 1 }} />
                            Sent Successfully!
                          </>
                        ) : (
                          <>
                            Send Message
                            <ArrowForwardRoundedIcon
                              sx={{ ml: 1, fontSize: "1rem" }}
                            />
                          </>
                        )}
                      </Button>
                    </Box>
                  </Paper>
                </Slide>
              </Box>
            </Box>
          </Slide>
        </Container>
      </Box>
    </Box>
  );
}
