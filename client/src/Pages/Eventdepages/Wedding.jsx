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
} from '@mui/material';
import ArrowBackIosNewRoundedIcon from '@mui/icons-material/ArrowBackIosNewRounded';
import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded';
import PlayCircleOutlineRoundedIcon from '@mui/icons-material/PlayCircleOutlineRounded';
import FormatQuoteRoundedIcon from '@mui/icons-material/FormatQuoteRounded';
import ChevronLeftRoundedIcon from '@mui/icons-material/ChevronLeftRounded';
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import EmojiEventsRoundedIcon from '@mui/icons-material/EmojiEventsRounded';
import DiamondRoundedIcon from '@mui/icons-material/DiamondRounded';
import StarRoundedIcon from '@mui/icons-material/StarRounded';
import AutoAwesomeRoundedIcon from '@mui/icons-material/AutoAwesomeRounded';
import Navbar from "../../Components/Navhero/Nav.jsx";
import Footer from "../../Components/Footer/Footer.jsx";
/* ============================================================
   ASSETS — Update these paths only
   ============================================================ */
import heroImage from '../../assets/images/designer1.jpg';
import heroVideo2 from '../../assets/video/vv66.mp4';
import heroVideo3 from '../../assets/video/vv11.mp4';
import heroVideo4 from '../../assets/video/vv33.mp4';
import heroVideo5 from '../../assets/video/vv44.mp4';
import heroVideo6 from '../../assets/video/vv22.mp4';
import heroVideo7 from '../../assets/video/vvv1.mp4'; // الفيديو الجديد

import designerImg1 from '../../assets/images/wedd11.jpg';
import designerImg2 from '../../assets/images/wedd22.jpg';
import designerImg3 from '../../assets/images/wedd33.jpg';
import designerImg4 from '../../assets/images/wedd44.jpg';
import designerImg5 from '../../assets/images/wedd55.jpg';
import designerImg6 from '../../assets/images/wedd66.jpg';

const videos = [heroVideo2, heroVideo3, heroVideo4, heroVideo5, heroVideo6];
const images = [designerImg1, designerImg2, designerImg3, designerImg4, designerImg5, designerImg6];

// Demo data — booked dates for the month
const today0 = new Date();
const pad = (n) => String(n).padStart(2, '0');
const busyDates = [9, 13, 18, 22, 27].map(
  (d) => `${today0.getFullYear()}-${pad(today0.getMonth() + 1)}-${pad(d)}`
);

const process = [
  { title: 'Initial Consultation', desc: 'We listen to your vision and dream, defining the overall aesthetic and atmosphere' },
  { title: 'Design Phase', desc: 'We sketch colors, textures, and every detail that tells your unique story' },
  { title: 'Execution', desc: 'We transform the design into reality with meticulous attention to every detail' },
  { title: 'Delivery', desc: 'Your big day comes to life exactly as you imagined — and even more beautiful' },
];

const testimonials = [
  { name: 'Reem K.', text: 'Every detail was thoughtfully curated. She understood my vision better than I did.' },
  { name: 'Lina A.', text: 'The experience was elegant from our first meeting to the last moment of the wedding.' },
  { name: 'Dana S.', text: 'The decor exceeded every expectation. Truly professional, luxurious work.' },
];

const stats = [
  { value: 8, suffix: '+', label: 'Years of Experience' },
  { value: 120, suffix: '+', label: 'Weddings Designed' },
  { value: 98, suffix: '%', label: 'Client Satisfaction' },
  { value: 40, suffix: '+', label: 'Luxury Projects' },
];

// NEW SECTION DATA — Achievements
const achievements = [
  { icon: <EmojiEventsRoundedIcon sx={{ fontSize: 48 }} />, title: '12+ Awards', desc: 'International recognition for excellence in wedding design' },
  { icon: <DiamondRoundedIcon sx={{ fontSize: 48 }} />, title: '50+ Luxury Venues', desc: 'Exclusive partnerships with the finest venues worldwide' },
  { icon: <StarRoundedIcon sx={{ fontSize: 48 }} />, title: '98% Satisfaction', desc: 'Based on client feedback and post-wedding surveys' },
];

