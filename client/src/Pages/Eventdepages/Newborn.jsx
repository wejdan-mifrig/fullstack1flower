import React, { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import {
  Box,
  Typography,
  IconButton,
  Button,
  Chip,
  Dialog,
  TextField,
  Fade,
  Grow,
  Container,
  Paper,
} from '@mui/material';
import ArrowBackIosNewRoundedIcon from '@mui/icons-material/ArrowBackIosNewRounded';
import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded';
import FormatQuoteRoundedIcon from '@mui/icons-material/FormatQuoteRounded';
import ChevronLeftRoundedIcon from '@mui/icons-material/ChevronLeftRounded';
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import Navbar from "../../Components/Navhero/Nav.jsx";
import Footer from "../../Components/Footer/Footer.jsx";

/* ============================================================
   ASSETS — Update these paths only
   ============================================================ */
import heroImage from '../../assets/Images/designer3.jpg';

// Videos
import video3 from '../../assets/video/nnb1.mp4';

// Images nb1 to nb16
import nb1 from '../../assets/Images/nb1.jpg';
import nb2 from '../../assets/Images/nb18.jpg';
import nb3 from '../../assets/Images/nb19.jpg';
import nb4 from '../../assets/Images/nb4.jpg';
import nb5 from '../../assets/Images/nb5.jpg';
import nb6 from '../../assets/Images/nb6.jpg';
import nb7 from '../../assets/Images/nb7.jpg';
import nb8 from '../../assets/Images/nb8.jpg';
import nb9 from '../../assets/Images/nb9.jpg';
import nb10 from '../../assets/Images/nb10.jpg';
import nb11 from '../../assets/Images/nb11.jpg';
import nb12 from '../../assets/Images/nb12.jpg';
import nb13 from '../../assets/Images/nb13.jpg';
import nb14 from '../../assets/Images/nb14.jpg';
import nb15 from '../../assets/Images/nb15.jpg';
import nb16 from '../../assets/Images/nb16.jpg';

// Images for baby shower (nb2, nb3)
import nb2_babyshower from '../../assets/Images/nb2.jpg';
import nb3_babyshower from '../../assets/Images/nb3.jpg';

// Distribution cards from nb2 to nb10
import card1 from '../../assets/Images/nbv2.jpg';
import card2 from '../../assets/Images/nbv3.jpg';
import card3 from '../../assets/Images/nbv4.jpg';
import card4 from '../../assets/Images/nbv5.jpg';
import card5 from '../../assets/Images/nbv6.jpg';
import card6 from '../../assets/Images/nbv7.jpg';
import card7 from '../../assets/Images/nbv8.jpg';
import card8 from '../../assets/Images/nbv9.jpg';
import card9 from '../../assets/Images/nbv10.jpg';

const allImages = [nb1, nb2, nb3, nb4, nb5, nb6, nb7, nb8, nb9, nb10, nb11, nb12, nb13, nb14, nb15, nb16];

// Girls images (nb1 to nb8)
const girlsImages = [nb1, nb2, nb3, nb4, nb5, nb6, nb7, nb8];

// Boys images (nb9 to nb16)
const boysImages = [nb9, nb10, nb11, nb12, nb13, nb14, nb15, nb16];

// Demo data — booked dates for the month
const today0 = new Date();
const pad = (n) => String(n).padStart(2, '0');
const busyDates = [9, 13, 18, 22, 27].map(
  (d) => `${today0.getFullYear()}-${pad(today0.getMonth() + 1)}-${pad(d)}`
);

const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];
const TIME_SLOTS = ['10:00 AM', '12:00 PM', '2:00 PM', '4:00 PM', '6:00 PM'];

// Elegant palette — Cold yellow leaning towards white with navy
const COLORS = {
  bg: '#FFFDF5',
  bgLight: '#FFFBF0',
  surface: '#FFF8E8',
  surfaceDark: '#F5F0E0',
  deepGreen: '#1A2A4A',
  deepGreenLight: '#2A3A5A',
  mediumGreen: '#4A5A7A',
  lightGreen: '#7A8AAA',
  cream: '#F5F0E8',
  gold: '#F5E6C8',
  goldLight: '#FAF0E0',
  goldDark: '#E8D8B8',
  goldSoft: 'rgba(26,42,74,0.08)',
  goldGlow: 'rgba(26,42,74,0.05)',
  goldText: '#1A2A4A',
  burgundy: '#1A2A4A',
  burgundyLight: '#2A3A6A',
  burgundyDark: '#0A1A3A',
  busy: '#7A8AAA',
  muted: '#AAB0C0',
  white: '#FFFFFF',
  navy: '#1A2A4A',
  navyLight: '#2A3A6A',
  goldNavy: '#D4C8A0',
  babyPink: '#FFE4E8',
  babyBlue: '#E4EEFF',
  silver: '#C0C0C0',
  silverLight: '#E8E8E8',
  silverGlow: 'rgba(192,192,192,0.3)',
  balloon1: '#FFB6C1',
  balloon2: '#FFD1DC',
  balloon3: '#E8D5F5',
  balloon4: '#B5D8EB',
  balloon5: '#FADADD',
};

/* ============================================================
   SCROLL REVEAL HELPER
   ============================================================ */
function ScrollReveal({ children, delay = 0, y = 34, sx = {}, triggerOnce = true }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          if (triggerOnce) observer.unobserve(el);
        } else if (!triggerOnce) {
          setVisible(false);
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [triggerOnce]);

  return (
    <Box
      ref={ref}
      sx={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : `translateY(${y}px)`,
        transition: `opacity .9s ease ${delay}s, transform .9s cubic-bezier(.22,1,.36,1) ${delay}s`,
        ...sx,
      }}
    >
      {children}
    </Box>
  );
}

/* ============================================================
   MAIN PAGE
   ============================================================ */
export default function Newborn({ designer }) {
  const d = designer || {
    id: 3,
    name: "Maya",
    role: "Newborn Aesthetic Stylist",
    desc: "Maya creates elegant newborn photography setups with a touch of luxury and warmth.",
    video: video3,
    project: { title: "Newborn Setup", page: "/events/newborn" },
  };

  const [dialogOpen, setDialogOpen] = useState(false);
  const [bookingDate, setBookingDate] = useState(null);

  const openBooking = (date = null) => {
    setBookingDate(date);
    setDialogOpen(true);
  };

  return (
    <Box sx={{ bgcolor: COLORS.bg, color: COLORS.navy, fontFamily: "'Cormorant Garamond', serif", overflowX: 'hidden' }}>
      <Navbar />
      <Hero d={d} />
      <IntroWithVideo video={video3} />
      <GirlsGallery images={girlsImages} />
      <BoysGallery images={boysImages} />
      <BabyShowerSection />
      <DistributionCards />
      <CalendarSection onSelectDate={(date) => openBooking(date)} />
      <BookingDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        designerName={d.name}
        selectedDate={bookingDate}
      />
      <Footer />
    </Box>
  );
}

