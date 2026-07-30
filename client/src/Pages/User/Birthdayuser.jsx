import React, { useState, useEffect, useRef } from "react";
import {
  Box,
  Typography,
  Container,
  Grid,
  Card,
  IconButton,
  Button,
  Chip,
  Divider,
  Dialog,
  TextField,
  Grow,
} from "@mui/material";
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import NavbarUser from "../../Components/NavUserAdmin/Navuser.jsx";
import Footer from "../../Components/Footer/Footer.jsx";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import EmojiEventsRoundedIcon from "@mui/icons-material/EmojiEventsRounded";
import WorkRoundedIcon from "@mui/icons-material/WorkRounded";
import StarRoundedIcon from "@mui/icons-material/StarRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import ChevronLeftRoundedIcon from "@mui/icons-material/ChevronLeftRounded";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";

import heroImage from "../../assets/images/designer2.jpg";
import heroVideo from "../../assets/video/bd18.mp4";

import bt1 from "../../assets/images/bt1.jpg";
import bt2 from "../../assets/images/bt2.jpg";
import bt3 from "../../assets/images/bt3.jpg";
import bt4 from "../../assets/images/bt4.jpg";
import bt5 from "../../assets/images/bt5.jpg";
import bt6 from "../../assets/images/bt6.jpg";
import bt7 from "../../assets/images/bt7.jpg";
import bt8 from "../../assets/images/bt8.jpg";
import bt9 from "../../assets/images/bt9.jpg";
import bt10 from "../../assets/images/bt10.jpg";
import bt11 from "../../assets/images/bt11.jpg";
import bt12 from "../../assets/images/bt12.jpg";
import bt13 from "../../assets/images/bt13.jpg";
import bt14 from "../../assets/images/bt14.jpg";

import bd95 from "../../assets/images/bd95.jpg";
import bd96 from "../../assets/images/bd96.jpg";
import bd97 from "../../assets/images/bd97.jpg";
import bd98 from "../../assets/images/bd98.jpg";
import bd99 from "../../assets/images/bd99.jpg";
import bd100 from "../../assets/images/bd100.jpg";

const colors = {
  deepOrange: "#8B3A2A",
  orange: "#C46A3A",
  lightOrange: "#E8A87C",
  warmBeige: "#F5E6D3",
  cream: "#FDF8F3",
  white: "#FFFFFF",
  silver: "#C0C0C0",
  lightSilver: "#E8E8E8",
  dark: "#2A1A12",
  muted: "#A08070",
  gold: "#c9a15a",
  goldSoft: "rgba(201,161,90,0.15)",
};

const designer = {
  id: 2,
  name: "Salem",
  role: "Birthday Experience Designer",
  desc: "Salem specializes in designing joyful birthday experiences.",
  image: heroImage,
  video: heroVideo,
  project: { title: "Luxury Birthday", page: "/events/birthday" },
};

const marqueeImages = [bt1, bt2, bt3, bt4, bt5, bt6, bt7, bt8];

const largeImages = [
  {
    image: bt9,
    title: "Elegant Celebrations",
    desc: "Sophistication meets joy in our carefully curated birthday experiences. We blend timeless elegance with modern creativity to create celebrations that are both refined and full of life. Every detail is thoughtfully considered to ensure your special day is nothing short of extraordinary.",
  },
  {
    image: bt10,
    title: "Personalized Touch",
    desc: "Every celebration is unique, just like the person being celebrated. We take the time to understand your vision and bring it to life with personalized details that make your event truly one-of-a-kind. Your story is our inspiration.",
  },
  {
    image: bt11,
    title: "Festive Spirit",
    desc: "Bringing the energy and excitement of celebration to every detail. From vibrant decorations to lively entertainment, we create an atmosphere of pure joy and festivity that will leave your guests talking for years to come.",
  },
  {
    image: bt12,
    title: "Love & Laughter",
    desc: "The two essential ingredients for any unforgettable celebration. We believe that the best events are filled with genuine connection and heartfelt moments that bring people together in meaningful ways.",
  },
  {
    image: bt13,
    title: "Timeless Moments",
    desc: "Creating memories that will be cherished for generations to come. Our designs are crafted to stand the test of time, ensuring that your celebration remains a treasured memory forever in the hearts of all who attend.",
  },
  {
    image: bt14,
    title: "Creative Vision",
    desc: "Our creative team brings fresh ideas and innovative concepts to every celebration. We push boundaries and think outside the box to create truly unique and memorable experiences that reflect your personality.",
  },
];

const rotatingPhrases = [
  "Every birthday tells a unique story waiting to be celebrated.",
  "Turning ordinary moments into extraordinary memories.",
  "Designing joy, one celebration at a time.",
  "Where creativity meets celebration.",
  "Crafting experiences that last a lifetime.",
  "Your special day deserves something truly magical.",
  "From concept to creation, we bring your vision to life.",
];