// NEW SECTION DATA — Professional Certifications
const certifications = [
  { title: 'Certified Wedding Planner', org: 'International Institute of Weddings', year: '2018' },
  { title: 'Luxury Event Design', org: 'Prestige Academy', year: '2019' },
  { title: 'Floral Design Master', org: 'European Floral Institute', year: '2020' },
];

const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];
const TIME_SLOTS = ['10:00 AM', '12:00 PM', '2:00 PM', '4:00 PM', '6:00 PM'];

// Elegant palette — All greens based on #3e4a3a
const COLORS = {
  bg: '#e8ece6',
  bgLight: '#d5ddd2',
  surface: '#c4cec0',
  surfaceDark: '#a8b8a2',
  deepGreen: '#3e4a3a',
  deepGreenLight: '#5a6a55',
  mediumGreen: '#7a8a74',
  lightGreen: '#a0b09a',
  cream: '#faf8f5',
  gold: '#c9a15a',
  goldLight: '#dbb97a',
  goldDark: '#b8893a',
  goldSoft: 'rgba(201,161,90,0.25)',
  goldGlow: 'rgba(201,161,90,0.10)',
  goldText: '#c9a15a',
  busy: '#a87c6a',
  muted: '#8a9a84',
  white: '#ffffff',
};

const AUTOPLAY_MS = 5000;

/* ============================================================
   SCROLL REVEAL HELPER
   ============================================================ */
function ScrollReveal({ children, delay = 0, y = 34, sx = {} }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

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
export default function Wedding({ designer }) {
  const d = designer || {
    id: 1,
    name: 'Sara',
    role: 'Luxury Wedding Designer',
    desc: 'Sara is one of our senior wedding designers with years of experience in crafting timeless, romantic celebrations.',
    project: { title: 'Royal Wedding', page: '/events/wedding' },
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
      <VideoGallery />
      <ImageGallery />
      <AchievementsSection />
      <ProcessSection />
      <TestimonialsSection />
      <StatsSection />
      
      {/* New Video Section */}
      <VideoBannerSection />
      
      <CalendarSection onSelectDate={(date) => openBooking(date)} />
      
      {/* تم إزالة BookingCTA */}

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
          background: 'radial-gradient(ellipse at center, rgba(201,161,90,0.06) 0%, transparent 70%)',
          animation: 'pulseGlow 4s ease-in-out infinite',
        },
        '@keyframes pulseGlow': {
          '0%, 100%': { opacity: 0.3 },
          '50%': { opacity: 0.7 },
        },
      }}
    >
      {/* Animated floating particles */}
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

      {/* Image - Left side */}
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
          boxShadow: '0 20px 60px rgba(201,161,90,0.15)',
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

      {/* Text - Right side */}
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
            sx={{ color: COLORS.gold, borderColor: COLORS.gold, bgcolor: 'rgba(201,161,90,0.1)', fontFamily: 'sans-serif', fontWeight: 700, fontSize: '0.95rem' }}
          />
          <Chip
            label="12+ Awards"
            sx={{ color: COLORS.gold, borderColor: COLORS.gold, bgcolor: 'rgba(201,161,90,0.1)', fontFamily: 'sans-serif', fontWeight: 700, fontSize: '0.95rem' }}
          />
          <Chip
            label="120+ Weddings"
            sx={{ color: COLORS.gold, borderColor: COLORS.gold, bgcolor: 'rgba(201,161,90,0.1)', fontFamily: 'sans-serif', fontWeight: 700, fontSize: '0.95rem' }}
          />
        </Box>
      </Box>
    </Box>
  );
}

