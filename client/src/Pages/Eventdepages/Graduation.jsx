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
import heroImage from '../../assets/Images/designer4.jpg';

// Videos
import heroVideo2 from '../../assets/video/grra1.mp4';
import heroVideo3 from '../../assets/video/grra2.mp4';

// Images gra1 to gra25
import gra1 from '../../assets/Images/gra1.jpg';
import gra2 from '../../assets/Images/gra2.jpg';
import gra3 from '../../assets/images/gra3.jpg';
import gra4 from '../../assets/Images/gra4.jpg';
import gra5 from '../../assets/Images/gra5.jpg';
import gra6 from '../../assets/Images/gra6.jpg';
import gra7 from '../../assets/Images/gra7.jpg';
import gra8 from '../../assets/Images/gra8.jpg';
import gra9 from '../../assets/Images/gra9.jpg';
import gra10 from '../../assets/Images/gra10.jpg';
import gra11 from '../../assets/Images/gra11.png';
import gra12 from '../../assets/Images/gra12.jpg';
import gra13 from '../../assets/Images/gra13.jpg';
import gra14 from '../../assets/Images/gra14.jpg';
import gra15 from '../../assets/Images/gra15.jpg';
import gra16 from '../../assets/Images/gra16.jpg';
import gra17 from '../../assets/Images/gra17.jpg';
import gra18 from '../../assets/Images/gra18.jpg';
import gra19 from '../../assets/Images/gra19.jpg';
import gra20 from '../../assets/Images/gra20.jpg';
import gra21 from '../../assets/Images/gra21.jpg';
import gra22 from '../../assets/Images/gra22.jpg';
import gra23 from '../../assets/Images/gra23.jpg';
import gra24 from '../../assets/Images/gra24.jpg';
import gra25 from '../../assets/Images/gra25.jpg';

const allImages = [gra1, gra2, gra3, gra4, gra5, gra6, gra7, gra8, gra9, gra10, gra11, gra12, gra13, gra14, gra15, gra16, gra17, gra18, gra19, gra20, gra21, gra22, gra23, gra24, gra25];

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

// Elegant palette — تم التعديل: الأبيض والخمري بدلاً من الفضي
const COLORS = {
  bg: '#f5e6e6',
  bgLight: '#f0dada',
  surface: '#e8c8c8',
  surfaceDark: '#dbb0b0',
  deepGreen: '#4a2c2c',
  deepGreenLight: '#6a4a4a',
  mediumGreen: '#8a6a6a',
  lightGreen: '#aa8a8a',
  cream: '#fff8f5',
  gold: '#ffffff',
  goldLight: '#f5f0f0',
  goldDark: '#d4c4c4',
  goldSoft: 'rgba(255,255,255,0.2)',
  goldGlow: 'rgba(255,255,255,0.08)',
  goldText: '#ffffff',
  burgundy: '#8B1A1A',
  burgundyLight: '#A52A2A',
  burgundyDark: '#5C0E0E',
  busy: '#a87c6a',
  muted: '#b09a9a',
  white: '#ffffff',
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

function useInView(threshold = 0.3) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.unobserve(el);
        }
      },
      { threshold }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return [ref, inView];
}

/* ============================================================
   MAIN PAGE
   ============================================================ */
export default function Graduation({ designer }) {
  const d = designer || {
    id: 4,
    name: 'Raad',
    role: 'Graduation & Events Designer',
    desc: 'Raad specializes in graduation ceremonies and luxury events.',
    project: { title: 'Graduation', page: '/events/graduation' },
  };

  const [dialogOpen, setDialogOpen] = useState(false);
  const [bookingDate, setBookingDate] = useState(null);

  const openBooking = (date = null) => {
    setBookingDate(date);
    setDialogOpen(true);
  };

  return (
    <Box sx={{ bgcolor: COLORS.bg, color: COLORS.deepGreen, fontFamily: "'Cormorant Garamond', serif", overflowX: 'hidden' }}>
      <Navbar />
      <Hero d={d} />
      <DesignerMessage />
      <VideoGalleryFirst video={heroVideo2} />
      <ImageGalleryFirst images={allImages.slice(0, 8)} />
      <VideoGallerySecond video={heroVideo3} />
      <ImageGallerySecond images={allImages.slice(8, 16)} />
      <ImageGalleryThird images={allImages.slice(16, 20)} />
      <ImageGalleryFourth images={allImages.slice(20, 25)} />
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
        background: `linear-gradient(135deg, ${COLORS.deepGreen} 0%, ${COLORS.deepGreenLight} 30%, ${COLORS.mediumGreen} 60%, ${COLORS.bg} 100%)`,
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'radial-gradient(ellipse at center, rgba(255,255,255,0.06) 0%, transparent 70%)',
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
          boxShadow: '0 20px 60px rgba(255,255,255,0.15)',
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
            label="Luxury Expert"
            sx={{ color: COLORS.gold, borderColor: COLORS.gold, bgcolor: 'rgba(255,255,255,0.1)', fontFamily: 'sans-serif', fontWeight: 700, fontSize: '0.95rem' }}
          />
          <Chip
            label="12+ Awards"
            sx={{ color: COLORS.gold, borderColor: COLORS.gold, bgcolor: 'rgba(255,255,255,0.1)', fontFamily: 'sans-serif', fontWeight: 700, fontSize: '0.95rem' }}
          />
          <Chip
            label="120+ Events"
            sx={{ color: COLORS.gold, borderColor: COLORS.gold, bgcolor: 'rgba(255,255,255,0.1)', fontFamily: 'sans-serif', fontWeight: 700, fontSize: '0.95rem' }}
          />
        </Box>
      </Box>
    </Box>
  );
}