const bannerData = [
  {
    src: bd95,
    title: "Elegance in Bloom",
    description:
      "This stunning floral arrangement captures the essence of natural beauty and sophisticated design. Each petal and leaf has been carefully selected and positioned to create a harmonious composition that speaks of timeless elegance. Perfect for weddings, anniversaries, and special celebrations where beauty and grace are paramount. The delicate balance of colors and textures creates a visual masterpiece that will be remembered long after the event has passed.",
  },
  {
    src: bd96,
    title: "Golden Moments",
    description:
      "A celebration of life's most precious milestones, captured in a moment of pure golden radiance. The warm, luminous tones evoke feelings of joy, success, and the beauty of achievement. This image represents the culmination of hard work, dedication, and the support of loved ones who have been there every step of the way. A testament to the power of celebration and the importance of marking life's significant moments with grandeur and style.",
  },
  {
    src: bd97,
    title: "Luxury Essence",
    description:
      "Step into a world of refined living where every detail exudes exclusivity and class. This image embodies the pinnacle of luxury design, where sophistication meets comfort in perfect harmony. The careful curation of elements creates an atmosphere of quiet opulence that speaks to those who appreciate the finer things in life. A celebration of elegance that transcends trends and stands as a timeless testament to exceptional taste.",
  },
  {
    src: bd98,
    title: "Timeless Beauty",
    description:
      "Some moments are destined to be remembered forever, and this image captures one such moment with breathtaking clarity. The composition speaks of enduring love, grace, and the beauty that exists in the spaces between time. Whether it's a wedding, an anniversary, or a milestone celebration, this scene reminds us that true beauty never fades—it only grows more profound with each passing year.",
  },
  {
    src: bd99,
    title: "Prestige Collection",
    description:
      "A curated collection of life's most elegant moments, each one a masterpiece of design and emotion. This image showcases the art of refined celebration, where every element has been thoughtfully considered to create an atmosphere of unparalleled sophistication. From the lighting to the composition, every detail works in harmony to tell a story of achievement, success, and the joy of living life to its fullest.",
  },
  {
    src: bd100,
    title: "Grand Celebration",
    description:
      "Where grandeur meets sophistication, this image captures the essence of life's most spectacular moments. The celebration is elevated to an art form, where every detail—from the majestic setting to the smallest decorative element—creates an immersive experience of pure luxury. This is the pinnacle of event design, where dreams become reality and memories are forged that will last a lifetime.",
  },
];

const textVariant = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.9, ease: "easeOut" } },
};

