import React from "react";
import { Box, Typography } from "@mui/material";
import { motion } from "framer-motion";
import {
  FaLeaf,
  FaHeart,
  FaTruck,
  FaStar,
} from "react-icons/fa";
import Footer from "../../Components/Footer/Footer.jsx";
import Navbar from "../../Components/Navhero/Nav.jsx";
import heroVideo from "../../assets/video/Hero.mp4";
import herooVideo from "../../assets/video/Hero2.mp4";
import heroavideo from "../../assets/video/HERO3.MP4";
import herobvideo from "../../assets/video/HERO4.MP4";
import herocvideo from "../../assets/video/HERO5.MP4";
import herodvideo from "../../assets/video/HERO6.MP4";
import heero1 from "../../assets/video/heero1.mp4";
import heero2 from "../../assets/video/heero2.mp4";
import heero3 from "../../assets/video/heero3.mp4";
import heero4 from "../../assets/video/heero4.mp4";

const textVariant = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

export default function Hero() {
  return (
    <Box>
      {/* HERO SECTION — unchanged as requested */}
      <Box
        sx={{
          position: "relative",
          height: "100vh",
          width: "100%",
          bgcolor: "#1c1b18",
        }}
      >
        <video
          autoPlay
          loop
          muted
          playsInline
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            zIndex: 0,
          }}
        >
          <source src={heroVideo} type="video/mp4" />
        </video>
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            zIndex: 1,
            background: "rgba(0,0,0,0.4)",
          }}
        />
        <Box
          sx={{
            position: "relative",
            zIndex: 2,
            height: "100%",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Navbar />
          <Box
            sx={{
              flex: 1,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Typography
              sx={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "1rem",
                color: "#f4f1ea",
                letterSpacing: "0.3em",
                textTransform: "uppercase",
              }}
            >
              Nature's poetry, delivered.
            </Typography>
          </Box>
        </Box>
      </Box>

      {/* SECTION 1: Brand Story */}
      <Box
        sx={{
          bgcolor: "#f4f1ea",
          py: { xs: 10, md: 16 },
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Box sx={{ maxWidth: "800px", textAlign: "center", px: 3 }}>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            variants={textVariant}
          >
            <Typography
              sx={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: { xs: "2rem", md: "3.5rem" },
                color: "#1c1b18",
                mb: 3,
              }}
            >
              Every bloom tells a story worth keeping.
            </Typography>
          </motion.div>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            variants={textVariant}
          >
            <Typography sx={{ color: "#5c574e", lineHeight: 1.8 }}>
              We source rare seasonal flowers, arranging each with care to carry
              the quiet beauty of nature into your space.
            </Typography>
          </motion.div>
        </Box>
      </Box>

      {/* SECTION 2: Full-width video */}
      <Box
        sx={{
          height: "60vh",
          width: "100%",
          overflow: "hidden",
          position: "relative",
        }}
      >
        <video
          autoPlay
          loop
          muted
          playsInline
          style={{ width: "100%", height: "60vh", objectFit: "cover" }}
        >
          <source src={herooVideo} type="video/mp4" />
        </video>
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            background: "rgba(28,27,24,0.3)",
          }}
        />
      </Box>

      {/* SECTION 3: Stats with Icons */}
      <Box
        sx={{
          bgcolor: "#f4f1ea",
          py: { xs: 8, md: 15 },
          width: "100%",
          display: "flex",
          justifyContent: "center",
          px: 2,
        }}
      >
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "repeat(2, 1fr)", md: "repeat(4, 1fr)" },
            gap: { xs: 4, md: 8 },
            maxWidth: "1000px",
            width: "100%",
          }}
        >
          {[
            { value: "10K+", label: "Happy Customers", icon: <FaHeart /> },
            { value: "50+", label: "Flower Varieties", icon: <FaLeaf /> },
            { value: "24H", label: "Fresh Delivery", icon: <FaTruck /> },
            { value: "100%", label: "Natural Flowers", icon: <FaStar /> },
          ].map((item, index) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
            >
              <Box sx={{ textAlign: "center" }}>
                <Box sx={{ fontSize: "2.2rem", color: "#3e4a3a", mb: 1 }}>
                  {item.icon}
                </Box>
                <Typography
                  sx={{
                    color: "#1c1b18",
                    fontSize: { xs: "1.8rem", md: "3rem" },
                    fontWeight: 600,
                    mb: 0.5,
                    fontFamily: "'Cormorant Garamond', serif",
                  }}
                >
                  {item.value}
                </Typography>
                <Typography
                  sx={{
                    color: "#5c574e",
                    letterSpacing: 2,
                    textTransform: "uppercase",
                    fontSize: ".7rem",
                    fontWeight: 500,
                  }}
                >
                  {item.label}
                </Typography>
              </Box>
            </motion.div>
          ))}
        </Box>
      </Box>

      {/* SECTION 4: Curated Collections (video cards) */}
      <Box
        sx={{
          bgcolor: "#3e4a3a",
          py: { xs: 10, md: 16 },
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          px: 2,
        }}
      >
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          variants={textVariant}
        >
          <Typography
            sx={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: { xs: "2rem", md: "3.5rem" },
              color: "#f4f1ea",
              mb: { xs: 6, md: 10 },
              textAlign: "center",
            }}
          >
            Curated Collections
          </Typography>
        </motion.div>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              sm: "repeat(2, 1fr)",
              md: "repeat(4, 1fr)",
            },
            gap: { xs: 4, md: 4 },
            maxWidth: "1200px",
            width: "100%",
            justifyContent: "center",
          }}
        >
          {[
            {
              title: "Spring Bloom",
              desc: "Soft pastel tones for tender moments.",
              video: heroavideo,
            },
            {
              title: "Garden Romance",
              desc: "Classic roses with timeless elegance.",
              video: herobvideo,
            },
            {
              title: "Wild Meadow",
              desc: "Untamed wildflowers, naturally arranged.",
              video: herocvideo,
            },
            {
              title: "Evergreen",
              desc: "Lush greenery for lasting beauty.",
              video: herodvideo,
            },
          ].map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
            >
              <Box
                sx={{
                  position: "relative",
                  borderRadius: "4px",
                  overflow: "hidden",
                  height: "320px",
                  display: "flex",
                  alignItems: "flex-end",
                }}
              >
                <video
                  autoPlay
                  loop
                  muted
                  playsInline
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    zIndex: 0,
                  }}
                >
                  <source src={item.video} type="video/mp4" />
                </video>
                <Box
                  sx={{
                    position: "absolute",
                    inset: 0,
                    background:
                      "linear-gradient(to top, rgba(28,27,24,0.75), rgba(28,27,24,0.1))",
                    zIndex: 1,
                  }}
                />
                <Box sx={{ position: "relative", zIndex: 2, p: 3 }}>
                  <Typography
                    sx={{
                      fontFamily: "'Cormorant Garamond', serif",
                      fontSize: "1.6rem",
                      color: "#f4f1ea",
                      mb: 1,
                    }}
                  >
                    {item.title}
                  </Typography>
                  <Typography
                    sx={{
                      color: "#e5e1d8",
                      fontSize: ".85rem",
                      lineHeight: 1.7,
                    }}
                  >
                    {item.desc}
                  </Typography>
                </Box>
              </Box>
            </motion.div>
          ))}
        </Box>
      </Box>

      {/* SECTION 5: Testimonial */}
      <Box
        sx={{
          bgcolor: "#f4f1ea",
          py: { xs: 10, md: 16 },
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Box sx={{ maxWidth: "750px", textAlign: "center", px: 3 }}>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            variants={textVariant}
          >
            <Typography
              sx={{
                color: "#6c665c",
                letterSpacing: "0.25em",
                textTransform: "uppercase",
                fontSize: ".75rem",
                mb: 2,
                fontWeight: 500,
              }}
            >
              Words of Appreciation
            </Typography>
            <Typography
              sx={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: { xs: "2.2rem", md: "3.5rem" },
                color: "#1c1b18",
                letterSpacing: "0.02em",
                mb: 4,
                lineHeight: 1.15,
              }}
            >
              Loved by Our Patrons
            </Typography>
          </motion.div>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            variants={textVariant}
          >
            <Typography
              sx={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: { xs: "1.6rem", md: "2.4rem" },
                color: "#1c1b18",
                mb: 3,
                fontStyle: "italic",
                lineHeight: 1.5,
              }}
            >
              "Each arrangement felt like a piece of art — fresh, fragrant, and
              unforgettable."
            </Typography>
          </motion.div>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            variants={textVariant}
          >
            <Typography
              sx={{
                color: "#5c574e",
                letterSpacing: 3,
                textTransform: "uppercase",
                fontSize: ".75rem",
              }}
            >
              — Wijdan.AJ, Loyal Customer
            </Typography>
          </motion.div>
        </Box>
      </Box>

      {/* SECTION 6: Wedding & Bridal Bouquets — Centered Header Layout */}
      <Box
        sx={{
          bgcolor: "#f4f1ea",
          py: { xs: 12, md: 20 },
          display: "flex",
          justifyContent: "center",
          px: 3,
        }}
      >
        <Box sx={{ maxWidth: "1250px", width: "100%" }}>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            variants={textVariant}
          >
            <Box
              sx={{
                textAlign: "center",
                mb: { xs: 8, md: 12 },
                borderBottom: "1px solid rgba(28,27,24,0.12)",
                pb: 5,
              }}
            >
              <Typography
                sx={{
                  color: "#5c574e",
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  fontSize: ".75rem",
                  mb: 1.5,
                  fontWeight: 500,
                }}
              >
                Exclusive Collection
              </Typography>
              <Typography
                sx={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: { xs: "2.2rem", md: "3.8rem" },
                  color: "#1c1b18",
                  lineHeight: 1.1,
                }}
              >
                Wedding & Bridal Bouquets
              </Typography>
            </Box>
          </motion.div>

          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", lg: "1.1fr 0.9fr" },
              gap: { xs: 6, lg: 10 },
              alignItems: "center",
            }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.9 }}
            >
              <Box
                sx={{
                  position: "relative",
                  borderRadius: "12px",
                  overflow: "hidden",
                  height: { xs: "380px", md: "520px" },
                  boxShadow: "0 25px 50px rgba(0,0,0,0.12)",
                }}
              >
                <video
                  autoPlay
                  loop
                  muted
                  playsInline
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                >
                  <source src={heero1} type="video/mp4" />
                </video>
                <Box
                  sx={{
                    position: "absolute",
                    inset: 0,
                    background:
                      "linear-gradient(to top, rgba(28,27,24,0.4), transparent)",
                  }}
                />
              </Box>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.9 }}
            >
              <Box>
                <Typography
                  sx={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: { xs: "1.8rem", md: "2.5rem" },
                    color: "#1c1b18",
                    mb: 3,
                    lineHeight: 1.2,
                  }}
                >
                  Timeless Elegance for Your Special Day
                </Typography>
                <Typography sx={{ color: "#5c574e", lineHeight: 1.9, mb: 4, fontSize: "1.02rem" }}>
                  From intimate elopements to grand celebrations, we craft bespoke
                  bridal bouquets that capture the essence of your love story.
                  Each petal, every stem is meticulously styled to make your moment
                  truly unforgettable.
                </Typography>

                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 2,
                  }}
                >
                  {[
                    { title: "Classic Round", desc: "Symmetrical perfection featuring lush traditional garden roses." },
                    { title: "Cascading", desc: "A dramatic, fluid waterfall style that brings effortless grace." },
                    { title: "Wild & Free", desc: "Unstructured, bohemian arrangements with organic botanical flow." },
                  ].map((style, index) => (
                    <Box
                      key={style.title}
                      sx={{
                        bgcolor: "#eae5dc",
                        p: 2.5,
                        borderRadius: "8px",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        borderLeft: "3px solid #3e4a3a",
                        transition: "all 0.3s ease",
                        "&:hover": {
                          bgcolor: "#fff",
                          transform: "translateX(6px)",
                          boxShadow: "0 10px 25px rgba(0,0,0,0.05)",
                        },
                      }}
                    >
                      <Box>
                        <Typography
                          sx={{
                            color: "#1c1b18",
                            fontSize: "1.05rem",
                            fontWeight: 600,
                            fontFamily: "'Cormorant Garamond', serif",
                            mb: 0.5,
                          }}
                        >
                          {style.title}
                        </Typography>
                        <Typography sx={{ color: "#6c665c", fontSize: "0.82rem" }}>
                          {style.desc}
                        </Typography>
                      </Box>
                    </Box>
                  ))}
                </Box>
              </Box>
            </motion.div>
          </Box>
        </Box>
      </Box>

      {/* SECTION 7: Our Floral Services — Immersive Cinematic Grid */}
      <Box
        sx={{
          bgcolor: "#2c3629",
          py: { xs: 12, md: 20 },
          display: "flex",
          justifyContent: "center",
          px: 3,
          position: "relative",
          overflow: "hidden",
        }}
      >
        <Box sx={{ maxWidth: "1250px", width: "100%", position: "relative", zIndex: 1 }}>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            variants={textVariant}
          >
            <Box sx={{ textAlign: "center", mb: { xs: 8, md: 12 } }}>
              <Typography
                sx={{
                  color: "#9ca694",
                  letterSpacing: "0.25em",
                  textTransform: "uppercase",
                  fontSize: ".75rem",
                  mb: 2,
                  fontWeight: 500,
                }}
              >
                Our Botanical Expertise
              </Typography>
              <Typography
                sx={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: { xs: "2.4rem", md: "4rem" },
                  color: "#f4f1ea",
                  letterSpacing: "0.02em",
                }}
              >
                Crafting Moments, One Bloom at a Time
              </Typography>
            </Box>
          </motion.div>

          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", md: "repeat(3, 1fr)" },
              gap: 4,
            }}
          >
            {[
              {
                title: "Bespoke Bouquets",
                desc: "Custom arrangements tailored precisely to your personal style and special occasion.",
                video: heero2,
                tag: "Artisanal",
              },
              {
                title: "Wedding Packages",
                desc: "Comprehensive luxury floral design for breathtaking ceremonies and grand receptions.",
                video: heero3,
                tag: "Full-Service",
              },
              {
                title: "Gift & Events",
                desc: "Stunning, high-impact floral installations and gifts crafted to make memories unforgettable.",
                video: heero4,
                tag: "Celebration",
              },
            ].map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.8, delay: index * 0.15 }}
                style={{ height: "100%" }}
              >
                <Box
                  sx={{
                    position: "relative",
                    borderRadius: "16px",
                    overflow: "hidden",
                    height: "480px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "flex-end",
                    cursor: "pointer",
                    boxShadow: "0 15px 35px rgba(0,0,0,0.3)",
                    transition: "all 0.5s cubic-bezier(0.25, 1, 0.5, 1)",
                    "&:hover": {
                      transform: "translateY(-10px)",
                      boxShadow: "0 30px 60px rgba(0,0,0,0.5)",
                    },
                    "&:hover video": {
                      transform: "scale(1.08)",
                    },
                  }}
                >
                  <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      zIndex: 0,
                      transition: "transform 0.8s ease",
                    }}
                  >
                    <source src={item.video} type="video/mp4" />
                  </video>
                  <Box
                    sx={{
                      position: "absolute",
                      inset: 0,
                      background:
                        "linear-gradient(to top, rgba(20,25,19,0.95) 15%, rgba(20,25,19,0.5) 60%, rgba(20,25,19,0.1) 100%)",
                      zIndex: 1,
                    }}
                  />
                  
                  {/* Floating Tag */}
                  <Box
                    sx={{
                      position: "absolute",
                      top: 24,
                      right: 24,
                      zIndex: 2,
                      bgcolor: "rgba(244,241,234,0.15)",
                      backdropFilter: "blur(10px)",
                      px: 2,
                      py: 0.8,
                      borderRadius: "20px",
                      border: "1px solid rgba(244,241,234,0.2)",
                    }}
                  >
                    <Typography
                      sx={{
                        color: "#f4f1ea",
                        fontSize: ".68rem",
                        letterSpacing: "0.15em",
                        textTransform: "uppercase",
                      }}
                    >
                      {item.tag}
                    </Typography>
                  </Box>

                  <Box sx={{ position: "relative", zIndex: 2, p: 4, width: "100%" }}>
                    <Typography
                      sx={{
                        fontFamily: "'Cormorant Garamond', serif",
                        fontSize: "2.1rem",
                        color: "#f4f1ea",
                        mb: 1.5,
                        lineHeight: 1.15,
                      }}
                    >
                      {item.title}
                    </Typography>
                    <Typography
                      sx={{
                        color: "#d0d5cb",
                        fontSize: ".92rem",
                        lineHeight: 1.7,
                        opacity: 0.9,
                      }}
                    >
                      {item.desc}
                    </Typography>
                  </Box>
                </Box>
              </motion.div>
            ))}
          </Box>
        </Box>
      </Box>

      {/* SECTION 8: Our Sanctuary & Story */}
      <Box
        sx={{
          bgcolor: "#f4f1ea",
          py: { xs: 12, md: 20 },
          display: "flex",
          justifyContent: "center",
          px: 3,
        }}
      >
        <Box sx={{ maxWidth: "900px", width: "100%", textAlign: "center" }}>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            variants={textVariant}
          >
            <Typography
              sx={{
                color: "#6c665c",
                letterSpacing: "0.25em",
                textTransform: "uppercase",
                fontSize: ".75rem",
                mb: 2,
                fontWeight: 500,
              }}
            >
              Our Sanctuary & Philosophy
            </Typography>
            <Typography
              sx={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: { xs: "2.4rem", md: "4rem" },
                color: "#1c1b18",
                letterSpacing: "0.02em",
                mb: 4,
                lineHeight: 1.15,
              }}
            >
              Where Nature Meets Timeless Artistry
            </Typography>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            variants={textVariant}
          >
            <Typography
              sx={{
                color: "#5c574e",
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: { xs: "1.4rem", md: "1.8rem" },
                lineHeight: 1.7,
                mb: 3,
              }}
            >
              Nestled in the heart of botanical elegance, our atelier is more than just a floral design space—it is a sanctuary dedicated to capturing life's most precious celebrations through living poetry. Every stem we choose, every palette we curate, and every corner of our boutique is designed to immerse you in the quiet, sophisticated luxury of nature.
            </Typography>
         
          </motion.div>
        </Box>
      </Box>

      <Footer />
    </Box>
  );
}