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
} from '@mui/material';
import ArrowBackIosNewRoundedIcon from '@mui/icons-material/ArrowBackIosNewRounded';
import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded';
import PlayCircleOutlineRoundedIcon from '@mui/icons-material/PlayCircleOutlineRounded';
import FormatQuoteRoundedIcon from '@mui/icons-material/FormatQuoteRounded';
import ChevronLeftRoundedIcon from '@mui/icons-material/ChevronLeftRounded';
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';

/* ============================================================
   ASSETS — Update these paths only
   ============================================================ */
import heroImage from '../../assets/images/designer1.jpg';
import heroVideo2 from '../../assets/video/vv11.mp4';
import heroVideo3 from '../../assets/video/vv22.mp4';
import heroVideo4 from '../../assets/video/vv33.mp4';
import heroVideo5 from '../../assets/video/vv44.mp4';
import heroVideo6 from '../../assets/video/vv66.mp4';

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

const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];
const TIME_SLOTS = ['10:00 AM', '12:00 PM', '2:00 PM', '4:00 PM', '6:00 PM'];

// Elegant palette — Soft light green background with deep green text + gold accents
const COLORS = {
  bg: '#e3ece0',          // Soft, airy light green background
  surface: '#d5e0d1',      // Slightly deeper green for surfaces
  deepGreen: '#1a3a2a',    // Rich dark green for primary text — luxurious
  deepGreenLight: '#2a5a3a', // Medium green for secondary text
  cream: '#faf8f5',        // Warm off-white
  gold: '#c9a15a',         // Warm gold accent
  goldSoft: 'rgba(201,161,90,0.25)',
  goldGlow: 'rgba(201,161,90,0.10)',
  busy: '#a87c6a',         // Muted terracotta for busy dates
  muted: '#8aa38a',        // Soft muted green for subtle text
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
      <Hero d={d} />
      <VideoGallery />
      <ImageGallery />
      <ProcessSection />
      <TestimonialsSection />
      <StatsSection />
      <CalendarSection onSelectDate={(date) => openBooking(date)} />
      <BookingCTA name={d.name} onOpen={() => openBooking(null)} />

      <BookingDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        designerName={d.name}
        selectedDate={bookingDate}
      />
    </Box>
  );
}

/* ===================== SECTION 1 — DESIGNER HERO WITH LARGE IMAGE ===================== */
function Hero({ d }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row-reverse' },
        alignItems: 'center',
        justifyContent: 'center',
        gap: { xs: 4, md: 10 },
        px: { xs: 4, md: 12 },
        py: 10,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Subtle gold glow behind */}
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '80%',
          height: '80%',
          background: 'radial-gradient(ellipse at center, rgba(201,161,90,0.08) 0%, transparent 70%)',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      <Box
        sx={{
          width: { xs: 280, md: 420 },
          height: { xs: 280, md: 420 },
          borderRadius: '50%',
          border: `2px solid ${COLORS.gold}`,
          padding: '12px',
          flexShrink: 0,
          opacity: mounted ? 1 : 0,
          transform: mounted ? 'scale(1)' : 'scale(.85)',
          transition: 'opacity 1s ease, transform 1s cubic-bezier(.22,1,.36,1)',
          position: 'relative',
          zIndex: 1,
          boxShadow: '0 20px 60px rgba(201,161,90,0.12)',
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
            '&:hover': { transform: 'scale(1.02)' },
          }}
        />
      </Box>

      <Box
        sx={{
          maxWidth: 560,
          textAlign: { xs: 'center', md: 'right' },
          opacity: mounted ? 1 : 0,
          transform: mounted ? 'translateY(0)' : 'translateY(24px)',
          transition: 'opacity 1s ease .2s, transform 1s cubic-bezier(.22,1,.36,1) .2s',
          position: 'relative',
          zIndex: 1,
        }}
      >
        <Typography sx={{ color: COLORS.gold, letterSpacing: 6, fontFamily: 'sans-serif', fontSize: 13, mb: 2, fontWeight: 400 }}>
          {d.role.toUpperCase()}
        </Typography>
        <Typography variant="h1" sx={{ fontSize: { xs: '3.2rem', md: '5.2rem' }, lineHeight: 1.05, mb: 3, color: COLORS.deepGreen }}>
          {d.name}
        </Typography>
        <Typography sx={{ color: COLORS.deepGreenLight, fontSize: { xs: '1.1rem', md: '1.3rem' }, lineHeight: 1.8, fontFamily: 'sans-serif', fontWeight: 300 }}>
          {d.desc}
        </Typography>
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
    <Box sx={{ px: { xs: 3, md: 12 }, py: { xs: 8, md: 12 } }}>
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
                  width: i === index ? 20 : 6,
                  height: 6,
                  borderRadius: 3,
                  bgcolor: i === index ? COLORS.gold : 'rgba(26,58,42,0.2)',
                  transition: 'all .3s ease',
                  cursor: 'pointer',
                }}
              />
            ))}
          </Box>
        </Box>
      </ScrollReveal>
    </Box>
  );
}