export default function Birthdayuser() {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0.3]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.95]);

  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
  });
  const [time, setTime] = useState("10:00 AM");
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPhraseIndex((prev) => (prev + 1) % rotatingPhrases.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

  const getDaysInMonth = (month, year) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (month, year) => {
    return new Date(year, month, 1).getDay();
  };

  const isDayBooked = (day) => {
    const bookedDays = [3, 7, 12, 18, 22, 27];
    return bookedDays.includes(day);
  };

  const renderCalendar = () => {
    const daysInMonth = getDaysInMonth(currentMonth, currentYear);
    const firstDay = getFirstDayOfMonth(currentMonth, currentYear);
    const today = new Date().getDate();
    const currentMonthNow = new Date().getMonth();
    const currentYearNow = new Date().getFullYear();

    const days = [];
    for (let i = 0; i < firstDay; i++) {
      days.push(<Box key={`empty-${i}`} sx={{ width: 36, height: 36 }} />);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const isPast =
        currentYear < currentYearNow ||
        (currentYear === currentYearNow && currentMonth < currentMonthNow) ||
        (currentYear === currentYearNow &&
          currentMonth === currentMonthNow &&
          day < today);
      const isBooked = isDayBooked(day);
      const isSelected = selectedDate === day;

      days.push(
        <Box
          key={day}
          onClick={() => {
            if (!isPast && !isBooked) {
              setSelectedDate(day);
            }
          }}
          sx={{
            width: 36,
            height: 36,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: "50%",
            cursor: isPast || isBooked ? "default" : "pointer",
            bgcolor: isSelected ? colors.deepOrange : "transparent",
            color: isSelected
              ? colors.white
              : isPast || isBooked
                ? colors.muted
                : colors.deepOrange,
            border: isSelected
              ? "none"
              : isBooked
                ? "1px solid #e0d6cf"
                : "1px solid transparent",
            opacity: isPast || isBooked ? 0.4 : 1,
            textDecoration: isBooked ? "line-through" : "none",
            fontSize: "0.8rem",
            fontFamily: "sans-serif",
            transition: "all 0.2s ease",
            "&:hover": {
              bgcolor:
                !isPast && !isBooked && !isSelected
                  ? "rgba(139,58,42,0.08)"
                  : "",
              transform: !isPast && !isBooked ? "scale(1.05)" : "",
            },
          }}
        >
          {day}
        </Box>,
      );
    }
    return days;
  };

  const openBooking = () => setDialogOpen(true);
  const closeBooking = () => {
    setDialogOpen(false);
    setSubmitted(false);
    setSelectedDate(null);
  };

  const handleChange = (field) => (e) =>
    setForm((f) => ({ ...f, [field]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      closeBooking();
    }, 2000);
  };

  const changeMonth = (delta) => {
    let newMonth = currentMonth + delta;
    let newYear = currentYear;
    if (newMonth < 0) {
      newMonth = 11;
      newYear--;
    } else if (newMonth > 11) {
      newMonth = 0;
      newYear++;
    }
    setCurrentMonth(newMonth);
    setCurrentYear(newYear);
    setSelectedDate(null);
  };

  return (
    <Box sx={{ overflowX: "hidden", bgcolor: colors.cream }}>
      <NavbarUser />

      <Box
        ref={heroRef}
        sx={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          alignItems: "center",
          justifyContent: "center",
          gap: { xs: 4, md: 8 },
          px: { xs: 4, md: 12 },
          py: 10,
          position: "relative",
          overflow: "hidden",
          background: `linear-gradient(135deg, ${colors.deepOrange} 0%, ${colors.orange} 30%, ${colors.lightOrange} 60%, ${colors.warmBeige} 100%)`,
          "&::before": {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background:
              "radial-gradient(ellipse at center, rgba(201,161,90,0.06) 0%, transparent 70%)",
            animation: "pulseGlow 4s ease-in-out infinite",
          },
          "@keyframes pulseGlow": {
            "0%, 100%": { opacity: 0.3 },
            "50%": { opacity: 0.7 },
          },
        }}
      >
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            pointerEvents: "none",
            zIndex: 0,
            "& .particle": {
              position: "absolute",
              borderRadius: "50%",
              background: colors.gold,
              animation: "floatParticle 8s ease-in-out infinite",
              opacity: 0.15,
            },
            "@keyframes floatParticle": {
              "0%, 100%": { transform: "translateY(0) translateX(0) scale(1)" },
              "25%": {
                transform: "translateY(-30px) translateX(15px) scale(1.2)",
              },
              "50%": {
                transform: "translateY(-15px) translateX(-15px) scale(0.8)",
              },
              "75%": {
                transform: "translateY(20px) translateX(20px) scale(1.1)",
              },
            },
          }}
        >
          {[...Array(20)].map((_, i) => (
            <Box
              key={i}
              className="particle"
              sx={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                width: `${2 + Math.random() * 6}px`,
                height: `${2 + Math.random() * 6}px`,
                animationDelay: `${Math.random() * 8}s`,
                animationDuration: `${5 + Math.random() * 5}s`,
                opacity: 0.1 + Math.random() * 0.15,
              }}
            />
          ))}
        </Box>

        <Box
          sx={{
            width: { xs: 280, md: 400 },
            height: { xs: 280, md: 400 },
            borderRadius: "50%",
            border: `3px solid ${colors.gold}`,
            padding: "12px",
            flexShrink: 0,
            position: "relative",
            zIndex: 1,
            boxShadow: "0 20px 60px rgba(201,161,90,0.15)",
            animation: "floatImage 6s ease-in-out infinite",
            "@keyframes floatImage": {
              "0%, 100%": { transform: "translateY(0)" },
              "50%": { transform: "translateY(-12px)" },
            },
          }}
        >
          <Box
            component="img"
            src={designer.image}
            alt={designer.name}
            sx={{
              width: "100%",
              height: "100%",
              borderRadius: "50%",
              objectFit: "cover",
              transition: "transform .6s cubic-bezier(.22,1,.36,1)",
              "&:hover": { transform: "scale(1.04)" },
            }}
          />
        </Box>

        <Box
          sx={{
            maxWidth: 520,
            textAlign: { xs: "center", md: "left" },
            position: "relative",
            zIndex: 1,
            mt: { xs: 0, md: 4 },
          }}
        >
          <Typography
            sx={{
              color: colors.silver,
              letterSpacing: 8,
              fontFamily: "sans-serif",
              fontSize: 14,
              mb: 1.5,
              fontWeight: 500,
            }}
          >
            {designer.role.toUpperCase()}
          </Typography>
          <Typography
            variant="h1"
            sx={{
              fontSize: { xs: "2.8rem", md: "4.2rem" },
              lineHeight: 1.05,
              mb: 2,
              color: colors.white,
            }}
          >
            {designer.name}
          </Typography>
          <Typography
            sx={{
              color: colors.white,
              fontSize: { xs: "1rem", md: "1.1rem" },
              lineHeight: 1.8,
              fontFamily: "sans-serif",
              fontWeight: 300,
              opacity: 0.85,
            }}
          >
            {designer.desc}
            <br />
            <br />
            With over 7 years of experience, Salem has crafted unforgettable
            birthday experiences for clients worldwide. From intimate family
            gatherings to grand celebrations, every detail is carefully curated
            to create moments of pure joy and wonder.
          </Typography>
          <Box
            sx={{
              mt: 2.5,
              display: "flex",
              gap: 1.5,
              justifyContent: { xs: "center", md: "flex-start" },
              flexWrap: "wrap",
            }}
          >
            <Chip
              label="Birthday Expert"
              sx={{
                color: colors.gold,
                borderColor: colors.gold,
                bgcolor: "rgba(201,161,90,0.1)",
                fontFamily: "sans-serif",
                fontWeight: 700,
                fontSize: "0.85rem",
              }}
            />
            <Chip
              label="15+ Awards"
              sx={{
                color: colors.gold,
                borderColor: colors.gold,
                bgcolor: "rgba(201,161,90,0.1)",
                fontFamily: "sans-serif",
                fontWeight: 700,
                fontSize: "0.85rem",
              }}
            />
            <Chip
              label="100+ Birthdays"
              sx={{
                color: colors.gold,
                borderColor: colors.gold,
                bgcolor: "rgba(201,161,90,0.1)",
                fontFamily: "sans-serif",
                fontWeight: 700,
                fontSize: "0.85rem",
              }}
            />
          </Box>
        </Box>
      </Box>

      <Box
        sx={{
          bgcolor: colors.cream,
          py: { xs: 6, md: 8 },
          px: 3,
        }}
      >
        <Container maxWidth="md">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeInUp}
          >
            <Typography
              sx={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: { xs: "2rem", md: "3rem" },
                color: colors.deepOrange,
                textAlign: "center",
                mb: 2,
                fontWeight: 400,
              }}
            >
              Where Dreams Take Shape
            </Typography>

            <Typography
              sx={{
                color: colors.muted,
                textAlign: "center",
                lineHeight: 2,
                fontSize: "1rem",
                fontFamily: "sans-serif",
                fontWeight: 300,
                mb: 2,
              }}
            >
              Salem believes that every birthday is a canvas waiting to be
              painted with joy. From the initial spark of an idea to the final
              toast, we craft experiences that resonate with the heart and soul
              of the person being celebrated.
            </Typography>

            <Divider
              sx={{
                width: 40,
                mx: "auto",
                borderColor: colors.orange,
                borderWidth: 1,
                mb: 2,
              }}
            />

            <Typography
              sx={{
                color: colors.muted,
                textAlign: "center",
                lineHeight: 2,
                fontSize: "1rem",
                fontFamily: "sans-serif",
                fontWeight: 300,
              }}
            >
              Our creative journey begins with understanding your unique vision,
              then transforming it into a stunning celebration that reflects
              your personality and style.
            </Typography>
          </motion.div>
        </Container>
      </Box>

      <Box
        sx={{
          width: "100%",
          height: { xs: "60vh", sm: "70vh", md: "80vh" },
          overflow: "hidden",
          bgcolor: colors.dark,
        }}
      >
        <Box
          component="video"
          autoPlay
          loop
          muted
          playsInline
          sx={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            display: "block",
          }}
        >
          <source src={designer.video} type="video/mp4" />
        </Box>
      </Box>

      <Box
        sx={{
          bgcolor: colors.warmBeige,
          py: { xs: 8, md: 12 },
          px: 3,
          minHeight: { xs: 200, md: 250 },
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Container maxWidth="md">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentPhraseIndex}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.6 }}
            >
              <Typography
                sx={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: { xs: "1.6rem", md: "2.4rem" },
                  color: colors.deepOrange,
                  textAlign: "center",
                  lineHeight: 1.6,
                  fontWeight: 300,
                  fontStyle: "italic",
                }}
              >
                "{rotatingPhrases[currentPhraseIndex]}"
              </Typography>
            </motion.div>
          </AnimatePresence>
          <Box
            sx={{ display: "flex", justifyContent: "center", gap: 1, mt: 3 }}
          >
            {rotatingPhrases.map((_, i) => (
              <Box
                key={i}
                sx={{
                  width: 8,
                  height: 8,
                  borderRadius: "50%",
                  bgcolor:
                    i === currentPhraseIndex
                      ? colors.deepOrange
                      : "rgba(139,58,42,0.15)",
                  transition: "all 0.3s ease",
                  cursor: "pointer",
                }}
                onClick={() => setCurrentPhraseIndex(i)}
              />
            ))}
          </Box>
        </Container>
      </Box>

      <Box
        sx={{
          bgcolor: colors.warmBeige,
          py: { xs: 6, md: 8 },
          px: 3,
        }}
      >
        <Container maxWidth="md">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeInUp}
          >
            <Typography
              sx={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: { xs: "2rem", md: "3rem" },
                color: colors.deepOrange,
                textAlign: "center",
                mb: 2,
                fontWeight: 400,
              }}
            >
              The Art of Celebration
            </Typography>
            <Typography
              sx={{
                color: colors.muted,
                textAlign: "center",
                lineHeight: 2,
                fontSize: "1rem",
                fontFamily: "sans-serif",
                fontWeight: 300,
              }}
            >
              With a keen eye for detail and a passion for storytelling, Salem
              weaves together elements of design, emotion, and surprise to
              create celebrations that are as unique as the individuals they
              honor.
            </Typography>
          </motion.div>
        </Container>
      </Box>

      <Box
        sx={{
          bgcolor: colors.cream,
          py: { xs: 8, md: 10 },
          overflow: "hidden",
        }}
      >
        <Container maxWidth="xl">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={textVariant}
          >
            <Typography
              sx={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: { xs: "2rem", md: "3rem" },
                color: colors.deepOrange,
                textAlign: "center",
                mb: 1,
                fontWeight: 400,
              }}
            >
              Celebrating Life's Sweetest Moments
            </Typography>
            <Typography
              sx={{
                color: colors.muted,
                textAlign: "center",
                fontFamily: "sans-serif",
                fontSize: "0.85rem",
                letterSpacing: 3,
                mb: 3,
              }}
            >
              — A Collection of Joyful Celebrations —
            </Typography>
            <Divider
              sx={{
                width: 60,
                mx: "auto",
                borderColor: colors.orange,
                borderWidth: 2,
                mb: 4,
              }}
            />
          </motion.div>
        </Container>

        <MarqueeSlideshow images={marqueeImages} direction="left" />
      </Box>

      <Box
        sx={{
          bgcolor: colors.warmBeige,
          py: { xs: 6, md: 10 },
        }}
      >
        <Container maxWidth="md" sx={{ textAlign: "center" }}>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeInUp}
          >
            <Typography
              sx={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: { xs: "1.8rem", md: "2.8rem" },
                color: colors.deepOrange,
                mb: 2.5,
                fontWeight: 400,
              }}
            >
              Every Birthday Tells a Story
            </Typography>
            <Typography
              sx={{
                color: colors.muted,
                lineHeight: 2,
                fontSize: "1rem",
                fontFamily: "sans-serif",
                fontWeight: 300,
              }}
            >
              From intimate gatherings to grand celebrations, each birthday is a
              unique chapter in someone's life story. We believe in capturing
              the essence of the person being celebrated, weaving their
              personality, passions, and dreams into every detail of the event.
              <br />
              <br />
              Our approach combines creativity with meticulous planning,
              ensuring that every moment feels magical and every guest leaves
              with cherished memories.
            </Typography>
          </motion.div>
        </Container>
      </Box>

      <Box
        sx={{
          bgcolor: colors.cream,
          py: { xs: 8, md: 12 },
        }}
      >
        <Container maxWidth="xl">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={textVariant}
          >
            <Typography
              sx={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: { xs: "2rem", md: "3rem" },
                color: colors.deepOrange,
                textAlign: "center",
                mb: 1,
                fontWeight: 400,
              }}
            >
              Moments of Pure Joy
            </Typography>
            <Typography
              sx={{
                color: colors.muted,
                textAlign: "center",
                fontFamily: "sans-serif",
                fontSize: "0.85rem",
                letterSpacing: 3,
                mb: 3,
              }}
            >
              — Capturing Happiness in Every Frame —
            </Typography>
            <Divider
              sx={{
                width: 60,
                mx: "auto",
                borderColor: colors.orange,
                borderWidth: 2,
                mb: 5,
              }}
            />
          </motion.div>

          <FullImageGallery images={largeImages} />
        </Container>
      </Box>

      <Box
        sx={{
          bgcolor: colors.warmBeige,
          py: { xs: 6, md: 10 },
        }}
      >
        <Container maxWidth="lg">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={textVariant}
          >
            <Typography
              sx={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: { xs: "1.8rem", md: "2.8rem" },
                color: colors.deepOrange,
                textAlign: "center",
                mb: 1,
                fontWeight: 400,
              }}
            >
              Stories Behind the Art
            </Typography>
            <Typography
              sx={{
                color: colors.muted,
                textAlign: "center",
                fontFamily: "sans-serif",
                fontSize: "0.8rem",
                letterSpacing: 3,
                mb: 4,
              }}
            >
              — Each Image Tells a Unique Story —
            </Typography>
            <Divider
              sx={{
                width: 60,
                mx: "auto",
                borderColor: colors.orange,
                borderWidth: 2,
                mb: 5,
              }}
            />
          </motion.div>

          <BannerWithText images={bannerData} />
        </Container>
      </Box>

      <Box
        sx={{
          bgcolor: colors.cream,
          py: { xs: 6, md: 10 },
        }}
      >
        <Container maxWidth="md" sx={{ textAlign: "center" }}>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeInUp}
          >
            <Typography
              sx={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: { xs: "1.8rem", md: "2.8rem" },
                color: colors.deepOrange,
                mb: 2.5,
                fontWeight: 400,
              }}
            >
              Crafting Unforgettable Experiences
            </Typography>
            <Typography
              sx={{
                color: colors.muted,
                lineHeight: 2,
                fontSize: "1rem",
                fontFamily: "sans-serif",
                fontWeight: 300,
              }}
            >
              Our team of creative professionals works tirelessly to bring your
              vision to life. From the initial consultation to the final
              farewell, we handle every aspect of your celebration with care and
              precision.
              <br />
              <br />
              We believe that the best celebrations are those that feel
              personal, authentic, and full of heart. Let us help you create a
              birthday experience that will be remembered for years to come.
            </Typography>

            <Button
              onClick={openBooking}
              sx={{
                mt: 4,
                bgcolor: colors.deepOrange,
                color: colors.white,
                px: 5,
                py: 1.8,
                borderRadius: "30px",
                fontFamily: "sans-serif",
                fontWeight: 600,
                letterSpacing: 2,
                transition: "all 0.3s ease",
                "&:hover": {
                  bgcolor: colors.orange,
                  transform: "translateY(-3px)",
                  boxShadow: "0 8px 30px rgba(139,58,42,0.2)",
                },
              }}
            >
              Book Your Celebration Now
              <ArrowForwardRoundedIcon sx={{ ml: 1 }} />
            </Button>
          </motion.div>
        </Container>
      </Box>

      <Dialog
        open={dialogOpen}
        onClose={closeBooking}
        fullWidth
        maxWidth="sm"
        PaperProps={{
          sx: {
            bgcolor: colors.cream,
            color: colors.deepOrange,
            borderRadius: 3,
            border: `1px solid ${colors.goldSoft}`,
            fontFamily: "'Cormorant Garamond', serif",
          },
        }}
      >
        <Box sx={{ p: { xs: 3, md: 4 }, position: "relative" }}>
          <IconButton
            onClick={closeBooking}
            sx={{
              position: "absolute",
              top: 12,
              right: 12,
              color: colors.muted,
            }}
          >
            <CloseRoundedIcon />
          </IconButton>

          {!submitted ? (
            <>
              <Typography
                sx={{
                  fontSize: "1.8rem",
                  mb: 0.5,
                  color: colors.deepOrange,
                  fontWeight: 600,
                }}
              >
                Book with {designer.name}
              </Typography>
              <Typography
                sx={{
                  color: colors.muted,
                  fontFamily: "sans-serif",
                  fontSize: 13,
                  mb: 3,
                }}
              >
                Select an available date and fill in your details.
              </Typography>

              <Box
                component="form"
                onSubmit={handleSubmit}
                sx={{ display: "flex", flexDirection: "column", gap: 2.5 }}
              >
                <Box>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      mb: 2,
                    }}
                  >
                    <IconButton onClick={() => changeMonth(-1)} size="small">
                      <ArrowForwardRoundedIcon
                        sx={{
                          transform: "rotate(180deg)",
                          color: colors.deepOrange,
                        }}
                      />
                    </IconButton>
                    <Typography
                      sx={{
                        fontFamily: "sans-serif",
                        fontWeight: 600,
                        color: colors.deepOrange,
                      }}
                    >
                      {new Date(currentYear, currentMonth).toLocaleString(
                        "default",
                        { month: "long", year: "numeric" },
                      )}
                    </Typography>
                    <IconButton onClick={() => changeMonth(1)} size="small">
                      <ArrowForwardRoundedIcon
                        sx={{ color: colors.deepOrange }}
                      />
                    </IconButton>
                  </Box>
                  <Box
                    sx={{
                      display: "grid",
                      gridTemplateColumns: "repeat(7, 1fr)",
                      gap: 0.5,
                      justifyItems: "center",
                    }}
                  >
                    {["S", "M", "T", "W", "T", "F", "S"].map((day) => (
                      <Typography
                        key={day}
                        sx={{
                          fontSize: "0.65rem",
                          color: colors.muted,
                          fontFamily: "sans-serif",
                          fontWeight: 600,
                        }}
                      >
                        {day}
                      </Typography>
                    ))}
                    {renderCalendar()}
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      gap: 2,
                      mt: 2,
                      justifyContent: "center",
                    }}
                  >
                    <Box
                      sx={{ display: "flex", alignItems: "center", gap: 0.5 }}
                    >
                      <Box
                        sx={{
                          width: 12,
                          height: 12,
                          borderRadius: "50%",
                          bgcolor: colors.deepOrange,
                        }}
                      />
                      <Typography
                        sx={{
                          fontSize: "0.65rem",
                          color: colors.muted,
                          fontFamily: "sans-serif",
                        }}
                      >
                        Selected
                      </Typography>
                    </Box>
                    <Box
                      sx={{ display: "flex", alignItems: "center", gap: 0.5 }}
                    >
                      <Box
                        sx={{
                          width: 12,
                          height: 12,
                          borderRadius: "50%",
                          border: "1px solid #e0d6cf",
                          bgcolor: "transparent",
                        }}
                      />
                      <Typography
                        sx={{
                          fontSize: "0.65rem",
                          color: colors.muted,
                          fontFamily: "sans-serif",
                        }}
                      >
                        Booked
                      </Typography>
                    </Box>
                  </Box>
                  {selectedDate && (
                    <Typography
                      sx={{
                        textAlign: "center",
                        mt: 1,
                        color: colors.deepOrange,
                        fontWeight: 600,
                        fontSize: "0.9rem",
                      }}
                    >
                      Selected: {selectedDate}{" "}
                      {new Date(currentYear, currentMonth).toLocaleString(
                        "default",
                        { month: "long" },
                      )}
                    </Typography>
                  )}
                </Box>

                <TextField
                  label="Full Name"
                  required
                  fullWidth
                  value={form.name}
                  onChange={handleChange("name")}
                  sx={{
                    "& .MuiInputBase-root": {
                      color: colors.deepOrange,
                      fontFamily: "sans-serif",
                    },
                    "& .MuiInputLabel-root": {
                      color: colors.muted,
                      fontFamily: "sans-serif",
                    },
                    "& .MuiOutlinedInput-notchedOutline": {
                      borderColor: "rgba(139,58,42,0.15)",
                    },
                    "&:hover .MuiOutlinedInput-notchedOutline": {
                      borderColor: colors.orange,
                    },
                    "& .Mui-focused .MuiOutlinedInput-notchedOutline": {
                      borderColor: colors.deepOrange,
                    },
                  }}
                />

                <Box>
                  <Typography
                    sx={{
                      color: colors.muted,
                      fontFamily: "sans-serif",
                      fontSize: 13,
                      mb: 1,
                    }}
                  >
                    Preferred Time
                  </Typography>
                  <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
                    {[
                      "10:00 AM",
                      "12:00 PM",
                      "2:00 PM",
                      "4:00 PM",
                      "6:00 PM",
                    ].map((t) => (
                      <Chip
                        key={t}
                        label={t}
                        onClick={() => setTime(t)}
                        sx={{
                          fontFamily: "sans-serif",
                          cursor: "pointer",
                          bgcolor:
                            time === t
                              ? colors.deepOrange
                              : "rgba(139,58,42,0.06)",
                          color: time === t ? colors.white : colors.deepOrange,
                          transition: "all .2s ease",
                          fontWeight: time === t ? 700 : 400,
                          "&:hover": {
                            bgcolor:
                              time === t
                                ? colors.deepOrange
                                : "rgba(139,58,42,0.1)",
                          },
                        }}
                      />
                    ))}
                  </Box>
                </Box>

                <TextField
                  label="Phone Number"
                  required
                  fullWidth
                  value={form.phone}
                  onChange={handleChange("phone")}
                  sx={{
                    "& .MuiInputBase-root": {
                      color: colors.deepOrange,
                      fontFamily: "sans-serif",
                    },
                    "& .MuiInputLabel-root": {
                      color: colors.muted,
                      fontFamily: "sans-serif",
                    },
                    "& .MuiOutlinedInput-notchedOutline": {
                      borderColor: "rgba(139,58,42,0.15)",
                    },
                    "&:hover .MuiOutlinedInput-notchedOutline": {
                      borderColor: colors.orange,
                    },
                    "& .Mui-focused .MuiOutlinedInput-notchedOutline": {
                      borderColor: colors.deepOrange,
                    },
                  }}
                />
                <TextField
                  label="Email Address"
                  type="email"
                  required
                  fullWidth
                  value={form.email}
                  onChange={handleChange("email")}
                  sx={{
                    "& .MuiInputBase-root": {
                      color: colors.deepOrange,
                      fontFamily: "sans-serif",
                    },
                    "& .MuiInputLabel-root": {
                      color: colors.muted,
                      fontFamily: "sans-serif",
                    },
                    "& .MuiOutlinedInput-notchedOutline": {
                      borderColor: "rgba(139,58,42,0.15)",
                    },
                    "&:hover .MuiOutlinedInput-notchedOutline": {
                      borderColor: colors.orange,
                    },
                    "& .Mui-focused .MuiOutlinedInput-notchedOutline": {
                      borderColor: colors.deepOrange,
                    },
                  }}
                />

                <Button
                  type="submit"
                  variant="contained"
                  disabled={!selectedDate}
                  sx={{
                    fontFamily: "sans-serif",
                    letterSpacing: 2,
                    py: 1.6,
                    mt: 1,
                    borderRadius: 30,
                    bgcolor: colors.deepOrange,
                    color: colors.white,
                    fontWeight: 700,
                    opacity: selectedDate ? 1 : 0.6,
                    "&:hover": {
                      bgcolor: colors.orange,
                      transform: "scale(1.02)",
                    },
                    transition: "all 0.3s ease",
                  }}
                >
                  {selectedDate ? `Book for ${selectedDate}` : "Select a Date"}
                </Button>
              </Box>
            </>
          ) : (
            <Grow in={submitted}>
              <Box sx={{ textAlign: "center", py: 6 }}>
                <CheckCircleRoundedIcon
                  sx={{ fontSize: 56, color: colors.deepOrange, mb: 2 }}
                />
                <Typography
                  sx={{
                    fontSize: "1.6rem",
                    mb: 1,
                    color: colors.deepOrange,
                    fontWeight: 600,
                  }}
                >
                  Request Sent ✓
                </Typography>
                <Typography
                  sx={{
                    color: colors.muted,
                    fontFamily: "sans-serif",
                    fontSize: 14,
                  }}
                >
                  We'll review your request and send a confirmation shortly.
                </Typography>
              </Box>
            </Grow>
          )}
        </Box>
      </Dialog>

      <Footer />
    </Box>
  );
}

