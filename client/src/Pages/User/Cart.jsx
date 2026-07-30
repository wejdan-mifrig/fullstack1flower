import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Button,
  Container,
  IconButton,
  Dialog,
  DialogContent,
  Snackbar,
  Alert,
  Divider,
  Paper,
  Chip,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  RadioGroup,
  FormControlLabel,
  Radio,
  Collapse,
  Grid,
  InputAdornment,
} from "@mui/material";
import { keyframes } from "@emotion/react";
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import DeleteIcon from "@mui/icons-material/Delete";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import PaymentsIcon from "@mui/icons-material/Payments";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import Footer from "../../Components/Footer/Footer.jsx";
import NavbarUser from "../../Components/NavUserAdmin/Navuser.jsx";
import { useCart } from "../../Context/CartContext.jsx";
import { useOrders } from "../../Context/OrderContext.jsx";
import { useAuth } from "../../Context/AuthContext.jsx";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

import whiteTulip from "../../assets/images/white-tulip.jpg";
import whiteRoseBouquet from "../../assets/images/white-rose-bouquet.jpg";
import whiteLily from "../../assets/images/white-lily.jpg";
import whiteOrchid from "../../assets/images/white-orchid.jpg";
import whiteMix from "../../assets/images/white-mix.jpg";
import whiteGarden from "../../assets/images/white-garden.jpg";
import redRose from "../../assets/images/red-rose.jpg";
import redTulip from "../../assets/images/red-tulip.jpg";
import redMix from "../../assets/images/red-mix.jpg";
import luxRedRose from "../../assets/images/lux-red-rose.jpg";
import redLove from "../../assets/images/red-love.jpg";
import redGarden from "../../assets/images/red-garden.jpg";
import pinkRose from "../../assets/images/pink-rose.jpg";
import pinkTulip from "../../assets/images/pink-tulip.jpg";
import pinkLily from "../../assets/images/pink-lily.jpg";
import pinkMix from "../../assets/images/pink-mix.jpg";
import pinkRomantic from "../../assets/images/pink-romantic.jpg";
import pinkGarden from "../../assets/images/pink-garden.jpg";
import sunflower from "../../assets/images/sunflower.jpg";
import yellowRose from "../../assets/images/yellow-rose.jpg";
import yellowTulip from "../../assets/images/yellow-tulip.jpg";
import yellowMix from "../../assets/images/yellow-mix.jpg";
import golden from "../../assets/images/golden.jpg";
import yellowGarden from "../../assets/images/yellow-garden.jpg";
import purpleOrchid from "../../assets/images/purple-orchid.jpg";
import purpleRose from "../../assets/images/purple-rose.jpg";
import purpleTulip from "../../assets/images/purple-tulip.jpg";
import purpleMix from "../../assets/images/purple-mix.jpg";
import royalPurple from "../../assets/images/royal-purple.jpg";
import purpleGarden from "../../assets/images/purple-garden.jpg";
import springMix from "../../assets/images/spring-mix.jpg";
import rainbow from "../../assets/images/rainbow.jpg";
import luxMix from "../../assets/images/lux-mix.jpg";
import seasonal from "../../assets/images/seasonal.jpg";
import elegantMix from "../../assets/images/elegant-mix.jpg";
import classicRose from "../../assets/images/classic-rose.jpg";
import luxRose from "../../assets/images/lux-rose.jpg";
import romanticRose from "../../assets/images/romantic-rose.jpg";
import whiteRedRose from "../../assets/images/white-red-rose.jpg";
import pinkLuxRose from "../../assets/images/pink-lux-rose.jpg";
import royalRose from "../../assets/images/royal-rose.jpg";
import weddingWhite from "../../assets/images/wedding-white.jpg";
import bridalRose from "../../assets/images/bridal-rose.jpg";
import centerpiece from "../../assets/images/centerpiece.jpg";
import weddingSet from "../../assets/images/wedding-set.jpg";
import arch from "../../assets/images/arch.jpg";
import bridePremium from "../../assets/images/bride-premium.jpg";
import birthdaySurprise from "../../assets/images/birthday-surprise.jpg";
import birthdayRoses from "../../assets/images/birthday-roses.jpg";
import birthdayMix from "../../assets/images/birthday-mix.jpg";
import balloonSet from "../../assets/images/balloon-set.jpg";
import birthdayLux from "../../assets/images/birthday-lux.jpg";
import celebration from "../../assets/images/celebration.jpg";
import chocoBox from "../../assets/images/choco-box.jpg";
import teddyBox from "../../assets/images/teddy-box.jpg";
import luxBox from "../../assets/images/lux-box.jpg";
import romanticBox from "../../assets/images/romantic-box.jpg";
import birthdayBox from "../../assets/images/birthday-box.jpg";
import specialBox from "../../assets/images/special-box.jpg";

const placeholder =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300' viewBox='0 0 400 300'%3E%3Crect width='400' height='300' fill='%23f0f0f0'/%3E%3Ctext x='50%25' y='50%25' font-family='Arial' font-size='20' fill='%23999999' text-anchor='middle' dy='.3em'%3ENo Image%3C/text%3E%3C/svg%3E";

const colors = {
  bgPrimary: "#8B0000",
  bgDark: "#660000",
  cardBg: "#ffffff",
  cardBorder: "rgba(139,0,0,0.12)",
  textPrimary: "#000000",
  textSecondary: "rgba(0,0,0,0.75)",
  textMuted: "rgba(0,0,0,0.5)",
  textWhite: "#ffffff",
  textWhiteMuted: "rgba(255,255,255,0.7)",
  gold: "#c9a84c",
  goldHover: "#b8943a",
  goldSoft: "rgba(201,168,76,0.15)",
  red: "#8B0000",
  darkRed: "#660000",
  success: "#4caf50",
  error: "#d32f2f",
};

const API_BASE_URL = "http://localhost:3000";