/* ============================================================
   SECTION 1 — HERO (Image Left, Text Right)
   ============================================================ */
function Hero({ d }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
        alignItems: 'center',
        justifyContent: 'center',
        gap: { xs: 4, md: 10 },
        px: { xs: 4, md: 12 },
        py: 10,
        position: 'relative',
        overflow: 'hidden',
        background: `linear-gradient(135deg, ${COLORS.navy} 0%, ${COLORS.navyLight} 30%, ${COLORS.mediumGreen} 60%, ${COLORS.bg} 100%)`,
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'radial-gradient(ellipse at center, rgba(255,255,248,0.08) 0%, transparent 70%)',
          animation: 'pulseGlow 4s ease-in-out infinite',
        },
        '@keyframes pulseGlow': {
          '0%, 100%': { opacity: 0.3 },
          '50%': { opacity: 0.7 },
        },
      }}
    >
      {/* Floating particles */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          pointerEvents: 'none',
          zIndex: 0,
          '& .particle': {
            position: 'absolute',
            borderRadius: '50%',
            background: COLORS.gold,
            animation: 'floatParticle 8s ease-in-out infinite',
            opacity: 0.15,
          },
          '@keyframes floatParticle': {
            '0%, 100%': { transform: 'translateY(0) translateX(0) scale(1)' },
            '25%': { transform: 'translateY(-30px) translateX(15px) scale(1.2)' },
            '50%': { transform: 'translateY(-15px) translateX(-15px) scale(0.8)' },
            '75%': { transform: 'translateY(20px) translateX(20px) scale(1.1)' },
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

      {/* Image */}
      <Box
        sx={{
          width: { xs: 280, md: 420 },
          height: { xs: 280, md: 420 },
          borderRadius: '50%',
          border: `3px solid ${COLORS.gold}`,
          padding: '12px',
          flexShrink: 0,
          opacity: mounted ? 1 : 0,
          transform: mounted ? 'scale(1)' : 'scale(.85)',
          transition: 'opacity 1s ease, transform 1s cubic-bezier(.22,1,.36,1)',
          position: 'relative',
          zIndex: 1,
          boxShadow: '0 20px 60px rgba(255,255,248,0.15)',
          animation: mounted ? 'floatImage 6s ease-in-out infinite' : 'none',
          '@keyframes floatImage': {
            '0%, 100%': { transform: 'translateY(0)' },
            '50%': { transform: 'translateY(-12px)' },
          },
        }}
      >
        <Box
          component="img"
          src={heroImage}
          alt={d.name}
          sx={{
            width: '100%',
            height: '100%',
            borderRadius: '50%',
            objectFit: 'cover',
            transition: 'transform .6s cubic-bezier(.22,1,.36,1)',
            '&:hover': { transform: 'scale(1.04)' },
          }}
        />
      </Box>

      {/* Text */}
      <Box
        sx={{
          maxWidth: 560,
          textAlign: { xs: 'center', md: 'left' },
          opacity: mounted ? 1 : 0,
          transform: mounted ? 'translateY(0)' : 'translateY(24px)',
          transition: 'opacity 1s ease .2s, transform 1s cubic-bezier(.22,1,.36,1) .2s',
          position: 'relative',
          zIndex: 1,
        }}
      >
        <Typography sx={{ color: COLORS.gold, letterSpacing: 8, fontFamily: 'sans-serif', fontSize: 18, mb: 2, fontWeight: 700 }}>
          {d.role.toUpperCase()}
        </Typography>
        <Typography variant="h1" sx={{ fontSize: { xs: '3.2rem', md: '5.2rem' }, lineHeight: 1.05, mb: 3, color: COLORS.cream }}>
          {d.name}
        </Typography>
        <Typography sx={{ color: COLORS.cream, fontSize: { xs: '1.1rem', md: '1.3rem' }, lineHeight: 1.8, fontFamily: 'sans-serif', fontWeight: 300, opacity: 0.9 }}>
          {d.desc}
        </Typography>
        <Box sx={{ mt: 3, display: 'flex', gap: 1.5, justifyContent: { xs: 'center', md: 'flex-start' }, flexWrap: 'wrap' }}>
          <Chip
            label="Newborn Expert"
            sx={{ color: COLORS.gold, borderColor: COLORS.gold, bgcolor: 'rgba(255,255,248,0.1)', fontFamily: 'sans-serif', fontWeight: 700, fontSize: '0.95rem' }}
          />
          <Chip
            label="5+ Years"
            sx={{ color: COLORS.gold, borderColor: COLORS.gold, bgcolor: 'rgba(255,255,248,0.1)', fontFamily: 'sans-serif', fontWeight: 700, fontSize: '0.95rem' }}
          />
          <Chip
            label="200+ Sessions"
            sx={{ color: COLORS.gold, borderColor: COLORS.gold, bgcolor: 'rgba(255,255,248,0.1)', fontFamily: 'sans-serif', fontWeight: 700, fontSize: '0.95rem' }}
          />
        </Box>
      </Box>
    </Box>
  );
}

/* ============================================================
   SECTION 1.5 — INTRO WITH VIDEO (With White Floating Bubbles)
   ============================================================ */