/* ===================== SECTION 2 — VIDEO GALLERY ===================== */
function VideoGallery() {
  const [index, setIndex] = useState(0);
  const [fadeIn, setFadeIn] = useState(true);
  const hoveringRef = useRef(false);

  const goTo = useCallback((next) => {
    setFadeIn(false);
    setTimeout(() => {
      setIndex((prev) => (next + videos.length) % videos.length);
      setFadeIn(true);
    }, 220);
  }, []);

  const next = useCallback(() => goTo(index + 1), [goTo, index]);
  const prev = useCallback(() => goTo(index - 1), [goTo, index]);

  useEffect(() => {
    const timer = setInterval(() => {
      if (!hoveringRef.current) next();
    }, AUTOPLAY_MS);
    return () => clearInterval(timer);
  }, [next]);

  return (
    <Box
      sx={{
        px: { xs: 3, md: 12 },
        py: { xs: 8, md: 12 },
        background: `linear-gradient(180deg, ${COLORS.surfaceDark} 0%, ${COLORS.bgLight} 50%, ${COLORS.bg} 100%)`,
      }}
    >
      <Container maxWidth="lg">
        <ScrollReveal>
          <SectionHeading eyebrow="MOTION" title="Her Moving Moments" icon={<PlayCircleOutlineRoundedIcon sx={{ color: COLORS.gold }} />} />
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <Box
            onMouseEnter={() => (hoveringRef.current = true)}
            onMouseLeave={() => (hoveringRef.current = false)}
            sx={{
              position: 'relative',
              mt: 6,
              width: '100%',
              maxWidth: 980,
              mx: 'auto',
              aspectRatio: '16 / 9',
              borderRadius: 3,
              overflow: 'hidden',
              bgcolor: COLORS.surface,
              border: `1px solid ${COLORS.goldSoft}`,
              boxShadow: '0 12px 48px rgba(0,0,0,0.05)',
            }}
          >
            <Box
              sx={{
                width: '100%',
                height: '100%',
                opacity: fadeIn ? 1 : 0,
                transition: 'opacity .4s ease',
              }}
            >
              <Box
                component="video"
                key={videos[index]}
                src={videos[index]}
                autoPlay
                muted
                loop
                playsInline
                sx={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </Box>

            <NavArrow direction="prev" onClick={prev} />
            <NavArrow direction="next" onClick={next} />

            <Box sx={{ position: 'absolute', bottom: 14, left: 0, right: 0, display: 'flex', justifyContent: 'center', gap: 1 }}>
              {videos.map((_, i) => (
                <Box
                  key={i}
                  onClick={() => goTo(i)}
                  sx={{
                    width: i === index ? 24 : 8,
                    height: 8,
                    borderRadius: 4,
                    bgcolor: i === index ? COLORS.gold : 'rgba(255,255,255,0.3)',
                    transition: 'all .3s ease',
                    cursor: 'pointer',
                    '&:hover': {
                      bgcolor: i === index ? COLORS.gold : 'rgba(255,255,255,0.5)',
                      transform: 'scale(1.1)',
                    },
                  }}
                />
              ))}
            </Box>
          </Box>
        </ScrollReveal>
      </Container>
    </Box>
  );
}

/* ===================== SECTION 3 — IMAGE GALLERY ===================== */
function ImageGallery() {
  return (
    <Box
      sx={{
        px: { xs: 3, md: 12 },
        py: { xs: 8, md: 12 },
        background: `linear-gradient(180deg, ${COLORS.bg} 0%, ${COLORS.bgLight} 100%)`,
      }}
    >
      <Container maxWidth="lg">
        <ScrollReveal>
          <SectionHeading eyebrow="GALLERY" title="Her Work in Frames" />
        </ScrollReveal>

        <Box
          sx={{
            mt: 6,
            display: 'grid',
            gridTemplateColumns: { xs: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' },
            gap: { xs: 1.5, md: 2.5 },
          }}
        >
          {images.map((src, i) => (
            <ScrollReveal key={i} delay={i * 0.08} y={20}>
              <Box
                sx={{
                  aspectRatio: '3 / 4',
                  borderRadius: 2,
                  overflow: 'hidden',
                  border: `1px solid ${COLORS.goldSoft}`,
                  '&:hover img': { transform: 'scale(1.1) rotate(1deg)' },
                  '&:hover': { borderColor: COLORS.gold, boxShadow: '0 12px 40px rgba(201,161,90,0.15)' },
                  transition: 'all 0.4s ease',
                }}
              >
                <Box
                  component="img"
                  src={src}
                  alt={`Work ${i + 1}`}
                  sx={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform .6s cubic-bezier(.22,1,.36,1)' }}
                />
              </Box>
            </ScrollReveal>
          ))}
        </Box>
      </Container>
    </Box>
  );
}

/* ===================== SECTION 4 — ACHIEVEMENTS ===================== */
function AchievementsSection() {
  return (
    <Box
      sx={{
        px: { xs: 3, md: 12 },
        py: { xs: 8, md: 12 },
        background: `linear-gradient(135deg, ${COLORS.deepGreen} 0%, ${COLORS.deepGreenLight} 30%, ${COLORS.mediumGreen} 60%, ${COLORS.bgLight} 100%)`,
        position: 'relative',
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'radial-gradient(ellipse at 30% 50%, rgba(201,161,90,0.04) 0%, transparent 60%)',
          animation: 'gradientMove 10s ease-in-out infinite',
        },
        '@keyframes gradientMove': {
          '0%, 100%': { transform: 'translateX(-10%)' },
          '50%': { transform: 'translateX(10%)' },
        },
      }}
    >
      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        <ScrollReveal>
          <Box sx={{ textAlign: 'center', mb: 4 }}>
            <Typography sx={{ color: COLORS.gold, letterSpacing: 8, fontFamily: 'sans-serif', fontSize: 18, fontWeight: 700, mb: 1 }}>
              ACHIEVEMENTS
            </Typography>
            <Typography variant="h2" sx={{ fontSize: { xs: '2.2rem', md: '3rem' }, color: COLORS.cream, mb: 1 }}>
              Excellence in Every Detail
            </Typography>
            <Box sx={{ width: 80, height: 2, bgcolor: COLORS.gold, mx: 'auto', mt: 2 }} />
          </Box>
        </ScrollReveal>

        <Box
          sx={{
            mt: 4,
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' },
            gap: 4,
          }}
        >
          {achievements.map((item, i) => (
            <ScrollReveal key={i} delay={i * 0.15}>
              <Box
                sx={{
                  textAlign: 'center',
                  bgcolor: 'rgba(255,255,255,0.05)',
                  backdropFilter: 'blur(10px)',
                  borderRadius: 3,
                  p: 4,
                  border: `1px solid ${COLORS.goldSoft}`,
                  transition: 'all 0.4s ease',
                  '&:hover': {
                    transform: 'translateY(-10px) scale(1.02)',
                    borderColor: COLORS.gold,
                    boxShadow: '0 20px 60px rgba(201,161,90,0.1)',
                  },
                }}
              >
                <Box
                  sx={{
                    color: COLORS.gold,
                    mb: 2,
                    animation: 'iconBounce 2s ease-in-out infinite',
                    '@keyframes iconBounce': {
                      '0%, 100%': { transform: 'scale(1)' },
                      '50%': { transform: 'scale(1.1)' },
                    },
                  }}
                >
                  {item.icon}
                </Box>
                <Typography sx={{ fontSize: '1.8rem', color: COLORS.gold, mb: 1, fontWeight: 700 }}>
                  {item.title}
                </Typography>
                <Typography sx={{ color: COLORS.cream, fontFamily: 'sans-serif', fontSize: 14, lineHeight: 1.7, opacity: 0.8 }}>
                  {item.desc}
                </Typography>
              </Box>
            </ScrollReveal>
          ))}
        </Box>
      </Container>
    </Box>
  );
}



/* ===================== SECTION 6 — DESIGN PROCESS ===================== */
function ProcessSection() {
  const [lineRef, lineInView] = useInView(0.3);

  return (
    <Box
      sx={{
        px: { xs: 3, md: 12 },
        py: { xs: 8, md: 12 },
        background: `linear-gradient(180deg, ${COLORS.surface} 0%, ${COLORS.bgLight} 100%)`,
      }}
    >
      <Container maxWidth="lg">
        <ScrollReveal>
          <SectionHeading eyebrow="PROCESS" title="The Design Journey" />
        </ScrollReveal>

        <Box ref={lineRef} sx={{ maxWidth: 980, mx: 'auto', mt: 8, position: 'relative' }}>
          <Box
            sx={{
              display: { xs: 'none', md: 'block' },
              position: 'absolute',
              top: 28,
              left: 0,
              height: '2px',
              bgcolor: COLORS.goldSoft,
              width: lineInView ? '100%' : '0%',
              transition: 'width 1.8s cubic-bezier(.22,1,.36,1)',
            }}
          />
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', md: 'repeat(4, 1fr)' },
              gap: { xs: 5, md: 4 },
            }}
          >
            {process.map((step, i) => (
              <ScrollReveal key={i} delay={i * 0.12}>
                <Box sx={{ textAlign: 'center', position: 'relative' }}>
                  <Box
                    sx={{
                      width: 60,
                      height: 60,
                      borderRadius: '50%',
                      border: `2px solid ${COLORS.gold}`,
                      bgcolor: COLORS.bg,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      mx: 'auto',
                      mb: 2.5,
                      fontFamily: 'sans-serif',
                      color: COLORS.gold,
                      fontSize: 20,
                      fontWeight: 700,
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        transform: 'scale(1.1) rotate(10deg)',
                        boxShadow: '0 8px 30px rgba(201,161,90,0.2)',
                      },
                    }}
                  >
                    {String(i + 1).padStart(2, '0')}
                  </Box>
                  <Typography sx={{ fontSize: '1.3rem', mb: 1, color: COLORS.deepGreen, fontWeight: 600 }}>{step.title}</Typography>
                  <Typography sx={{ color: COLORS.deepGreenLight, fontFamily: 'sans-serif', fontSize: 14, lineHeight: 1.7 }}>
                    {step.desc}
                  </Typography>
                </Box>
              </ScrollReveal>
            ))}
          </Box>
        </Box>
      </Container>
    </Box>
  );
}