const imagesMap = {
  "white-tulip.jpg": whiteTulip,
  "white-rose-bouquet.jpg": whiteRoseBouquet,
  "white-lily.jpg": whiteLily,
  "white-orchid.jpg": whiteOrchid,
  "white-mix.jpg": whiteMix,
  "white-garden.jpg": whiteGarden,
  "red-rose.jpg": redRose,
  "red-tulip.jpg": redTulip,
  "red-mix.jpg": redMix,
  "lux-red-rose.jpg": luxRedRose,
  "red-love.jpg": redLove,
  "red-garden.jpg": redGarden,
  "pink-rose.jpg": pinkRose,
  "pink-tulip.jpg": pinkTulip,
  "pink-lily.jpg": pinkLily,
  "pink-mix.jpg": pinkMix,
  "pink-romantic.jpg": pinkRomantic,
  "pink-garden.jpg": pinkGarden,
  "sunflower.jpg": sunflower,
  "yellow-rose.jpg": yellowRose,
  "yellow-tulip.jpg": yellowTulip,
  "yellow-mix.jpg": yellowMix,
  "golden.jpg": golden,
  "yellow-garden.jpg": yellowGarden,
  "purple-orchid.jpg": purpleOrchid,
  "purple-rose.jpg": purpleRose,
  "purple-tulip.jpg": purpleTulip,
  "purple-mix.jpg": purpleMix,
  "royal-purple.jpg": royalPurple,
  "purple-garden.jpg": purpleGarden,
  "spring-mix.jpg": springMix,
  "rainbow.jpg": rainbow,
  "lux-mix.jpg": luxMix,
  "seasonal.jpg": seasonal,
  "elegant-mix.jpg": elegantMix,
  "classic-rose.jpg": classicRose,
  "lux-rose.jpg": luxRose,
  "romantic-rose.jpg": romanticRose,
  "white-red-rose.jpg": whiteRedRose,
  "pink-lux-rose.jpg": pinkLuxRose,
  "royal-rose.jpg": royalRose,
  "wedding-white.jpg": weddingWhite,
  "bridal-rose.jpg": bridalRose,
  "centerpiece.jpg": centerpiece,
  "wedding-set.jpg": weddingSet,
  "arch.jpg": arch,
  "bride-premium.jpg": bridePremium,
  "birthday-surprise.jpg": birthdaySurprise,
  "birthday-roses.jpg": birthdayRoses,
  "birthday-mix.jpg": birthdayMix,
  "balloon-set.jpg": balloonSet,
  "birthday-lux.jpg": birthdayLux,
  "celebration.jpg": celebration,
  "choco-box.jpg": chocoBox,
  "teddy-box.jpg": teddyBox,
  "lux-box.jpg": luxBox,
  "romantic-box.jpg": romanticBox,
  "birthday-box.jpg": birthdayBox,
  "special-box.jpg": specialBox,
};