/* ============================================================
   SECTION 2 — DESIGNER MESSAGE
   ============================================================ */
function DesignerMessage() {
  const messages = [
    "I believe every graduation ceremony is a milestone that deserves to be celebrated with elegance and style.",
    "My passion is creating unforgettable experiences that reflect your unique journey and achievements.",
    "From the initial sketch to the final reveal, I pour my heart into every detail.",
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [fadeIn, setFadeIn] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setFadeIn(false);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % messages.length);
        setFadeIn(true);
      }, 500);
    }, 4000);
    return () => clearInterval(interval);
  }, [messages.length]);

  return (
    <Box
      sx={{
        px: { xs: 3, md: 12 },
        py: { xs: 6, md: 8 },
        background: `linear-gradient(180deg, ${COLORS.bg} 0%, ${COLORS.bgLight} 50%, ${COLORS.surface} 100%)`,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <Container maxWidth="md">
        <ScrollReveal>
          <Box sx={{ textAlign: 'center', mb: 4 }}>
            <Box
              sx={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 2,
                bgcolor: 'rgba(139,26,26,0.08)',
                px: 4,
                py: 1.5,
                borderRadius: 6,
                border: `1px solid ${COLORS.burgundy}`,
              }}
            >
              <Typography sx={{ 
                color: COLORS.burgundy, 
                fontFamily: 'sans-serif', 
                letterSpacing: 4, 
                fontWeight: 700, 
                fontSize: 16 
              }}>
                THE DESIGNER'S VISION
              </Typography>
            </Box>
          </Box>
        </ScrollReveal>

        <Box
          sx={{
            minHeight: 120,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
          }}
        >
          <Fade in={fadeIn} timeout={600}>
            <Typography
              sx={{
                fontSize: { xs: '1.4rem', md: '1.8rem' },
                lineHeight: 1.8,
                color: COLORS.burgundy,
                fontFamily: "'Cormorant Garamond', serif",
                maxWidth: 700,
                textAlign: 'center',
                fontStyle: 'italic',
                fontWeight: 600,
                '&::before': {
                  content: '"\\201C"',
                  color: COLORS.burgundy,
                  fontSize: '3.5rem',
                  fontFamily: 'serif',
                  position: 'relative',
                  top: 10,
                  mr: 1,
                },
                '&::after': {
                  content: '"\\201D"',
                  color: COLORS.burgundy,
                  fontSize: '3.5rem',
                  fontFamily: 'serif',
                  position: 'relative',
                  top: 10,
                  ml: 1,
                },
              }}
            >
              {messages[currentIndex]}
            </Typography>
          </Fade>

          <ScrollReveal delay={0.3} y={20}>
            <Typography
              sx={{
                fontSize: { xs: '1rem', md: '1.15rem' },
                lineHeight: 1.8,
                color: COLORS.deepGreenLight,
                fontFamily: 'sans-serif',
                maxWidth: 600,
                textAlign: 'center',
                mt: 3,
                opacity: 0.8,
                fontWeight: 400,
                letterSpacing: 0.5,
                borderTop: `1px solid ${COLORS.burgundy}30`,
                pt: 3,
              }}
            >
              With over a decade of experience in luxury event design, I transform 
              your special moments into extraordinary celebrations. From intimate 
              gatherings to grand ceremonies, every detail is thoughtfully curated 
              to reflect your unique story and style.
            </Typography>
          </ScrollReveal>
        </Box>

        {/* Dots */}
        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1.5, mt: 3 }}>
          {messages.map((_, i) => (
            <Box
              key={i}
              onClick={() => {
                setFadeIn(false);
                setTimeout(() => {
                  setCurrentIndex(i);
                  setFadeIn(true);
                }, 500);
              }}
              sx={{
                width: i === currentIndex ? 32 : 10,
                height: 10,
                borderRadius: 5,
                bgcolor: i === currentIndex ? COLORS.burgundy : COLORS.burgundy + '40',
                transition: 'all 0.4s ease',
                cursor: 'pointer',
                '&:hover': {
                  bgcolor: COLORS.burgundy,
                  transform: 'scale(1.2)',
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
   SECTION 3 — VIDEO GALLERY FIRST
   ============================================================ */
function VideoGalleryFirst({ video }) {
  return (
    <Box
      sx={{
        px: 0,
        py: 0,
        marginTop: 0,
        background: `linear-gradient(180deg, ${COLORS.surfaceDark} 0%, ${COLORS.bgLight} 50%, ${COLORS.bg} 100%)`,
      }}
    >
      <Container maxWidth={false} disableGutters>
        <Box
          sx={{
            position: 'relative',
            width: '100%',
            aspectRatio: '16 / 9',
            overflow: 'hidden',
            bgcolor: COLORS.surface,
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
      </Container>
    </Box>
  );
}

/* ============================================================
   SECTION 4 — IMAGE GALLERY FIRST (Convex Lens / Curved Display)
   تم التعديل: 
   - بوردر خمري لجميع الصور
   - النص يظهر على جميع الصور عند hover
   - إزالة انيميشن الجزيئات المتحركة من تحت الصور
   ============================================================ */
function ImageGalleryFirst({ images }) {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [rotation, setRotation] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const carouselRef = useRef(null);

  const totalImages = images.length;
  const angleStep = 360 / totalImages;
  const radius = 500;

  useEffect(() => {
    if (isDragging) return;
    const interval = setInterval(() => {
      setRotation((prev) => prev + 0.2);
    }, 50);
    return () => clearInterval(interval);
  }, [isDragging]);

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.clientX || e.touches?.[0]?.clientX || 0);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    const currentX = e.clientX || e.touches?.[0]?.clientX || 0;
    const deltaX = currentX - startX;
    setStartX(currentX);
    setRotation((prev) => prev + deltaX * 0.3);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const imageTexts = [
    { title: "Elegance in Every Frame", subtitle: "Capturing the essence of achievement" },
    { title: "Moments of Pride", subtitle: "Celebrating milestones with style" },
    { title: "The Art of Celebration", subtitle: "Where dreams meet reality" },
    { title: "Timeless Memories", subtitle: "Creating unforgettable experiences" },
    { title: "Grace & Glory", subtitle: "A tribute to your success" },
    { title: "Perfectly Curated", subtitle: "Every detail tells a story" },
    { title: "Radiant Celebrations", subtitle: "Shining bright on your special day" },
    { title: "Legacy of Excellence", subtitle: "Crafting moments that last forever" },
  ];

  return (
    <Box
      sx={{
        px: { xs: 2, md: 6 },
        py: { xs: 8, md: 14 },
        background: `linear-gradient(180deg, ${COLORS.bg} 0%, ${COLORS.bgLight} 100%)`,
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      <Container maxWidth="xl">
        <ScrollReveal>
          <Box sx={{ textAlign: 'center', mb: 6 }}>
            <Typography sx={{ color: COLORS.burgundy, letterSpacing: 8, fontFamily: 'sans-serif', fontSize: 16, fontWeight: 700, mb: 1 }}>
              CREATIVE GALLERY
            </Typography>
            <Typography variant="h2" sx={{ fontSize: { xs: '2rem', md: '3.5rem' }, color: COLORS.deepGreen, fontWeight: 600 }}>
              Graduation Frames
            </Typography>
            <Box sx={{ width: 80, height: 2, bgcolor: COLORS.burgundy, mx: 'auto', mt: 2 }} />
          </Box>
        </ScrollReveal>

        <Box
          ref={carouselRef}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onTouchStart={handleMouseDown}
          onTouchMove={handleMouseMove}
          onTouchEnd={handleMouseUp}
          sx={{
            position: 'relative',
            width: '100%',
            height: 600,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: isDragging ? 'grabbing' : 'grab',
            perspective: '1600px',
            mt: 4,
          }}
        >
          <Box
            sx={{
              position: 'relative',
              width: '100%',
              height: '100%',
              transformStyle: 'preserve-3d',
              transform: `rotateY(${rotation}deg)`,
              transition: isDragging ? 'none' : 'transform 0.1s ease',
            }}
          >
            {images.map((src, i) => {
              const angle = (i / totalImages) * 360;
              const rad = (angle * Math.PI) / 180;
              const x = Math.sin(rad) * radius;
              const z = Math.cos(rad) * radius;

              return (
                <Box
                  key={i}
                  onMouseEnter={() => setHoveredIndex(i)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    width: 280,
                    height: 340,
                    transform: `translate(-50%, -50%) translateX(${x}px) translateZ(${z}px) rotateY(${angle}deg)`,
                    transformStyle: 'preserve-3d',
                    borderRadius: 4,
                    overflow: 'hidden',
                    border: `3px solid ${hoveredIndex === i ? COLORS.gold : COLORS.burgundy}`,
                    boxShadow: hoveredIndex === i
                      ? `0 10px 50px ${COLORS.burgundy}60`
                      : `0 5px 30px ${COLORS.burgundy}30`,
                    opacity: 1,
                    transition: 'all 0.4s cubic-bezier(.22,1,.36,1)',
                    cursor: 'pointer',
                    '&:hover': {
                      transform: `translate(-50%, -50%) translateX(${x}px) translateZ(${z + 50}px) rotateY(${angle}deg) scale(1.08)`,
                      borderColor: COLORS.gold,
                      boxShadow: `0 25px 70px ${COLORS.burgundy}80`,
                      zIndex: 100,
                    },
                  }}
                >
                  <Box
                    component="img"
                    src={src}
                    alt={`Work ${i + 1}`}
                    sx={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                    }}
                  />
                  
                  <Box
                    sx={{
                      position: 'absolute',
                      bottom: 0,
                      left: 0,
                      right: 0,
                      padding: 3,
                      background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, transparent 100%)',
                      opacity: hoveredIndex === i ? 1 : 0,
                      transform: hoveredIndex === i ? 'translateY(0)' : 'translateY(20px)',
                      transition: 'all 0.5s cubic-bezier(.22,1,.36,1)',
                    }}
                  >
                    <Typography sx={{ color: COLORS.gold, fontFamily: 'sans-serif', fontSize: 16, fontWeight: 700 }}>
                      {imageTexts[i % imageTexts.length].title}
                    </Typography>
                    <Typography sx={{ color: COLORS.cream, fontFamily: 'sans-serif', fontSize: 13, opacity: 0.8 }}>
                      {imageTexts[i % imageTexts.length].subtitle}
                    </Typography>
                  </Box>
                </Box>
              );
            })}
          </Box>
        </Box>

        {/* Navigation dots */}
        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1.5, mt: 4 }}>
          {images.map((_, i) => (
            <Box
              key={i}
              onClick={() => {
                const targetAngle = (i / totalImages) * -360;
                setRotation(targetAngle);
              }}
              sx={{
                width: 12,
                height: 12,
                borderRadius: '50%',
                bgcolor: Math.round(rotation / -angleStep) % totalImages === i 
                  ? COLORS.burgundy 
                  : COLORS.burgundy + '40',
                transition: 'all 0.3s ease',
                cursor: 'pointer',
                '&:hover': {
                  bgcolor: COLORS.burgundy,
                  transform: 'scale(1.3)',
                },
              }}
            />
          ))}
        </Box>

        <Typography sx={{ textAlign: 'center', color: COLORS.deepGreenLight, fontFamily: 'sans-serif', fontSize: 14, mt: 3, opacity: 0.6 }}>
          Drag to rotate • Hover to preview
        </Typography>
      </Container>
    </Box>
  );
}

/* ============================================================
   SECTION 5 — VIDEO GALLERY SECOND
   ============================================================ */
function VideoGallerySecond({ video }) {
  return (
    <Box
      sx={{
        px: 0,
        py: 0,
        background: `linear-gradient(180deg, ${COLORS.bgLight} 0%, ${COLORS.surface} 100%)`,
      }}
    >
      <Container maxWidth={false} disableGutters>
        <Box
          sx={{
            position: 'relative',
            width: '100%',
            aspectRatio: '16 / 9',
            overflow: 'hidden',
            bgcolor: COLORS.surface,
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
      </Container>
    </Box>
  );
}

/* ============================================================
   SECTION 6 — IMAGE GALLERY SECOND (Marquee Style - No Flip)
   ============================================================ */
function ImageGallerySecond({ images }) {
  const firstRowImages = images.slice(0, 4);
  const secondRowImages = images.slice(4, 8);

  const imageTexts = [
    { title: "Celebration in Style", subtitle: "Every graduation tells a unique story", desc: "From concept to reality, we craft moments that inspire." },
    { title: "The Grand Event", subtitle: "Creating spectacular moments", desc: "Where creativity meets sophistication and elegance." },
    { title: "Elegant Designs", subtitle: "Where creativity meets sophistication", desc: "Transforming spaces into works of art." },
    { title: "Prestige & Class", subtitle: "Celebrating success with grandeur", desc: "Every detail designed to perfection." },
    { title: "Memorable Moments", subtitle: "Designing unforgettable experiences", desc: "Creating memories that last a lifetime." },
    { title: "Artistic Flair", subtitle: "Bringing creative visions to life", desc: "Where imagination becomes reality." },
    { title: "The Celebration", subtitle: "Crafting perfection in every detail", desc: "From the first sketch to the final reveal." },
    { title: "Legacy in the Making", subtitle: "Building moments that last forever", desc: "Crafting stories that will be told for generations." },
  ];

  const duplicatedFirstRow = [...firstRowImages, ...firstRowImages, ...firstRowImages];
  const duplicatedSecondRow = [...secondRowImages, ...secondRowImages, ...secondRowImages];

  return (
    <Box
      sx={{
        px: { xs: 2, md: 6 },
        py: { xs: 8, md: 14 },
        background: `linear-gradient(180deg, ${COLORS.surface} 0%, ${COLORS.surfaceDark} 100%)`,
        overflow: 'hidden',
      }}
    >
      <Container maxWidth="xl">
        <ScrollReveal>
          <Box sx={{ textAlign: 'center', mb: 6 }}>
            <Typography sx={{ color: COLORS.gold, letterSpacing: 8, fontFamily: 'sans-serif', fontSize: 16, fontWeight: 700, mb: 1 }}>
              THE ART OF CELEBRATION
            </Typography>
            <Typography variant="h2" sx={{ fontSize: { xs: '2rem', md: '3.5rem' }, color: COLORS.cream, fontWeight: 600 }}>
              Gallery of Excellence
            </Typography>
            <Box sx={{ width: 80, height: 2, bgcolor: COLORS.gold, mx: 'auto', mt: 2 }} />
          </Box>
        </ScrollReveal>

        <Box
          sx={{
            position: 'relative',
            width: '100%',
            overflow: 'hidden',
            mb: 4,
            py: 2,
          }}
        >
          <Box
            sx={{
              display: 'flex',
              gap: 3,
              animation: 'marqueeRightToLeft 25s linear infinite',
              width: 'max-content',
              '@keyframes marqueeRightToLeft': {
                '0%': { transform: 'translateX(0)' },
                '100%': { transform: 'translateX(-33.33%)' },
              },
              '&:hover': {
                animationPlayState: 'paused',
              },
            }}
          >
            {duplicatedFirstRow.map((src, i) => {
              const originalIndex = i % firstRowImages.length;
              return (
                <Box
                  key={i}
                  sx={{
                    width: { xs: 240, md: 300 },
                    flexShrink: 0,
                    cursor: 'pointer',
                    transition: 'transform 0.4s ease, box-shadow 0.4s ease',
                    borderRadius: 4,
                    overflow: 'hidden',
                    border: `2px solid ${COLORS.goldSoft}`,
                    boxShadow: '0 8px 30px rgba(0,0,0,0.15)',
                    position: 'relative',
                    aspectRatio: '3 / 4',
                    '&:hover': {
                      transform: 'scale(1.06)',
                      boxShadow: '0 15px 50px rgba(255,255,255,0.3)',
                      borderColor: COLORS.gold,
                    },
                  }}
                >
                  <Box
                    component="img"
                    src={src}
                    alt={`Work ${originalIndex + 1}`}
                    sx={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                    }}
                  />
                  
                  <Box
                    sx={{
                      position: 'absolute',
                      bottom: 0,
                      left: 0,
                      right: 0,
                      padding: 3,
                      background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.2) 60%, transparent 100%)',
                      transition: 'all 0.4s ease',
                    }}
                  >
                    <Typography sx={{ color: COLORS.gold, fontSize: { xs: 16, md: 20 }, fontWeight: 700, mb: 0.5 }}>
                      {imageTexts[originalIndex % imageTexts.length].title}
                    </Typography>
                    <Typography sx={{ color: COLORS.goldLight, fontSize: { xs: 13, md: 15 }, opacity: 0.9 }}>
                      {imageTexts[originalIndex % imageTexts.length].subtitle}
                    </Typography>
                    <Typography sx={{ color: COLORS.cream, fontSize: { xs: 12, md: 14 }, opacity: 0.7, mt: 0.5, lineHeight: 1.4 }}>
                      {imageTexts[originalIndex % imageTexts.length].desc}
                    </Typography>
                    <Box
                      sx={{
                        mt: 1,
                        width: 30,
                        height: 2,
                        bgcolor: COLORS.gold,
                        borderRadius: 1,
                      }}
                    />
                  </Box>
                </Box>
              );
            })}
          </Box>
        </Box>

        <Box
          sx={{
            position: 'relative',
            width: '100%',
            overflow: 'hidden',
            py: 2,
          }}
        >
          <Box
            sx={{
              display: 'flex',
              gap: 3,
              animation: 'marqueeLeftToRight 25s linear infinite',
              width: 'max-content',
              '@keyframes marqueeLeftToRight': {
                '0%': { transform: 'translateX(-33.33%)' },
                '100%': { transform: 'translateX(0)' },
              },
              '&:hover': {
                animationPlayState: 'paused',
              },
            }}
          >
            {duplicatedSecondRow.map((src, i) => {
              const originalIndex = 4 + (i % secondRowImages.length);
              return (
                <Box
                  key={i}
                  sx={{
                    width: { xs: 240, md: 300 },
                    flexShrink: 0,
                    cursor: 'pointer',
                    transition: 'transform 0.4s ease, box-shadow 0.4s ease',
                    borderRadius: 4,
                    overflow: 'hidden',
                    border: `2px solid ${COLORS.goldSoft}`,
                    boxShadow: '0 8px 30px rgba(0,0,0,0.15)',
                    position: 'relative',
                    aspectRatio: '3 / 4',
                    '&:hover': {
                      transform: 'scale(1.06)',
                      boxShadow: '0 15px 50px rgba(255,255,255,0.3)',
                      borderColor: COLORS.gold,
                    },
                  }}
                >
                  <Box
                    component="img"
                    src={src}
                    alt={`Work ${originalIndex + 1}`}
                    sx={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                    }}
                  />
                  
                  <Box
                    sx={{
                      position: 'absolute',
                      bottom: 0,
                      left: 0,
                      right: 0,
                      padding: 3,
                      background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.2) 60%, transparent 100%)',
                      transition: 'all 0.4s ease',
                    }}
                  >
                    <Typography sx={{ color: COLORS.gold, fontSize: { xs: 16, md: 20 }, fontWeight: 700, mb: 0.5 }}>
                      {imageTexts[originalIndex % imageTexts.length].title}
                    </Typography>
                    <Typography sx={{ color: COLORS.goldLight, fontSize: { xs: 13, md: 15 }, opacity: 0.9 }}>
                      {imageTexts[originalIndex % imageTexts.length].subtitle}
                    </Typography>
                    <Typography sx={{ color: COLORS.cream, fontSize: { xs: 12, md: 14 }, opacity: 0.7, mt: 0.5, lineHeight: 1.4 }}>
                      {imageTexts[originalIndex % imageTexts.length].desc}
                    </Typography>
                    <Box
                      sx={{
                        mt: 1,
                        width: 30,
                        height: 2,
                        bgcolor: COLORS.gold,
                        borderRadius: 1,
                      }}
                    />
                  </Box>
                </Box>
              );
            })}
          </Box>
        </Box>

        <Typography sx={{ textAlign: 'center', color: COLORS.gold, fontFamily: 'sans-serif', fontSize: 14, mt: 4, opacity: 0.8 }}>
          Hover over any card to zoom in 
        </Typography>
      </Container>
    </Box>
  );
}

