import React, { useState, useContext } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  IconButton,
  Drawer,
  Divider,
  Avatar,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Collapse,
} from "@mui/material";
import {
  Menu as MenuIcon,
  Close,
  Home,
  Event,
  BookOnline,
  ShoppingBag,
  Info,
  ContactMail,
  RateReview,
  Person,
  ShoppingCart,
  Logout,
  ExpandLess,
  ExpandMore,
  Storefront,
} from "@mui/icons-material";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../Context/AuthContext.jsx";

// تعريف الروابط الرئيسية (مع أيقونات)
const navItems = [
  { label: "HOME", path: "/user", icon: <Home /> },
  { label: "EVENT DECORATION", path: "/eventsuser", icon: <Event /> },
  { label: "BOOK AN EVENT", path: "/bookuser", icon: <BookOnline /> },
  { label: "SHOP", path: "/shopuser", icon: <ShoppingBag /> },
  { label: "ABOUT", path: "/aboutuser", icon: <Info /> },
  { label: "CONTACT US", path: "/contactuser", icon: <ContactMail /> },
  { label: "CUSTOMER REVIEWS", path: "/reviewsuser", icon: <RateReview /> },
];

// أنواع الفعاليات الفرعية (للقائمة المنسدلة)
const eventTypes = [
  { label: "WEDDING", path: "/weddinguser" },
  { label: "BIRTHDAY", path: "/birthdayuser" },
  { label: "GRADUATION", path: "/graduationuser" },
  { label: "NEWBORN", path: "/newbornuser" },
];

// عناصر المستخدم (ملف شخصي، طلباتي، سلة)
const userLinks = [
  { label: "MY PROFILE", path: "/myprofile", icon: <Person /> },
  { label: "MY ORDERS", path: "/mybooking", icon: <Storefront /> },
  { label: "CART", path: "/cart", icon: <ShoppingCart /> },
];

