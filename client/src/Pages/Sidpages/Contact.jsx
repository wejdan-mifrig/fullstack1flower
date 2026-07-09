import React, { useState } from "react";
import { Box, Typography, TextField, Button, Slide } from "@mui/material";
import toast from "react-hot-toast";
import api from "../../api.js";

import Navbar from "../../Components/Navhero/Nav.jsx";
import Footer from "../../Components/Footer/footer.jsx";
import userVideo from "../../assets/video/userco.mp4";

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);

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

      setForm({ name: "", email: "", message: "" });
    } catch (err) {
      toast.error(err.response?.data?.error || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ minHeight: "100vh", position: "relative" }}>

    
      <video
        autoPlay
        loop
        muted
        playsInline
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          zIndex: 0,
        }}
      >
        <source src={userVideo} type="video/mp4" />
      </video>

    
      <Box
        sx={{
          position: "fixed",
          inset: 0,
          background: "rgba(0,0,0,0.45)",
          zIndex: 1,
        }}
      />

      <Box sx={{ position: "relative", zIndex: 2, minHeight: "100vh" }}>

        <Box sx={{ position: "relative", zIndex: 3 }}>
          <Navbar />
        </Box>

       
        <Box
          sx={{
            minHeight: "calc(100vh - 120px)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            px: 2,
            py: { xs: 10, md: 14 },
          }}
        >

          
         
            <Box
              sx={{
                width: "100%",
                maxWidth: 500,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                px: 4,
                py: 5,
                borderRadius: "20px",
                background: "rgba(255,255,255,0.08)",
                boxShadow: "0 15px 40px rgba(0,0,0,.35)",
              }}
            >
              <Typography
                sx={{
                  color: "#f4f1ea",
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: { xs: "2.6rem", md: "4rem" },
                  mb: 4,
                }}
              >
                Contact Us
              </Typography>

              <Box
                component="form"
                onSubmit={handleSubmit}
                sx={{ width: "100%", display: "flex", flexDirection: "column", gap: 2 }}
              >
                <TextField
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Your Name"
                  fullWidth
                  sx={{ bgcolor: "rgba(255,255,255,.92)", borderRadius: 2 }}
                />

                <TextField
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="Your Email"
                  fullWidth
                  sx={{ bgcolor: "rgba(255,255,255,.92)", borderRadius: 2 }}
                />

                <TextField
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Your Message"
                  multiline
                  rows={5}
                  fullWidth
                  sx={{ bgcolor: "rgba(255,255,255,.92)", borderRadius: 2 }}
                />

            <Button
  type="submit"
  disabled={loading}
  sx={{
    mt: 1,
    bgcolor: "#3e4a3a",
    color: "#f4f1ea",
    py: 1.7,
    borderRadius: 2,
    fontWeight: 600,
    textTransform: "none",
    "&:hover": {
      bgcolor: "#2f3a2f", 
      transform: "translateY(-2px)",
    },
  }}
>
  {loading ? "Sending..." : "Send Message"}
</Button>
              </Box>
            </Box>
         
        </Box>

        <Footer />
      </Box>
    </Box>
  );
}