/* ============================================================
   SECTION 7 — IMAGE GALLERY THIRD
   ============================================================ */
function ImageGalleryThird({ images }) {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const imageTexts = [
    { title: "Excellence", subtitle: "Where perfection meets passion", desc: "Every detail meticulously crafted to perfection." },
    { title: "Masterpiece", subtitle: "Creating works of art", desc: "Transforming visions into breathtaking realities." },
    { title: "Prestige", subtitle: "The epitome of elegance", desc: "Where luxury meets sophistication." },
    { title: "Glory", subtitle: "Celebrating achievements", desc: "Honoring milestones with grandeur and grace." },
  ];

  return (
    <Box
      sx={{
        px: { xs: 2, md: 6 },
        py: { xs: 8, md: 14 },
        background: `linear-gradient(180deg, ${COLORS.surfaceDark} 0%, ${COLORS.bg} 100%)`,
      }}
    >
      <Container maxWidth="xl">
        <ScrollReveal>
          <Box sx={{ textAlign: 'center', mb: 6 }}>
            <Typography sx={{ color: COLORS.burgundy, letterSpacing: 8, fontFamily: 'sans-serif', fontSize: 16, fontWeight: 700, mb: 1 }}>
              EXCELLENCE
            </Typography>
            <Typography variant="h2" sx={{ fontSize: { xs: '2rem', md: '3.5rem' }, color: COLORS.deepGreen, fontWeight: 600 }}>
              Signature Moments
            </Typography>
            <Box sx={{ width: 80, height: 2, bgcolor: COLORS.burgundy, mx: 'auto', mt: 2 }} />
          </Box>
        </ScrollReveal>

        <Box
          sx={{
            mt: 4,
            display: 'grid',
            gridTemplateColumns: { xs: 'repeat(2, 1fr)', md: 'repeat(4, 1fr)' },
            gap: { xs: 2, md: 3 },
          }}
        >
          {images.map((src, i) => (
            <ScrollReveal key={i} delay={i * 0.12} y={40}>
              <Box
                onMouseEnter={() => setHoveredIndex(i)}
                onMouseLeave={() => setHoveredIndex(null)}
                sx={{
                  aspectRatio: '4 / 5',
                  borderRadius: 3,
                  overflow: 'hidden',
                  border: `2px solid ${COLORS.goldSoft}`,
                  position: 'relative',
                  cursor: 'pointer',
                  transform: hoveredIndex === i ? 'scale(1.08) rotate(2deg)' : 'scale(1) rotate(0deg)',
                  transition: 'all 0.6s cubic-bezier(.22,1,.36,1)',
                  boxShadow: hoveredIndex === i ? '0 20px 60px rgba(255,255,255,0.2)' : 'none',
                  '&:hover': { borderColor: COLORS.gold },
                }}
              >
                <Box
                  component="img"
                  src={src}
                  alt={`Work ${i + 17}`}
                  sx={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transition: 'transform .8s cubic-bezier(.22,1,.36,1)',
                    transform: hoveredIndex === i ? 'scale(1.2)' : 'scale(1)',
                  }}
                />

                <Box
                  sx={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.2) 40%, transparent 100%)',
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
                      fontSize: { xs: 16, md: 22 },
                      fontWeight: 700,
                      transform: hoveredIndex === i ? 'translateY(0)' : 'translateY(30px)',
                      transition: 'transform 0.5s cubic-bezier(.22,1,.36,1) 0.1s',
                    }}
                  >
                    {imageTexts[i % imageTexts.length].title}
                  </Typography>
                  <Typography
                    sx={{
                      color: COLORS.goldLight,
                      fontFamily: 'sans-serif',
                      fontSize: { xs: 13, md: 15 },
                      opacity: 0.8,
                      transform: hoveredIndex === i ? 'translateY(0)' : 'translateY(30px)',
                      transition: 'transform 0.5s cubic-bezier(.22,1,.36,1) 0.2s',
                    }}
                  >
                    {imageTexts[i % imageTexts.length].subtitle}
                  </Typography>
                  <Typography
                    sx={{
                      color: COLORS.cream,
                      fontFamily: 'sans-serif',
                      fontSize: { xs: 12, md: 14 },
                      opacity: 0.7,
                      transform: hoveredIndex === i ? 'translateY(0)' : 'translateY(30px)',
                      transition: 'transform 0.5s cubic-bezier(.22,1,.36,1) 0.3s',
                      maxWidth: '90%',
                    }}
                  >
                    {imageTexts[i % imageTexts.length].desc}
                  </Typography>
                </Box>
              </Box>
            </ScrollReveal>
          ))}
        </Box>
        <ScrollReveal delay={0.2}>
          <Typography sx={{ textAlign: 'center', color: COLORS.deepGreenLight, fontFamily: 'sans-serif', fontSize: 16, mt: 4, opacity: 0.8, fontStyle: 'italic' }}>
            "Every event tells a story — let us craft yours with elegance."
          </Typography>
        </ScrollReveal>
      </Container>
    </Box>
  );
}