/* ===================== SECTION 7 — TESTIMONIALS ===================== */
function TestimonialsSection() {
  return (
    <Box
      sx={{
        px: { xs: 3, md: 12 },
        py: { xs: 8, md: 12 },
        background: `linear-gradient(180deg, ${COLORS.bgLight} 0%, ${COLORS.surface} 100%)`,
      }}
    >
      <Container maxWidth="lg">
        <ScrollReveal>
          <SectionHeading eyebrow="TESTIMONIALS" title="What Her Clients Say" />
        </ScrollReveal>

        <Box
          sx={{
            mt: 6,
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' },
            gap: 3,
          }}
        >
          {testimonials.map((t, i) => (
            <ScrollReveal key={i} delay={i * 0.12}>
              <Box
                sx={{
                  bgcolor: COLORS.bg,
                  border: `1px solid ${COLORS.goldSoft}`,
                  borderRadius: 3,
                  p: 4,
                  height: '100%',
                  transition: 'all 0.4s ease',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: '0 16px 48px rgba(201,161,90,0.08)',
                    borderColor: COLORS.gold,
                  },
                }}
              >
                <FormatQuoteRoundedIcon sx={{ color: COLORS.gold, fontSize: 36, mb: 1 }} />
                <Typography sx={{ fontSize: '1.15rem', lineHeight: 1.8, mb: 2, color: COLORS.deepGreen }}>{t.text}</Typography>
                <Typography sx={{ color: COLORS.gold, fontFamily: 'sans-serif', fontSize: 15, fontWeight: 700 }}>— {t.name}</Typography>
              </Box>
            </ScrollReveal>
          ))}
        </Box>
      </Container>
    </Box>
  );
}