function MarqueeSlideshow({ images, direction = "left" }) {
  const doubled = [...images, ...images];
  const animName = direction === "left" ? "marqueeLeft" : "marqueeRight";

  return (
    <Box
      sx={{
        position: "relative",
        width: "100%",
        overflow: "hidden",
        "&::before, &::after": {
          content: '""',
          position: "absolute",
          top: 0,
          bottom: 0,
          width: { xs: 40, md: 120 },
          zIndex: 2,
          pointerEvents: "none",
        },
        "&::before": {
          left: 0,
          background: `linear-gradient(to right, ${colors.cream}, transparent)`,
        },
        "&::after": {
          right: 0,
          background: `linear-gradient(to left, ${colors.cream}, transparent)`,
        },
      }}
    >
      <Box
        sx={{
          display: "flex",
          gap: { xs: 3, md: 4 },
          width: "max-content",
          animation: `${animName} 25s linear infinite`,
          "@keyframes marqueeLeft": {
            "0%": { transform: "translateX(0)" },
            "100%": { transform: "translateX(-50%)" },
          },
          "@keyframes marqueeRight": {
            "0%": { transform: "translateX(-50%)" },
            "100%": { transform: "translateX(0)" },
          },
          "&:hover": {
            animationPlayState: "paused",
          },
        }}
      >
        {doubled.map((img, index) => (
          <Box
            key={index}
            sx={{
              flex: "0 0 auto",
              width: { xs: 280, sm: 320, md: 380 },
              height: { xs: 280, sm: 320, md: 380 },
              borderRadius: 4,
              overflow: "hidden",
              boxShadow: "0 12px 40px rgba(0,0,0,0.08)",
              border: "1px solid rgba(139,58,42,0.06)",
              position: "relative",
            }}
          >
            <Box
              component="img"
              src={img}
              alt={`Celebration ${index + 1}`}
              sx={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                transition: "transform 0.6s ease",
                "&:hover": {
                  transform: "scale(1.06)",
                },
              }}
            />
            <Box
              sx={{
                position: "absolute",
                bottom: 0,
                left: 0,
                right: 0,
                height: "35%",
                background:
                  "linear-gradient(to top, rgba(42,26,18,0.2), transparent)",
              }}
            />
          </Box>
        ))}
      </Box>
    </Box>
  );
}