/* ============================================================
   SECTION 8 — IMAGE GALLERY FOURTH (Flipping Cards)
   ============================================================ */
function ImageGalleryFourth({ images }) {
  const [flippedIndex, setFlippedIndex] = useState(null);

  const imageTexts = [
    { title: "Luxury", subtitle: "Redefining elegance", desc: "Where every detail speaks of sophistication." },
    { title: "Prestige", subtitle: "The art of celebration", desc: "Creating moments that define excellence." },
    { title: "Excellence", subtitle: "Perfecting every detail", desc: "Crafting perfection in every element." },
    { title: "Elegance", subtitle: "Timeless beauty", desc: "Where grace meets grandeur." },
    { title: "Grandeur", subtitle: "Creating unforgettable moments", desc: "Celebrating life's greatest achievements." },
  ];

  return (
    <Box
      sx={{
        px: { xs: 2, md: 6 },
        py: { xs: 8, md: 14 },
        background: `linear-gradient(180deg, ${COLORS.bg} 0%, ${COLORS.bgLight} 100%)`,
      }}
    >
      <Container maxWidth="xl">
        <ScrollReveal>
          <Box sx={{ textAlign: 'center', mb: 6 }}>
            <Typography sx={{ color: COLORS.burgundy, letterSpacing: 8, fontFamily: 'sans-serif', fontSize: 16, fontWeight: 700, mb: 1 }}>
              LUXURY
            </Typography>
            <Typography variant="h2" sx={{ fontSize: { xs: '2rem', md: '3.5rem' }, color: COLORS.deepGreen, fontWeight: 600 }}>
              Prestige Collection
            </Typography>
            <Box sx={{ width: 80, height: 2, bgcolor: COLORS.burgundy, mx: 'auto', mt: 2 }} />
          </Box>
        </ScrollReveal>

        <Box
          sx={{
            mt: 4,
            display: 'grid',
            gridTemplateColumns: { xs: 'repeat(2, 1fr)', md: 'repeat(5, 1fr)' },
            gap: { xs: 2, md: 3 },
          }}
        >
          {images.map((src, i) => {
            const isFlipped = flippedIndex === i;
            return (
              <ScrollReveal key={i} delay={i * 0.1} y={30}>
                <Box
                  onMouseEnter={() => setFlippedIndex(i)}
                  onMouseLeave={() => setFlippedIndex(null)}
                  sx={{
                    perspective: '1000px',
                    aspectRatio: '3 / 4',
                    cursor: 'pointer',
                  }}
                >
                  <Box
                    sx={{
                      position: 'relative',
                      width: '100%',
                      height: '100%',
                      transformStyle: 'preserve-3d',
                      transition: 'transform 0.8s cubic-bezier(.22,1,.36,1)',
                      transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
                    }}
                  >
                    <Box
                      sx={{
                        position: 'absolute',
                        width: '100%',
                        height: '100%',
                        backfaceVisibility: 'hidden',
                        borderRadius: 3,
                        overflow: 'hidden',
                        border: `2px solid ${COLORS.goldSoft}`,
                      }}
                    >
                      <Box
                        component="img"
                        src={src}
                        alt={`Work ${i + 21}`}
                        sx={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                        }}
                      />
                    </Box>

                    <Box
                      sx={{
                        position: 'absolute',
                        width: '100%',
                        height: '100%',
                        backfaceVisibility: 'hidden',
                        transform: 'rotateY(180deg)',
                        borderRadius: 3,
                        background: `linear-gradient(135deg, ${COLORS.surfaceDark} 0%, ${COLORS.deepGreen} 100%)`,
                        border: `2px solid ${COLORS.gold}`,
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        padding: 2,
                        textAlign: 'center',
                      }}
                    >
                      <Typography sx={{ color: COLORS.gold, fontSize: { xs: 14, md: 18 }, fontWeight: 700, mb: 1 }}>
                        {imageTexts[i % imageTexts.length].title}
                      </Typography>
                      <Typography sx={{ color: COLORS.goldLight, fontSize: { xs: 12, md: 14 }, mb: 1, opacity: 0.8 }}>
                        {imageTexts[i % imageTexts.length].subtitle}
                      </Typography>
                      <Typography sx={{ color: COLORS.cream, fontSize: { xs: 11, md: 13 }, opacity: 0.7, lineHeight: 1.5 }}>
                        {imageTexts[i % imageTexts.length].desc}
                      </Typography>
                      <Box
                        sx={{
                          mt: 2,
                          width: 30,
                          height: 2,
                          bgcolor: COLORS.gold,
                          borderRadius: 1,
                        }}
                      />
                    </Box>
                  </Box>
                </Box>
              </ScrollReveal>
            );
          })}
        </Box>
      </Container>
    </Box>
  );
}

