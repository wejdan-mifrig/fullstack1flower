import React from 'react';
import { Box, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import Footer from '../../Components/Footer/Footer.jsx';
import NavbarUser from '../../Components/NavUserAdmin/Navuser.jsx';
import heroVideo from '../../assets/video/Hero.mp4';
import herooVideo from '../../assets/video/Hero2.mp4';
import heroavideo from '../../assets/video/HERO3.MP4';
import herobvideo from '../../assets/video/HERO4.MP4';
import herocvideo from '../../assets/video/HERO5.MP4';
import herodvideo from '../../assets/video/HERO6.MP4';
const textVariant = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
};

export default function User() {
  return (
    <Box>

      <Box sx={{ position: 'relative', height: '100vh', width: '100%', bgcolor: '#1c1b18' }}>
        <video autoPlay loop muted playsInline style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover', zIndex: 0 }}>
          <source src={heroVideo} type="video/mp4" />
        </video>
        <Box sx={{ position: 'absolute', inset: 0, zIndex: 1, background: 'rgba(0,0,0,0.4)' }} />
        <Box sx={{ position: 'relative', zIndex: 2, height: '100%', display: 'flex', flexDirection: 'column' }}>
          <NavbarUser />
          <Box sx={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Typography sx={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1rem', color: '#f4f1ea', letterSpacing: '0.3em', textTransform: 'uppercase' }}>
              Nature's poetry, delivered.
            </Typography>
          </Box>
        </Box>
      </Box>


      <Box sx={{ bgcolor: '#f4f1ea', py: { xs: 10, md: 16 }, display: 'flex', justifyContent: 'center' }}>
        <Box sx={{ maxWidth: '800px', textAlign: 'center', px: 3 }}>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.5 }} variants={textVariant}>
            <Typography sx={{ fontFamily: "'Cormorant Garamond', serif", fontSize: { xs: '2rem', md: '3.5rem' }, color: '#1c1b18', mb: 3 }}>
              Every bloom tells a story worth keeping.
            </Typography>
          </motion.div>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.5 }} variants={textVariant}>
            <Typography sx={{ color: '#5c574e', lineHeight: 1.8 }}>
              We source rare seasonal flowers, arranging each with care to carry the quiet beauty of nature into your space.
            </Typography>
          </motion.div>
        </Box>
      </Box>

      
      <Box sx={{ height: '60vh', width: '100%', overflow: 'hidden', position: 'relative' }}>
        <video autoPlay loop muted playsInline style={{ width: '100%', height: '60vh', objectFit: 'cover' }}>
          <source src={herooVideo} type="video/mp4" />
        </video>
        <Box sx={{ position: 'absolute', inset: 0, background: 'rgba(28,27,24,0.3)' }} />
      </Box>

   
   <Box
  sx={{
    bgcolor: '#f4f1ea',
    py: { xs: 8, md: 15 },
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    px: 2,
  }}
>
  <Box
    sx={{
      display: 'grid',
     
      gridTemplateColumns: { xs: 'repeat(2, 1fr)', md: 'repeat(4, 1fr)' },
      gap: { xs: 4, md: 8 },
      maxWidth: '1000px',
      width: '100%',
    }}
  >
    {[
      ['10K+', 'Happy Customers'],
      ['50+', 'Flower Varieties'],
      ['24H', 'Fresh Delivery'],
      ['100%', 'Natural Flowers'],
    ].map((item, index) => (
      <motion.div
        key={item[0]}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.8, delay: index * 0.1 }}
      >
        <Box sx={{ textAlign: 'center' }}>
          <Typography
            sx={{
              color: '#1c1b18',
              fontSize: { xs: '1.8rem', md: '3rem' },
              fontWeight: 600,
              mb: 0.5,
              fontFamily: "'Cormorant Garamond', serif",
            }}
          >
            {item[0]}
          </Typography>
          <Typography
            sx={{
              color: '#5c574e',
              letterSpacing: 2,
              textTransform: 'uppercase',
              fontSize: '.7rem',
              fontWeight: 500,
            }}
          >
            {item[1]}
          </Typography>
        </Box>
      </motion.div>
    ))}
  </Box>