function FullImageGallery({ images }) {
  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: {
          xs: "1fr",
          sm: "repeat(2, 1fr)",
          md: "repeat(3, 1fr)",
        },
        gap: { xs: 2, md: 3 },
      }}
    >
      {images.map((item, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: (index % 3) * 0.1 }}
          whileHover={{ scale: 1.02 }}
        >
          <Box
            sx={{
              position: "relative",
              borderRadius: 4,
              overflow: "hidden",
              boxShadow: "0 12px 40px rgba(0,0,0,0.08)",
              border: "1px solid rgba(139,58,42,0.06)",
              transition: "all 0.4s ease",
              "&:hover": {
                boxShadow: "0 20px 60px rgba(0,0,0,0.15)",
              },
            }}
          >
            <Box
              component="img"
              src={item.image}
              alt={item.title}
              sx={{
                width: "100%",
                height: "auto",
                display: "block",
                transition: "transform 0.6s ease",
              }}
            />

            <Box
              sx={{
                position: "absolute",
                inset: 0,
                background:
                  "linear-gradient(to top, rgba(42,26,18,0.7) 0%, rgba(42,26,18,0.1) 60%)",
                transition: "opacity 0.4s ease",
              }}
            />

            <Box
              sx={{
                position: "absolute",
                bottom: 0,
                left: 0,
                right: 0,
                p: 3,
                color: colors.white,
              }}
            >
              <Typography
                sx={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: { xs: "1.6rem", md: "1.8rem" },
                  fontWeight: 600,
                  mb: 1,
                  textShadow: "0 2px 20px rgba(0,0,0,0.3)",
                }}
              >
                {item.title}
              </Typography>

              <Divider
                sx={{
                  width: 30,
                  borderColor: colors.gold,
                  borderWidth: 1.5,
                  mb: 1.5,
                }}
              />

              <Typography
                sx={{
                  fontSize: { xs: "0.85rem", md: "0.95rem" },
                  lineHeight: 1.7,
                  fontFamily: "sans-serif",
                  fontWeight: 300,
                  opacity: 0.9,
                  textShadow: "0 1px 10px rgba(0,0,0,0.2)",
                  display: "-webkit-box",
                  WebkitLineClamp: 3,
                  WebkitBoxOrient: "vertical",
                  overflow: "hidden",
                }}
              >
                {item.desc}
              </Typography>

              <Box sx={{ mt: 2 }}>
                <Chip
                  label={`${index + 1} / ${images.length}`}
                  sx={{
                    bgcolor: "rgba(255,255,255,0.15)",
                    color: colors.white,
                    fontFamily: "sans-serif",
                    fontWeight: 500,
                    fontSize: "0.7rem",
                    backdropFilter: "blur(10px)",
                    border: "1px solid rgba(255,255,255,0.1)",
                  }}
                />
              </Box>
            </Box>

            <Box
              sx={{
                position: "absolute",
                inset: 0,
                border: `2px solid transparent`,
                borderRadius: 4,
                transition: "border-color 0.4s ease",
                pointerEvents: "none",
                "&:hover": {
                  borderColor: colors.gold,
                },
              }}
            />
          </Box>
        </motion.div>
      ))}
    </Box>
  );
}