/* ============================================================
   SECTION 9 — CALENDAR
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
          <SectionHeading eyebrow="AVAILABILITY" title="His Availability This Month" />
        </ScrollReveal>
        <ScrollReveal delay={0.1}>
          <Box sx={{ mt: 6 }}>
            <AvailabilityCalendar busyDates={busyDates} onSelectDate={onSelectDate} />
          </Box>
        </ScrollReveal>
        <Typography sx={{ textAlign: 'center', color: COLORS.burgundy, fontFamily: 'sans-serif', fontSize: 16, mt: 3, letterSpacing: 2, fontWeight: 700 }}>
          Tap on any available date to book a consultation
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
        boxShadow: '0 8px 32px rgba(0,0,0,0.04)',
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
        <IconButton
          onClick={() => changeMonth(1)}
          sx={{
            color: COLORS.burgundy,
            '&:hover': { bgcolor: COLORS.burgundy + '20', transform: 'scale(1.1)' },
            transition: 'all 0.3s ease',
          }}
        >
          <ChevronRightRoundedIcon />
        </IconButton>
        <Typography sx={{ fontSize: '1.5rem', fontFamily: "'Cormorant Garamond', serif", color: COLORS.deepGreen, fontWeight: 600 }}>
          {MONTHS[cursor.getMonth()]} {cursor.getFullYear()}
        </Typography>
        <IconButton
          onClick={() => changeMonth(-1)}
          sx={{
            color: COLORS.burgundy,
            '&:hover': { bgcolor: COLORS.burgundy + '20', transform: 'scale(1.1)' },
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
              <Typography key={w} sx={{ textAlign: 'center', color: COLORS.burgundy, fontFamily: 'sans-serif', fontSize: 14, fontWeight: 700 }}>
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
                    color: isPast ? COLORS.muted : isBusy ? COLORS.busy : COLORS.deepGreen,
                    bgcolor: isAvailable ? COLORS.burgundy + '15' : 'transparent',
                    border: isToday ? `2px solid ${COLORS.burgundy}` : '1px solid transparent',
                    transition: 'all 0.3s ease',
                    '&:hover': isAvailable ? {
                      bgcolor: COLORS.burgundy + '30',
                      transform: 'scale(1.15)',
                      boxShadow: `0 4px 20px ${COLORS.burgundy}40`,
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
        <Legend color={COLORS.burgundy} label="Available" />
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
      <Typography sx={{ color: COLORS.deepGreenLight, fontFamily: 'sans-serif', fontSize: 15, fontWeight: 600 }}>{label}</Typography>
    </Box>
  );
}

/* ============================================================
   BOOKING DIALOG
   ============================================================ */
