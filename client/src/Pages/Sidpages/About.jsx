import React, { useState } from "react";
import {
  Box,
  Typography,
  Container,
  Grid,
  Card,
  CardContent,
  Dialog,
  DialogContent,
  IconButton,
  Button,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { motion } from "framer-motion";
import BusinessIcon from "@mui/icons-material/Business";
import Navbar from "../../Components/Navhero/Nav.jsx";
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


const colors = {
  primaryGreen: "#3e4a3a",
  deepGreen: "#2a332a",
  warmIvory: "#f9f7f2",
  gold: "#b99456",
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

export default function About() {
  const [open, setOpen] = useState(null);

  return (
    <Box sx={{ backgroundColor: colors.warmIvory, minHeight: "100vh" }}>
      <Navbar />

  
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

   
     

    
<Box sx={{ py: 12 }}>
  <Container>

    <motion.div
      initial={{ opacity: 0, y: -50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
    >
      <Typography
        sx={{
          fontSize: { xs: "2.2rem", md: "3rem" },
          textAlign: "center",
          color: colors.primaryGreen,
          fontWeight: "bold",
          mb: 8,
        }}
      >
        Meet Our Creative Designers
      </Typography>
    </motion.div>

    {designers.map((d, index) => (
      <Box
        key={d.id}
        sx={{
          display: "flex",
          flexDirection: {
            xs: "column",
            md: index % 2 === 0 ? "row" : "row-reverse",
          },
          alignItems: "center",
          justifyContent: "space-between",
          gap: 6,
          mb: 12,
        }}
      >
       
        <Box
          sx={{
            flex: 1,
            display: "flex",
            justifyContent: "center",
          }}
        >
          <motion.div
            initial={{
              opacity: 0,
              x: index % 2 === 0 ? -80 : 80,
            }}
            whileInView={{
              opacity: 1,
              x: 0,
            }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{
              duration: 0.8,
              ease: "easeOut",
            }}
            whileHover={{ scale: 1.02 }}
            style={{
              width: "100%",
              maxWidth: 520,
            }}
          >
            <Card
              sx={{
                position: "relative",
                height: { xs: 500, md: 720 },
                borderRadius: 4,
                overflow: "hidden",
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-end",
                boxShadow: "0 20px 40px rgba(0,0,0,.15)",

                "& img": {
                  transition: "0.7s",
                  filter: "grayscale(100%)",
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
                    "linear-gradient(to bottom, transparent, rgba(0,0,0,.75))",
                }}
              />

              <CardContent
                sx={{
                  position: "relative",
                  color: "#fff",
                  textAlign: "center",
                  pb: 4,
                }}
              >
                <Typography
                  sx={{
                    fontSize: "2rem",
                    fontWeight: "bold",
                  }}
                >
                  {d.name}
                </Typography>

                <Typography
                  sx={{
                    fontSize: "1rem",
                    opacity: 0.9,
                    mt: 1,
                  }}
                >
                  {d.desc}
                </Typography>

                <Button
                  onClick={() => setOpen(d)}
                  sx={{
                    mt: 3,
                    color: "#fff",
                    border: "1px solid #fff",
                    borderRadius: "30px",
                    px: 4,
                    py: 1.2,
                    transition: ".4s",

                    "&:hover": {
                      bgcolor: "#fff",
                      color: colors.primaryGreen,
                    },
                  }}
                >
                  View Project
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </Box>

     
        <motion.div
          initial={{
            opacity: 0,
            x: index % 2 === 0 ? 80 : -80,
          }}
          whileInView={{
            opacity: 1,
            x: 0,
          }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{
            duration: 0.9,
            delay: 0.2,
          }}
          style={{
            flex: 1,
          }}
        >
          <Box sx={{ px: { xs: 1, md: 3 } }}>
            <Typography
              sx={{
                fontSize: { xs: "2rem", md: "2.6rem" },
                fontWeight: "bold",
                color: colors.primaryGreen,
                mb: 3,
              }}
            >
              About {d.name}
            </Typography>

            <Typography
              sx={{
                color: "#555",
                fontSize: "1.1rem",
                lineHeight: 2,
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
          </Box>
        </motion.div>
      </Box>
    ))}
  </Container>
</Box>



<Dialog
  open={Boolean(open)}
  onClose={() => setOpen(null)}
  fullWidth
  maxWidth="md"
>
  {open && (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
        <IconButton onClick={() => setOpen(null)}>
          <CloseIcon />
        </IconButton>
      </Box>

      <DialogContent>
        <Typography
          sx={{
            fontSize: "2rem",
            fontWeight: "bold",
            mb: 3,
            color: colors.primaryGreen,
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
            bgcolor: colors.primaryGreen,
            "&:hover": {
              bgcolor: "#355C4B",
            },
          }}
        >
          View More
        </Button>
      </DialogContent>
    </Box>
  )}
</Dialog>

<Box
  sx={{
    bgcolor: "#f4f1ea",
    py: { xs: 10, md: 16 },
    px: 2,
  }}
>
  <Box
    sx={{
      maxWidth: "1200px",
      mx: "auto",
      display: "grid",
      gridTemplateColumns: {
        xs: "1fr",
        md: "1.3fr 1fr",
      },
      gap: { xs: 6, md: 8 },
      alignItems: "center",
    }}
  >
   
    <motion.div
      initial={{ opacity: 0, x: -40 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
    >
      <Box
        sx={{
          textAlign: { xs: "center", md: "left" },
        }}
      >
        <Typography
          sx={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: {
              xs: "2.6rem",
              sm: "3.2rem",
              md: "4.3rem",
            },
            color: "#3e4a3a",
            lineHeight: 1.1,
            mb: 2,
          }}
        >
          Download Our App
        </Typography>

        <Typography
          sx={{
            color: "#5c574e",
            lineHeight: 1.9,
            fontSize: "1rem",
            maxWidth: { xs: "100%", md: "540px" },
            mx: { xs: "auto", md: 0 },
            mb: 5,
          }}
        >
          Enjoy a seamless floral experience right from your mobile phone.
          Browse our luxury flower collections, discover elegant wedding
          decorations, receive exclusive offers, and place your orders
          anytime with just a few taps.
        </Typography>

        <Box
          sx={{
            display: "flex",
            justifyContent: {
              xs: "center",
              md: "flex-start",
            },
            gap: 2,
            flexWrap: "wrap",
          }}
        >
        
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1.5,
              bgcolor: "#3e4a3a",
              color: "#fff",
              px: 3,
              py: 1.5,
              borderRadius: "14px",
              cursor: "pointer",
              transition: ".3s",
              "&:hover": {
                bgcolor: "#2d372b",
                transform: "translateY(-4px)",
              },
            }}
          >
            <FaGooglePlay size={22} />
            <Typography sx={{ fontWeight: 600 }}>
              Google Play
            </Typography>
          </Box>

        
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1.5,
              bgcolor: "#3e4a3a",
              color: "#fff",
              px: 3,
              py: 1.5,
              borderRadius: "14px",
              cursor: "pointer",
              transition: ".3s",
              "&:hover": {
                bgcolor: "#2d372b",
                transform: "translateY(-4px)",
              },
            }}
          >
            <FaApple size={22} />
            <Typography sx={{ fontWeight: 600 }}>
              App Store
            </Typography>
          </Box>
        </Box>
      </Box>
    </motion.div>

    
    <motion.div
      initial={{ opacity: 0, x: 40 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            bgcolor: "#3e4a3a",
            borderRadius: "28px",
            p: { xs: 3, md: 4 },
            width: {
              xs: "280px",
              sm: "320px",
              md: "350px",
            },
            textAlign: "center",
            boxShadow: "0 25px 50px rgba(0,0,0,.15)",
          }}
        >
          <Box
            component="img"
            src={qrCode}
            alt="QR Code"
            sx={{
              width: {
                xs: 180,
                sm: 210,
                md: 240,
              },
              height: {
                xs: 180,
                sm: 210,
                md: 240,
              },
              mx: "auto",
              display: "block",
              bgcolor: "#fff",
              p: 1.5,
              borderRadius: "16px",
            }}
          />

          <Typography
            sx={{
              mt: 3,
              color: "#f4f1ea",
              fontWeight: 700,
              fontSize: "1.3rem",
            }}
          >
            Scan to Download
          </Typography>

          <Typography
            sx={{
              mt: 1,
              color: "#d6d1c4",
              fontSize: ".95rem",
              lineHeight: 1.8,
            }}
          >
            Scan the QR code using your phone camera to download our app and
            enjoy a premium floral shopping experience wherever you are.
          </Typography>
        </Box>
      </Box>
    </motion.div>
  </Box>
</Box>

<Box
  sx={{
    bgcolor: "#3e4a3a",
    py: { xs: 10, md: 16 },
    px: 2,
  }}
>
  <Box sx={{ maxWidth: "1200px", mx: "auto" }}>
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
    >
      <Typography
        sx={{
          textAlign: "center",
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: { xs: "2.3rem", md: "3.8rem" },
          color: "#f4f1ea",
          mb: 2,
        }}
      >
        Visit Us
      </Typography>

      <Typography
        sx={{
          textAlign: "center",
          color: "#d6d1c4",
          maxWidth: "700px",
          mx: "auto",
          lineHeight: 1.8,
          mb: 8,
        }}
      >
        Located near <strong>Irbid City Center</strong>, one of the city's most
        vibrant destinations, our flower studio is easy to reach and surrounded
        by shops, cafés, and everyday conveniences. Whether you're looking for
        a handcrafted bouquet or elegant floral arrangements for a special
        occasion, we're always delighted to welcome you.
      </Typography>
    </motion.div>

    <Box
      sx={{
        borderRadius: "18px",
        overflow: "hidden",
        height: { xs: "350px", md: "550px" },
        boxShadow: "0 20px 40px rgba(0,0,0,.25)",
        border: "2px solid rgba(255,255,255,.08)",
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
  </Box>
</Box>

      <Footer />
    </Box>
  );
}