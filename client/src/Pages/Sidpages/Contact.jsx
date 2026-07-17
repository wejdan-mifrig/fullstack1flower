import React, { useState, useEffect, useRef } from "react";
import { Box, Typography, TextField, Button, Slide, IconButton, Chip, Divider, Container, Fade, Zoom } from "@mui/material";
import toast from "react-hot-toast";
import api from "../../api.js";

import Navbar from "../../Components/Navhero/Nav.jsx";

// Icons
import SendRoundedIcon from '@mui/icons-material/SendRounded';
import PhoneRoundedIcon from '@mui/icons-material/PhoneRounded';
import EmailRoundedIcon from '@mui/icons-material/EmailRounded';
import LocationOnRoundedIcon from '@mui/icons-material/LocationOnRounded';
import AccessTimeRoundedIcon from '@mui/icons-material/AccessTimeRounded';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';

export default function Contact() {
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
    { icon: <EmailRoundedIcon />, label: "Email", value: "info@luxuryevents.com" },
    { icon: <LocationOnRoundedIcon />, label: "Location", value: "Irbid, Jordan" },
    { icon: <AccessTimeRoundedIcon />, label: "Working Hours", value: "10:00 AM - 6:00 PM" },
  ];

  return (
    <Box sx={{ minHeight: "100vh", position: "relative", bgcolor: "#3e4a3a" }}>
      {/* Fixed Background */}
      <Box
        sx={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          bgcolor: "#3e4a3a",
          zIndex: 0,
        }}
      />

      {/* Scrollable Content */}
      <Box sx={{ position: "relative", zIndex: 2, minHeight: "100vh" }}>
        <Box sx={{ position: "relative", zIndex: 3 }}>
          <Navbar />
        </Box>

        <Container maxWidth="lg">
          <Box
            sx={{
              minHeight: "calc(100vh - 80px)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              px: { xs: 2, md: 4 },
              pt: { xs: 14, md: 18 },
              pb: { xs: 6, md: 8 },
            }}
          >
            <Slide direction="up" in={fadeIn} timeout={600}>
              <Box
                sx={{
                  width: "100%",
                  maxWidth: 900,
                  display: "flex",
                  flexDirection: "column",
                  gap: 4,
                }}
              >
                {/* Contact Info - First (Centered) with Zoom Animation */}
                <Zoom in={fadeIn} timeout={800} style={{ transitionDelay: "100ms" }}>
                  <Box
                    sx={{
                      textAlign: "center",
                      mb: 2,
                    }}
                  >
                    <Chip
                      label="GET IN TOUCH"
                      sx={{
                        color: "#c0a080",
                        borderColor: "#c0a080",
                        bgcolor: "rgba(192,160,128,0.1)",
                        fontFamily: "sans-serif",
                        fontWeight: 700,
                        letterSpacing: 2,
                        mb: 2,
                        fontSize: "0.7rem",
                        animation: "pulse 2s infinite",
                        "@keyframes pulse": {
                          "0%": { opacity: 0.6, transform: "scale(1)" },
                          "50%": { opacity: 1, transform: "scale(1.05)" },
                          "100%": { opacity: 0.6, transform: "scale(1)" },
                        },
                      }}
                      variant="outlined"
                    />
                    <Typography
                      sx={{
                        color: "#f4f1ea",
                        fontFamily: "'Cormorant Garamond', serif",
                        fontSize: { xs: "2rem", md: "3.2rem" },
                        fontWeight: 600,
                        lineHeight: 1.2,
                        mb: 2,
                        animation: "fadeInUp 1s ease-out",
                        "@keyframes fadeInUp": {
                          "0%": { opacity: 0, transform: "translateY(30px)" },
                          "100%": { opacity: 1, transform: "translateY(0)" },
                        },
                      }}
                    >
                      Let's Create Something
                      <br />
                      <span style={{ color: "#c0a080" }}>Extraordinary Together</span>
                    </Typography>
                    <Typography
                      sx={{
                        color: "rgba(244,241,234,0.7)",
                        fontFamily: "sans-serif",
                        fontSize: "0.95rem",
                        lineHeight: 1.7,
                        maxWidth: 600,
                        mx: "auto",
                        animation: "fadeInUp 1.2s ease-out",
                        "@keyframes fadeInUp": {
                          "0%": { opacity: 0, transform: "translateY(30px)" },
                          "100%": { opacity: 1, transform: "translateY(0)" },
                        },
                      }}
                    >
                      Whether you're planning a grand celebration or an intimate gathering,
                      we're here to bring your vision to life. Reach out and let's start
                      crafting your perfect event.
                    </Typography>
                  </Box>
                </Zoom>

                {/* Contact Info Cards - Grid with Fade Animation */}
                <Fade in={fadeIn} timeout={1000} style={{ transitionDelay: "200ms" }}>
                  <Box
                    sx={{
                      display: "grid",
                      gridTemplateColumns: { xs: "1fr 1fr", sm: "repeat(4, 1fr)" },
                      gap: 2,
                      mb: 2,
                    }}
                  >
                    {contactInfo.map((item, index) => (
                      <Box
                        key={index}
                        sx={{
                          bgcolor: "rgba(255,255,255,0.06)",
                          borderRadius: 2.5,
                          p: 2.5,
                          border: "1px solid rgba(255,255,255,0.08)",
                          transition: "all 0.3s ease",
                          textAlign: "center",
                          animation: `slideIn 0.6s ease-out ${index * 0.1}s both`,
                          "@keyframes slideIn": {
                            "0%": { opacity: 0, transform: "translateY(30px) scale(0.9)" },
                            "100%": { opacity: 1, transform: "translateY(0) scale(1)" },
                          },
                          "&:hover": {
                            bgcolor: "rgba(192,160,128,0.08)",
                            borderColor: "rgba(192,160,128,0.3)",
                            transform: "translateY(-5px) scale(1.02)",
                            boxShadow: "0 8px 25px rgba(0,0,0,0.2)",
                          },
                        }}
                      >
                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            gap: 1,
                          }}
                        >
                          <Box
                            sx={{
                              color: "#c0a080",
                              display: "flex",
                              alignItems: "center",
                              fontSize: "1.5rem",
                              transition: "transform 0.3s ease",
                              "&:hover": {
                                transform: "rotate(10deg) scale(1.1)",
                              },
                            }}
                          >
                            {item.icon}
                          </Box>
                          <Typography
                            sx={{
                              color: "rgba(244,241,234,0.5)",
                              fontFamily: "sans-serif",
                              fontSize: "0.6rem",
                              textTransform: "uppercase",
                              letterSpacing: 1,
                            }}
                          >
                            {item.label}
                          </Typography>
                          <Typography
                            sx={{
                              color: "#f4f1ea",
                              fontFamily: "sans-serif",
                              fontSize: "0.8rem",
                              fontWeight: 500,
                            }}
                          >
                            {item.value}
                          </Typography>
                        </Box>
                      </Box>
                    ))}
                  </Box>
                </Fade>

                {/* Social Links - Centered with Bounce Animation */}
                <Fade in={fadeIn} timeout={1000} style={{ transitionDelay: "400ms" }}>
                  <Box sx={{ textAlign: "center", mb: 3 }}>
                    <Typography
                      sx={{
                        color: "rgba(244,241,234,0.5)",
                        fontFamily: "sans-serif",
                        fontSize: "0.7rem",
                        textTransform: "uppercase",
                        letterSpacing: 2,
                        mb: 1.5,
                      }}
                    >
                      Follow Us
                    </Typography>
                    <Box sx={{ display: "flex", gap: 1.5, justifyContent: "center" }}>
                      {socialLinks.map((social, index) => (
                        <IconButton
                          key={index}
                          sx={{
                            bgcolor: "rgba(255,255,255,0.06)",
                            color: "#f4f1ea",
                            border: "1px solid rgba(255,255,255,0.08)",
                            transition: "all 0.3s ease",
                            padding: "10px",
                            animation: `bounceIn 0.8s ease-out ${index * 0.1}s both`,
                            "@keyframes bounceIn": {
                              "0%": { opacity: 0, transform: "scale(0.3)" },
                              "50%": { opacity: 1, transform: "scale(1.1)" },
                              "70%": { transform: "scale(0.9)" },
                              "100%": { transform: "scale(1)" },
                            },
                            "&:hover": {
                              bgcolor: social.color + "30",
                              borderColor: social.color,
                              transform: "translateY(-3px) scale(1.05) rotate(5deg)",
                              boxShadow: `0 8px 25px ${social.color}40`,
                            },
                          }}
                        >
                          {social.icon}
                        </IconButton>
                      ))}
                    </Box>
                  </Box>
                </Fade>

                {/* Form Box - Below Contact Info with Slide Animation */}
                <Slide direction="up" in={fadeIn} timeout={800} style={{ transitionDelay: "300ms" }}>
                  <Box
                    sx={{
                      bgcolor: "rgba(255,255,255,0.05)",
                      backdropFilter: "blur(10px)",
                      borderRadius: "20px",
                      border: "1px solid rgba(255,255,255,0.08)",
                      boxShadow: "0 20px 60px rgba(0,0,0,0.3)",
                      p: { xs: 3, md: 4 },
                      maxWidth: 700,
                      mx: "auto",
                      width: "100%",
                      animation: "float 3s ease-in-out infinite",
                      "@keyframes float": {
                        "0%": { transform: "translateY(0px)" },
                        "50%": { transform: "translateY(-5px)" },
                        "100%": { transform: "translateY(0px)" },
                      },
                    }}
                  >
                    {/* Form Header */}
                    <Box sx={{ mb: 3, textAlign: "center" }}>
                      <Typography
                        sx={{
                          color: "#f4f1ea",
                          fontFamily: "'Cormorant Garamond', serif",
                          fontSize: { xs: "1.6rem", md: "2.2rem" },
                          fontWeight: 600,
                          mb: 0.5,
                        }}
                      >
                        Send a Message
                      </Typography>
                      <Typography
                        sx={{
                          color: "rgba(244,241,234,0.5)",
                          fontFamily: "sans-serif",
                          fontSize: "0.8rem",
                        }}
                      >
                        We'll get back to you within 24 hours
                      </Typography>
                      <Divider
                        sx={{
                          mt: 1.5,
                          borderColor: "rgba(192,160,128,0.2)",
                          width: 50,
                          mx: "auto",
                          animation: "expandWidth 2s ease-in-out infinite",
                          "@keyframes expandWidth": {
                            "0%": { width: 50 },
                            "50%": { width: 100 },
                            "100%": { width: 50 },
                          },
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
                        gap: 2.5,
                      }}
                    >
                      <TextField
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        placeholder="Your Name"
                        fullWidth
                        disabled={loading}
                        sx={{
                          "& .MuiInputBase-root": {
                            bgcolor: "rgba(255,255,255,0.08)",
                            color: "#f4f1ea",
                            borderRadius: 2,
                            fontSize: "0.9rem",
                            transition: "all 0.3s ease",
                            "& fieldset": { 
                              borderColor: "#c0a080",
                              borderWidth: "2px",
                            },
                            "&:hover fieldset": { 
                              borderColor: "#d4a050",
                              borderWidth: "2px",
                            },
                            "&.Mui-focused fieldset": { 
                              borderColor: "#c0a080",
                              borderWidth: "2px",
                              boxShadow: "0 0 20px rgba(192,160,128,0.2)",
                            },
                            "&:hover": {
                              transform: "scale(1.02)",
                              bgcolor: "rgba(255,255,255,0.12)",
                            },
                          },
                          "& .MuiInputBase-input::placeholder": {
                            color: "rgba(244,241,234,0.5)",
                          },
                        }}
                      />

                      <TextField
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        placeholder="Your Email"
                        type="email"
                        fullWidth
                        disabled={loading}
                        sx={{
                          "& .MuiInputBase-root": {
                            bgcolor: "rgba(255,255,255,0.08)",
                            color: "#f4f1ea",
                            borderRadius: 2,
                            fontSize: "0.9rem",
                            transition: "all 0.3s ease",
                            "& fieldset": { 
                              borderColor: "#c0a080",
                              borderWidth: "2px",
                            },
                            "&:hover fieldset": { 
                              borderColor: "#d4a050",
                              borderWidth: "2px",
                            },
                            "&.Mui-focused fieldset": { 
                              borderColor: "#c0a080",
                              borderWidth: "2px",
                              boxShadow: "0 0 20px rgba(192,160,128,0.2)",
                            },
                            "&:hover": {
                              transform: "scale(1.02)",
                              bgcolor: "rgba(255,255,255,0.12)",
                            },
                          },
                          "& .MuiInputBase-input::placeholder": {
                            color: "rgba(244,241,234,0.5)",
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
                            bgcolor: "rgba(255,255,255,0.08)",
                            color: "#f4f1ea",
                            borderRadius: 2,
                            fontSize: "0.9rem",
                            transition: "all 0.3s ease",
                            "& fieldset": { 
                              borderColor: "#c0a080",
                              borderWidth: "2px",
                            },
                            "&:hover fieldset": { 
                              borderColor: "#d4a050",
                              borderWidth: "2px",
                            },
                            "&.Mui-focused fieldset": { 
                              borderColor: "#c0a080",
                              borderWidth: "2px",
                              boxShadow: "0 0 20px rgba(192,160,128,0.2)",
                            },
                            "&:hover": {
                              transform: "scale(1.02)",
                              bgcolor: "rgba(255,255,255,0.12)",
                            },
                          },
                          "& .MuiInputBase-input::placeholder": {
                            color: "rgba(244,241,234,0.5)",
                          },
                        }}
                      />

                      <Button
                        type="submit"
                        disabled={loading}
                        sx={{
                          mt: 1,
                          bgcolor: "#c0a080",
                          color: "#fff",
                          py: 1.5,
                          borderRadius: 3,
                          fontWeight: 700,
                          textTransform: "none",
                          fontSize: "0.95rem",
                          letterSpacing: 1,
                          position: "relative",
                          overflow: "hidden",
                          transition: "all 0.3s ease",
                          border: "2px solid #c0a080",
                          "&:hover": {
                            bgcolor: "#d4a050",
                            transform: "translateY(-3px) scale(1.02)",
                            boxShadow: "0 10px 40px rgba(192,160,128,0.4)",
                            border: "2px solid #d4a050",
                          },
                          "&:active": {
                            transform: "scale(0.98)",
                          },
                          "&::before": {
                            content: '""',
                            position: "absolute",
                            top: 0,
                            left: "-100%",
                            width: "100%",
                            height: "100%",
                            background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)",
                            transition: "all 0.6s ease",
                          },
                          "&:hover::before": {
                            left: "100%",
                          },
                          "& .MuiButton-label": {
                            display: "flex",
                            alignItems: "center",
                            gap: 1,
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
                            <SendRoundedIcon sx={{ ml: 1, fontSize: "1.1rem" }} />
                          </>
                        )}
                      </Button>
                    </Box>

                    {/* Trust Badge */}
                    <Box
                      sx={{
                        mt: 3,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: 3,
                        flexWrap: "wrap",
                      }}
                    >
                      {["100% Confidential", "Response in 24h", "Free Consultation"].map((badge, index) => (
                        <Box
                          key={index}
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 0.5,
                            animation: `fadeInScale 0.6s ease-out ${index * 0.2}s both`,
                            "@keyframes fadeInScale": {
                              "0%": { opacity: 0, transform: "scale(0.8)" },
                              "100%": { opacity: 1, transform: "scale(1)" },
                            },
                          }}
                        >
                          <CheckCircleRoundedIcon
                            sx={{
                              fontSize: "0.7rem",
                              color: "#c0a080",
                              animation: "spin 10s linear infinite",
                              "@keyframes spin": {
                                "0%": { transform: "rotate(0deg)" },
                                "100%": { transform: "rotate(360deg)" },
                              },
                            }}
                          />
                          <Typography
                            sx={{
                              color: "rgba(244,241,234,0.4)",
                              fontFamily: "sans-serif",
                              fontSize: "0.65rem",
                              letterSpacing: 0.5,
                            }}
                          >
                            {badge}
                          </Typography>
                        </Box>
                      ))}
                    </Box>
                  </Box>
                </Slide>
              </Box>
            </Slide>
          </Box>
        </Container>

        {/* Footer Removed */}
      </Box>
    </Box>
  );
}