const fieldSx = {
  '& .MuiInputBase-root': { color: COLORS.deepGreen, fontFamily: 'sans-serif' },
  '& .MuiInputLabel-root': { color: COLORS.deepGreenLight, fontFamily: 'sans-serif' },
  '& .MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(62,74,58,0.15)' },
  '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: COLORS.burgundy + '60' },
  '& .Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: COLORS.burgundy },
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
          color: COLORS.deepGreen,
          borderRadius: 3,
          border: `1px solid ${COLORS.burgundy}40`,
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
            <Typography sx={{ fontSize: '1.8rem', mb: 0.5, color: COLORS.burgundy, fontWeight: 600 }}>Book with {designerName}</Typography>
            {dateLabel && (
              <Chip
                label={dateLabel}
                sx={{ fontFamily: 'sans-serif', bgcolor: COLORS.burgundy + '15', color: COLORS.burgundy, mb: 2, fontWeight: 700, fontSize: '0.95rem' }}
              />
            )}
            <Typography sx={{ color: COLORS.deepGreenLight, fontFamily: 'sans-serif', fontSize: 13, mb: 3 }}>
              Fill in your details below and we'll confirm your appointment shortly.
            </Typography>

            <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
              <TextField label="Full Name" required fullWidth value={form.name} onChange={handleChange('name')} sx={fieldSx} />

              {!selectedDate && (
                <Typography sx={{ color: COLORS.deepGreenLight, fontFamily: 'sans-serif', fontSize: 13 }}>
                  Tip: Select an available date from the calendar above, or mention your preferred timing in the message.
                </Typography>
              )}

              <Box>
                <Typography sx={{ color: COLORS.deepGreenLight, fontFamily: 'sans-serif', fontSize: 13, mb: 1 }}>
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
                        bgcolor: time === t ? COLORS.burgundy : 'rgba(62,74,58,0.06)',
                        color: time === t ? '#fff' : COLORS.deepGreen,
                        transition: 'all .2s ease',
                        fontWeight: time === t ? 700 : 400,
                        '&:hover': { bgcolor: time === t ? COLORS.burgundy : 'rgba(62,74,58,0.1)' },
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
                  borderColor: COLORS.burgundy,
                  color: COLORS.burgundy,
                  fontWeight: 700,
                  '&:hover': { borderColor: COLORS.deepGreen, bgcolor: COLORS.burgundy + '10', color: COLORS.deepGreen },
                }}
              >
                Submit Booking Request
              </Button>
            </Box>
          </>
        ) : (
          <Grow in={submitted}>
            <Box sx={{ textAlign: 'center', py: 6 }}>
              <CheckCircleRoundedIcon sx={{ fontSize: 56, color: COLORS.burgundy, mb: 2 }} />
              <Typography sx={{ fontSize: '1.6rem', mb: 1, color: COLORS.burgundy, fontWeight: 600 }}>Request Sent ✓</Typography>
              <Typography sx={{ color: COLORS.deepGreenLight, fontFamily: 'sans-serif', fontSize: 14 }}>
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
      <Typography sx={{ color: COLORS.burgundy, letterSpacing: 8, fontFamily: 'sans-serif', fontSize: 16, fontWeight: 700, mb: 1 }}>
        {eyebrow}
      </Typography>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1.5, mt: 1 }}>
        {icon}
        <Typography variant="h3" sx={{ fontSize: { xs: '2rem', md: '2.8rem' }, color: COLORS.deepGreen, fontWeight: 600 }}>
          {title}
        </Typography>
      </Box>
      <Box sx={{ width: 80, height: 2, bgcolor: COLORS.burgundy, mx: 'auto', mt: 2 }} />
    </Box>
  );
}