/* ===================== SECTION 8 — STATS ===================== */
function StatsSection() {
  return (
    <Box
      sx={{
        px: { xs: 3, md: 12 },
        py: { xs: 8, md: 12 },
        background: `linear-gradient(135deg, ${COLORS.surface} 0%, ${COLORS.surfaceDark} 50%, ${COLORS.surface} 100%)`,
        position: 'relative',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'radial-gradient(ellipse at center, rgba(201,161,90,0.03) 0%, transparent 70%)',
        },
      }}
    >
      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: 'repeat(2, 1fr)', md: 'repeat(4, 1fr)' },
            gap: 4,
          }}
        >
          {stats.map((s, i) => (
            <ScrollReveal key={i} delay={i * 0.1}>
              <Box sx={{ textAlign: 'center' }}>
                <CountUp value={s.value} suffix={s.suffix} />
                <Typography sx={{ color: COLORS.deepGreenLight, fontFamily: 'sans-serif', fontSize: 15, mt: 1.5, letterSpacing: 1, fontWeight: 600 }}>
                  {s.label}
                </Typography>
              </Box>
            </ScrollReveal>
          ))}
        </Box>
      </Container>
    </Box>
  );
}

function CountUp({ value, suffix }) {
  const [ref, inView] = useInView(0.4);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const duration = 1500;
    const start = performance.now();
    let raf;
    const tick = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * value));
      if (progress < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, value]);

  return (
    <Typography ref={ref} sx={{ fontSize: { xs: '2.8rem', md: '3.8rem' }, color: COLORS.gold, fontWeight: 700 }}>
      {count}
      {suffix}
    </Typography>
  );
}