function IntroWithVideo({ video }) {
  return (
    <Box
      sx={{
        px: { xs: 4, md: 8 },
        py: { xs: 6, md: 10 },
        background: `linear-gradient(180deg, ${COLORS.surfaceDark} 0%, ${COLORS.bgLight} 100%)`,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* White Floating Bubbles Background - More bubbles */}
      <WhiteBubblesBackground count={40} />
      
      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        {/* Title + Paragraph */}
        <ScrollReveal>
          <Box sx={{ textAlign: 'center', mb: { xs: 4, md: 6 } }}>
            <Typography
              variant="h2"
              sx={{
                fontSize: { xs: '2rem', md: '3.2rem' },
                fontWeight: 700,
                color: COLORS.navy,
                fontFamily: "'Cormorant Garamond', serif",
                mb: 2,
                letterSpacing: 1,
              }}
            >
              A New Beginning
            </Typography>
            <Box
              sx={{
                width: 60,
                height: 3,
                bgcolor: COLORS.navy,
                mx: 'auto',
                mb: 3,
                borderRadius: 2,
              }}
            />
            <Typography
              sx={{
                fontSize: { xs: '1rem', md: '1.3rem' },
                lineHeight: 2,
                color: COLORS.navyLight,
                fontFamily: "'Cormorant Garamond', serif",
                fontWeight: 400,
                letterSpacing: 0.5,
                maxWidth: 800,
                mx: 'auto',
              }}
            >
              Welcome to a world where every tiny detail tells a story of love, warmth, and new beginnings. 
              Our newborn photography captures the purest moments of innocence, transforming fleeting seconds 
              into timeless treasures. From delicate curls to tiny toes, each image is crafted with care and 
              artistry, preserving the magic of your baby's first days forever. Let us create memories that 
              will be cherished for generations to come.
            </Typography>
          </Box>
        </ScrollReveal>

        {/* Video - same background, no shadow */}
        <ScrollReveal delay={0.15} y={30}>
          <Box
            sx={{
              position: 'relative',
              width: '100%',
              aspectRatio: '21 / 9',
              overflow: 'hidden',
              bgcolor: 'transparent',
              borderRadius: { xs: 0, md: 3 },
              mx: 'auto',
              maxWidth: { xs: '100%', md: '90%' },
            }}
          >
            <Box
              component="video"
              src={video}
              autoPlay
              muted
              loop
              playsInline
              sx={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </Box>
        </ScrollReveal>
      </Container>
    </Box>
  );
}

/* ============================================================
   WHITE BUBBLES BACKGROUND — White floating bubbles only
   ============================================================ */
function WhiteBubblesBackground({ count = 30 }) {
  return (
    <Box
      sx={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        pointerEvents: 'none',
        zIndex: 0,
        '& .wbubble': {
          position: 'absolute',
          borderRadius: '50%',
          animation: 'whiteBubbleFloat 15s ease-in-out infinite',
          opacity: 0.15,
          border: '1px solid rgba(255,255,255,0.5)',
          boxShadow: 'inset -10px -10px 30px rgba(0,0,0,0.02), inset 10px 10px 30px rgba(255,255,255,0.3)',
          background: 'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.6) 0%, rgba(255,255,255,0.1) 70%, transparent 100%)',
          '&::after': {
            content: '""',
            position: 'absolute',
            top: '15%',
            left: '25%',
            width: '25%',
            height: '25%',
            borderRadius: '50%',
            background: 'rgba(255,255,255,0.6)',
            transform: 'rotate(-30deg)',
          },
        },
        '@keyframes whiteBubbleFloat': {
          '0%': { 
            transform: 'translateY(0) translateX(0) scale(1)',
            opacity: 0.1 
          },
          '15%': { 
            transform: 'translateY(-60px) translateX(30px) scale(1.15)',
            opacity: 0.25 
          },
          '30%': { 
            transform: 'translateY(-140px) translateX(-25px) scale(0.9)',
            opacity: 0.2 
          },
          '45%': { 
            transform: 'translateY(-220px) translateX(40px) scale(1.1)',
            opacity: 0.3 
          },
          '60%': { 
            transform: 'translateY(-300px) translateX(-35px) scale(0.95)',
            opacity: 0.2 
          },
          '75%': { 
            transform: 'translateY(-380px) translateX(25px) scale(1.05)',
            opacity: 0.25 
          },
          '100%': { 
            transform: 'translateY(-500px) translateX(-15px) scale(1)',
            opacity: 0.05 
          },
        },
      }}
    >
      {[...Array(count)].map((_, i) => {
        const size = 20 + Math.random() * 80;
        return (
          <Box
            key={i}
            className="wbubble"
            sx={{
              bottom: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              width: size,
              height: size * (1 + Math.random() * 0.2),
              animationDelay: `${Math.random() * 15}s`,
              animationDuration: `${12 + Math.random() * 10}s`,
              '&::after': {
                width: `${size * 0.25}px`,
                height: `${size * 0.25}px`,
                top: `${size * 0.15}px`,
                left: `${size * 0.25}px`,
              },
            }}
          />
        );
      })}
    </Box>
  );
}

/* ============================================================
   SECTION 2 — GIRLS GALLERY (Princess Collection) - WITH BUBBLES
   ============================================================ */
function GirlsGallery({ images }) {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const imageTexts = [
    { title: "Little Princess", subtitle: "Elegance in every tiny detail", desc: "Capturing the beauty of baby girls with soft pastels and delicate touches." },
    { title: "Precious Pearl", subtitle: "A treasure of innocence", desc: "Creating timeless images that reflect pure grace and charm." },
    { title: "Rose Bud", subtitle: "Blossoming with love", desc: "Soft petals and gentle light create magical moments." },
    { title: "Sweet Dreams", subtitle: "Where magic meets reality", desc: "Whimsical settings that transport you to a world of wonder." },
    { title: "Crystal Princess", subtitle: "Pure as a diamond", desc: "Every image sparkles with the beauty of new life." },
    { title: "Gentle Soul", subtitle: "Tender moments captured", desc: "The softest touches create the most lasting memories." },
    { title: "Golden Girl", subtitle: "Radiating warmth and joy", desc: "Golden light highlights the beauty of these precious moments." },
    { title: "Dream Weaver", subtitle: "Crafting magical memories", desc: "Every session is a masterpiece of love and artistry." },
  ];

  return (
    <Box
      ref={sectionRef}
      sx={{
        px: { xs: 2, md: 6 },
        py: { xs: 8, md: 14 },
        background: isVisible 
          ? `linear-gradient(180deg, ${COLORS.bg} 0%, ${COLORS.babyPink} 30%, ${COLORS.babyPink} 70%, ${COLORS.bg} 100%)`
          : `linear-gradient(180deg, ${COLORS.bg} 0%, ${COLORS.bgLight} 100%)`,
        transition: 'background 1.2s cubic-bezier(.22,1,.36,1)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* White Bubbles Background for Girls Gallery */}
      <WhiteBubblesBackground count={30} />

      <Container maxWidth="xl" sx={{ position: 'relative', zIndex: 1 }}>
        <ScrollReveal>
          <Box sx={{ textAlign: 'center', mb: 6 }}>
            <Typography sx={{ color: COLORS.navy, letterSpacing: 8, fontFamily: 'sans-serif', fontSize: 16, fontWeight: 700, mb: 1 }}>
              FOR HER
            </Typography>
            <Typography variant="h2" sx={{ fontSize: { xs: '2rem', md: '3.5rem' }, color: COLORS.navy, fontWeight: 600 }}>
              Princess Collection
            </Typography>
            <Box sx={{ width: 80, height: 2, bgcolor: COLORS.navy, mx: 'auto', mt: 2 }} />
            <Typography sx={{ color: COLORS.navyLight, fontFamily: 'sans-serif', fontSize: 16, mt: 2, opacity: 0.7 }}>
              Celebrating the beauty and grace of baby girls
            </Typography>
          </Box>
        </ScrollReveal>

        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: 'repeat(2, 1fr)', md: 'repeat(4, 1fr)' },
            gap: { xs: 2, md: 3 },
          }}
        >
          {images.map((src, i) => (
            <AnimatedCard key={i} delay={i * 0.1}>
              <Box
                onMouseEnter={() => setHoveredIndex(i)}
                onMouseLeave={() => setHoveredIndex(null)}
                sx={{
                  aspectRatio: '3 / 4',
                  borderRadius: 3,
                  overflow: 'hidden',
                  border: `2px solid ${COLORS.goldSoft}`,
                  position: 'relative',
                  cursor: 'pointer',
                  transform: hoveredIndex === i ? 'scale(1.06) rotate(1deg)' : 'scale(1) rotate(0deg)',
                  transition: 'all 0.6s cubic-bezier(.22,1,.36,1)',
                  boxShadow: hoveredIndex === i ? '0 20px 60px rgba(26,42,74,0.15)' : 'none',
                  '&:hover': { borderColor: COLORS.navy },
                }}
              >
                <Box
                  component="img"
                  src={src}
                  alt={`Girl ${i + 1}`}
                  sx={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transition: 'transform .8s cubic-bezier(.22,1,.36,1)',
                    transform: hoveredIndex === i ? 'scale(1.15)' : 'scale(1)',
                  }}
                />

                <Box
                  sx={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(to top, rgba(26,42,74,0.85) 0%, rgba(26,42,74,0.1) 40%, transparent 100%)',
                    opacity: hoveredIndex === i ? 1 : 0,
                    transition: 'opacity 0.5s ease',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'flex-end',
                    padding: 3,
                  }}
                >
                  <Typography
                    sx={{
                      color: COLORS.gold,
                      fontFamily: 'sans-serif',
                      fontSize: { xs: 14, md: 20 },
                      fontWeight: 700,
                      transform: hoveredIndex === i ? 'translateY(0)' : 'translateY(30px)',
                      transition: 'transform 0.5s cubic-bezier(.22,1,.36,1) 0.1s',
                    }}
                  >
                    {imageTexts[i].title}
                  </Typography>
                  <Typography
                    sx={{
                      color: COLORS.goldLight,
                      fontFamily: 'sans-serif',
                      fontSize: { xs: 12, md: 14 },
                      opacity: 0.8,
                      transform: hoveredIndex === i ? 'translateY(0)' : 'translateY(30px)',
                      transition: 'transform 0.5s cubic-bezier(.22,1,.36,1) 0.2s',
                    }}
                  >
                    {imageTexts[i].subtitle}
                  </Typography>
                  <Typography
                    sx={{
                      color: COLORS.cream,
                      fontFamily: 'sans-serif',
                      fontSize: { xs: 11, md: 13 },
                      opacity: 0.7,
                      transform: hoveredIndex === i ? 'translateY(0)' : 'translateY(30px)',
                      transition: 'transform 0.5s cubic-bezier(.22,1,.36,1) 0.3s',
                      maxWidth: '90%',
                    }}
                  >
                    {imageTexts[i].desc}
                  </Typography>
                </Box>
              </Box>
            </AnimatedCard>
          ))}
        </Box>
      </Container>
    </Box>
  );
}

