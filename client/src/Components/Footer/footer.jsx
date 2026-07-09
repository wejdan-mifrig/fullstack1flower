import React from 'react';
import { Box, Typography } from '@mui/material';
import {
  FaFacebookF,
  FaInstagram,
  FaWhatsapp,
} from 'react-icons/fa';

export default function Footer() {
  return (
    <Box
      sx={{
        bgcolor: '#f4f1ea',
        width: '100%',
        px: { xs: 3, md: 8 },
        py: { xs: 6, md: 8 },
        overflow: 'hidden',
      }}
    >
      <Typography
        sx={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: { xs: '3rem', md: '5rem' },
          color: '#3e4a3a',
          textAlign: 'center',
          mb: 5,
          fontWeight: 600,
          letterSpacing: '.08em',
          animation: 'glow 3s ease-in-out infinite',
          '@keyframes glow': {
            '0%': {
              textShadow: '0 0 5px #3e4a3a',
            },
            '50%': {
              textShadow:
                '0 0 20px rgba(0,0,0,.25), 0 0 40px #3e4a3a',
            },
            '100%': {
              textShadow: '0 0 5px #3e4a3a',
            },
          },
        }}
      >
        Flora
      </Typography>

      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          gap: 3,
          mb: 5,
        }}
      >
        <Box
          component="a"
          href="https://facebook.com"
          target="_blank"
          sx={{
            color: '#3e4a3a',
            fontSize: '1.4rem',
            transition: '.3s',
            '&:hover': {
              transform: 'translateY(-4px)',
              color: '#c98f6b',
            },
          }}
        >
          <FaFacebookF />
        </Box>

        <Box
          component="a"
          href="https://instagram.com"
          target="_blank"
          sx={{
            color: '#3e4a3a',
            fontSize: '1.4rem',
            transition: '.3s',
            '&:hover': {
              transform: 'translateY(-4px)',
              color: '#c98f6b',
            },
          }}
        >
          <FaInstagram />
        </Box>

        <Box
          component="a"
          href="https://wa.me/"
          target="_blank"
          sx={{
            color: '#3e4a3a',
            fontSize: '1.4rem',
            transition: '.3s',
            '&:hover': {
              transform: 'translateY(-4px)',
              color: '#c98f6b',
            },
          }}
        >
          <FaWhatsapp />
        </Box>
      </Box>

      <Typography
        sx={{
          textAlign: 'center',
          color: '#3e4a3a',
          fontSize: '.9rem',
          letterSpacing: 2,
          mb: 2,
          textTransform: 'uppercase',
        }}
      >
        Irbid, Jordan
      </Typography>

      <Typography
        sx={{
          textAlign: 'center',
          color: '#3e4a3a',
          fontSize: '.8rem',
          letterSpacing: 1,
        }}
      >
        © {new Date().getFullYear()} Flora. All Rights Reserved.
      </Typography>
    </Box>
  );
}