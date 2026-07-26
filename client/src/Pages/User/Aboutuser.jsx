import NavbarUser from '../../Components/NavUserAdmin/Navuser.jsx';



import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Container,
  Card,
  CardContent,
  Dialog,
  DialogContent,
  IconButton,
  Button,
  Paper,
  Fade,
  Slide,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { motion } from "framer-motion";

import Footer from "../../Components/Footer/Footer.jsx";

import video1 from "../../assets/video/wedd.mp4";
import video2 from "../../assets/video/birth.mp4";
import video3 from "../../assets/video/nb.mp4";
import video4 from "../../assets/video/grad.mp4";
import heroVideo from "../../assets/video/con1.mp4";

import designer1 from "../../assets/images/designer1.jpg";
import designer2 from "../../assets/images/designer2.jpg";
import designer3 from "../../assets/images/designer3.jpg";
import designer4 from "../../assets/images/designer4.jpg";

import qrCode from "../../assets/images/qr.png";
import { FaGooglePlay, FaApple } from "react-icons/fa";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

// ============================================================
// 🎨 الألوان
// ============================================================
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

const designers = [
  {
    id: 1,
    name: "Sara",
    role: "Luxury Wedding Designer",
    desc: "Sara is one of our senior wedding designers with years of experience.",
    image: designer1,
    video: video1,
    project: { title: "Royal Wedding", page: "/events/wedding" },
  },
  {
    id: 2,
    name: "Salem",
    role: "Birthday Experience Designer",
    desc: "Salem specializes in designing joyful birthday experiences.",
    image: designer2,
    video: video2,
    project: { title: "Luxury Birthday", page: "/events/birthday" },
  },
  {
    id: 3,
    name: "Maya",
    role: "Newborn Aesthetic Stylist",
    desc: "Maya creates elegant newborn photography setups.",
    image: designer3,
    video: video3,
    project: { title: "Newborn Setup", page: "/events/newborn" },
  },
  {
    id: 4,
    name: "Raad",
    role: "Graduation & Events Designer",
    desc: "Raad specializes in graduation ceremonies and luxury events.",
    image: designer4,
    video: video4,
    project: { title: "Graduation", page: "/events/graduation" },
  },
];