/* ===================== SECTION 3 — IMAGE GALLERY ===================== */
function ImageGallery() {
  return (
    <Box sx={{ px: { xs: 3, md: 12 }, py: { xs: 8, md: 12 } }}>
      <ScrollReveal>
        <SectionHeading eyebrow="GALLERY" title="Her Work in Frames" />
      </ScrollReveal>

      <Box
        sx={{
          mt: 6,
          maxWidth: 1100,
          mx: 'auto',
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
                '&:hover img': { transform: 'scale(1.08)' },
                boxShadow: '0 8px 32px rgba(0,0,0,0.04)',
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
    </Box>
  );
}

/* ===================== SECTION 4 — DESIGN PROCESS ===================== */
function ProcessSection() {
  const [lineRef, lineInView] = useInView(0.3);

  return (
    <Box sx={{ px: { xs: 3, md: 12 }, py: { xs: 8, md: 12 } }}>
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
            height: '1px',
            bgcolor: COLORS.goldSoft,
            width: lineInView ? '100%' : '0%',
            transition: 'width 1.4s cubic-bezier(.22,1,.36,1)',
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
                    width: 56,
                    height: 56,
                    borderRadius: '50%',
                    border: `1px solid ${COLORS.gold}`,
                    bgcolor: COLORS.bg,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mx: 'auto',
                    mb: 2.5,
                    fontFamily: 'sans-serif',
                    color: COLORS.gold,
                    fontSize: 18,
                  }}
                >
                  {String(i + 1).padStart(2, '0')}
                </Box>
                <Typography sx={{ fontSize: '1.3rem', mb: 1, color: COLORS.deepGreen }}>{step.title}</Typography>
                <Typography sx={{ color: COLORS.deepGreenLight, fontFamily: 'sans-serif', fontSize: 14, lineHeight: 1.7 }}>
                  {step.desc}
                </Typography>
              </Box>
            </ScrollReveal>
          ))}
        </Box>
      </Box>
    </Box>
  );
}

/* ===================== SECTION 6 — TESTIMONIALS ===================== */
function TestimonialsSection() {
  return (
    <Box sx={{ px: { xs: 3, md: 12 }, py: { xs: 8, md: 12 } }}>
      <ScrollReveal>
        <SectionHeading eyebrow="TESTIMONIALS" title="What Her Clients Say" />
      </ScrollReveal>

      <Box
        sx={{
          mt: 6,
          maxWidth: 1100,
          mx: 'auto',
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' },
          gap: 3,
        }}
      >
        {testimonials.map((t, i) => (
          <ScrollReveal key={i} delay={i * 0.12}>
            <Box
              sx={{
                bgcolor: COLORS.surface,
                border: `1px solid ${COLORS.goldSoft}`,
                borderRadius: 3,
                p: 4,
                height: '100%',
                transition: 'transform .3s ease, box-shadow .3s ease',
                '&:hover': { transform: 'translateY(-6px)', boxShadow: '0 12px 40px rgba(0,0,0,0.05)' },
              }}
            >
              <FormatQuoteRoundedIcon sx={{ color: COLORS.gold, fontSize: 30, mb: 1 }} />
              <Typography sx={{ fontSize: '1.15rem', lineHeight: 1.8, mb: 2, color: COLORS.deepGreen }}>{t.text}</Typography>
              <Typography sx={{ color: COLORS.deepGreenLight, fontFamily: 'sans-serif', fontSize: 13 }}>{t.name}</Typography>
            </Box>
          </ScrollReveal>
        ))}
      </Box>
    </Box>
  );
}