/* ============================================================
   SECTION 3 — BOYS GALLERY (Prince Collection) - WITH BUBBLES
   ============================================================ */
function BoysGallery({ images }) {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const imageTexts = [
    { title: "Little Prince", subtitle: "Royalty in every detail", desc: "Capturing the strength and charm of baby boys with elegance." },
    { title: "Brave Heart", subtitle: "Courage and grace", desc: "Every image tells a story of adventure and love." },
    { title: "Star Warrior", subtitle: "Shining bright", desc: "Creating moments that sparkle with joy and wonder." },
    { title: "Adventure Awaits", subtitle: "Journey of a lifetime", desc: "Whimsical settings that inspire dreams and imagination." },
    { title: "Gentle Knight", subtitle: "Strength in softness", desc: "Tender moments captured with artistic excellence." },
    { title: "Ocean Soul", subtitle: "Deep as the sea", desc: "Capturing the calm and depth of a newborn's spirit." },
    { title: "Sky Explorer", subtitle: "Reaching for the stars", desc: "Creating magical memories that soar." },
    { title: "Future King", subtitle: "Born to lead", desc: "Every session is a celebration of potential and love." },
  ];

  return (
    <Box
      ref={sectionRef}
      sx={{
        px: { xs: 2, md: 6 },
        py: { xs: 8, md: 14 },
        background: isVisible 
          ? `linear-gradient(180deg, ${COLORS.bgLight} 0%, ${COLORS.babyBlue} 30%, ${COLORS.babyBlue} 70%, ${COLORS.bgLight} 100%)`
          : `linear-gradient(180deg, ${COLORS.bgLight} 0%, ${COLORS.surface} 100%)`,
        transition: 'background 1.2s cubic-bezier(.22,1,.36,1)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* White Bubbles Background for Boys Gallery */}
      <WhiteBubblesBackground count={30} />

      <Container maxWidth="xl" sx={{ position: 'relative', zIndex: 1 }}>
        <ScrollReveal>
          <Box sx={{ textAlign: 'center', mb: 6 }}>
            <Typography sx={{ color: COLORS.navy, letterSpacing: 8, fontFamily: 'sans-serif', fontSize: 16, fontWeight: 700, mb: 1 }}>
              FOR HIM
            </Typography>
            <Typography variant="h2" sx={{ fontSize: { xs: '2rem', md: '3.5rem' }, color: COLORS.navy, fontWeight: 600 }}>
              Prince Collection
            </Typography>
            <Box sx={{ width: 80, height: 2, bgcolor: COLORS.navy, mx: 'auto', mt: 2 }} />
            <Typography sx={{ color: COLORS.navyLight, fontFamily: 'sans-serif', fontSize: 16, mt: 2, opacity: 0.7 }}>
              Celebrating the strength and charm of baby boys
            </Typography>
          </Box>
        </ScrollReveal>

        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: 'repeat(2, 1fr)', md: 'repeat(4, 1fr)' },
            gap: { xs: 2, md: 3 },
          }}
        >
          {images.map((src, i) => (
            <AnimatedCard key={i} delay={i * 0.1}>
              <Box
                onMouseEnter={() => setHoveredIndex(i)}
                onMouseLeave={() => setHoveredIndex(null)}
                sx={{
                  aspectRatio: '3 / 4',
                  borderRadius: 3,
                  overflow: 'hidden',
                  border: `2px solid ${COLORS.goldSoft}`,
                  position: 'relative',
                  cursor: 'pointer',
                  transform: hoveredIndex === i ? 'scale(1.06) rotate(-1deg)' : 'scale(1) rotate(0deg)',
                  transition: 'all 0.6s cubic-bezier(.22,1,.36,1)',
                  boxShadow: hoveredIndex === i ? '0 20px 60px rgba(26,42,74,0.15)' : 'none',
                  '&:hover': { borderColor: COLORS.navy },
                }}
              >
                <Box
                  component="img"
                  src={src}
                  alt={`Boy ${i + 1}`}
                  sx={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transition: 'transform .8s cubic-bezier(.22,1,.36,1)',
                    transform: hoveredIndex === i ? 'scale(1.15)' : 'scale(1)',
                  }}
                />

                <Box
                  sx={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(to top, rgba(26,42,74,0.85) 0%, rgba(26,42,74,0.1) 40%, transparent 100%)',
                    opacity: hoveredIndex === i ? 1 : 0,
                    transition: 'opacity 0.5s ease',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'flex-end',
                    padding: 3,
                  }}
                >
                  <Typography
                    sx={{
                      color: COLORS.gold,
                      fontFamily: 'sans-serif',
                      fontSize: { xs: 14, md: 20 },
                      fontWeight: 700,
                      transform: hoveredIndex === i ? 'translateY(0)' : 'translateY(30px)',
                      transition: 'transform 0.5s cubic-bezier(.22,1,.36,1) 0.1s',
                    }}
                  >
                    {imageTexts[i].title}
                  </Typography>
                  <Typography
                    sx={{
                      color: COLORS.goldLight,
                      fontFamily: 'sans-serif',
                      fontSize: { xs: 12, md: 14 },
                      opacity: 0.8,
                      transform: hoveredIndex === i ? 'translateY(0)' : 'translateY(30px)',
                      transition: 'transform 0.5s cubic-bezier(.22,1,.36,1) 0.2s',
                    }}
                  >
                    {imageTexts[i].subtitle}
                  </Typography>
                  <Typography
                    sx={{
                      color: COLORS.cream,
                      fontFamily: 'sans-serif',
                      fontSize: { xs: 11, md: 13 },
                      opacity: 0.7,
                      transform: hoveredIndex === i ? 'translateY(0)' : 'translateY(30px)',
                      transition: 'transform 0.5s cubic-bezier(.22,1,.36,1) 0.3s',
                      maxWidth: '90%',
                    }}
                  >
                    {imageTexts[i].desc}
                  </Typography>
                </Box>
              </Box>
            </AnimatedCard>
          ))}
        </Box>
      </Container>
    </Box>
  );
}

