// ============================================================
// 📄 src/Components/Navhero/Nav.jsx
// ============================================================

import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  IconButton,
  Drawer,
} from '@mui/material';
import {
  Menu as MenuIcon,
  Close,
  KeyboardArrowDown,
  KeyboardArrowUp,
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const navItems = [
  { label: 'HOME', path: '/' },
  { label: 'EVENT DECORATION', path: '/event-decoration' },
 
  { label: 'SHOP', path: '/shop' },
  { label: 'ABOUT', path: '/about' },
  { label: 'CONTACT US', path: '/contact' },
  { label: 'CART', path: '/carts' }, // ✅ المسار صحيح
];

const eventTypes = [
  { label: 'WEDDING', path: '/events/wedding' },
  { label: 'BIRTHDAY', path: '/events/birthday' },
  { label: 'GRADUATION', path: '/events/graduation' },
  { label: 'NEWBORN', path: '/events/newborn' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [eventsOpen, setEventsOpen] = useState(false);
  const navigate = useNavigate();

  const handleNav = (path) => {
    navigate(path);
    setOpen(false);
  };

  return (
    <>
      <AppBar
        position="absolute"
        elevation={0}
        sx={{ bgcolor: 'transparent', boxShadow: 'none' }}
      >
        <Toolbar
          sx={{
            justifyContent: 'space-between',
            px: { xs: 2, md: 6 },
            py: 2,
          }}
        >
          <IconButton onClick={() => setOpen(true)} sx={{ color: '#f4f1ea' }}>
            <MenuIcon />
          </IconButton>

          <Typography
            onClick={() => handleNav('/')}
            sx={{
              color: '#f4f1ea',
              fontFamily: "'Cormorant Garamond', serif",
              letterSpacing: 8,
              fontWeight: 600,
              fontSize: { xs: '1.5rem', md: '2rem' },
              cursor: 'pointer',
            }}
          >
            FLORA
          </Typography>

          <Typography
            onClick={() => handleNav('/shop')}
            sx={{
              color: '#f4f1ea',
              letterSpacing: 3,
              fontSize: '.9rem',
              textTransform: 'uppercase',
              cursor: 'pointer',
              '&:hover': { opacity: 0.7 },
            }}
          >
            Store
          </Typography>
        </Toolbar>
      </AppBar>

      <Drawer
        anchor="left"
        open={open}
        onClose={() => setOpen(false)}
        PaperProps={{
          sx: {
            width: { xs: '100%', md: '30%' },
            bgcolor: '#f4f1ea',
          },
        }}
      >
        <Box
          sx={{
            p: 5,
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              mb: 7,
            }}
          >
            <Typography
              onClick={() => handleNav('/')}
              sx={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: '2.5rem',
                fontWeight: 600,
                letterSpacing: 4,
                color: '#1c1b18',
                cursor: 'pointer',
              }}
            >
              FLORA
            </Typography>

            <IconButton onClick={() => setOpen(false)}>
              <Close />
            </IconButton>
          </Box>

          {navItems.map((item, index) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, x: -25 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Box
                onClick={() => {
                  if (item.label === 'EVENT DECORATION') {
                    setEventsOpen(!eventsOpen);
                  } else {
                    handleNav(item.path);
                  }
                }}
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  cursor: 'pointer',
                }}
              >
                <Typography
                  sx={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: '.9rem',
                    fontWeight: 500,
                    letterSpacing: 2,
                    color: '#1c1b18',
                    mb: 2,
                    '&:hover': { color: '#c98f6b' },
                  }}
                >
                  {item.label}
                </Typography>

                {item.label === 'EVENT DECORATION' &&
                  (eventsOpen ? (
                    <KeyboardArrowUp />
                  ) : (
                    <KeyboardArrowDown />
                  ))}
              </Box>

              {item.label === 'EVENT DECORATION' && eventsOpen && (
                <Box sx={{ ml: 3, mb: 2 }}>
                  {eventTypes.map((event) => (
                    <Typography
                      key={event.label}
                      onClick={() => handleNav(event.path)}
                      sx={{
                        mb: 1,
                        fontSize: '.8rem',
                        color: '#6b665d',
                        cursor: 'pointer',
                        '&:hover': {
                          color: '#c98f6b',
                          pl: 1,
                        },
                      }}
                    >
                      {event.label}
                    </Typography>
                  ))}
                </Box>
              )}
            </motion.div>
          ))}

          <Box sx={{ flexGrow: 1 }} />

          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Box
              onClick={() => handleNav('/register')}
              sx={{
                border: '1px solid #1c1b18',
                py: 1.5,
                textAlign: 'center',
                cursor: 'pointer',
                '&:hover': { bgcolor: '#1c1b18', color: '#fff' },
              }}
            >
              REGISTER
            </Box>

            <Box
              onClick={() => handleNav('/login')}
              sx={{
                bgcolor: '#1c1b18',
                color: '#fff',
                py: 1.5,
                textAlign: 'center',
                cursor: 'pointer',
                '&:hover': { opacity: 0.9 },
              }}
            >
              LOG IN
            </Box>
          </Box>

          <Box sx={{ mt: 4 }}>
            <Typography sx={{ fontSize: '.75rem', color: '#8a8479' }}>
              Luxury Floral Design
            </Typography>
            <Typography sx={{ fontSize: '.75rem', color: '#8a8479' }}>
              Weddings • Events • Flowers
            </Typography>
          </Box>
        </Box>
      </Drawer>
    </>
  );
}