/* ===================== SECTION 9 — VIDEO BANNER ===================== */
function VideoBannerSection() {
  return (
    <Box
      sx={{
        px: { xs: 3, md: 12 },
        py: { xs: 8, md: 12 },
        background: `linear-gradient(180deg, ${COLORS.surfaceDark} 0%, ${COLORS.deepGreen} 100%)`,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <Container maxWidth="lg">
        <ScrollReveal>
          <Box sx={{ textAlign: 'center', mb: 4 }}>
            <Typography sx={{ color: COLORS.gold, letterSpacing: 8, fontFamily: 'sans-serif', fontSize: 18, fontWeight: 700, mb: 1 }}>
              HURRY UP
            </Typography>
            <Typography variant="h2" sx={{ fontSize: { xs: '2.2rem', md: '3.5rem' }, color: COLORS.cream, mb: 1 }}>
              Book Now & Create Your Moment
            </Typography>
            <Typography sx={{ color: COLORS.cream, fontSize: '1.1rem', opacity: 0.8, fontFamily: 'sans-serif' }}>
              Hurry up! Book now and let us craft your perfect moment
            </Typography>
            <Box sx={{ width: 80, height: 2, bgcolor: COLORS.gold, mx: 'auto', mt: 3 }} />
          </Box>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <Box
            sx={{
              width: '100%',
              maxWidth: 980,
              mx: 'auto',
              borderRadius: 3,
              overflow: 'hidden',
              boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
              border: `2px solid ${COLORS.goldSoft}`,
              position: 'relative',
              '&::after': {
                content: '""',
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: 'linear-gradient(180deg, transparent 0%, rgba(62,74,58,0.3) 100%)',
                pointerEvents: 'none',
              },
            }}
          >
            <Box
              component="video"
              src={heroVideo7}
              autoPlay
              muted
              loop
              playsInline
              sx={{
                width: '100%',
                height: 'auto',
                display: 'block',
                aspectRatio: '16 / 9',
                objectFit: 'cover',
              }}
            />
          </Box>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <Box sx={{ textAlign: 'center', mt: 4 }}>
            <Typography
              sx={{
                color: COLORS.cream,
                fontSize: { xs: '1.2rem', md: '1.8rem' },
                fontFamily: "'Cormorant Garamond', serif",
                fontWeight: 600,
                letterSpacing: 2,
                opacity: 0.9,
              }}
            >
              "Every love story deserves a beautiful beginning — let's write yours together."
            </Typography>
          </Box>
        </ScrollReveal>
      </Container>
    </Box>
  );
}

/* ===================== SECTION 10 — CALENDAR ===================== */
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
        <Typography sx={{ textAlign: 'center', color: COLORS.gold, fontFamily: 'sans-serif', fontSize: 16, mt: 3, letterSpacing: 2, fontWeight: 700 }}>
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
            color: COLORS.gold,
            '&:hover': { bgcolor: COLORS.goldGlow, transform: 'scale(1.1)' },
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
            color: COLORS.gold,
            '&:hover': { bgcolor: COLORS.goldGlow, transform: 'scale(1.1)' },
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
              <Typography key={w} sx={{ textAlign: 'center', color: COLORS.gold, fontFamily: 'sans-serif', fontSize: 14, fontWeight: 700 }}>
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
                    bgcolor: isAvailable ? COLORS.goldGlow : 'transparent',
                    border: isToday ? `2px solid ${COLORS.gold}` : '1px solid transparent',
                    transition: 'all 0.3s ease',
                    '&:hover': isAvailable ? {
                      bgcolor: 'rgba(201,161,90,0.15)',
                      transform: 'scale(1.15)',
                      boxShadow: '0 4px 20px rgba(201,161,90,0.15)',
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
        <Legend color={COLORS.gold} label="Available" />
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

/* ===================== BOOKING DIALOG ===================== */
const fieldSx = {
  '& .MuiInputBase-root': { color: COLORS.deepGreen, fontFamily: 'sans-serif' },
  '& .MuiInputLabel-root': { color: COLORS.deepGreenLight, fontFamily: 'sans-serif' },
  '& .MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(62,74,58,0.15)' },
  '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: COLORS.goldSoft },
  '& .Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: COLORS.gold },
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
          border: `1px solid ${COLORS.goldSoft}`,
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
            <Typography sx={{ fontSize: '1.8rem', mb: 0.5, color: COLORS.deepGreen, fontWeight: 600 }}>Book with {designerName}</Typography>
            {dateLabel && (
              <Chip
                label={dateLabel}
                sx={{ fontFamily: 'sans-serif', bgcolor: COLORS.goldGlow, color: COLORS.gold, mb: 2, fontWeight: 700, fontSize: '0.95rem' }}
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
                        bgcolor: time === t ? COLORS.gold : 'rgba(62,74,58,0.06)',
                        color: time === t ? '#faf8f5' : COLORS.deepGreen,
                        transition: 'all .2s ease',
                        fontWeight: time === t ? 700 : 400,
                        '&:hover': { bgcolor: time === t ? COLORS.gold : 'rgba(62,74,58,0.1)' },
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
                  borderColor: COLORS.gold,
                  color: COLORS.gold,
                  fontWeight: 700,
                  '&:hover': { borderColor: COLORS.deepGreen, bgcolor: 'rgba(201,161,90,0.08)', color: COLORS.deepGreen },
                }}
              >
                Submit Booking Request
              </Button>
            </Box>
          </>
        ) : (
          <Grow in={submitted}>
            <Box sx={{ textAlign: 'center', py: 6 }}>
              <CheckCircleRoundedIcon sx={{ fontSize: 56, color: COLORS.gold, mb: 2 }} />
              <Typography sx={{ fontSize: '1.6rem', mb: 1, color: COLORS.deepGreen, fontWeight: 600 }}>Request Sent ✓</Typography>
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

/* ===================== HELPER COMPONENTS ===================== */
function SectionHeading({ eyebrow, title, icon }) {
  return (
    <Box sx={{ textAlign: 'center' }}>
      <Typography sx={{ color: COLORS.gold, letterSpacing: 8, fontFamily: 'sans-serif', fontSize: 16, fontWeight: 700, mb: 1 }}>
        {eyebrow}
      </Typography>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1.5, mt: 1 }}>
        {icon}
        <Typography variant="h3" sx={{ fontSize: { xs: '2rem', md: '2.8rem' }, color: COLORS.deepGreen, fontWeight: 600 }}>
          {title}
        </Typography>
      </Box>
      <Box sx={{ width: 80, height: 2, bgcolor: COLORS.gold, mx: 'auto', mt: 2 }} />
    </Box>
  );
}

function NavArrow({ direction, onClick }) {
  const isPrev = direction === 'prev';
  return (
    <IconButton
      onClick={onClick}
      sx={{
        position: 'absolute',
        top: '50%',
        [isPrev ? 'left' : 'right']: 14,
        transform: 'translateY(-50%)',
        bgcolor: 'rgba(255,255,255,0.6)',
        color: COLORS.deepGreen,
        border: `1px solid ${COLORS.goldSoft}`,
        '&:hover': {
          bgcolor: COLORS.goldGlow,
          borderColor: COLORS.gold,
          transform: 'translateY(-50%) scale(1.1)',
        },
        transition: 'all 0.3s ease',
        backdropFilter: 'blur(4px)',
        width: 48,
        height: 48,
      }}
    >
      {isPrev ? <ArrowBackIosNewRoundedIcon fontSize="small" /> : <ArrowForwardIosRoundedIcon fontSize="small" />}
    </IconButton>
  );
}