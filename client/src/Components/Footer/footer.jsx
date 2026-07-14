import React from 'react';
import { Box, Typography, Divider, IconButton, Container } from '@mui/material';
import {
  FaFacebookF,
  FaInstagram,
  FaWhatsapp,
  FaTwitter,
  FaPinterest,
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaArrowUp,
} from 'react-icons/fa';
import { motion } from 'framer-motion';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <Box
      component="footer"
      sx={{
        bgcolor: '#f4f1ea',
        width: '100%',
        px: { xs: 2, md: 6 },
        py: { xs: 6, md: 8 },
        borderTop: '1px solid rgba(62,74,58,0.06)',
        position: 'relative',
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '3px',
          background: 'linear-gradient(90deg, #3e4a3a, #b99456, #c9a15a, #b99456, #3e4a3a)',
          backgroundSize: '300% 100%',
          animation: 'gradientMove 6s ease-in-out infinite',
        },
        '@keyframes gradientMove': {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        '&::after': {
          content: '""',
          position: 'absolute',
          bottom: 0,
          left: '50%',
          transform: 'translateX(-50%)',
          width: '60%',
          height: '1px',
          background: 'radial-gradient(ellipse at center, rgba(185,148,86,0.2) 0%, transparent 70%)',
        },
      }}
    >
      <Container maxWidth="lg" sx={{ textAlign: 'center' }}>
        {/* Back to Top Button */}
        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 4 }}>
          <motion.div
            whileHover={{ scale: 1.15, y: -6 }}
            whileTap={{ scale: 0.9 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <IconButton
              onClick={scrollToTop}
              sx={{
                bgcolor: '#3e4a3a',
                color: '#f4f1ea',
                width: 52,
                height: 52,
                transition: 'all 0.4s cubic-bezier(.22,1,.36,1)',
                boxShadow: '0 4px 20px rgba(62,74,58,0.15)',
                '&:hover': {
                  bgcolor: '#b99456',
                  transform: 'translateY(-6px)',
                  boxShadow: '0 12px 40px rgba(185,148,86,0.35)',
                },
                '& svg': {
                  fontSize: '1.2rem',
                },
              }}
            >
              <FaArrowUp />
            </IconButton>
          </motion.div>
        </Box>

        {/* Brand Name */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <Typography
            sx={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: { xs: '3.5rem', sm: '4.5rem', md: '5.5rem' },
              color: '#3e4a3a',
              fontWeight: 600,
              letterSpacing: '.08em',
              mb: 0.5,
            }}
          >
            Flora
          </Typography>
          <Divider
            sx={{
              width: 60,
              borderColor: '#b99456',
              borderWidth: 2,
              mx: 'auto',
              mb: 2,
            }}
          />
        </motion.div>

        {/* Description */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          <Typography
            sx={{
              color: '#5a6a55',
              fontSize: { xs: '0.9rem', md: '1rem' },
              lineHeight: 1.9,
              fontFamily: 'sans-serif',
              maxWidth: '600px',
              mx: 'auto',
              mb: 3,
              fontWeight: 300,
              letterSpacing: 0.5,
            }}
          >
            Crafting unforgettable luxury experiences where every flower,
            every light, and every detail tells a beautiful story.
          </Typography>
        </motion.div>

        {/* Contact Info - Centered */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', sm: 'row' },
              justifyContent: 'center',
              alignItems: 'center',
              gap: { xs: 1.5, sm: 3 },
              mb: 3.5,
              flexWrap: 'wrap',
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
              <FaMapMarkerAlt style={{ color: '#b99456', fontSize: '0.9rem' }} />
              <Typography sx={{ color: '#5a6a55', fontSize: '0.9rem', fontFamily: 'sans-serif' }}>
                Irbid, Jordan
              </Typography>
            </Box>
            <Box sx={{ display: { xs: 'none', sm: 'block' }, color: '#d5ddd2' }}>|</Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
              <FaPhone style={{ color: '#b99456', fontSize: '0.9rem' }} />
              <Typography sx={{ color: '#5a6a55', fontSize: '0.9rem', fontFamily: 'sans-serif' }}>
                +962 7 9999 9999
              </Typography>
            </Box>
            <Box sx={{ display: { xs: 'none', sm: 'block' }, color: '#d5ddd2' }}>|</Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
              <FaEnvelope style={{ color: '#b99456', fontSize: '0.9rem' }} />
              <Typography sx={{ color: '#5a6a55', fontSize: '0.9rem', fontFamily: 'sans-serif' }}>
                info@flora.com
              </Typography>
            </Box>
          </Box>
        </motion.div>

        {/* Social Icons - Centered */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.3 }}
        >
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              gap: { xs: 1.5, sm: 2 },
              mb: 3.5,
              flexWrap: 'wrap',
            }}
          >
            {[
              { icon: <FaFacebookF />, href: 'https://facebook.com', label: 'Facebook', color: '#1877f2' },
              { icon: <FaInstagram />, href: 'https://instagram.com', label: 'Instagram', color: '#e4405f' },
              { icon: <FaWhatsapp />, href: 'https://wa.me/', label: 'WhatsApp', color: '#25d366' },
              { icon: <FaTwitter />, href: 'https://twitter.com', label: 'Twitter', color: '#1da1f2' },
              { icon: <FaPinterest />, href: 'https://pinterest.com', label: 'Pinterest', color: '#bd081c' },
            ].map((social, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.2, y: -5 }}
                whileTap={{ scale: 0.9 }}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 + index * 0.08 }}
              >
                <Box
                  component="a"
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: { xs: 44, sm: 48 },
                    height: { xs: 44, sm: 48 },
                    borderRadius: '50%',
                    bgcolor: '#e8ece6',
                    color: '#3e4a3a',
                    fontSize: { xs: '1rem', sm: '1.1rem' },
                    transition: 'all 0.4s cubic-bezier(.22,1,.36,1)',
                    border: '1px solid rgba(62,74,58,0.06)',
                    '&:hover': {
                      bgcolor: social.color,
                      color: '#fff',
                      transform: 'translateY(-5px)',
                      boxShadow: `0 8px 30px ${social.color}40`,
                      borderColor: 'transparent',
                    },
                  }}
                  aria-label={social.label}
                >
                  {social.icon}
                </Box>
              </motion.div>
            ))}
          </Box>
        </motion.div>

        {/* Simple Divider */}
        <Divider
          sx={{
            borderColor: 'rgba(62,74,58,0.08)',
            mb: 3,
          }}
        />

        {/* Bottom Bar - Centered */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            justifyContent: 'center',
            alignItems: 'center',
            gap: { xs: 1.5, sm: 3 },
          }}
        >
          <Typography
            sx={{
              color: '#5a6a55',
              fontSize: '0.75rem',
              fontFamily: 'sans-serif',
              letterSpacing: 1,
            }}
          >
            © {new Date().getFullYear()} Flora. All Rights Reserved.
          </Typography>

          <Box sx={{ display: { xs: 'none', sm: 'block' }, color: '#d5ddd2' }}>|</Box>

          <Box sx={{ display: 'flex', gap: 2.5, flexWrap: 'wrap', justifyContent: 'center' }}>
            <Typography
              component="a"
              href="#"
              sx={{
                color: '#5a6a55',
                fontSize: '0.7rem',
                fontFamily: 'sans-serif',
                textDecoration: 'none',
                transition: 'color 0.3s ease',
                letterSpacing: 0.5,
                '&:hover': {
                  color: '#b99456',
                },
              }}
            >
              Privacy Policy
            </Typography>
            <Typography
              component="a"
              href="#"
              sx={{
                color: '#5a6a55',
                fontSize: '0.7rem',
                fontFamily: 'sans-serif',
                textDecoration: 'none',
                transition: 'color 0.3s ease',
                letterSpacing: 0.5,
                '&:hover': {
                  color: '#b99456',
                },
              }}
            >
              Terms of Service
            </Typography>
            <Typography
              component="a"
              href="#"
              sx={{
                color: '#5a6a55',
                fontSize: '0.7rem',
                fontFamily: 'sans-serif',
                textDecoration: 'none',
                transition: 'color 0.3s ease',
                letterSpacing: 0.5,
                '&:hover': {
                  color: '#b99456',
                },
              }}
            >
              FAQ
            </Typography>
          </Box>
        </Box>

        {/* Decorative Gold Dots */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            gap: 1.5,
            mt: 3,
          }}
        >
          {[...Array(5)].map((_, i) => (
            <Box
              key={i}
              sx={{
                width: 4,
                height: 4,
                borderRadius: '50%',
                bgcolor: i % 2 === 0 ? '#b99456' : '#d5ddd2',
                opacity: i % 2 === 0 ? 0.4 : 0.2,
              }}
            />
          ))}
        </Box>
      </Container>
    </Box>
  );
}