/* ============================================================
   ANIMATED CARD — Continuous animation without scroll
   ============================================================ */
function AnimatedCard({ children, delay = 0 }) {
  return (
    <Box
      sx={{
        animation: `cardFloat 4s ease-in-out ${delay}s infinite`,
        '@keyframes cardFloat': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: `translateY(-8px)` },
        },
      }}
    >
      {children}
    </Box>
  );
}

/* ============================================================
   SECTION 4 — BABY SHOWER SECTION (No Bubbles - Clean Background)
   ============================================================ */
function BabyShowerSection() {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const babyShowerCards = [
    {
      id: 1,
      image: nb2_babyshower,
      title: "Celebrating New Life",
      desc: "Baby showers are a beautiful tradition that celebrates the arrival of a new life. Every detail is designed to create lasting memories."
    },
    {
      id: 2,
      image: nb3_babyshower,
      title: "Creating Magical Moments",
      desc: "The joy of a baby shower lies in the little details - the soft pastels, the delicate decorations, and the warmth of family and friends."
    },
  ];

  return (
    <Box
      sx={{
        px: { xs: 2, md: 4 },
        py: { xs: 4, md: 6 },
        background: `linear-gradient(180deg, ${COLORS.surface} 0%, ${COLORS.bgLight} 100%)`,
        position: 'relative',
        overflow: 'hidden',
        minHeight: '80vh',
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        {/* Header - Navy Text */}
        <ScrollReveal>
          <Box sx={{ textAlign: 'center', mb: { xs: 3, md: 4 } }}>
            <Typography 
              sx={{ 
                color: COLORS.navy, 
                letterSpacing: 8, 
                fontFamily: 'sans-serif', 
                fontSize: { xs: 10, md: 12 }, 
                fontWeight: 700, 
                mb: 0.5,
                opacity: 0.6,
              }}
            >
              CELEBRATION
            </Typography>
            <Typography 
              variant="h2" 
              sx={{ 
                fontSize: { xs: '1.6rem', md: '2.2rem' }, 
                color: COLORS.navy, 
                fontWeight: 600,
                fontFamily: "'Cormorant Garamond', serif",
                letterSpacing: 2,
              }}
            >
              Baby Shower Magic
            </Typography>
            <Box sx={{ width: 50, height: 2, bgcolor: COLORS.navy, mx: 'auto', mt: 1, opacity: 0.3 }} />
          </Box>
        </ScrollReveal>

        {/* 2 Cards Side by Side - Taller */}
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
            gap: { xs: 2, md: 3 },
            alignItems: 'stretch',
          }}
        >
          {babyShowerCards.map((card, i) => (
            <BabyShowerFloatingCard key={i} delay={i * 0.1}>
              <Box
                onMouseEnter={() => setHoveredIndex(i)}
                onMouseLeave={() => setHoveredIndex(null)}
                sx={{
                  borderRadius: 3,
                  overflow: 'hidden',
                  background: 'rgba(255,255,255,0.2)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255,255,255,0.25)',
                  transition: 'all 0.5s cubic-bezier(.22,1,.36,1)',
                  transform: hoveredIndex === i ? 'translateY(-6px) scale(1.02)' : 'translateY(0) scale(1)',
                  cursor: 'pointer',
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  boxShadow: hoveredIndex === i 
                    ? '0 16px 48px rgba(0,0,0,0.1)' 
                    : '0 4px 20px rgba(0,0,0,0.04)',
                }}
              >
                {/* Image - Taller */}
                <Box
                  sx={{
                    width: '100%',
                    aspectRatio: '4 / 5',
                    overflow: 'hidden',
                    position: 'relative',
                    flexShrink: 0,
                  }}
                >
                  <Box
                    component="img"
                    src={card.image}
                    alt={card.title}
                    sx={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      transition: 'transform 0.8s cubic-bezier(.22,1,.36,1)',
                      transform: hoveredIndex === i ? 'scale(1.08)' : 'scale(1)',
                    }}
                  />
                  {/* Gradient overlay at bottom for text */}
                  <Box
                    sx={{
                      position: 'absolute',
                      bottom: 0,
                      left: 0,
                      right: 0,
                      height: '55%',
                      background: 'linear-gradient(to top, rgba(0,0,0,0.65) 0%, transparent 100%)',
                      zIndex: 1,
                    }}
                  />
                </Box>

                {/* Text - On the image from bottom */}
                <Box
                  sx={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    p: { xs: 2, md: 3 },
                    zIndex: 2,
                  }}
                >
                  <Typography
                    sx={{
                      color: '#FFFFFF',
                      fontFamily: "'Cormorant Garamond', serif",
                      fontSize: { xs: 16, md: 22 },
                      fontWeight: 700,
                      letterSpacing: 0.5,
                      lineHeight: 1.2,
                      mb: 0.5,
                      textShadow: '0 2px 15px rgba(0,0,0,0.3)',
                    }}
                  >
                    {card.title}
                  </Typography>
                  <Typography
                    sx={{
                      color: 'rgba(255,255,255,0.85)',
                      fontFamily: 'sans-serif',
                      fontSize: { xs: 10, md: 12 },
                      lineHeight: 1.6,
                      opacity: 0.85,
                      textShadow: '0 2px 10px rgba(0,0,0,0.2)',
                      display: '-webkit-box',
                      WebkitLineClamp: 3,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden',
                    }}
                  >
                    {card.desc}
                  </Typography>
                </Box>
              </Box>
            </BabyShowerFloatingCard>
          ))}
        </Box>

        {/* Baby Shower Text Under Cards */}
        <ScrollReveal delay={0.2}>
          <Box sx={{ textAlign: 'center', mt: 3 }}>
            <Typography
              sx={{
                color: COLORS.navy,
                fontFamily: 'sans-serif',
                fontSize: { xs: 10, md: 12 },
                letterSpacing: 6,
                fontWeight: 300,
                textTransform: 'uppercase',
                opacity: 0.35,
              }}
            >
               Celebrating New Beginnings 
            </Typography>
          </Box>
        </ScrollReveal>
      </Container>
    </Box>
  );
}