</Box>

      <Box sx={{ bgcolor: '#3e4a3a', py: { xs: 10, md: 16 }, display: 'flex', flexDirection: 'column', alignItems: 'center', px: 2 }}>
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.5 }} variants={textVariant}>
          <Typography sx={{ fontFamily: "'Cormorant Garamond', serif", fontSize: { xs: '2rem', md: '3.5rem' }, color: '#f4f1ea', mb: { xs: 6, md: 10 }, textAlign: 'center' }}>
            Curated Collections
          </Typography>
        </motion.div>

        <Box sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(4, 1fr)' },
          gap: { xs: 4, md: 4 },
          maxWidth: '1200px',
          width: '100%',
          justifyContent: 'center',
        }}>
          {[
            { title: 'Spring Bloom', desc: 'Soft pastel tones for tender moments.', video: heroavideo },
            { title: 'Garden Romance', desc: 'Classic roses with timeless elegance.', video: herobvideo },
            { title: 'Wild Meadow', desc: 'Untamed wildflowers, naturally arranged.', video: herocvideo },
            { title: 'Evergreen', desc: 'Lush greenery for lasting beauty.', video: herodvideo },
          ].map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
            >
              <Box sx={{
                position: 'relative',
                borderRadius: '4px',
                overflow: 'hidden',
                height: '320px',
                display: 'flex',
                alignItems: 'flex-end',
              }}>
                <video autoPlay loop muted playsInline style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover', zIndex: 0 }}>
                  <source src={item.video} type="video/mp4" />
                </video>
                <Box sx={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(28,27,24,0.75), rgba(28,27,24,0.1))', zIndex: 1 }} />
                <Box sx={{ position: 'relative', zIndex: 2, p: 3 }}>
                  <Typography sx={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.6rem', color: '#f4f1ea', mb: 1 }}>
                    {item.title}
                  </Typography>
                  <Typography sx={{ color: '#e5e1d8', fontSize: '.85rem', lineHeight: 1.7 }}>
                    {item.desc}
                  </Typography>
                </Box>
              </Box>
            </motion.div>
          ))}
        </Box>
      </Box>
  
      <Box sx={{ bgcolor: '#f4f1ea', py: { xs: 10, md: 16 }, display: 'flex', justifyContent: 'center' }}>
        <Box sx={{ maxWidth: '750px', textAlign: 'center', px: 3 }}>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.5 }} variants={textVariant}>
            <Typography sx={{ fontFamily: "'Cormorant Garamond', serif", fontSize: { xs: '1.6rem', md: '2.4rem' }, color: '#1c1b18', mb: 3, fontStyle: 'italic', lineHeight: 1.5 }}>
              "Each arrangement felt like a piece of art — fresh, fragrant, and unforgettable."
            </Typography>
          </motion.div>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.5 }} variants={textVariant}>
            <Typography sx={{ color: '#5c574e', letterSpacing: 3, textTransform: 'uppercase', fontSize: '.75rem' }}>
              — Wijdan.AJ, Loyal Customer
            </Typography>
          </motion.div>
        </Box>
      </Box>
     {/* SECTION 6 — CTA */}
      <Box sx={{ bgcolor: '#3e4a3a', py: { xs: 10, md: 16 }, display: 'flex', justifyContent: 'center', px: 2 }}>
        <Box sx={{ maxWidth: '600px', textAlign: 'center' }}>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.5 }} variants={textVariant}>
            <Typography sx={{ fontFamily: "'Cormorant Garamond', serif", fontSize: { xs: '2rem', md: '3rem' }, color: '#f4f1ea', mb: 2 }}>
              Stay in bloom with us
            </Typography>
            <Typography sx={{ color: '#d6d1c4', mb: 5, lineHeight: 1.8 }}>
              Subscribe for seasonal offers, fresh arrivals, and floral inspiration.
            </Typography>
          </motion.div>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.5 }} variants={textVariant}>
            <Box sx={{ display: 'flex', gap: 1, flexDirection: { xs: 'column', sm: 'row' } }}>
              <Box component="input" placeholder="Your email address" sx={{
                flex: 1,
                bgcolor: 'transparent',
                border: '1px solid #8a9285',
                color: '#f4f1ea',
                px: 2.5,
                py: 1.5,
                fontSize: '.9rem',
                outline: 'none',
                fontFamily: 'inherit',
                '&::placeholder': { color: '#b8bdb1' },
              }} />
              <Box component="button" sx={{
                bgcolor: '#f4f1ea',
                color: '#1c1b18',
                border: 'none',
                px: 4,
                py: 1.5,
                fontSize: '.85rem',
                letterSpacing: 2,
                textTransform: 'uppercase',
                cursor: 'pointer',
                fontFamily: 'inherit',
              }}>
                Subscribe
              </Box>
            </Box>
          </motion.div>
        </Box>
      </Box>
         <Footer />
    </Box>
  );
}