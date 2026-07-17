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
        bgcolor: '#f5f0eb',
        width: '100%',
        px: { xs: 2, md: 6 },
        py: { xs: 4, md: 6 },
        borderTop: '1px solid rgba(0,0,0,0.06)',
        position: 'relative',
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '2px',
          background: 'linear-gradient(90deg, transparent, rgba(139,26,26,0.3), rgba(139,26,26,0.6), rgba(139,26,26,0.3), transparent)',
          backgroundSize: '300% 100%',
          animation: 'gradientMove 8s ease-in-out infinite',
        },
        '@keyframes gradientMove': {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
      }}
    >
      <Container maxWidth="lg" sx={{ textAlign: 'center' }}>
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
              fontSize: { xs: '3rem', sm: '4rem', md: '4.5rem' },
              color: '#1a1a1a',
              fontWeight: 600,
              letterSpacing: '.1em',
              mb: 0.5,
            }}
          >
            Flora
          </Typography>
          <Divider
            sx={{
              width: 50,
              borderColor: 'rgba(139,26,26,0.3)',
              borderWidth: 1.5,
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
              color: '#4a4a4a',
              fontSize: { xs: '0.85rem', md: '0.95rem' },
              lineHeight: 1.8,
              fontFamily: 'sans-serif',
              maxWidth: '500px',
              mx: 'auto',
              mb: 2.5,
              fontWeight: 300,
              letterSpacing: 0.5,
            }}
          >
            Crafting unforgettable luxury experiences where every detail 
            tells a beautiful story.
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
              gap: { xs: 1, sm: 2.5 },
              mb: 3,
              flexWrap: 'wrap',
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
              <FaMapMarkerAlt style={{ color: '#8B1A1A', fontSize: '0.8rem' }} />
              <Typography sx={{ color: '#4a4a4a', fontSize: '0.85rem', fontFamily: 'sans-serif' }}>
                Irbid, Jordan
              </Typography>
            </Box>
            <Box sx={{ display: { xs: 'none', sm: 'block' }, color: '#d5d0cb' }}>|</Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
              <FaPhone style={{ color: '#8B1A1A', fontSize: '0.8rem' }} />
              <Typography sx={{ color: '#4a4a4a', fontSize: '0.85rem', fontFamily: 'sans-serif' }}>
                +962 7 9999 9999
              </Typography>
            </Box>
            <Box sx={{ display: { xs: 'none', sm: 'block' }, color: '#d5d0cb' }}>|</Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
              <FaEnvelope style={{ color: '#8B1A1A', fontSize: '0.8rem' }} />
              <Typography sx={{ color: '#4a4a4a', fontSize: '0.85rem', fontFamily: 'sans-serif' }}>
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
              mb: 3,
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
                whileHover={{ scale: 1.15, y: -4 }}
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
                    width: { xs: 40, sm: 44 },
                    height: { xs: 40, sm: 44 },
                    borderRadius: '50%',
                    bgcolor: '#e8e3de',
                    color: '#4a4a4a',
                    fontSize: { xs: '0.9rem', sm: '1rem' },
                    transition: 'all 0.4s cubic-bezier(.22,1,.36,1)',
                    border: '1px solid rgba(0,0,0,0.04)',
                    '&:hover': {
                      bgcolor: social.color,
                      color: '#fff',
                      transform: 'translateY(-4px)',
                      boxShadow: `0 8px 30px ${social.color}30`,
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
            borderColor: 'rgba(0,0,0,0.06)',
            mb: 2.5,
          }}
        />

        {/* Bottom Bar - Centered with Back to Top Button */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            justifyContent: 'center',
            alignItems: 'center',
            gap: { xs: 1, sm: 2.5 },
          }}
        >
          <Typography
            sx={{
              color: '#8a8a8a',
              fontSize: '0.7rem',
              fontFamily: 'sans-serif',
              letterSpacing: 1,
            }}
          >
            © {new Date().getFullYear()} Flora. All Rights Reserved.
          </Typography>

          <Box sx={{ display: { xs: 'none', sm: 'block' }, color: '#d5d0cb' }}>|</Box>

          <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center' }}>
            <Typography
              component="a"
              href="#"
              sx={{
                color: '#8a8a8a',
                fontSize: '0.65rem',
                fontFamily: 'sans-serif',
                textDecoration: 'none',
                transition: 'color 0.3s ease',
                letterSpacing: 0.5,
                '&:hover': {
                  color: '#8B1A1A',
                },
              }}
            >
              Privacy Policy
            </Typography>
            <Typography
              component="a"
              href="#"
              sx={{
                color: '#8a8a8a',
                fontSize: '0.65rem',
                fontFamily: 'sans-serif',
                textDecoration: 'none',
                transition: 'color 0.3s ease',
                letterSpacing: 0.5,
                '&:hover': {
                  color: '#8B1A1A',
                },
              }}
            >
              Terms of Service
            </Typography>
            <Typography
              component="a"
              href="#"
              sx={{
                color: '#8a8a8a',
                fontSize: '0.65rem',
                fontFamily: 'sans-serif',
                textDecoration: 'none',
                transition: 'color 0.3s ease',
                letterSpacing: 0.5,
                '&:hover': {
                  color: '#8B1A1A',
                },
              }}
            >
              FAQ
            </Typography>

            {/* Back to Top Button - داخل الفوتر */}
            <motion.div
              whileHover={{ scale: 1.1, y: -3 }}
              whileTap={{ scale: 0.9 }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <IconButton
                onClick={scrollToTop}
                sx={{
                  bgcolor: 'transparent',
                  color: '#8a8a8a',
                  width: 40,
                  height: 40,
                  transition: 'all 0.4s cubic-bezier(.22,1,.36,1)',
                  border: '1.5px solid rgba(0,0,0,0.1)',
                  borderRadius: '50%',
                  '&:hover': {
                    bgcolor: 'rgba(139,26,26,0.05)',
                    borderColor: '#8B1A1A',
                    color: '#8B1A1A',
                    transform: 'translateY(-3px)',
                  },
                  '& svg': {
                    fontSize: '0.9rem',
                  },
                }}
              >
                <FaArrowUp />
              </IconButton>
            </motion.div>
          </Box>
        </Box>

        {/* Decorative Dots */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            gap: 1.5,
            mt: 2.5,
          }}
        >
          {[...Array(5)].map((_, i) => (
            <Box
              key={i}
              sx={{
                width: 3,
                height: 3,
                borderRadius: '50%',
                bgcolor: i % 2 === 0 ? 'rgba(139,26,26,0.3)' : 'rgba(0,0,0,0.06)',
              }}
            />
          ))}
        </Box>
      </Container>
    </Box>
  );
}