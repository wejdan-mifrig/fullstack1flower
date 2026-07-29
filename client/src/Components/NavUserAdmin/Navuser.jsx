// ============================================================
// 📄 src/Components/NavUserAdmin/Navuser.jsx
// ============================================================

import React, { useState, useContext } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  IconButton,
  Drawer,
  Divider,
  Avatar,
} from '@mui/material';
import {
  Menu as MenuIcon,
  Close,
  KeyboardArrowDown,
  KeyboardArrowUp,
  Person,
  Storefront,
  ShoppingCart,
  Logout,
  Home,
  Event,
  ShoppingBag,
  Info,
  ContactMail,
  RateReview,
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../Context/AuthContext.jsx';

// ============================================================
// NAVIGATION ITEMS
// ============================================================

const navItems = [
  { label: 'HOME', path: '/user' },
  { label: 'EVENT DECORATION', path: '/eventsuser' },
  { label: 'SHOP', path: '/shopuser' },
  { label: 'ABOUT', path: '/aboutuser' },
  { label: 'CONTACT US', path: '/contactuser' },
  { label: 'CUSTOMER REVIEWS', path: '/reviewsuser' },
];

// ============================================================
// EVENT TYPES (Sub-menu)
// ============================================================

const eventTypes = [
  { label: 'WEDDING', path: '/weddinguser' },
  { label: 'BIRTHDAY', path: '/birthdayuser' },
  { label: 'GRADUATION', path: '/graduationuser' },
  { label: 'NEWBORN', path: '/newbornuser' },
];

// ============================================================
// USER LINKS
// ============================================================

const userLinks = [
  { label: 'MY PROFILE', path: '/myprofile', icon: <Person /> },
  { label: 'MY ORDERS', path: '/mybooking', icon: <Storefront /> },
  { label: 'CART', path: '/cart', icon: <ShoppingCart /> },
];

// ============================================================
// COMPONENT
// ============================================================

export default function NavbarUser() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [eventsOpen, setEventsOpen] = useState(false);
  const navigate = useNavigate();
  const { user, logout } = useContext(UserContext);

  // ============================================================
  // HANDLERS
  // ============================================================

  const handleNavigation = (path) => {
    navigate(path);
    setDrawerOpen(false);
  };

  const handleLogout = async () => {
    await logout();
    setDrawerOpen(false);
    navigate('/');
  };

  const toggleEvents = () => setEventsOpen((prev) => !prev);

  // ============================================================
  // RENDER
  // ============================================================

  return (
    <>
      {/* ============================================================
          TOP NAVBAR - Same as regular Navbar
      ============================================================ */}

      <AppBar
        position="absolute"
        elevation={0}
        sx={{
          bgcolor: 'transparent',
          boxShadow: 'none',
          zIndex: 10,
        }}
      >
        <Toolbar
          sx={{
            justifyContent: 'space-between',
            px: { xs: 2, md: 6 },
            py: 2,
          }}
        >
          {/* Menu Icon */}
          <IconButton
            onClick={() => setDrawerOpen(true)}
            sx={{ color: '#f4f1ea' }}
          >
            <MenuIcon />
          </IconButton>

          {/* Logo */}
          <Typography
            onClick={() => handleNavigation('/user')}
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

          {/* Store Button */}
          <Typography
            onClick={() => handleNavigation('/shopuser')}
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

      {/* ============================================================
          SIDEBAR DRAWER - Same as regular Navbar
      ============================================================ */}

      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
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
          {/* ============================================================
              HEADER - Logo + Close
          ============================================================ */}

          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              mb: 4,
            }}
          >
            <Typography
              onClick={() => handleNavigation('/user')}
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

            <IconButton onClick={() => setDrawerOpen(false)}>
              <Close />
            </IconButton>
          </Box>

          {/* ============================================================
              USER INFO
          ============================================================ */}

          {user && (
            <Box
              sx={{
                mb: 4,
                p: 2,
                borderRadius: 2,
                display: 'flex',
                alignItems: 'center',
                gap: 2,
                bgcolor: '#fff',
                boxShadow: '0 4px 12px rgba(0,0,0,0.04)',
              }}
            >
              <Avatar
                sx={{
                  bgcolor: '#c98f6b',
                  width: 48,
                  height: 48,
                  color: '#fff',
                }}
              >
                {user.name?.charAt(0)?.toUpperCase() || 'U'}
              </Avatar>
              <Box>
                <Typography sx={{ fontWeight: 600, color: '#1c1b18' }}>
                  {user.name}
                </Typography>
                <Typography sx={{ fontSize: '.75rem', color: '#8a8479' }}>
                  {user.email || 'Member'}
                </Typography>
              </Box>
            </Box>
          )}

          <Divider sx={{ mb: 3, borderColor: '#e0dcd5' }} />

          {/* ============================================================
              NAVIGATION ITEMS
          ============================================================ */}

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
                    toggleEvents();
                  } else {
                    handleNavigation(item.path);
                  }
                }}
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  cursor: 'pointer',
                  py: 1,
                  mb: 0.5,
                  borderRadius: 1,
                  px: 1,
                  '&:hover': {
                    bgcolor: 'rgba(201,143,107,0.08)',
                  },
                }}
              >
                <Typography
                  sx={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: '.9rem',
                    fontWeight: 500,
                    letterSpacing: 2,
                    color: '#1c1b18',
                    '&:hover': { color: '#c98f6b' },
                  }}
                >
                  {item.label}
                </Typography>

                {item.label === 'EVENT DECORATION' &&
                  (eventsOpen ? (
                    <KeyboardArrowUp sx={{ color: '#8a8479' }} />
                  ) : (
                    <KeyboardArrowDown sx={{ color: '#8a8479' }} />
                  ))}
              </Box>

              {/* ============================================================
                  EVENT SUB-MENU
              ============================================================ */}

              {item.label === 'EVENT DECORATION' && eventsOpen && (
                <Box sx={{ ml: 4, mb: 2 }}>
                  {eventTypes.map((event) => (
                    <Typography
                      key={event.label}
                      onClick={() => handleNavigation(event.path)}
                      sx={{
                        mb: 1,
                        py: 0.5,
                        px: 1,
                        fontSize: '.8rem',
                        color: '#6b665d',
                        cursor: 'pointer',
                        borderRadius: 1,
                        fontFamily: "'Inter', sans-serif",
                        letterSpacing: 1.5,
                        '&:hover': {
                          color: '#c98f6b',
                          bgcolor: 'rgba(201,143,107,0.06)',
                          pl: 2,
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

          <Divider sx={{ my: 3, borderColor: '#e0dcd5' }} />

          {/* ============================================================
              USER LINKS
          ============================================================ */}

          {user && (
            <>
              <Typography
                sx={{
                  fontSize: '.7rem',
                  color: '#8a8479',
                  letterSpacing: 2,
                  fontWeight: 500,
                  mb: 1.5,
                }}
              >
                ACCOUNT
              </Typography>

              {userLinks.map((link) => (
                <Box
                  key={link.label}
                  onClick={() => handleNavigation(link.path)}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 2,
                    py: 1.5,
                    px: 1,
                    cursor: 'pointer',
                    borderRadius: 1,
                    mb: 0.5,
                    '&:hover': {
                      bgcolor: 'rgba(201,143,107,0.08)',
                    },
                  }}
                >
                  <Box sx={{ color: '#8a8479', display: 'flex', alignItems: 'center' }}>
                    {link.icon}
                  </Box>
                  <Typography
                    sx={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: '.85rem',
                      fontWeight: 400,
                      letterSpacing: 1.5,
                      color: '#1c1b18',
                    }}
                  >
                    {link.label}
                  </Typography>
                </Box>
              ))}

              <Divider sx={{ my: 3, borderColor: '#e0dcd5' }} />
            </>
          )}

          <Box sx={{ flexGrow: 1 }} />

          {/* ============================================================
              LOGOUT / LOGIN BUTTONS
          ============================================================ */}

          {user ? (
            <Box
              onClick={handleLogout}
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 1.5,
                bgcolor: '#1c1b18',
                color: '#fff',
                py: 1.8,
                borderRadius: 1,
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                '&:hover': {
                  bgcolor: '#c98f6b',
                  transform: 'translateY(-2px)',
                  boxShadow: '0 8px 24px rgba(201,143,107,0.3)',
                },
              }}
            >
              <Logout sx={{ fontSize: 20 }} />
              <Typography
                sx={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: '.8rem',
                  fontWeight: 500,
                  letterSpacing: 2,
                }}
              >
                SIGN OUT
              </Typography>
            </Box>
          ) : (
            <>
              <Box
                onClick={() => handleNavigation('/register')}
                sx={{
                  border: '1px solid #1c1b18',
                  py: 1.5,
                  textAlign: 'center',
                  cursor: 'pointer',
                  borderRadius: 1,
                  mb: 1.5,
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    bgcolor: '#1c1b18',
                    color: '#fff',
                  },
                }}
              >
                <Typography
                  sx={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: '.8rem',
                    fontWeight: 500,
                    letterSpacing: 2,
                  }}
                >
                  REGISTER
                </Typography>
              </Box>

              <Box
                onClick={() => handleNavigation('/login')}
                sx={{
                  bgcolor: '#1c1b18',
                  color: '#fff',
                  py: 1.5,
                  textAlign: 'center',
                  cursor: 'pointer',
                  borderRadius: 1,
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    opacity: 0.9,
                    transform: 'translateY(-2px)',
                    boxShadow: '0 8px 24px rgba(0,0,0,0.2)',
                  },
                }}
              >
                <Typography
                  sx={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: '.8rem',
                    fontWeight: 500,
                    letterSpacing: 2,
                  }}
                >
                  LOG IN
                </Typography>
              </Box>
            </>
          )}

          {/* ============================================================
              FOOTER
          ============================================================ */}

          <Box sx={{ mt: 4 }}>
            <Typography sx={{ fontSize: '.75rem', color: '#8a8479', fontFamily: "'Inter', sans-serif" }}>
              Luxury Floral Design
            </Typography>
            <Typography sx={{ fontSize: '.75rem', color: '#8a8479', fontFamily: "'Inter', sans-serif" }}>
              Weddings • Events • Flowers
            </Typography>
          </Box>
        </Box>
      </Drawer>
    </>
  );
}