/* ============================================================
   BABY SHOWER FLOATING CARD — Smooth floating animation
   ============================================================ */
function BabyShowerFloatingCard({ children, delay = 0 }) {
  return (
    <Box
      sx={{
        animation: `babyShowerCardFloat 7s ease-in-out ${delay}s infinite`,
        '@keyframes babyShowerCardFloat': {
          '0%, 100%': { 
            transform: 'translateY(0px)' 
          },
          '50%': { 
            transform: 'translateY(-8px)' 
          },
        },
      }}
    >
      {children}
    </Box>
  );
}
/* ============================================================
   SECTION 5 — DISTRIBUTION CARDS (Taller Cards - Full Image + Text Overlay)
   ============================================================ */
function DistributionCards() {
  const [currentPage, setCurrentPage] = useState(0);
  
  const cards = [
    { id: 1, image: card1, title: "Elegant Invitation", subtitle: "Set the tone for your celebration" },
    { id: 2, image: card2, title: "Thank You Cards", subtitle: "Express your gratitude" },
    { id: 3, image: card3, title: "Place Cards", subtitle: "Seating with style" },
    { id: 4, image: card4, title: "Menu Cards", subtitle: "Dining in elegance" },
    { id: 5, image: card5, title: "Programs", subtitle: "Guide your guests" },
    { id: 6, image: card6, title: "Table Numbers", subtitle: "Navigate with ease" },
    { id: 7, image: card7, title: "Placemats", subtitle: "Set the scene" },
    { id: 8, image: card8, title: "Napkins", subtitle: "Details that matter" },
    { id: 9, image: card9, title: "Gift Tags", subtitle: "Personalize your presents" },
  ];

  const cardsPerPage = 3;
  const totalPages = Math.ceil(cards.length / cardsPerPage);
  const currentCards = cards.slice(currentPage * cardsPerPage, (currentPage + 1) * cardsPerPage);

  const nextPage = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <Box
      sx={{
        px: { xs: 2, md: 6 },
        py: { xs: 6, md: 10 },
        background: `linear-gradient(180deg, ${COLORS.surface} 0%, ${COLORS.bgLight} 100%)`,
        position: 'relative',
        overflow: 'hidden',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <WhiteBubblesBackground count={30} />
      
      <Container maxWidth="xl" sx={{ position: 'relative', zIndex: 1 }}>
        <ScrollReveal>
          <Box sx={{ textAlign: 'center', mb: 5 }}>
            <Typography sx={{ color: COLORS.navy, letterSpacing: 8, fontFamily: 'sans-serif', fontSize: 14, fontWeight: 700, mb: 0.5 }}>
              COLLECTION
            </Typography>
            <Typography variant="h2" sx={{ fontSize: { xs: '1.6rem', md: '2.2rem' }, color: COLORS.navy, fontWeight: 600, fontFamily: "'Cormorant Garamond', serif" }}>
              Distribution Cards
            </Typography>
            <Box sx={{ width: 50, height: 2, bgcolor: COLORS.navy, mx: 'auto', mt: 1 }} />
            <Typography sx={{ color: COLORS.navyLight, fontFamily: 'sans-serif', fontSize: 14, mt: 1.5, opacity: 0.7 }}>
              Premium quality cards for your special moments
            </Typography>
          </Box>
        </ScrollReveal>

        {/* Cards Container - White Book Background */}
        <Box
          sx={{
            maxWidth: 1100,
            mx: 'auto',
            bgcolor: '#FFFFFF',
            borderRadius: 4,
            boxShadow: '0 8px 60px rgba(26,42,74,0.06), 0 2px 20px rgba(26,42,74,0.03)',
            overflow: 'hidden',
            border: '1px solid rgba(26,42,74,0.04)',
            position: 'relative',
          }}
        >
          <Box sx={{ p: { xs: 2, md: 4 } }}>
            {/* Cards Grid */}
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' },
                gap: { xs: 2, md: 3 },
              }}
            >
              {currentCards.map((card, index) => (
                <TallCardItem key={card.id} card={card} delay={index * 0.1} />
              ))}
            </Box>

            {/* Page Navigation */}
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                mt: 4,
                pt: 3,
                borderTop: '1px solid rgba(26,42,74,0.06)',
              }}
            >
              <Button
                onClick={prevPage}
                disabled={currentPage === 0}
                sx={{
                  fontFamily: 'sans-serif',
                  color: COLORS.navy,
                  opacity: currentPage === 0 ? 0.3 : 0.7,
                  '&:hover': {
                    opacity: 1,
                    bgcolor: 'rgba(26,42,74,0.05)',
                  },
                }}
              >
                <ChevronLeftRoundedIcon /> Previous
              </Button>
              
              <Typography
                sx={{
                  fontFamily: 'sans-serif',
                  fontSize: 13,
                  color: COLORS.navyLight,
                  opacity: 0.6,
                }}
              >
                Page {currentPage + 1} of {totalPages}
              </Typography>
              
              <Button
                onClick={nextPage}
                disabled={currentPage === totalPages - 1}
                sx={{
                  fontFamily: 'sans-serif',
                  color: COLORS.navy,
                  opacity: currentPage === totalPages - 1 ? 0.3 : 0.7,
                  '&:hover': {
                    opacity: 1,
                    bgcolor: 'rgba(26,42,74,0.05)',
                  },
                }}
              >
                Next <ChevronRightRoundedIcon />
              </Button>
            </Box>
          </Box>
        </Box>

        {/* Page dots */}
        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1, mt: 3 }}>
          {[...Array(totalPages)].map((_, i) => (
            <Box
              key={i}
              onClick={() => { setCurrentPage(i); }}
              sx={{
                width: 8,
                height: 8,
                borderRadius: '50%',
                bgcolor: currentPage === i ? COLORS.navy : 'rgba(26,42,74,0.15)',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                '&:hover': {
                  bgcolor: currentPage === i ? COLORS.navy : 'rgba(26,42,74,0.3)',
                },
              }}
            />
          ))}
        </Box>
      </Container>
    </Box>
  );
}

/* ============================================================
   TALL CARD ITEM — Taller card with full image and text overlay
   ============================================================ */