export default function Aboutuser() {
  const [open, setOpen] = useState(null);
  const [fadeIn, setFadeIn] = useState(true);

  useEffect(() => {
    setFadeIn(true);
  }, []);

  const socialLinks = [
    { icon: <FacebookIcon />, label: "Facebook", color: "#1877F2" },
    { icon: <InstagramIcon />, label: "Instagram", color: "#E4405F" },
    { icon: <TwitterIcon />, label: "Twitter", color: "#1DA1F2" },
    { icon: <LinkedInIcon />, label: "LinkedIn", color: "#0A66C2" },
  ];

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: colors.primaryLight }}>

      {/* Fixed Background - White */}
      
      <Box
        sx={{
          height: "100vh",
          position: "relative",
          overflow: "hidden",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <video
          autoPlay
          loop
          muted
          playsInline
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        >
          <source src={heroVideo} type="video/mp4" />
        </video>

        <Box
          sx={{
            position: "absolute",
            inset: 0,
            backgroundColor: "rgba(0,0,0,0.3)",
          }}
        />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5 }}
          style={{ zIndex: 2 }}
        >
          <Typography sx={{ color: "#fff", fontSize: "1.5rem" }}>
          "𝐿𝑒𝑡’𝑠 𝑐𝑟𝑒𝑎𝑡𝑒 𝑦𝑜𝑢𝑟 𝑚𝑜𝑚𝑒𝑛𝑡 𝑡𝑜𝑔𝑒𝑡ℎ𝑒𝑟"
          </Typography>
        </motion.div>
      </Box>

        {/* Navbar فوق الفيديو */}
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            zIndex: 10,
          }}
        >
          <NavbarUser />
        </Box>
      

      {/* ============================================================
          📝 السكشن الثاني - ترتيب جديد (About Us + Designers)
          ============================================================ */}
      <Box
        sx={{
          position: "relative",
          zIndex: 1,
          bgcolor: "#ffffff",
          pt: { xs: 6, md: 8 },
          pb: { xs: 6, md: 8 },
        }}
      >
        <Container maxWidth="lg">
          <Slide direction="up" in={fadeIn} timeout={600}>
            <Box sx={{ width: "100%", display: "flex", flexDirection: "column", gap: 6 }}>

              {/* ============================================================
                  🎨 Meet Our Designers Section - FIRST
                  ============================================================ */}
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.8 }}
              >
                <Box>
                  <Box sx={{ textAlign: "center", mb: 5 }}>
                    <motion.div
                      initial={{ scale: 0.8, opacity: 0 }}
                      whileInView={{ scale: 1, opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6 }}
                    >
                      <Typography
                        sx={{
                          color: "#000000",
                          fontFamily: "'Cormorant Garamond', serif",
                          fontSize: { xs: "2.2rem", md: "3rem" },
                          fontWeight: 600,
                          mb: 1,
                        }}
                      >
                        Meet Our Creative Designers
                      </Typography>
                    </motion.div>
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: 60 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, delay: 0.2 }}
                      style={{
                        height: 2,
                        bgcolor: colors.gold,
                        mx: "auto",
                        borderRadius: 1,
                      }}
                    />
                    <Typography
                      sx={{
                        color: "rgba(0,0,0,0.6)",
                        fontFamily: "sans-serif",
                        fontSize: "0.9rem",
                        mt: 2,
                        maxWidth: "600px",
                        mx: "auto",
                      }}
                    >
                      Our team of talented designers brings your dreams to life with passion and creativity
                    </Typography>
                  </Box>

                  {designers.map((d, index) => (
                    <motion.div
                      key={d.id}
                      initial={{ opacity: 0, y: 40 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.2 }}
                      transition={{ duration: 0.6, delay: index * 0.15 }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: {
                            xs: "column",
                            md: index % 2 === 0 ? "row" : "row-reverse",
                          },
                          alignItems: "center",
                          justifyContent: "space-between",
                          gap: 4,
                          mb: 8,
                          p: { xs: 2, md: 4 },
                          bgcolor: index % 2 === 0 ? "rgba(139,0,0,0.03)" : "#ffffff",
                          borderRadius: 4,
                          border: "1px solid rgba(201,168,76,0.15)",
                        }}
                      >
                        {/* Designer Card */}
                        <Box
                          sx={{
                            flex: 1,
                            display: "flex",
                            justifyContent: "center",
                            width: "100%",
                          }}
                        >
                          <motion.div
                            initial={{ opacity: 0, x: index % 2 === 0 ? -60 : 60 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, amount: 0.3 }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                            whileHover={{ scale: 1.03 }}
                            style={{ width: "100%", maxWidth: 450 }}
                          >
                            <Card
                              sx={{
                                position: "relative",
                                height: { xs: 400, md: 500 },
                                borderRadius: 4,
                                overflow: "hidden",
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "flex-end",
                                boxShadow: "0 20px 40px rgba(0,0,0,0.15)",
                                border: "1px solid rgba(201,168,76,0.3)",
                                "& img": {
                                  transition: "0.7s",
                                  filter: "grayscale(80%)",
                                },
                                "&:hover img": {
                                  filter: "grayscale(0%)",
                                  transform: "scale(1.05)",
                                },
                              }}
                            >
                              <img
                                src={d.image}
                                alt={d.name}
                                style={{
                                  position: "absolute",
                                  width: "100%",
                                  height: "100%",
                                  objectFit: "cover",
                                }}
                              />

                              <Box
                                sx={{
                                  position: "absolute",
                                  inset: 0,
                                  background:
                                    "linear-gradient(to bottom, transparent 20%, rgba(139,0,0,0.8) 100%)",
                                }}
                              />

                              <CardContent
                                sx={{
                                  position: "relative",
                                  color: "#fff",
                                  textAlign: "center",
                                  pb: 3,
                                  zIndex: 2,
                                }}
                              >
                                <Typography
                                  sx={{
                                    fontSize: "1.8rem",
                                    fontWeight: "bold",
                                    fontFamily: "'Cormorant Garamond', serif",
                                  }}
                                >
                                  {d.name}
                                </Typography>

                                <Typography
                                  sx={{
                                    fontSize: "0.8rem",
                                    opacity: 0.9,
                                    mt: 0.5,
                                    color: colors.gold,
                                    letterSpacing: 1,
                                    fontWeight: 600,
                                  }}
                                >
                                  {d.role}
                                </Typography>

                                <Typography
                                  sx={{
                                    fontSize: "0.85rem",
                                    opacity: 0.85,
                                    mt: 1,
                                    maxWidth: "300px",
                                    mx: "auto",
                                  }}
                                >
                                  {d.desc}
                                </Typography>

                                <motion.div
                                  whileHover={{ scale: 1.05 }}
                                  whileTap={{ scale: 0.95 }}
                                >
                                  <Button
                                    onClick={() => setOpen(d)}
                                    sx={{
                                      mt: 2,
                                      color: "#fff",
                                      border: `2px solid ${colors.gold}`,
                                      borderRadius: "30px",
                                      px: 4,
                                      py: 1,
                                      transition: ".4s",
                                      textTransform: "none",
                                      fontWeight: 600,
                                      "&:hover": {
                                        bgcolor: colors.gold,
                                        color: "#000000",
                                        transform: "translateY(-2px)",
                                        boxShadow: `0 10px 30px rgba(201,168,76,0.3)`,
                                      },
                                    }}
                                  >
                                    View Project
                                    <ArrowForwardRoundedIcon sx={{ ml: 1, fontSize: "1rem" }} />
                                  </Button>
                                </motion.div>
                              </CardContent>
                            </Card>
                          </motion.div>
                        </Box>

                        {/* Designer Info */}
                        <motion.div
                          initial={{ opacity: 0, x: index % 2 === 0 ? 60 : -60 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true, amount: 0.3 }}
                          transition={{ duration: 0.9, delay: 0.2 }}
                          style={{ flex: 1, width: "100%" }}
                        >
                          <Box sx={{ px: { xs: 1, md: 3 } }}>
                            <Typography
                              sx={{
                                fontSize: { xs: "1.8rem", md: "2.4rem" },
                                fontWeight: "bold",
                                color: colors.primary,
                                fontFamily: "'Cormorant Garamond', serif",
                                mb: 2,
                              }}
                            >
                              About {d.name}
                            </Typography>

                            <Typography
                              sx={{
                                color: "rgba(0,0,0,0.7)",
                                fontSize: "1rem",
                                lineHeight: 2,
                                fontFamily: "sans-serif",
                              }}
                            >
                              {d.desc}
                              <br />
                              <br />
                              We craft unforgettable luxury experiences where every flower,
                              every light, every texture, and every detail tells a beautiful
                              story. Our designers transform dreams into elegant celebrations
                              filled with emotion, creativity, and timeless beauty.
                            </Typography>

                            <motion.div
                              initial={{ opacity: 0 }}
                              whileInView={{ opacity: 1 }}
                              viewport={{ once: true }}
                              transition={{ duration: 0.6, delay: 0.5 }}
                            >
                              <Box
                                sx={{
                                  mt: 3,
                                  display: "flex",
                                  gap: 2,
                                  flexWrap: "wrap",
                                }}
                              >
                                {socialLinks.map((social, idx) => (
                                  <motion.div
                                    key={idx}
                                    whileHover={{ scale: 1.1, rotate: 5 }}
                                    whileTap={{ scale: 0.9 }}
                                  >
                                    <IconButton
                                      sx={{
                                        bgcolor: colors.primary,
                                        color: "#ffffff",
                                        border: "1px solid rgba(201,168,76,0.3)",
                                        transition: "all 0.3s ease",
                                        padding: "10px",
                                        "&:hover": {
                                          bgcolor: colors.gold,
                                          color: "#000000",
                                          borderColor: colors.gold,
                                          transform: "translateY(-3px)",
                                        },
                                      }}
                                    >
                                      {social.icon}
                                    </IconButton>
                                  </motion.div>
                                ))}
                              </Box>
                            </motion.div>
                          </Box>
                        </motion.div>
                      </Box>
                    </motion.div>
                  ))}
                </Box>
              </motion.div>

              {/* ============================================================
                  🏷️ About Us Section - SECOND (بعد المصممين)
                  ============================================================ */}
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              >
                <Box sx={{ mt: 4 }}>
                  <Box sx={{ textAlign: "center", mb: 5 }}>
                    <motion.div
                      initial={{ scale: 0.8, opacity: 0 }}
                      whileInView={{ scale: 1, opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: 0.2 }}
                    >
                      <Typography
                        sx={{
                          color: "#000000",
                          fontFamily: "'Cormorant Garamond', serif",
                          fontSize: { xs: "2.2rem", md: "3.2rem" },
                          fontWeight: 600,
                          mb: 1,
                        }}
                      >
                        About Flora
                      </Typography>
                    </motion.div>
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: 60 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, delay: 0.4 }}
                      style={{
                        height: 2,
                        bgcolor: colors.gold,
                        mx: "auto",
                        borderRadius: 1,
                      }}
                    />
                  </Box>

                  <Box
                    sx={{
                      display: "grid",
                      gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
                      gap: 4,
                    }}
                  >
                    <motion.div
                      initial={{ opacity: 0, x: -60 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, amount: 0.3 }}
                      transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
                    >
                      <Box>
                        <Typography
                          sx={{
                            color: "rgba(0,0,0,0.8)",
                            fontFamily: "sans-serif",
                            fontSize: "1rem",
                            lineHeight: 2,
                            mb: 2,
                          }}
                        >
                          Welcome to <strong>Flora</strong>, where we believe that every
                          moment deserves to be celebrated with beauty and elegance.
                          Our passion for floral design and event decoration has made
                          us one of the most trusted names in the industry.
                        </Typography>
                        <Typography
                          sx={{
                            color: "rgba(0,0,0,0.8)",
                            fontFamily: "sans-serif",
                            fontSize: "1rem",
                            lineHeight: 2,
                          }}
                        >
                          From intimate gatherings to grand celebrations, we bring
                          your vision to life with creativity, attention to detail,
                          and a commitment to excellence that sets us apart.
                        </Typography>
                      </Box>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, x: 60 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, amount: 0.3 }}
                      transition={{ duration: 0.8, ease: "easeOut", delay: 0.5 }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          gap: 1.5,
                        }}
                      >
                        {[
                          "Premium Quality Flowers",
                          "Creative Event Design",
                          "Professional Team",
                          "Customer Satisfaction Guaranteed",
                          "Timely Delivery",
                        ].map((item, index) => (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                            whileHover={{
                              scale: 1.02,
                              boxShadow: "0 8px 25px rgba(201,168,76,0.2)",
                              transition: { duration: 0.2 },
                            }}
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: 2,
                              bgcolor: "rgba(139,0,0,0.05)",
                              padding: 12,
                              borderRadius: 8,
                              border: "1px solid rgba(201,168,76,0.2)",
                            }}
                          >
                            <CheckCircleRoundedIcon
                              sx={{
                                fontSize: "1.2rem",
                                color: colors.gold,
                              }}
                            />
                            <Typography
                              sx={{
                                color: "rgba(0,0,0,0.8)",
                                fontFamily: "sans-serif",
                                fontSize: "0.9rem",
                                fontWeight: 500,
                              }}
                            >
                              {item}
                            </Typography>
                          </motion.div>
                        ))}
                      </Box>
                    </motion.div>
                  </Box>
                </Box>
              </motion.div>

              {/* ============================================================
                  📱 App Download Section
                  ============================================================ */}
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.8 }}
              >
                <Paper
                  elevation={0}
                  sx={{
                    bgcolor: colors.primary,
                    borderRadius: "20px",
                    p: { xs: 4, md: 6 },
                    border: "1px solid rgba(201,168,76,0.3)",
                    mt: 4,
                  }}
                >
                  <Box
                    sx={{
                      display: "grid",
                      gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
                      gap: 4,
                      alignItems: "center",
                    }}
                  >
                    <Box>
                      <Typography
                        sx={{
                          color: "#ffffff",
                          fontFamily: "'Cormorant Garamond', serif",
                          fontSize: { xs: "2rem", md: "3rem" },
                          fontWeight: 600,
                          mb: 2,
                        }}
                      >
                        Download Our App
                      </Typography>

                      <Typography
                        sx={{
                          color: "rgba(255,255,255,0.8)",
                          lineHeight: 1.9,
                          fontSize: "0.95rem",
                          mb: 3,
                        }}
                      >
                        Enjoy a seamless floral experience right from your mobile phone.
                        Browse our luxury flower collections, discover elegant wedding
                        decorations, receive exclusive offers, and place your orders
                        anytime with just a few taps.
                      </Typography>

                      <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
                        <motion.div
                          whileHover={{ scale: 1.05, boxShadow: "0 10px 30px rgba(201,168,76,0.4)" }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              gap: 1.5,
                              bgcolor: "#ffffff",
                              color: "#000000",
                              px: 3,
                              py: 1.5,
                              borderRadius: "14px",
                              cursor: "pointer",
                              transition: ".3s",
                              "&:hover": { bgcolor: colors.gold },
                            }}
                          >
                            <FaGooglePlay size={22} />
                            <Typography sx={{ fontWeight: 600, fontFamily: "sans-serif" }}>
                              Google Play
                            </Typography>
                          </Box>
                        </motion.div>

                        <motion.div
                          whileHover={{ scale: 1.05, boxShadow: "0 10px 30px rgba(201,168,76,0.4)" }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              gap: 1.5,
                              bgcolor: "#ffffff",
                              color: "#000000",
                              px: 3,
                              py: 1.5,
                              borderRadius: "14px",
                              cursor: "pointer",
                              transition: ".3s",
                              "&:hover": { bgcolor: colors.gold },
                            }}
                          >
                            <FaApple size={22} />
                            <Typography sx={{ fontWeight: 600, fontFamily: "sans-serif" }}>
                              App Store
                            </Typography>
                          </Box>
                        </motion.div>
                      </Box>
                    </Box>

                    <Box sx={{ display: "flex", justifyContent: "center" }}>
                  
                        <Box
                          sx={{
                            bgcolor: "#ffffff",
                            borderRadius: "20px",
                            p: 3,
                            textAlign: "center",
                            boxShadow: "0 20px 40px rgba(0,0,0,0.2)",
                            maxWidth: 300,
                          }}
                        >
                          <Box
                            component="img"
                            src={qrCode}
                            alt="QR Code"
                            sx={{
                              width: "100%",
                              maxWidth: 200,
                              mx: "auto",
                              display: "block",
                              borderRadius: "12px",
                            }}
                          />

                          <Typography
                            sx={{
                              mt: 2,
                              color: colors.primary,
                              fontWeight: 700,
                              fontSize: "1.2rem",
                              fontFamily: "'Cormorant Garamond', serif",
                            }}
                          >
                            Scan to Download
                          </Typography>

                          <Typography
                            sx={{
                              mt: 1,
                              color: "rgba(0,0,0,0.6)",
                              fontSize: "0.85rem",
                              lineHeight: 1.6,
                            }}
                          >
                            Scan the QR code using your phone camera to download our app
                          </Typography>
                        </Box>
                    
                    </Box>
                  </Box>
                </Paper>
              </motion.div>

              {/* ============================================================
                  📍 Location Section
                  ============================================================ */}
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.8 }}
              >
                <Box sx={{ mt: 2 }}>
                  <Box sx={{ textAlign: "center", mb: 4 }}>
                    <motion.div
                      initial={{ scale: 0.8, opacity: 0 }}
                      whileInView={{ scale: 1, opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6 }}
                    >
                      <Typography
                        sx={{
                          color: "#000000",
                          fontFamily: "'Cormorant Garamond', serif",
                          fontSize: { xs: "2rem", md: "2.8rem" },
                          fontWeight: 600,
                          mb: 1,
                        }}
                      >
                        Visit Us
                      </Typography>
                    </motion.div>
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: 60 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, delay: 0.2 }}
                      style={{
                        height: 2,
                        bgcolor: colors.gold,
                        mx: "auto",
                        borderRadius: 1,
                      }}
                    />
                    <Typography
                      sx={{
                        color: "rgba(0,0,0,0.6)",
                        fontFamily: "sans-serif",
                        fontSize: "0.9rem",
                        mt: 2,
                        maxWidth: "600px",
                        mx: "auto",
                      }}
                    >
                      Located near <strong>Irbid City Center</strong>, our flower studio is
                      easy to reach and surrounded by shops, cafés, and everyday conveniences.
                    </Typography>
                  </Box>

                  <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    whileHover={{ scale: 1.01 }}
                  >
                    <Box
                      sx={{
                        borderRadius: "20px",
                        overflow: "hidden",
                        height: { xs: "300px", md: "400px" },
                        boxShadow: "0 20px 40px rgba(0,0,0,0.15)",
                        border: "2px solid rgba(201,168,76,0.2)",
                      }}
                    >
                      <iframe
                        title="Irbid City Center"
                        src="https://maps.google.com/maps?q=Irbid%20City%20Center&t=&z=15&ie=UTF8&iwloc=&output=embed"
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        loading="lazy"
                        allowFullScreen
                      />
                    </Box>
                  </motion.div>
                </Box>
              </motion.div>

            </Box>
          </Slide>
        </Container>
      </Box>

      {/* ============================================================
          🎬 Designer Project Dialog
          ============================================================ */}
      <Dialog
        open={Boolean(open)}
        onClose={() => setOpen(null)}
        fullWidth
        maxWidth="md"
        PaperProps={{
          sx: {
            borderRadius: "20px",
            overflow: "hidden",
          },
        }}
      >
        {open && (
          <Box sx={{ bgcolor: "#ffffff" }}>
            <Box sx={{ display: "flex", justifyContent: "flex-end", p: 1 }}>
              <IconButton onClick={() => setOpen(null)}>
                <CloseIcon />
              </IconButton>
            </Box>

            <DialogContent sx={{ pt: 0 }}>
              <Typography
                sx={{
                  fontSize: "2rem",
                  fontWeight: "bold",
                  mb: 2,
                  color: colors.primary,
                  fontFamily: "'Cormorant Garamond', serif",
                  textAlign: "center",
                }}
              >
                {open.project.title}
              </Typography>

              <video
                src={open.video}
                controls
                style={{
                  width: "100%",
                  borderRadius: "12px",
                }}
              />

              <Button
                href={open.project.page}
                variant="contained"
                sx={{
                  mt: 3,
                  bgcolor: colors.primary,
                  color: "#ffffff",
                  px: 4,
                  py: 1.5,
                  borderRadius: "30px",
                  textTransform: "none",
                  fontWeight: 600,
                  width: "100%",
                  "&:hover": {
                    bgcolor: colors.darkRed,
                    boxShadow: `0 10px 30px rgba(139,0,0,0.3)`,
                  },
                }}
              >
                View More
                <ArrowForwardRoundedIcon sx={{ ml: 1 }} />
              </Button>
            </DialogContent>
          </Box>
        )}
      </Dialog>

      <Footer />
    </Box>
  );
}