/* ===================== SECTION 7 — STATS ===================== */
function StatsSection() {
  return (
    <Box sx={{ px: { xs: 3, md: 12 }, py: { xs: 8, md: 12 }, bgcolor: COLORS.surface }}>
      <Box
        sx={{
          maxWidth: 1000,
          mx: 'auto',
          display: 'grid',
          gridTemplateColumns: { xs: 'repeat(2, 1fr)', md: 'repeat(4, 1fr)' },
          gap: 4,
        }}
      >
        {stats.map((s, i) => (
          <ScrollReveal key={i} delay={i * 0.1}>
            <Box sx={{ textAlign: 'center' }}>
              <CountUp value={s.value} suffix={s.suffix} />
              <Typography sx={{ color: COLORS.deepGreenLight, fontFamily: 'sans-serif', fontSize: 13, mt: 1 }}>
                {s.label}
              </Typography>
            </Box>
          </ScrollReveal>
        ))}
      </Box>
    </Box>
  );
}

function CountUp({ value, suffix }) {
  const [ref, inView] = useInView(0.4);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const duration = 1400;
    const start = performance.now();
    let raf;
    const tick = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      setCount(Math.floor(progress * value));
      if (progress < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, value]);

  return (
    <Typography ref={ref} sx={{ fontSize: { xs: '2.2rem', md: '3rem' }, color: COLORS.gold }}>
      {count}
      {suffix}
    </Typography>
  );
}

/* ===================== SECTION 8 — CALENDAR ===================== */
function CalendarSection({ onSelectDate }) {
  return (
    <Box sx={{ px: { xs: 3, md: 12 }, py: { xs: 8, md: 12 } }}>
      <ScrollReveal>
        <SectionHeading eyebrow="AVAILABILITY" title="Her Availability This Month" />
      </ScrollReveal>
      <ScrollReveal delay={0.1}>
        <Box sx={{ mt: 6 }}>
          <AvailabilityCalendar busyDates={busyDates} onSelectDate={onSelectDate} />
        </Box>
      </ScrollReveal>
      <Typography sx={{ textAlign: 'center', color: COLORS.deepGreenLight, fontFamily: 'sans-serif', fontSize: 13, mt: 3 }}>
        Tap on any available date to book a consultation
      </Typography>
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
        bgcolor: COLORS.surface,
        border: `1px solid ${COLORS.goldSoft}`,
        borderRadius: 3,
        p: { xs: 2.5, md: 4 },
        boxShadow: '0 8px 32px rgba(0,0,0,0.04)',
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
        <IconButton onClick={() => changeMonth(1)} sx={{ color: COLORS.gold }}>
          <ChevronRightRoundedIcon />
        </IconButton>
        <Typography sx={{ fontSize: '1.5rem', fontFamily: "'Cormorant Garamond', serif", color: COLORS.deepGreen }}>
          {MONTHS[cursor.getMonth()]} {cursor.getFullYear()}
        </Typography>
        <IconButton onClick={() => changeMonth(-1)} sx={{ color: COLORS.gold }}>
          <ChevronLeftRoundedIcon />
        </IconButton>
      </Box>

      <Fade in={fadeIn} timeout={350}>
        <Box>
          <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', mb: 1 }}>
            {WEEKDAYS.map((w) => (
              <Typography key={w} sx={{ textAlign: 'center', color: COLORS.muted, fontFamily: 'sans-serif', fontSize: 12 }}>
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
                    fontSize: { xs: 12, md: 14 },
                    cursor: isAvailable ? 'pointer' : 'default',
                    color: isPast ? COLORS.muted : isBusy ? COLORS.busy : COLORS.deepGreen,
                    bgcolor: isAvailable ? COLORS.goldGlow : 'transparent',
                    border: isToday ? `1px solid ${COLORS.gold}` : '1px solid transparent',
                    transition: 'transform .2s ease, background-color .2s ease',
                    '&:hover': isAvailable ? { bgcolor: 'rgba(201,161,90,0.15)', transform: 'scale(1.12)' } : {},
                  }}
                >
                  {date.getDate()}
                </Box>
              );
            })}
          </Box>
        </Box>
      </Fade>

      <Box sx={{ display: 'flex', justifyContent: 'center', gap: 3, mt: 3, flexWrap: 'wrap' }}>
        <Legend color="rgba(201,161,90,0.35)" label="Available" />
        <Legend color={COLORS.busy} label="Booked" />
        <Legend color={COLORS.muted} label="Past" />
      </Box>
    </Box>
  );
}