const fadeInUp = keyframes`
  from { opacity: 0; transform: translateY(40px); }
  to { opacity: 1; transform: translateY(0); }
`;
const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;
const scaleIn = keyframes`
  from { opacity: 0; transform: scale(0.85); }
  to { opacity: 1; transform: scale(1); }
`;
const shimmer = keyframes`
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
`;
const successPulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
`;

const SuccessDialog = ({ open, onClose, orderData }) => {
  if (!orderData) return null;

  const getAddress = (data) => {
    return (
      data.delivery_address ||
      data.shipping_address ||
      data.address ||
      "Not provided"
    );
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="sm"
      PaperProps={{
        sx: {
          borderRadius: "16px",
          overflow: "hidden",
          animation: `${scaleIn} 0.4s ease`,
          bgcolor: "#ffffff",
          maxHeight: "80vh",
          overflowY: "auto",
          my: 2,
        },
      }}
    >
      <Box sx={{ bgcolor: "#ffffff", p: { xs: 2, md: 3 } }}>
        <Box sx={{ textAlign: "center", mb: 3 }}>
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.4, type: "spring" }}
          >
            <CheckCircleIcon
              sx={{
                fontSize: 56,
                color: colors.success,
                animation: `${successPulse} 1.5s ease-in-out infinite`,
              }}
            />
          </motion.div>
          <Typography
            sx={{
              fontSize: "1.3rem",
              fontWeight: 700,
              color: colors.textPrimary,
              mt: 1.5,
            }}
          >
            Order Placed Successfully!
          </Typography>
          <Typography
            sx={{ color: colors.textSecondary, fontSize: "0.85rem", mt: 0.5 }}
          >
            Thank you for your purchase.
          </Typography>
        </Box>
        <Divider sx={{ borderColor: "rgba(0,0,0,0.08)", mb: 2 }} />
        <Typography
          sx={{
            fontSize: "0.9rem",
            fontWeight: 600,
            color: colors.gold,
            mb: 2,
          }}
        >
          Order Details
        </Typography>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
          <Paper
            sx={{
              p: 1.5,
              bgcolor: "rgba(139,0,0,0.03)",
              borderRadius: "10px",
              border: "1px solid rgba(139,0,0,0.08)",
            }}
          >
            <Typography
              sx={{ color: colors.textMuted, fontSize: "0.65rem", mb: 1 }}
            >
              ORDER INFORMATION
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 0.8 }}>
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography
                  sx={{ color: colors.textMuted, fontSize: "0.7rem" }}
                >
                  Order Number
                </Typography>
                <Typography
                  sx={{
                    color: colors.textPrimary,
                    fontWeight: 600,
                    fontSize: "0.8rem",
                  }}
                >
                  #{Date.now().toString().slice(-8)}
                </Typography>
              </Box>
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography
                  sx={{ color: colors.textMuted, fontSize: "0.7rem" }}
                >
                  Date
                </Typography>
                <Typography
                  sx={{
                    color: colors.textPrimary,
                    fontWeight: 500,
                    fontSize: "0.75rem",
                  }}
                >
                  {new Date().toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </Typography>
              </Box>
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography
                  sx={{ color: colors.textMuted, fontSize: "0.7rem" }}
                >
                  Payment
                </Typography>
                <Typography
                  sx={{
                    color: colors.textPrimary,
                    fontWeight: 500,
                    textTransform: "capitalize",
                    fontSize: "0.75rem",
                  }}
                >
                  {orderData.paymentMethod === "cash"
                    ? "Cash on Delivery"
                    : "Visa / Credit Card"}
                </Typography>
              </Box>
            </Box>
          </Paper>
          <Paper
            sx={{
              p: 1.5,
              bgcolor: "rgba(139,0,0,0.03)",
              borderRadius: "10px",
              border: "1px solid rgba(139,0,0,0.08)",
            }}
          >
            <Typography
              sx={{ color: colors.textMuted, fontSize: "0.65rem", mb: 1 }}
            >
              CUSTOMER
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 0.5 }}>
              <Typography
                sx={{
                  color: colors.textPrimary,
                  fontWeight: 600,
                  fontSize: "0.8rem",
                }}
              >
                {orderData.fullName}
              </Typography>
              <Typography
                sx={{ color: colors.textSecondary, fontSize: "0.7rem" }}
              >
                {orderData.email}
              </Typography>
              <Typography
                sx={{ color: colors.textSecondary, fontSize: "0.7rem" }}
              >
                {orderData.phone}
              </Typography>
            </Box>
          </Paper>
          <Paper
            sx={{
              p: 1.5,
              bgcolor: "rgba(139,0,0,0.03)",
              borderRadius: "10px",
              border: "1px solid rgba(139,0,0,0.08)",
            }}
          >
            <Typography
              sx={{ color: colors.textMuted, fontSize: "0.65rem", mb: 0.5 }}
            >
              DELIVERY
            </Typography>
            <Typography sx={{ color: colors.textPrimary, fontSize: "0.8rem" }}>
              {getAddress(orderData)}
            </Typography>
            {orderData.notes && (
              <Typography
                sx={{
                  color: colors.textMuted,
                  fontSize: "0.7rem",
                  fontStyle: "italic",
                  mt: 0.5,
                }}
              >
                Note: {orderData.notes}
              </Typography>
            )}
          </Paper>
          <Paper
            sx={{
              p: 1.5,
              bgcolor: "rgba(139,0,0,0.03)",
              borderRadius: "10px",
              border: "1px solid rgba(139,0,0,0.08)",
            }}
          >
            <Typography
              sx={{ color: colors.textMuted, fontSize: "0.65rem", mb: 1 }}
            >
              ITEMS ({orderData.items?.length || 0})
            </Typography>
            {orderData.items?.slice(0, 3).map((item, index) => (
              <Box
                key={index}
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  py: 0.8,
                  borderBottom:
                    index < Math.min(orderData.items.length, 3) - 1
                      ? "1px solid rgba(0,0,0,0.05)"
                      : "none",
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                  <Box
                    component="img"
                    src={imagesMap[item.image] || placeholder}
                    alt={item.name}
                    sx={{
                      width: 36,
                      height: 36,
                      objectFit: "cover",
                      borderRadius: "6px",
                    }}
                  />
                  <Box>
                    <Typography
                      sx={{
                        color: colors.textPrimary,
                        fontWeight: 500,
                        fontSize: "0.8rem",
                      }}
                    >
                      {item.name}
                    </Typography>
                    <Typography
                      sx={{ color: colors.textMuted, fontSize: "0.65rem" }}
                    >
                      Qty: {item.quantity || 1}
                    </Typography>
                  </Box>
                </Box>
                <Typography
                  sx={{
                    color: colors.gold,
                    fontWeight: 600,
                    fontSize: "0.8rem",
                  }}
                >
                  $
                  {(parseFloat(item.price || 0) * (item.quantity || 1)).toFixed(
                    2,
                  )}
                </Typography>
              </Box>
            ))}
            {orderData.items?.length > 3 && (
              <Typography
                sx={{
                  color: colors.textMuted,
                  fontSize: "0.7rem",
                  textAlign: "center",
                  mt: 0.5,
                }}
              >
                +{orderData.items.length - 3} more items
              </Typography>
            )}
            <Divider sx={{ borderColor: "rgba(0,0,0,0.05)", my: 1 }} />
            <Box sx={{ display: "flex", flexDirection: "column", gap: 0.5 }}>
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography
                  sx={{ color: colors.textMuted, fontSize: "0.75rem" }}
                >
                  Subtotal
                </Typography>
                <Typography
                  sx={{ color: colors.textPrimary, fontSize: "0.8rem" }}
                >
                  ${orderData.subtotal?.toFixed(2) || "0.00"}
                </Typography>
              </Box>
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography
                  sx={{ color: colors.textMuted, fontSize: "0.75rem" }}
                >
                  Delivery
                </Typography>
                <Typography
                  sx={{ color: colors.textPrimary, fontSize: "0.8rem" }}
                >
                  {orderData.subtotal > 50 ? "Free" : "$5.00"}
                </Typography>
              </Box>
              <Divider sx={{ borderColor: "rgba(0,0,0,0.05)", my: 0.5 }} />
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Typography
                  sx={{
                    fontSize: "0.9rem",
                    fontWeight: 700,
                    color: colors.textPrimary,
                  }}
                >
                  Total
                </Typography>
                <Typography
                  sx={{
                    fontSize: "1.2rem",
                    fontWeight: 800,
                    color: colors.gold,
                  }}
                >
                  ${orderData.total?.toFixed(2) || "0.00"}
                </Typography>
              </Box>
            </Box>
          </Paper>
          <Paper
            sx={{
              display: "flex",
              gap: 1.5,
              alignItems: "center",
              p: 1.5,
              bgcolor: "rgba(76, 175, 80, 0.06)",
              borderRadius: "10px",
              border: "1px solid rgba(76, 175, 80, 0.15)",
            }}
          >
            <LocalShippingIcon
              sx={{ color: colors.success, fontSize: "1.2rem" }}
            />
            <Box>
              <Typography
                sx={{
                  color: colors.textPrimary,
                  fontWeight: 600,
                  fontSize: "0.8rem",
                }}
              >
                Estimated Delivery
              </Typography>
              <Typography sx={{ color: colors.textMuted, fontSize: "0.7rem" }}>
                {new Date(
                  Date.now() + 3 * 24 * 60 * 60 * 1000,
                ).toLocaleDateString("en-US", {
                  weekday: "short",
                  month: "short",
                  day: "numeric",
                })}
              </Typography>
            </Box>
          </Paper>
        </Box>
        <Button
          fullWidth
          variant="contained"
          onClick={onClose}
          sx={{
            mt: 2,
            backgroundColor: colors.red,
            color: "#ffffff",
            fontWeight: 600,
            padding: "10px",
            borderRadius: "25px",
            fontSize: "0.9rem",
            textTransform: "none",
            "&:hover": { backgroundColor: colors.darkRed },
            transition: "all 0.3s ease",
          }}
        >
          Continue Shopping
        </Button>
      </Box>
    </Dialog>
  );
};

const CheckoutDialog = ({
  open,
  onClose,
  cartItems,
  total,
  onPlaceOrder,
  user,
}) => {
  const [fullName, setFullName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [address, setAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [countryCode, setCountryCode] = useState("+962");
  const [notes, setNotes] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("cash");
  const [cardNumber, setCardNumber] = useState("");
  const [cardName, setCardName] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCvv, setCardCvv] = useState("");
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const countryCodes = [
    { code: "+962", country: "Jordan" },
    { code: "+966", country: "Saudi Arabia" },
    { code: "+971", country: "UAE" },
    { code: "+974", country: "Qatar" },
    { code: "+965", country: "Kuwait" },
    { code: "+968", country: "Oman" },
    { code: "+973", country: "Bahrain" },
    { code: "+961", country: "Lebanon" },
    { code: "+20", country: "Egypt" },
    { code: "+90", country: "Turkey" },
    { code: "+1", country: "USA" },
    { code: "+44", country: "UK" },
  ];

  useEffect(() => {
    if (user) {
      setFullName(user.name || "");
      setEmail(user.email || "");
    }
  }, [user]);

  const validateForm = () => {
    const newErrors = {};
    if (!fullName.trim()) newErrors.fullName = "Full name is required";
    if (!email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = "Email is invalid";
    if (!address.trim()) newErrors.address = "Address is required";
    if (!phoneNumber.trim()) newErrors.phoneNumber = "Phone number is required";
    else if (!/^\d+$/.test(phoneNumber))
      newErrors.phoneNumber = "Phone number must contain only digits";
    if (paymentMethod === "visa") {
      if (!cardNumber.trim()) newErrors.cardNumber = "Card number is required";
      else if (!/^\d{16}$/.test(cardNumber.replace(/\s/g, "")))
        newErrors.cardNumber = "Card number must be 16 digits";
      if (!cardName.trim()) newErrors.cardName = "Card holder name is required";
      if (!cardExpiry.trim()) newErrors.cardExpiry = "Expiry date is required";
      else if (!/^(0[1-9]|1[0-2])\/([0-9]{2})$/.test(cardExpiry))
        newErrors.cardExpiry = "Format: MM/YY";
      if (!cardCvv.trim()) newErrors.cardCvv = "CVV is required";
      else if (!/^\d{3,4}$/.test(cardCvv))
        newErrors.cardCvv = "CVV must be 3 or 4 digits";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const resetForm = () => {
    setFullName(user?.name || "");
    setEmail(user?.email || "");
    setAddress("");
    setPhoneNumber("");
    setCountryCode("+962");
    setNotes("");
    setPaymentMethod("cash");
    setCardNumber("");
    setCardName("");
    setCardExpiry("");
    setCardCvv("");
    setErrors({});
  };

  const handleSubmit = () => {
    if (validateForm()) {
      setIsSubmitting(true);
      setTimeout(() => {
        const subtotal = cartItems.reduce(
          (sum, item) =>
            sum + parseFloat(item.price || 0) * (item.quantity || 1),
          0,
        );
        const delivery = subtotal > 50 ? 0 : 5;
        const orderPayload = {
          fullName,
          email,
          address,
          delivery_address: address,
          shipping_address: address,
          phone: `${countryCode}${phoneNumber}`,
          notes,
          paymentMethod,
          items: cartItems,
          subtotal: subtotal,
          total: subtotal + delivery,
        };
        onPlaceOrder(orderPayload);
        setIsSubmitting(false);
        onClose();
        resetForm();
      }, 1500);
    }
  };

  const handleCardNumberChange = (e) => {
    const value = e.target.value.replace(/\s/g, "").slice(0, 16);
    setCardNumber(value.replace(/(.{4})/g, "$1 ").trim());
  };
  const handleCardExpiryChange = (e) => {
    let value = e.target.value.replace(/[^0-9]/g, "");
    if (value.length >= 2) {
      const month = value.slice(0, 2);
      const year = value.slice(2, 4);
      if (parseInt(month) > 12) value = "12" + year;
      value = month + "/" + year;
    }
    setCardExpiry(value.slice(0, 5));
  };

  const subtotal = cartItems.reduce(
    (sum, item) => sum + parseFloat(item.price || 0) * (item.quantity || 1),
    0,
  );
  const delivery = subtotal > 50 ? 0 : 5;

  return (
    <Dialog
      open={open}
      onClose={!isSubmitting ? onClose : undefined}
      fullWidth
      maxWidth="sm"
      PaperProps={{
        sx: {
          borderRadius: "16px",
          overflow: "hidden",
          animation: `${scaleIn} 0.3s ease`,
          bgcolor: "#ffffff",
          maxHeight: "85vh",
          overflowY: "auto",
          my: 2,
        },
      }}
    >
      <Box sx={{ bgcolor: "#ffffff", p: { xs: 2, md: 2.5 } }}>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={1.5}
        >
          <Typography
            sx={{ fontSize: "1.2rem", fontWeight: 700, color: colors.red }}
          >
            Checkout
          </Typography>
          <IconButton
            onClick={!isSubmitting ? onClose : undefined}
            sx={{ color: colors.textMuted }}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        </Box>
        <Divider sx={{ borderColor: "rgba(139,0,0,0.08)", mb: 2 }} />
        <Grid container spacing={2}>
          <Grid item xs={12} md={7}>
            <Typography
              sx={{
                fontSize: "0.8rem",
                fontWeight: 600,
                color: colors.gold,
                mb: 1.5,
              }}
            >
              Personal Information
            </Typography>
            <TextField
              fullWidth
              label="Full Name"
              size="small"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              error={!!errors.fullName}
              helperText={errors.fullName}
              disabled={isSubmitting || !!user}
              sx={{
                mb: 1.5,
                "& .MuiInputLabel-root": {
                  color: colors.textMuted,
                  fontSize: "0.75rem",
                },
                "& .MuiOutlinedInput-root": {
                  color: colors.textPrimary,
                  fontSize: "0.85rem",
                  "& fieldset": { borderColor: "rgba(139,0,0,0.15)" },
                  "&:hover fieldset": { borderColor: colors.gold },
                  "&.Mui-focused fieldset": { borderColor: colors.gold },
                },
              }}
            />
            <TextField
              fullWidth
              label="Email"
              type="email"
              size="small"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={!!errors.email}
              helperText={errors.email}
              disabled={isSubmitting || !!user}
              sx={{
                mb: 1.5,
                "& .MuiInputLabel-root": {
                  color: colors.textMuted,
                  fontSize: "0.75rem",
                },
                "& .MuiOutlinedInput-root": {
                  color: colors.textPrimary,
                  fontSize: "0.85rem",
                  "& fieldset": { borderColor: "rgba(139,0,0,0.15)" },
                  "&:hover fieldset": { borderColor: colors.gold },
                  "&.Mui-focused fieldset": { borderColor: colors.gold },
                },
              }}
            />
            <TextField
              fullWidth
              label="Delivery Address"
              size="small"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              error={!!errors.address}
              helperText={errors.address}
              disabled={isSubmitting}
              sx={{
                mb: 1.5,
                "& .MuiInputLabel-root": {
                  color: colors.textMuted,
                  fontSize: "0.75rem",
                },
                "& .MuiOutlinedInput-root": {
                  color: colors.textPrimary,
                  fontSize: "0.85rem",
                  "& fieldset": { borderColor: "rgba(139,0,0,0.15)" },
                  "&:hover fieldset": { borderColor: colors.gold },
                  "&.Mui-focused fieldset": { borderColor: colors.gold },
                },
              }}
            />
            <Box sx={{ display: "flex", gap: 1, mb: 1.5 }}>
              <FormControl sx={{ minWidth: 100 }} size="small">
                <InputLabel
                  sx={{ color: colors.textMuted, fontSize: "0.75rem" }}
                >
                  Code
                </InputLabel>
                <Select
                  value={countryCode}
                  onChange={(e) => setCountryCode(e.target.value)}
                  label="Code"
                  disabled={isSubmitting}
                  sx={{
                    color: colors.textPrimary,
                    fontSize: "0.85rem",
                    "& .MuiOutlinedInput-notchedOutline": {
                      borderColor: "rgba(139,0,0,0.15)",
                    },
                    "&:hover .MuiOutlinedInput-notchedOutline": {
                      borderColor: colors.gold,
                    },
                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                      borderColor: colors.gold,
                    },
                    "& .MuiSvgIcon-root": { color: colors.textMuted },
                  }}
                >
                  {countryCodes.map((item) => (
                    <MenuItem
                      key={item.code}
                      value={item.code}
                      sx={{ fontSize: "0.8rem" }}
                    >
                      {item.code}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <TextField
                fullWidth
                label="Phone"
                size="small"
                value={phoneNumber}
                onChange={(e) =>
                  setPhoneNumber(e.target.value.replace(/[^0-9]/g, ""))
                }
                error={!!errors.phoneNumber}
                helperText={errors.phoneNumber}
                disabled={isSubmitting}
                InputProps={{
                  startAdornment: (
                    <InputAdornment
                      position="start"
                      sx={{ color: colors.textMuted, fontSize: "0.75rem" }}
                    >
                      {countryCode}
                    </InputAdornment>
                  ),
                }}
                sx={{
                  "& .MuiInputLabel-root": {
                    color: colors.textMuted,
                    fontSize: "0.75rem",
                  },
                  "& .MuiOutlinedInput-root": {
                    color: colors.textPrimary,
                    fontSize: "0.85rem",
                    "& fieldset": { borderColor: "rgba(139,0,0,0.15)" },
                    "&:hover fieldset": { borderColor: colors.gold },
                    "&.Mui-focused fieldset": { borderColor: colors.gold },
                  },
                }}
              />
            </Box>
            <TextField
              fullWidth
              label="Order Notes (Optional)"
              size="small"
              multiline
              rows={2}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              disabled={isSubmitting}
              sx={{
                mb: 1.5,
                "& .MuiInputLabel-root": {
                  color: colors.textMuted,
                  fontSize: "0.75rem",
                },
                "& .MuiOutlinedInput-root": {
                  color: colors.textPrimary,
                  fontSize: "0.85rem",
                  "& fieldset": { borderColor: "rgba(139,0,0,0.15)" },
                  "&:hover fieldset": { borderColor: colors.gold },
                  "&.Mui-focused fieldset": { borderColor: colors.gold },
                },
              }}
            />
          </Grid>
          <Grid item xs={12} md={5}>
            <Typography
              sx={{
                fontSize: "0.8rem",
                fontWeight: 600,
                color: colors.gold,
                mb: 1.5,
              }}
            >
              Payment Method
            </Typography>
            <Paper
              sx={{
                p: 1.5,
                bgcolor: "rgba(139,0,0,0.02)",
                borderRadius: "10px",
                border: "1px solid rgba(139,0,0,0.08)",
                mb: 1.5,
              }}
            >
              <RadioGroup
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
                sx={{ gap: 0.5 }}
              >
                <FormControlLabel
                  value="cash"
                  control={
                    <Radio
                      size="small"
                      sx={{
                        color: colors.textMuted,
                        "&.Mui-checked": { color: colors.gold },
                      }}
                    />
                  }
                  label={
                    <Box
                      sx={{ display: "flex", alignItems: "center", gap: 0.5 }}
                    >
                      <PaymentsIcon
                        sx={{ color: colors.textMuted, fontSize: "1rem" }}
                      />
                      <Typography
                        sx={{ color: colors.textPrimary, fontSize: "0.8rem" }}
                      >
                        Cash on Delivery
                      </Typography>
                    </Box>
                  }
                  disabled={isSubmitting}
                />
                <FormControlLabel
                  value="visa"
                  control={
                    <Radio
                      size="small"
                      sx={{
                        color: colors.textMuted,
                        "&.Mui-checked": { color: colors.gold },
                      }}
                    />
                  }
                  label={
                    <Box
                      sx={{ display: "flex", alignItems: "center", gap: 0.5 }}
                    >
                      <CreditCardIcon
                        sx={{ color: colors.textMuted, fontSize: "1rem" }}
                      />
                      <Typography
                        sx={{ color: colors.textPrimary, fontSize: "0.8rem" }}
                      >
                        Visa / Credit Card
                      </Typography>
                    </Box>
                  }
                  disabled={isSubmitting}
                />
              </RadioGroup>
            </Paper>
            <Collapse in={paymentMethod === "visa"}>
              <Paper
                sx={{
                  p: 1.5,
                  bgcolor: "rgba(139,0,0,0.02)",
                  borderRadius: "10px",
                  border: "1px solid rgba(139,0,0,0.08)",
                }}
              >
                <Typography
                  sx={{ fontSize: "0.7rem", color: colors.textMuted, mb: 1 }}
                >
                  Card Details
                </Typography>
                <TextField
                  fullWidth
                  label="Card Number"
                  placeholder="1234 5678 9012 3456"
                  size="small"
                  value={cardNumber}
                  onChange={handleCardNumberChange}
                  error={!!errors.cardNumber}
                  helperText={errors.cardNumber}
                  disabled={isSubmitting}
                  sx={{
                    mb: 1,
                    "& .MuiInputLabel-root": {
                      color: colors.textMuted,
                      fontSize: "0.75rem",
                    },
                    "& .MuiOutlinedInput-root": {
                      color: colors.textPrimary,
                      fontSize: "0.85rem",
                      "& fieldset": { borderColor: "rgba(139,0,0,0.15)" },
                      "&:hover fieldset": { borderColor: colors.gold },
                      "&.Mui-focused fieldset": { borderColor: colors.gold },
                    },
                  }}
                />
                <TextField
                  fullWidth
                  label="Card Holder Name"
                  size="small"
                  value={cardName}
                  onChange={(e) => setCardName(e.target.value)}
                  error={!!errors.cardName}
                  helperText={errors.cardName}
                  disabled={isSubmitting}
                  sx={{
                    mb: 1,
                    "& .MuiInputLabel-root": {
                      color: colors.textMuted,
                      fontSize: "0.75rem",
                    },
                    "& .MuiOutlinedInput-root": {
                      color: colors.textPrimary,
                      fontSize: "0.85rem",
                      "& fieldset": { borderColor: "rgba(139,0,0,0.15)" },
                      "&:hover fieldset": { borderColor: colors.gold },
                      "&.Mui-focused fieldset": { borderColor: colors.gold },
                    },
                  }}
                />
                <Box sx={{ display: "flex", gap: 1 }}>
                  <TextField
                    fullWidth
                    label="Expiry"
                    placeholder="MM/YY"
                    size="small"
                    value={cardExpiry}
                    onChange={handleCardExpiryChange}
                    error={!!errors.cardExpiry}
                    helperText={errors.cardExpiry}
                    disabled={isSubmitting}
                    sx={{
                      "& .MuiInputLabel-root": {
                        color: colors.textMuted,
                        fontSize: "0.75rem",
                      },
                      "& .MuiOutlinedInput-root": {
                        color: colors.textPrimary,
                        fontSize: "0.85rem",
                        "& fieldset": { borderColor: "rgba(139,0,0,0.15)" },
                        "&:hover fieldset": { borderColor: colors.gold },
                        "&.Mui-focused fieldset": { borderColor: colors.gold },
                      },
                    }}
                  />
                  <TextField
                    fullWidth
                    label="CVV"
                    placeholder="123"
                    size="small"
                    value={cardCvv}
                    onChange={(e) =>
                      setCardCvv(
                        e.target.value.replace(/[^0-9]/g, "").slice(0, 4),
                      )
                    }
                    error={!!errors.cardCvv}
                    helperText={errors.cardCvv}
                    disabled={isSubmitting}
                    sx={{
                      "& .MuiInputLabel-root": {
                        color: colors.textMuted,
                        fontSize: "0.75rem",
                      },
                      "& .MuiOutlinedInput-root": {
                        color: colors.textPrimary,
                        fontSize: "0.85rem",
                        "& fieldset": { borderColor: "rgba(139,0,0,0.15)" },
                        "&:hover fieldset": { borderColor: colors.gold },
                        "&.Mui-focused fieldset": { borderColor: colors.gold },
                      },
                    }}
                  />
                </Box>
              </Paper>
            </Collapse>
          </Grid>
        </Grid>
        <Box
          sx={{
            mt: 2,
            p: 1.5,
            bgcolor: "rgba(139,0,0,0.02)",
            borderRadius: "10px",
            border: "1px solid rgba(139,0,0,0.08)",
          }}
        >
          <Box
            sx={{ display: "flex", justifyContent: "space-between", mb: 0.5 }}
          >
            <Typography sx={{ color: colors.textMuted, fontSize: "0.75rem" }}>
              Items (
              {cartItems.reduce((sum, item) => sum + (item.quantity || 1), 0)})
            </Typography>
            <Typography sx={{ color: colors.textPrimary, fontSize: "0.8rem" }}>
              $
              {cartItems
                .reduce(
                  (sum, item) =>
                    sum + parseFloat(item.price || 0) * (item.quantity || 1),
                  0,
                )
                .toFixed(2)}
            </Typography>
          </Box>
          <Box
            sx={{ display: "flex", justifyContent: "space-between", mb: 0.5 }}
          >
            <Typography sx={{ color: colors.textMuted, fontSize: "0.75rem" }}>
              Delivery
            </Typography>
            <Typography sx={{ color: colors.textPrimary, fontSize: "0.8rem" }}>
              {total > 50 ? "FREE" : "$5.00"}
            </Typography>
          </Box>
          <Divider sx={{ borderColor: "rgba(139,0,0,0.08)", my: 0.5 }} />
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography
              sx={{
                fontSize: "0.9rem",
                fontWeight: 700,
                color: colors.textPrimary,
              }}
            >
              Total
            </Typography>
            <Typography
              sx={{ fontSize: "1.2rem", fontWeight: 800, color: colors.gold }}
            >
              ${(total + (total > 50 ? 0 : 5)).toFixed(2)}
            </Typography>
          </Box>
        </Box>
        <Button
          fullWidth
          variant="contained"
          onClick={handleSubmit}
          disabled={isSubmitting}
          sx={{
            mt: 2,
            backgroundColor: colors.red,
            color: "#ffffff",
            fontWeight: 600,
            padding: "10px",
            borderRadius: "25px",
            fontSize: "0.9rem",
            textTransform: "none",
            "&:hover": { backgroundColor: colors.darkRed },
            "&.Mui-disabled": {
              backgroundColor: "rgba(139,0,0,0.3)",
              color: "rgba(255,255,255,0.5)",
            },
          }}
        >
          {isSubmitting ? "Processing..." : "Place Order"}
        </Button>
      </Box>
    </Dialog>
  );
};

const Cart = () => {
  const {
    cart,
    updateQuantity,
    removeFromCart,
    clearCart,
    getCart,
    cartLoading,
  } = useCart();
  const { createOrder } = useOrders();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [successOpen, setSuccessOpen] = useState(false);
  const [orderData, setOrderData] = useState(null);

  useEffect(() => {
    getCart();
  }, [getCart]);

  const getImage = (imageName) => {
    if (
      !imageName ||
      imageName === "" ||
      imageName === "null" ||
      imageName === "undefined"
    )
      return placeholder;
    if (
      imageName.startsWith("http://") ||
      imageName.startsWith("https://") ||
      imageName.startsWith("data:")
    )
      return imageName;
    if (imageName.startsWith("/uploads")) return `${API_BASE_URL}${imageName}`;
    if (!imagesMap[imageName]) return `${API_BASE_URL}/uploads/${imageName}`;
    return imagesMap[imageName] || placeholder;
  };

  const increaseQuantity = (productId) => {
    const item = cart.find((i) => i.id === productId);
    if (item) updateQuantity(productId, (item.quantity || 1) + 1);
  };

  const decreaseQuantity = (productId) => {
    const item = cart.find((i) => i.id === productId);
    if (item && item.quantity > 1) updateQuantity(productId, item.quantity - 1);
    else removeFromCart(productId);
  };

  const removeItem = (productId, productName) => {
    removeFromCart(productId);
    setSnackbar({
      open: true,
      message: `"${productName}" has been removed`,
      severity: "info",
    });
  };

  const clearCartHandler = () => {
    if (cart.length === 0) return;
    clearCart();
    setSnackbar({
      open: true,
      message: "Your cart has been cleared",
      severity: "info",
    });
  };

  const calculateTotal = () => {
    return cart.reduce(
      (total, item) =>
        total + parseFloat(item.price || 0) * (item.quantity || 1),
      0,
    );
  };

  const getTotalItems = () => {
    return cart.reduce((total, item) => total + (item.quantity || 1), 0);
  };

  const handleCheckout = () => {
    if (cart.length === 0) {
      setSnackbar({
        open: true,
        message: "Your cart is empty. Please add items first",
        severity: "warning",
      });
      return;
    }
    if (!user) {
      setSnackbar({
        open: true,
        message: "Please login first",
        severity: "warning",
      });
      return;
    }
    setCheckoutOpen(true);
  };

  const handlePlaceOrder = async (orderPayload) => {
    try {
      const payloadToSend = {
        ...orderPayload,
        delivery_address: orderPayload.address,
        shipping_address: orderPayload.address,
      };
      await createOrder(payloadToSend);
      setOrderData(payloadToSend);
      setSuccessOpen(true);
      clearCart();
      setSnackbar({
        open: true,
        message: "Order placed successfully!",
        severity: "success",
      });
      setCheckoutOpen(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSuccessClose = () => {
    setSuccessOpen(false);
    setOrderData(null);
    navigate("/mybooking");
  };

  const handleViewProduct = (product) => {
    setSelectedProduct(product);
  };

  if (cartLoading) {
    return (
      <Box
        sx={{
          minHeight: "100vh",
          bgcolor: colors.bgPrimary,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <NavbarUser />
        <Box
          sx={{
            flex: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography sx={{ color: colors.textWhite, fontSize: "1.5rem" }}>
            Loading your cart...
          </Typography>
        </Box>
        <Footer />
      </Box>
    );
  }

  if (cart.length === 0 && !successOpen) {
    return (
      <Box
        sx={{
          minHeight: "100vh",
          bgcolor: colors.bgPrimary,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <NavbarUser />
        <Box
          sx={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            py: { xs: 4, md: 8 },
            px: 2,
            mt: 20,
            mb: 20,
          }}
        >
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0, scale: 0.8 },
              visible: { opacity: 1, scale: 1, transition: { duration: 0.6 } },
            }}
          >
            <ShoppingCartIcon
              sx={{ fontSize: 100, color: colors.gold, opacity: 0.5, mb: 3 }}
            />
          </motion.div>
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { delay: 0.2, duration: 0.6 },
              },
            }}
          >
            <Typography
              sx={{
                fontSize: { xs: "2rem", md: "3rem" },
                fontWeight: 700,
                color: colors.textWhite,
                mb: 2,
              }}
            >
              Your Cart is Empty
            </Typography>
            <Typography
              sx={{
                color: colors.textWhiteMuted,
                fontSize: "1.1rem",
                mb: 4,
                maxWidth: 400,
                mx: "auto",
              }}
            >
              Start shopping and fill your cart with beautiful flowers!
            </Typography>
            <Button
              variant="contained"
              onClick={() => navigate("/shopuser")}
              sx={{
                backgroundColor: colors.gold,
                color: "#ffffff",
                fontWeight: 600,
                padding: "12px 40px",
                borderRadius: "30px",
                fontSize: "1rem",
                textTransform: "none",
                "&:hover": {
                  backgroundColor: colors.goldHover,
                  transform: "scale(1.05)",
                },
                transition: "all 0.3s ease",
              }}
            >
              Continue Shopping
            </Button>
          </motion.div>
        </Box>
        <Footer />
      </Box>
    );
  }

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: colors.bgPrimary,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <NavbarUser />
      <Container
        maxWidth="lg"
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          position: "relative",
          zIndex: 1,
          px: { xs: 2, md: 3 },
          py: { xs: 4, md: 6 },
          mt: 15,
          mb: 15,
        }}
      >
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0, y: 30 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
          }}
          style={{ width: "100%" }}
        >
          <Typography
            sx={{
              fontSize: "0.8rem",
              letterSpacing: "5px",
              color: colors.gold,
              textTransform: "uppercase",
              fontWeight: 700,
              mb: 1,
            }}
          >
            Your Cart
          </Typography>
          <Typography
            sx={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: { xs: "2rem", md: "3.2rem" },
              fontWeight: 600,
              color: colors.textWhite,
              mb: 1,
            }}
          >
            <span style={{ color: colors.gold }}>{getTotalItems()}</span> Items
            in Your Cart
          </Typography>
          <Box
            sx={{
              height: "3px",
              width: "80px",
              background: `linear-gradient(90deg, ${colors.gold}, ${colors.goldHover})`,
              borderRadius: "3px",
              mx: "auto",
              my: 2,
            }}
          />
        </motion.div>

        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "flex-end",
            mb: 3,
          }}
        >
          <Button
            variant="outlined"
            onClick={clearCartHandler}
            startIcon={<DeleteIcon />}
            sx={{
              color: colors.textWhiteMuted,
              borderColor: "rgba(255,255,255,0.2)",
              "&:hover": {
                borderColor: "#ff6b6b",
                color: "#ff6b6b",
                backgroundColor: "rgba(255,107,107,0.08)",
              },
              textTransform: "none",
              fontSize: "0.8rem",
            }}
          >
            Clear Cart
          </Button>
        </Box>

        <Box
          sx={{
            width: "100%",
            maxWidth: 1000,
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          {cart.map((item, index) => (
            <motion.div
              key={item.id}
              initial="hidden"
              animate="visible"
              variants={{
                hidden: { opacity: 0, x: -50 },
                visible: {
                  opacity: 1,
                  x: 0,
                  transition: { delay: index * 0.1, duration: 0.5 },
                },
              }}
              style={{ width: "100%" }}
            >
              <Paper
                sx={{
                  p: { xs: 2, md: 2.5 },
                  bgcolor: "#ffffff",
                  borderRadius: "16px",
                  border: "1px solid rgba(139,0,0,0.08)",
                  display: "flex",
                  flexDirection: { xs: "column", sm: "row" },
                  alignItems: "center",
                  gap: { xs: 2, sm: 3 },
                  transition: "all 0.3s ease",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
                  "&:hover": {
                    borderColor: colors.goldSoft,
                    boxShadow: "0 8px 30px rgba(0,0,0,0.12)",
                  },
                }}
              >
                <Box
                  component="img"
                  src={getImage(item.image)}
                  alt={item.name}
                  onError={(e) => {
                    e.target.src = placeholder;
                  }}
                  sx={{
                    width: { xs: 80, sm: 100 },
                    height: { xs: 80, sm: 100 },
                    objectFit: "cover",
                    borderRadius: "12px",
                    flexShrink: 0,
                    cursor: "pointer",
                    transition: "transform 0.3s ease",
                    "&:hover": { transform: "scale(1.05)" },
                  }}
                  onClick={() => handleViewProduct(item)}
                />
                <Box
                  sx={{
                    flex: 1,
                    display: "flex",
                    flexDirection: { xs: "column", sm: "row" },
                    alignItems: { xs: "center", sm: "center" },
                    justifyContent: "space-between",
                    width: "100%",
                    gap: 2,
                  }}
                >
                  <Box sx={{ textAlign: { xs: "center", sm: "left" } }}>
                    <Typography
                      sx={{
                        fontSize: "1rem",
                        fontWeight: 600,
                        color: colors.textPrimary,
                        cursor: "pointer",
                        "&:hover": { color: colors.gold },
                        transition: "color 0.3s ease",
                      }}
                      onClick={() => handleViewProduct(item)}
                    >
                      {item.name}
                    </Typography>
                    <Chip
                      label={`$${parseFloat(item.price || 0).toFixed(2)}`}
                      size="small"
                      sx={{
                        mt: 0.5,
                        backgroundColor: colors.gold,
                        color: "#ffffff",
                        fontWeight: "bold",
                        fontSize: "0.7rem",
                      }}
                    />
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 0.5,
                      backgroundColor: "rgba(139,0,0,0.04)",
                      borderRadius: "30px",
                      padding: "2px",
                    }}
                  >
                    <IconButton
                      size="small"
                      onClick={() => decreaseQuantity(item.id)}
                      sx={{
                        color: colors.textMuted,
                        "&:hover": {
                          backgroundColor: "rgba(139,0,0,0.06)",
                          color: colors.gold,
                        },
                      }}
                    >
                      <RemoveIcon fontSize="small" />
                    </IconButton>
                    <Typography
                      sx={{
                        color: colors.textPrimary,
                        fontWeight: 600,
                        minWidth: 25,
                        textAlign: "center",
                        fontSize: "0.9rem",
                      }}
                    >
                      {item.quantity || 1}
                    </Typography>
                    <IconButton
                      size="small"
                      onClick={() => increaseQuantity(item.id)}
                      sx={{
                        color: colors.textMuted,
                        "&:hover": {
                          backgroundColor: "rgba(139,0,0,0.06)",
                          color: colors.gold,
                        },
                      }}
                    >
                      <AddIcon fontSize="small" />
                    </IconButton>
                  </Box>
                  <Typography
                    sx={{
                      color: colors.gold,
                      fontWeight: 700,
                      fontSize: "1rem",
                      minWidth: 70,
                      textAlign: "center",
                    }}
                  >
                    $
                    {(
                      parseFloat(item.price || 0) * (item.quantity || 1)
                    ).toFixed(2)}
                  </Typography>
                  <IconButton
                    onClick={() => removeItem(item.id, item.name)}
                    sx={{
                      color: "rgba(139,0,0,0.2)",
                      "&:hover": {
                        color: "#ff6b6b",
                        backgroundColor: "rgba(255,107,107,0.06)",
                      },
                    }}
                  >
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </Box>
              </Paper>
            </motion.div>
          ))}
        </Box>

        <Box
          sx={{
            width: "100%",
            maxWidth: 1000,
            mt: 4,
            p: { xs: 3, md: 3.5 },
            bgcolor: "#ffffff",
            borderRadius: "16px",
            border: "1px solid rgba(139,0,0,0.08)",
            boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
          }}
        >
          <Typography
            sx={{
              fontSize: "1.2rem",
              fontWeight: 700,
              color: colors.textPrimary,
              mb: 1.5,
              textAlign: "left",
            }}
          >
            Order Summary
          </Typography>
          <Divider sx={{ borderColor: "rgba(139,0,0,0.08)", mb: 1.5 }} />
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 0.5,
            }}
          >
            <Typography sx={{ color: colors.textMuted, fontSize: "0.9rem" }}>
              Items ({getTotalItems()})
            </Typography>
            <Typography sx={{ color: colors.textPrimary }}>
              ${calculateTotal().toFixed(2)}
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 0.5,
            }}
          >
            <Typography sx={{ color: colors.textMuted, fontSize: "0.9rem" }}>
              Delivery
            </Typography>
            <Typography sx={{ color: colors.textPrimary }}>
              {calculateTotal() > 50 ? "FREE" : "$5.00"}
            </Typography>
          </Box>
          <Divider sx={{ borderColor: "rgba(139,0,0,0.08)", my: 1.5 }} />
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography
              sx={{
                fontSize: "1.1rem",
                fontWeight: 700,
                color: colors.textPrimary,
              }}
            >
              Total
            </Typography>
            <Typography
              sx={{ fontSize: "1.5rem", fontWeight: 800, color: colors.gold }}
            >
              ${(calculateTotal() + (calculateTotal() > 50 ? 0 : 5)).toFixed(2)}
            </Typography>
          </Box>
          <Button
            fullWidth
            variant="contained"
            onClick={handleCheckout}
            sx={{
              mt: 2.5,
              backgroundColor: colors.red,
              color: "#ffffff",
              fontWeight: 700,
              padding: "12px",
              borderRadius: "30px",
              fontSize: "1rem",
              textTransform: "none",
              "&:hover": {
                backgroundColor: colors.darkRed,
                transform: "scale(1.01)",
              },
            }}
          >
            Proceed to Checkout
          </Button>
        </Box>
      </Container>

      <CheckoutDialog
        open={checkoutOpen}
        onClose={() => setCheckoutOpen(false)}
        cartItems={cart}
        total={calculateTotal()}
        onPlaceOrder={handlePlaceOrder}
        user={user}
      />

      <SuccessDialog
        open={successOpen}
        onClose={handleSuccessClose}
        orderData={orderData}
      />

      <Dialog
        open={Boolean(selectedProduct)}
        onClose={() => setSelectedProduct(null)}
        fullWidth
        maxWidth="xs"
        PaperProps={{
          sx: {
            borderRadius: "16px",
            overflow: "hidden",
            animation: `${scaleIn} 0.3s ease`,
            bgcolor: "#ffffff",
          },
        }}
      >
        {selectedProduct && (
          <Box sx={{ bgcolor: "#ffffff" }}>
            <Box display="flex" justifyContent="flex-end" p={0.5}>
              <IconButton
                onClick={() => setSelectedProduct(null)}
                sx={{ color: colors.textMuted }}
              >
                <CloseIcon fontSize="small" />
              </IconButton>
            </Box>
            <DialogContent sx={{ textAlign: "center", pt: 0, pb: 2 }}>
              <Box
                component="img"
                src={getImage(selectedProduct.image)}
                alt={selectedProduct.name || "Product"}
                onError={(e) => {
                  e.target.src = placeholder;
                }}
                sx={{
                  width: "100%",
                  maxHeight: "250px",
                  objectFit: "cover",
                  borderRadius: "12px",
                  mb: 1.5,
                  animation: `${fadeIn} 0.4s ease`,
                }}
              />
              <Typography
                sx={{
                  fontSize: "1.2rem",
                  fontWeight: "bold",
                  color: colors.red,
                  mb: 0.5,
                }}
              >
                {selectedProduct.name}
              </Typography>
              <Typography
                sx={{
                  color: colors.textSecondary,
                  mb: 1.5,
                  fontSize: "0.85rem",
                  lineHeight: 1.5,
                }}
              >
                {selectedProduct.description || "No description available"}
              </Typography>
              <Typography
                sx={{
                  fontSize: "1.3rem",
                  fontWeight: "bold",
                  color: colors.gold,
                  mb: 2,
                }}
              >
                $
                {selectedProduct.price
                  ? Number(selectedProduct.price).toFixed(2)
                  : "0.00"}
              </Typography>
              <Button
                fullWidth
                variant="contained"
                sx={{
                  backgroundColor: colors.red,
                  color: "#ffffff",
                  fontWeight: 600,
                  padding: "10px",
                  borderRadius: "25px",
                  fontSize: "0.9rem",
                  textTransform: "none",
                  "&:hover": { backgroundColor: colors.darkRed },
                }}
                onClick={() => {
                  setSelectedProduct(null);
                  navigate("/shop");
                }}
              >
                Continue Shopping
              </Button>
            </DialogContent>
          </Box>
        )}
      </Dialog>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          severity={snackbar.severity}
          sx={{
            width: "100%",
            borderRadius: "12px",
            fontWeight: "bold",
            fontSize: "0.9rem",
          }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>

      <Footer />
    </Box>
  );
};

export default Cart;