export default function NavbarUser() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [eventsOpen, setEventsOpen] = useState(false);
  const navigate = useNavigate();
  const { user, logout } = useContext(UserContext);

  // إغلاق القائمة بعد التنقل
  const handleNavigation = (path) => {
    navigate(path);
    setDrawerOpen(false);
  };

  // تسجيل الخروج
  const handleLogout = async () => {
    await logout();
    setDrawerOpen(false);
  };

  // تبديل قائمة الفعاليات
  const toggleEvents = () => setEventsOpen((prev) => !prev);

  return (
    <>
      {/* الشريط العلوي */}
      <AppBar
        position="absolute"
        elevation={0}
        sx={{
          bgcolor: "transparent",
          zIndex: 10,
          backdropFilter: "blur(2px)",
        }}
      >
        <Toolbar
          sx={{
            justifyContent: "space-between",
            px: { xs: 2, md: 5 },
            py: 2,
          }}
        >
          <IconButton
            onClick={() => setDrawerOpen(true)}
            sx={{ color: "#f4f1ea" }}
          >
            <MenuIcon />
          </IconButton>

          {/* اسم الماركة */}
          <Typography
            onClick={() => handleNavigation("/user")}
            sx={{
              color: "#f4f1ea",
              fontFamily: "'Cormorant Garamond', serif",
              letterSpacing: { xs: 5, md: 10 },
              fontWeight: 600,
              cursor: "pointer",
              fontSize: { xs: "1.4rem", md: "1.8rem" },
            }}
          >
            FLORA
          </Typography>

          {/* زر المتجر (اختصار) */}
          <Typography
            onClick={() => handleNavigation("/shopuser")}
            sx={{
              color: "#f4f1ea",
              fontSize: ".85rem",
              letterSpacing: 3,
              cursor: "pointer",
              position: "relative",
              "&:after": {
                content: '""',
                position: "absolute",
                left: 0,
                bottom: -3,
                width: 0,
                height: "1px",
                bgcolor: "#fff",
                transition: "0.3s",
              },
              "&:hover:after": { width: "100%" },
            }}
          >
            STORE
          </Typography>
        </Toolbar>
      </AppBar>

      {/* القائمة الجانبية (Drawer) */}
      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        PaperProps={{
          sx: {
            width: { xs: "100%", md: 400 },
            bgcolor: "rgba(244,241,234,0.97)",
            backdropFilter: "blur(16px)",
            boxShadow: "0 8px 40px rgba(0,0,0,0.1)",
            borderRadius: { md: "0 20px 20px 0" },
          },
        }}
      >
        <Box
          sx={{
            p: 4,
            display: "flex",
            flexDirection: "column",
            height: "100%",
          }}
        >
          {/* رأس القائمة: الشعار + زر الإغلاق */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 4,
            }}
          >
            <Typography
              onClick={() => handleNavigation("/user")}
              sx={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "2.2rem",
                fontWeight: 600,
                cursor: "pointer",
                color: "#1c1b18",
              }}
            >
              FLORA
            </Typography>
            <IconButton onClick={() => setDrawerOpen(false)}>
              <Close />
            </IconButton>
          </Box>

          {/* معلومات المستخدم */}
          <AnimatePresence>
            {user && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                <Box
                  sx={{
                    mb: 4,
                    p: 2,
                    borderRadius: 4,
                    display: "flex",
                    alignItems: "center",
                    gap: 2,
                    background: "linear-gradient(135deg, #fff, #f7f4ef)",
                    boxShadow: "0 8px 24px rgba(0,0,0,0.06)",
                  }}
                >
                  <Avatar sx={{ bgcolor: "#c98f6b", width: 48, height: 48 }}>
                    {user.name?.charAt(0)?.toUpperCase()}
                  </Avatar>
                  <Box>
                    <Typography sx={{ fontWeight: 600, color: "#1c1b18" }}>
                      {user.name}
                    </Typography>
                    <Typography sx={{ fontSize: ".75rem", color: "#777" }}>
                      Premium Member
                    </Typography>
                  </Box>
                </Box>
              </motion.div>
            )}
          </AnimatePresence>

          <Divider sx={{ mb: 2 }} />

          {/* قائمة التنقل الرئيسية */}
          <Typography
            sx={{
              fontSize: ".7rem",
              color: "#999",
              mb: 1,
              letterSpacing: 2,
              fontWeight: 500,
            }}
          >
            NAVIGATION
          </Typography>

          <List sx={{ flexGrow: 1, p: 0 }}>
            {navItems.map((item, index) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.04, duration: 0.3 }}
              >
                <ListItem
                  button
                  onClick={() => {
                    if (item.label === "EVENT DECORATION") {
                      toggleEvents();
                    } else {
                      handleNavigation(item.path);
                    }
                  }}
                  sx={{
                    borderRadius: 2,
                    mb: 0.5,
                    pl: 1,
                    "&:hover": {
                      backgroundColor: "rgba(201,143,107,0.12)",
                      "& .MuiListItemIcon-root": { color: "#c98f6b" },
                    },
                  }}
                >
                  <ListItemIcon sx={{ minWidth: 40, color: "#888" }}>
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText
                    primary={item.label}
                    primaryTypographyProps={{
                      fontSize: ".9rem",
                      fontWeight: 500,
                      letterSpacing: 0.5,
                    }}
                  />
                  {item.label === "EVENT DECORATION" &&
                    (eventsOpen ? <ExpandLess /> : <ExpandMore />)}
                </ListItem>

                {/* القائمة الفرعية للفعاليات */}
                {item.label === "EVENT DECORATION" && (
                  <Collapse in={eventsOpen} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                      {eventTypes.map((event) => (
                        <ListItem
                          button
                          key={event.label}
                          onClick={() => handleNavigation(event.path)}
                          sx={{
                            pl: 6,
                            borderRadius: 2,
                            "&:hover": {
                              backgroundColor: "rgba(201,143,107,0.08)",
                              color: "#c98f6b",
                            },
                          }}
                        >
                          <ListItemText
                            primary={event.label}
                            primaryTypographyProps={{
                              fontSize: ".85rem",
                              fontWeight: 400,
                              color: "#666",
                            }}
                          />
                        </ListItem>
                      ))}
                    </List>
                  </Collapse>
                )}
              </motion.div>
            ))}
          </List>

          <Divider sx={{ my: 2 }} />

          {/* روابط المستخدم (ملف، طلبات، سلة) */}
          {user && (
            <>
              <Typography
                sx={{
                  fontSize: ".7rem",
                  color: "#999",
                  mb: 1,
                  letterSpacing: 2,
                  fontWeight: 500,
                }}
              >
                ACCOUNT
              </Typography>
              <List sx={{ p: 0 }}>
                {userLinks.map((link) => (
                  <ListItem
                    button
                    key={link.label}
                    onClick={() => handleNavigation(link.path)}
                    sx={{
                      borderRadius: 2,
                      mb: 0.5,
                      "&:hover": {
                        backgroundColor: "rgba(201,143,107,0.12)",
                        "& .MuiListItemIcon-root": { color: "#c98f6b" },
                      },
                    }}
                  >
                    <ListItemIcon sx={{ minWidth: 40, color: "#888" }}>
                      {link.icon}
                    </ListItemIcon>
                    <ListItemText
                      primary={link.label}
                      primaryTypographyProps={{
                        fontSize: ".9rem",
                        fontWeight: 500,
                      }}
                    />
                  </ListItem>
                ))}
              </List>
            </>
          )}

          <Box sx={{ flexGrow: 1 }} />

          {/* زر تسجيل الخروج */}
          {user && (
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Box
                onClick={handleLogout}
                sx={{
                  mt: 2,
                  py: 1.8,
                  px: 2,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 1,
                  borderRadius: 3,
                  background: "linear-gradient(135deg, #1c1b18, #2b2824)",
                  color: "#fff",
                  cursor: "pointer",
                  letterSpacing: 2,
                  fontSize: ".8rem",
                  transition: "0.3s",
                  boxShadow: "0 8px 24px rgba(0,0,0,0.15)",
                  "&:hover": {
                    transform: "translateY(-2px)",
                    boxShadow: "0 12px 32px rgba(0,0,0,0.25)",
                  },
                }}
              >
                <Logout sx={{ fontSize: 20 }} />
                SIGN OUT
              </Box>
            </motion.div>
          )}

          <Box sx={{ mt: 4, textAlign: "center" }}>
            <Typography sx={{ fontSize: ".7rem", color: "#999" }}>
              Luxury Floral Experience
            </Typography>
          </Box>
        </Box>
      </Drawer>
    </>
  );
}