function Legend({ color, label }) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
      <Box sx={{ width: 10, height: 10, borderRadius: '50%', bgcolor: color }} />
      <Typography sx={{ color: COLORS.deepGreenLight, fontFamily: 'sans-serif', fontSize: 13 }}>{label}</Typography>
    </Box>
  );
}

/* ===================== SECTION 9 — BOOKING CTA ===================== */
function BookingCTA({ name, onOpen }) {
  return (
    <Box sx={{ px: { xs: 3, md: 12 }, pb: { xs: 10, md: 14 } }}>
      <ScrollReveal>
        <Box
          sx={{
            maxWidth: 720,
            mx: 'auto',
            textAlign: 'center',
            border: `1px solid ${COLORS.goldSoft}`,
            borderRadius: 3,
            p: { xs: 5, md: 7 },
            bgcolor: COLORS.surface,
            boxShadow: '0 12px 48px rgba(0,0,0,0.04)',
          }}
        >
          <Typography variant="h3" sx={{ fontSize: { xs: '1.8rem', md: '2.4rem' }, mb: 2, color: COLORS.deepGreen }}>
            Ready to Book a Consultation with {name}?
          </Typography>
          <Typography sx={{ color: COLORS.deepGreenLight, fontSize: '1.05rem', mb: 4 }}>
            Choose your preferred time, and our designer will review and confirm your request.
          </Typography>
          <Button
            variant="outlined"
            onClick={onOpen}
            sx={{
              fontFamily: 'sans-serif',
              letterSpacing: 2,
              px: 5,
              py: 1.4,
              borderRadius: 6,
              borderColor: COLORS.gold,
              color: COLORS.gold,
              '&:hover': { borderColor: COLORS.deepGreen, bgcolor: 'rgba(201,161,90,0.08)', color: COLORS.deepGreen },
            }}
          >
            Book Your Appointment Now
          </Button>
        </Box>
      </ScrollReveal>
    </Box>
  );
}

/* ===================== BOOKING DIALOG ===================== */
const fieldSx = {
  '& .MuiInputBase-root': { color: COLORS.deepGreen, fontFamily: 'sans-serif' },
  '& .MuiInputLabel-root': { color: COLORS.deepGreenLight, fontFamily: 'sans-serif' },
  '& .MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(26,58,42,0.15)' },
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
          bgcolor: COLORS.surface,
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
            <Typography sx={{ fontSize: '1.8rem', mb: 0.5, color: COLORS.deepGreen }}>Book with {designerName}</Typography>
            {dateLabel && (
              <Chip
                label={dateLabel}
                sx={{ fontFamily: 'sans-serif', bgcolor: COLORS.goldGlow, color: COLORS.gold, mb: 2 }}
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
                        bgcolor: time === t ? COLORS.gold : 'rgba(26,58,42,0.06)',
                        color: time === t ? '#faf8f5' : COLORS.deepGreen,
                        transition: 'all .2s ease',
                        '&:hover': { bgcolor: time === t ? COLORS.gold : 'rgba(26,58,42,0.1)' },
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
              <Typography sx={{ fontSize: '1.6rem', mb: 1, color: COLORS.deepGreen }}>Request Sent ✓</Typography>
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
      <Typography sx={{ color: COLORS.gold, letterSpacing: 6, fontFamily: 'sans-serif', fontSize: 12, fontWeight: 400 }}>
        {eyebrow}
      </Typography>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1, mt: 1 }}>
        {icon}
        <Typography variant="h3" sx={{ fontSize: { xs: '2rem', md: '2.6rem' }, color: COLORS.deepGreen }}>
          {title}
        </Typography>
      </Box>
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
        bgcolor: 'rgba(255,255,255,0.5)',
        color: COLORS.deepGreen,
        border: `1px solid ${COLORS.goldSoft}`,
        '&:hover': { bgcolor: COLORS.goldGlow },
        backdropFilter: 'blur(4px)',
      }}
    >
      {isPrev ? <ArrowBackIosNewRoundedIcon fontSize="small" /> : <ArrowForwardIosRoundedIcon fontSize="small" />}
    </IconButton>
  );
}