function BannerWithText({ images }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [direction, setDirection] = useState("next");

  const totalImages = images.length;

  useEffect(() => {
    const interval = setInterval(() => {
      goToNext();
    }, 5000);
    return () => clearInterval(interval);
  }, [currentIndex]);

  const goToNext = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setDirection("next");
    setCurrentIndex((prev) => (prev + 1) % totalImages);
    setTimeout(() => setIsTransitioning(false), 800);
  };

  const goToPrevious = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setDirection("prev");
    setCurrentIndex((prev) => (prev - 1 + totalImages) % totalImages);
    setTimeout(() => setIsTransitioning(false), 800);
  };

  const handleDotClick = (index) => {
    if (isTransitioning || index === currentIndex) return;
    setIsTransitioning(true);
    setDirection(index > currentIndex ? "next" : "prev");
    setCurrentIndex(index);
    setTimeout(() => setIsTransitioning(false), 800);
  };

  const currentItem = images[currentIndex];

  return (
    <Box sx={{ position: "relative" }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          gap: { xs: 3, md: 5 },
          alignItems: "center",
          justifyContent: "center",
          minHeight: { xs: 400, md: 420 },
          bgcolor: colors.cream,
          borderRadius: 4,
          p: { xs: 3, md: 4 },
          border: `1px solid ${colors.goldSoft}`,
          boxShadow: "0 4px 20px rgba(0,0,0,0.04)",
        }}
      >
        <Box
          sx={{
            flexShrink: 0,
            width: { xs: "100%", md: 400 },
            maxWidth: { xs: "100%", md: 400 },
            borderRadius: 3,
            overflow: "hidden",
            border: `2px solid ${colors.gold}`,
            boxShadow: "0 8px 30px rgba(0,0,0,0.08)",
            transition: "all 0.5s ease",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            bgcolor: colors.cream,
          }}
        >
          <Box
            component="img"
            src={currentItem.src}
            alt={currentItem.title}
            sx={{
              width: "100%",
              height: "auto",
              objectFit: "contain",
              display: "block",
              transition: "transform 0.6s ease",
              "&:hover": {
                transform: "scale(1.03)",
              },
            }}
          />
        </Box>

        <Box
          sx={{
            flex: 1,
            textAlign: { xs: "center", md: "left" },
            px: { xs: 0, md: 2 },
          }}
        >
          <Typography
            sx={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: { xs: "1.4rem", md: "1.8rem" },
              color: colors.deepOrange,
              fontWeight: 600,
              mb: 1,
            }}
          >
            {currentItem.title}
          </Typography>

          <Divider
            sx={{
              width: { xs: 60, md: 40 },
              mx: { xs: "auto", md: 0 },
              borderColor: colors.gold,
              borderWidth: 2,
              mb: 1.5,
            }}
          />

          <Typography
            sx={{
              color: colors.muted,
              fontSize: { xs: "0.8rem", md: "0.85rem" },
              lineHeight: 1.8,
              fontFamily: "sans-serif",
              fontWeight: 300,
              textAlign: { xs: "center", md: "left" },
            }}
          >
            {currentItem.description}
          </Typography>

          <Box sx={{ mt: 1.5 }}>
            <Chip
              label={`${currentIndex + 1} / ${totalImages}`}
              sx={{
                bgcolor: colors.deepOrange + "10",
                color: colors.deepOrange,
                fontFamily: "sans-serif",
                fontWeight: 600,
                fontSize: "0.7rem",
                border: `1px solid ${colors.goldSoft}`,
              }}
            />
          </Box>
        </Box>
      </Box>

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: 2,
          mt: 3,
        }}
      >
        <IconButton
          onClick={goToPrevious}
          disabled={isTransitioning}
          sx={{
            bgcolor: "rgba(139,58,42,0.08)",
            color: colors.deepOrange,
            border: `1px solid ${colors.goldSoft}`,
            transition: "all 0.3s ease",
            width: 40,
            height: 40,
            "&:hover": {
              bgcolor: colors.deepOrange,
              color: colors.white,
              transform: "scale(1.1)",
              boxShadow: `0 4px 20px ${colors.deepOrange}30`,
            },
            "&.Mui-disabled": {
              opacity: 0.3,
            },
          }}
        >
          <ChevronLeftRoundedIcon />
        </IconButton>

        <Box sx={{ display: "flex", gap: 1.5 }}>
          {images.map((_, i) => (
            <Box
              key={i}
              onClick={() => handleDotClick(i)}
              sx={{
                width: i === currentIndex ? 32 : 10,
                height: 10,
                borderRadius: 5,
                bgcolor:
                  i === currentIndex
                    ? colors.deepOrange
                    : colors.deepOrange + "30",
                transition: "all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
                cursor: "pointer",
                "&:hover": {
                  bgcolor: colors.deepOrange,
                  transform: "scale(1.2)",
                },
              }}
            />
          ))}
        </Box>

        <IconButton
          onClick={goToNext}
          disabled={isTransitioning}
          sx={{
            bgcolor: "rgba(139,58,42,0.08)",
            color: colors.deepOrange,
            border: `1px solid ${colors.goldSoft}`,
            transition: "all 0.3s ease",
            width: 40,
            height: 40,
            "&:hover": {
              bgcolor: colors.deepOrange,
              color: colors.white,
              transform: "scale(1.1)",
              boxShadow: `0 4px 20px ${colors.deepOrange}30`,
            },
            "&.Mui-disabled": {
              opacity: 0.3,
            },
          }}
        >
          <ChevronRightRoundedIcon />
        </IconButton>
      </Box>
    </Box>
  );
}