function TallCardItem({ card, delay = 0 }) {
  return (
    <Box
      sx={{
        borderRadius: 3,
        overflow: 'hidden',
        bgcolor: '#FFFFFF',
        border: '1px solid rgba(26,42,74,0.06)',
        boxShadow: '0 4px 20px rgba(26,42,74,0.04)',
        transition: 'all 0.4s cubic-bezier(.22,1,.36,1)',
        animation: `cardFadeUp 0.8s ease-out ${delay}s both`,
        '@keyframes cardFadeUp': {
          '0%': { opacity: 0, transform: 'translateY(30px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
        '&:hover': {
          transform: 'translateY(-6px)',
          boxShadow: '0 12px 40px rgba(26,42,74,0.1)',
          borderColor: 'rgba(26,42,74,0.15)',
        },
      }}
    >
      {/* Taller Image */}
      <Box
        sx={{
          width: '100%',
          aspectRatio: '3 / 4',
          overflow: 'hidden',
          position: 'relative',
        }}
      >
        <Box
          component="img"
          src={card.image}
          alt={card.title}
          sx={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transition: 'transform 0.6s cubic-bezier(.22,1,.36,1)',
            '&:hover': {
              transform: 'scale(1.05)',
            },
          }}
        />
        
        {/* Gradient overlay at bottom for text */}
        <Box
          sx={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: '50%',
            background: 'linear-gradient(to top, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.25) 50%, transparent 100%)',
            zIndex: 1,
          }}
        />
        
        {/* Text Content - Overlay on image from bottom */}
        <Box
          sx={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            p: { xs: 2, md: 3 },
            zIndex: 2,
          }}
        >
          <Typography
            sx={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: { xs: 18, md: 24 },
              fontWeight: 700,
              color: '#FFFFFF',
              mb: 0.25,
              textShadow: '0 2px 15px rgba(0,0,0,0.3)',
            }}
          >
            {card.title}
          </Typography>
          <Typography
            sx={{
              fontFamily: 'sans-serif',
              fontSize: { xs: 11, md: 14 },
              color: 'rgba(255,255,255,0.85)',
              fontWeight: 400,
              letterSpacing: 0.5,
              textShadow: '0 2px 10px rgba(0,0,0,0.2)',
            }}
          >
            {card.subtitle}
          </Typography>
          
          {/* Decorative line */}
          <Box
            sx={{
              width: 30,
              height: 2,
              bgcolor: 'rgba(255,255,255,0.4)',
              mt: 1.5,
              transition: 'all 0.4s ease',
            }}
          />
        </Box>
      </Box>
    </Box>
  );
}
/* ============================================================
   SECTION 6 — CALENDAR
   ============================================================ */
function CalendarSection({ onSelectDate }) {
  return (
    <Box
      sx={{
        px: { xs: 3, md: 12 },
        py: { xs: 8, md: 12 },
        background: `linear-gradient(180deg, ${COLORS.surface} 0%, ${COLORS.bgLight} 100%)`,
      }}
    >
      <Container maxWidth="md">
        <ScrollReveal>
          <SectionHeading eyebrow="AVAILABILITY" title="Her Availability This Month" />
        </ScrollReveal>
        <ScrollReveal delay={0.1}>
          <Box sx={{ mt: 6 }}>
            <AvailabilityCalendar busyDates={busyDates} onSelectDate={onSelectDate} />
          </Box>
        </ScrollReveal>
        <Typography sx={{ textAlign: 'center', color: COLORS.navy, fontFamily: 'sans-serif', fontSize: 16, mt: 3, letterSpacing: 2, fontWeight: 700 }}>
          Tap on any available date to book a session
        </Typography>
      </Container>
    </Box>
  );
}

const toKey = (date) =>
  `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;

function AvailabilityCalendar({ busyDates = [], onSelectDate }) {
  const today = useMemo(() => new Date(new Date().setHours(0, 0, 0, 0)), []);
  const [cursor, setCursor] = useState(new Date(today.getFullYear(), today.getMonth(), 1));
  const [fadeIn, setFadeIn] = useState(true);
  const busySet = useMemo(() => new Set(busyDates), [busyDates]);

  const changeMonth = (delta) => {
    setFadeIn(false);
    setTimeout(() => {
      setCursor((c) => new Date(c.getFullYear(), c.getMonth() + delta, 1));
      setFadeIn(true);
    }, 180);
  };

  const cells = useMemo(() => {
    const year = cursor.getFullYear();
    const month = cursor.getMonth();
    const firstDay = new Date(year, month, 1);
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const startOffset = firstDay.getDay();

    const list = [];
    for (let i = 0; i < startOffset; i++) list.push(null);
    for (let dd = 1; dd <= daysInMonth; dd++) list.push(new Date(year, month, dd));
    return list;
  }, [cursor]);

  return (
    <Box
      sx={{
        maxWidth: 640,
        mx: 'auto',
        bgcolor: COLORS.bg,
        border: `1px solid ${COLORS.goldSoft}`,
        borderRadius: 3,
        p: { xs: 2.5, md: 4 },
        boxShadow: '0 8px 32px rgba(26,42,74,0.06)',
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
        <IconButton
          onClick={() => changeMonth(1)}
          sx={{
            color: COLORS.navy,
            '&:hover': { bgcolor: COLORS.navy + '20', transform: 'scale(1.1)' },
            transition: 'all 0.3s ease',
          }}
        >
          <ChevronRightRoundedIcon />
        </IconButton>
        <Typography sx={{ fontSize: '1.5rem', fontFamily: "'Cormorant Garamond', serif", color: COLORS.navy, fontWeight: 600 }}>
          {MONTHS[cursor.getMonth()]} {cursor.getFullYear()}
        </Typography>
        <IconButton
          onClick={() => changeMonth(-1)}
          sx={{
            color: COLORS.navy,
            '&:hover': { bgcolor: COLORS.navy + '20', transform: 'scale(1.1)' },
            transition: 'all 0.3s ease',
          }}
        >
          <ChevronLeftRoundedIcon />
        </IconButton>
      </Box>

      <Fade in={fadeIn} timeout={350}>
        <Box>
          <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', mb: 2 }}>
            {WEEKDAYS.map((w) => (
              <Typography key={w} sx={{ textAlign: 'center', color: COLORS.navy, fontFamily: 'sans-serif', fontSize: 14, fontWeight: 700 }}>
                {w}
              </Typography>
            ))}
          </Box>

          <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: { xs: 0.5, md: 1 } }}>
            {cells.map((date, i) => {
              if (!date) return <Box key={i} />;
              const key = toKey(date);
              const isPast = date < today;
              const isToday = key === toKey(today);
              const isBusy = busySet.has(key);
              const isAvailable = !isPast && !isBusy;

              return (
                <Box
                  key={key}
                  onClick={() => isAvailable && onSelectDate && onSelectDate(date)}
                  sx={{
                    aspectRatio: '1',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: '50%',
                    fontFamily: 'sans-serif',
                    fontSize: { xs: 14, md: 16 },
                    cursor: isAvailable ? 'pointer' : 'default',
                    color: isPast ? COLORS.muted : isBusy ? COLORS.busy : COLORS.navy,
                    bgcolor: isAvailable ? COLORS.navy + '10' : 'transparent',
                    border: isToday ? `2px solid ${COLORS.navy}` : '1px solid transparent',
                    transition: 'all 0.3s ease',
                    '&:hover': isAvailable ? {
                      bgcolor: COLORS.navy + '25',
                      transform: 'scale(1.15)',
                      boxShadow: `0 4px 20px ${COLORS.navy}30`,
                    } : {},
                    fontWeight: isToday ? 700 : 400,
                  }}
                >
                  {date.getDate()}
                </Box>
              );
            })}
          </Box>
        </Box>
      </Fade>

      <Box sx={{ display: 'flex', justifyContent: 'center', gap: 3, mt: 4, flexWrap: 'wrap' }}>
        <Legend color={COLORS.navy} label="Available" />
        <Legend color={COLORS.busy} label="Booked" />
        <Legend color={COLORS.muted} label="Past" />
      </Box>
    </Box>
  );
}

function Legend({ color, label }) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
      <Box sx={{ width: 14, height: 14, borderRadius: '50%', bgcolor: color, boxShadow: `0 2px 8px ${color}40` }} />
      <Typography sx={{ color: COLORS.navyLight, fontFamily: 'sans-serif', fontSize: 15, fontWeight: 600 }}>{label}</Typography>
    </Box>
  );
}

/* ============================================================
   BOOKING DIALOG
   ============================================================ */
const fieldSx = {
  '& .MuiInputBase-root': { color: COLORS.navy, fontFamily: 'sans-serif' },
  '& .MuiInputLabel-root': { color: COLORS.navyLight, fontFamily: 'sans-serif' },
  '& .MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(26,42,74,0.15)' },
  '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: COLORS.navy + '60' },
  '& .Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: COLORS.navy },
};

function BookingDialog({ open, onClose, designerName = '', selectedDate = null }) {
  const [form, setForm] = useState({ name: '', phone: '', email: '', message: '' });
  const [time, setTime] = useState(TIME_SLOTS[0]);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (open) setSubmitted(false);
  }, [open]);

  const handleChange = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const dateLabel = selectedDate
    ? selectedDate.toLocaleDateString('en-US', { weekday: 'long', day: 'numeric', month: 'long' })
    : null;

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="sm"
      PaperProps={{
        sx: {
          bgcolor: COLORS.bg,
          color: COLORS.navy,
          borderRadius: 3,
          border: `1px solid ${COLORS.navy}40`,
          fontFamily: "'Cormorant Garamond', serif",
        },
      }}
    >
      <Box sx={{ p: { xs: 3, md: 4 }, position: 'relative' }}>
        <IconButton onClick={onClose} sx={{ position: 'absolute', top: 12, left: 12, color: COLORS.muted }}>
          <CloseRoundedIcon />
        </IconButton>

        {!submitted ? (
          <>
            <Typography sx={{ fontSize: '1.8rem', mb: 0.5, color: COLORS.navy, fontWeight: 600 }}>Book with {designerName}</Typography>
            {dateLabel && (
              <Chip
                label={dateLabel}
                sx={{ fontFamily: 'sans-serif', bgcolor: COLORS.navy + '10', color: COLORS.navy, mb: 2, fontWeight: 700, fontSize: '0.95rem' }}
              />
            )}
            <Typography sx={{ color: COLORS.navyLight, fontFamily: 'sans-serif', fontSize: 13, mb: 3 }}>
              Fill in your details below and we'll confirm your session shortly.
            </Typography>

            <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
              <TextField label="Full Name" required fullWidth value={form.name} onChange={handleChange('name')} sx={fieldSx} />

              {!selectedDate && (
                <Typography sx={{ color: COLORS.navyLight, fontFamily: 'sans-serif', fontSize: 13 }}>
                  Tip: Select an available date from the calendar above, or mention your preferred timing in the message.
                </Typography>
              )}

              <Box>
                <Typography sx={{ color: COLORS.navyLight, fontFamily: 'sans-serif', fontSize: 13, mb: 1 }}>
                  Preferred Time
                </Typography>
                <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                  {TIME_SLOTS.map((t) => (
                    <Chip
                      key={t}
                      label={t}
                      onClick={() => setTime(t)}
                      sx={{
                        fontFamily: 'sans-serif',
                        cursor: 'pointer',
                        bgcolor: time === t ? COLORS.navy : 'rgba(26,42,74,0.06)',
                        color: time === t ? '#fff' : COLORS.navy,
                        transition: 'all .2s ease',
                        fontWeight: time === t ? 700 : 400,
                        '&:hover': { bgcolor: time === t ? COLORS.navy : 'rgba(26,42,74,0.1)' },
                      }}
                    />
                  ))}
                </Box>
              </Box>

              <TextField label="Phone Number" required fullWidth value={form.phone} onChange={handleChange('phone')} sx={fieldSx} />
              <TextField label="Email Address" type="email" required fullWidth value={form.email} onChange={handleChange('email')} sx={fieldSx} />
              <TextField label="Message (Optional)" multiline minRows={3} fullWidth value={form.message} onChange={handleChange('message')} sx={fieldSx} />

              <Button
                type="submit"
                variant="outlined"
                sx={{
                  fontFamily: 'sans-serif',
                  letterSpacing: 2,
                  py: 1.4,
                  mt: 1,
                  borderRadius: 6,
                  borderColor: COLORS.navy,
                  color: COLORS.navy,
                  fontWeight: 700,
                  '&:hover': { borderColor: COLORS.navyLight, bgcolor: COLORS.navy + '10', color: COLORS.navyLight },
                }}
              >
                Submit Booking Request
              </Button>
            </Box>
          </>
        ) : (
          <Grow in={submitted}>
            <Box sx={{ textAlign: 'center', py: 6 }}>
              <CheckCircleRoundedIcon sx={{ fontSize: 56, color: COLORS.navy, mb: 2 }} />
              <Typography sx={{ fontSize: '1.6rem', mb: 1, color: COLORS.navy, fontWeight: 600 }}>Request Sent ✓</Typography>
              <Typography sx={{ color: COLORS.navyLight, fontFamily: 'sans-serif', fontSize: 14 }}>
                We'll review your request and send a confirmation shortly.
              </Typography>
            </Box>
          </Grow>
        )}
      </Box>
    </Dialog>
  );
}

/* ============================================================
   HELPER COMPONENTS
   ============================================================ */
function SectionHeading({ eyebrow, title, icon }) {
  return (
    <Box sx={{ textAlign: 'center' }}>
      <Typography sx={{ color: COLORS.navy, letterSpacing: 8, fontFamily: 'sans-serif', fontSize: 16, fontWeight: 700, mb: 1 }}>
        {eyebrow}
      </Typography>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1.5, mt: 1 }}>
        {icon}
        <Typography variant="h3" sx={{ fontSize: { xs: '2rem', md: '2.8rem' }, color: COLORS.navy, fontWeight: 600 }}>
          {title}
        </Typography>
      </Box>
      <Box sx={{ width: 80, height: 2, bgcolor: COLORS.navy, mx: 'auto', mt: 2 }} />
    </Box>
  );
}