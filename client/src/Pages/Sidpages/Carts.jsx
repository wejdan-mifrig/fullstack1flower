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
import Navbar from "../../Components/Navhero/Nav.jsx";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

// White Flowers
import whiteTulip from "../../assets/images/white-tulip.jpg";
import whiteRoseBouquet from "../../assets/images/white-rose-bouquet.jpg";
import whiteLily from "../../assets/images/white-lily.jpg";
import whiteOrchid from "../../assets/images/white-orchid.jpg";
import whiteMix from "../../assets/images/white-mix.jpg";
import whiteGarden from "../../assets/images/white-garden.jpg";

// Red Flowers
import redRose from "../../assets/images/red-rose.jpg";
import redTulip from "../../assets/images/red-tulip.jpg";
import redMix from "../../assets/images/red-mix.jpg";
import luxRedRose from "../../assets/images/lux-red-rose.jpg";
import redLove from "../../assets/images/red-love.jpg";
import redGarden from "../../assets/images/red-garden.jpg";

// Pink Flowers
import pinkRose from "../../assets/images/pink-rose.jpg";
import pinkTulip from "../../assets/images/pink-tulip.jpg";
import pinkLily from "../../assets/images/pink-lily.jpg";
import pinkMix from "../../assets/images/pink-mix.jpg";
import pinkRomantic from "../../assets/images/pink-romantic.jpg";
import pinkGarden from "../../assets/images/pink-garden.jpg";

// Yellow Flowers
import sunflower from "../../assets/images/sunflower.jpg";
import yellowRose from "../../assets/images/yellow-rose.jpg";
import yellowTulip from "../../assets/images/yellow-tulip.jpg";
import yellowMix from "../../assets/images/yellow-mix.jpg";
import golden from "../../assets/images/golden.jpg";
import yellowGarden from "../../assets/images/yellow-garden.jpg";

// Purple Flowers
import purpleOrchid from "../../assets/images/purple-orchid.jpg";
import purpleRose from "../../assets/images/purple-rose.jpg";
import purpleTulip from "../../assets/images/purple-tulip.jpg";
import purpleMix from "../../assets/images/purple-mix.jpg";
import royalPurple from "../../assets/images/royal-purple.jpg";
import purpleGarden from "../../assets/images/purple-garden.jpg";

// Mixed Flowers
import springMix from "../../assets/images/spring-mix.jpg";
import rainbow from "../../assets/images/rainbow.jpg";
import luxMix from "../../assets/images/lux-mix.jpg";
import seasonal from "../../assets/images/seasonal.jpg";
import elegantMix from "../../assets/images/elegant-mix.jpg";

// Rose Bouquets
import classicRose from "../../assets/images/classic-rose.jpg";
import luxRose from "../../assets/images/lux-rose.jpg";
import romanticRose from "../../assets/images/romantic-rose.jpg";
import whiteRedRose from "../../assets/images/white-red-rose.jpg";
import pinkLuxRose from "../../assets/images/pink-lux-rose.jpg";
import royalRose from "../../assets/images/royal-rose.jpg";

// Wedding Flowers
import weddingWhite from "../../assets/images/wedding-white.jpg";
import bridalRose from "../../assets/images/bridal-rose.jpg";
import centerpiece from "../../assets/images/centerpiece.jpg";
import weddingSet from "../../assets/images/wedding-set.jpg";
import arch from "../../assets/images/arch.jpg";
import bridePremium from "../../assets/images/bride-premium.jpg";

// Birthday Flowers
import birthdaySurprise from "../../assets/images/birthday-surprise.jpg";
import birthdayRoses from "../../assets/images/birthday-roses.jpg";
import birthdayMix from "../../assets/images/birthday-mix.jpg";
import balloonSet from "../../assets/images/balloon-set.jpg";
import birthdayLux from "../../assets/images/birthday-lux.jpg";
import celebration from "../../assets/images/celebration.jpg";

// Gift Boxes
import chocoBox from "../../assets/images/choco-box.jpg";
import teddyBox from "../../assets/images/teddy-box.jpg";
import luxBox from "../../assets/images/lux-box.jpg";
import romanticBox from "../../assets/images/romantic-box.jpg";
import birthdayBox from "../../assets/images/birthday-box.jpg";
import specialBox from "../../assets/images/special-box.jpg";

const placeholder =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300' viewBox='0 0 400 300'%3E%3Crect width='400' height='300' fill='%233e4a3a'/%3E%3Ctext x='50%25' y='50%25' font-family='Arial' font-size='20' fill='%23f4f1ea' text-anchor='middle' dy='.3em'%3ENo Image%3C/text%3E%3C/svg%3E";

const colors = {
  primaryGreen: "#3e4a3a",
  primaryGreenLight: "#5c7052",
  primaryGreenDark: "#232b20",
  background: "#f4f1ea",
  textPrimary: "#f4f1ea",
  textDark: "#1c1b18",
  textSecondary: "#d6d1c4",
  gold: "#d4a843",
  goldHover: "#c49a2f",
  goldSoft: "rgba(212, 168, 67, 0.35)",
  beige: "#f5f0e8",
  success: "#4caf50",
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

// Success Dialog with vertical layout
const SuccessDialog = ({ open, onClose, orderData }) => {
  if (!orderData) return null;

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="md"
      PaperProps={{
        sx: {
          borderRadius: "20px",
          overflow: "hidden",
          animation: `${scaleIn} 0.5s ease`,
          bgcolor: colors.primaryGreen,
          maxHeight: "90vh",
          overflowY: "auto",
          my: 4,
        },
      }}
    >
      <Box sx={{ bgcolor: colors.primaryGreen, p: { xs: 3, md: 4 } }}>
        {/* Success Header */}
        <Box sx={{ textAlign: "center", mb: 4 }}>
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, type: "spring" }}
          >
            <CheckCircleIcon
              sx={{
                fontSize: 80,
                color: colors.success,
                animation: `${successPulse} 1.5s ease-in-out infinite`,
              }}
            />
          </motion.div>

          <Typography
            sx={{
              fontSize: "2rem",
              fontWeight: 700,
              color: colors.textPrimary,
              mt: 2,
            }}
          >
            Order Placed Successfully!
          </Typography>

          <Typography
            sx={{
              color: colors.textSecondary,
              fontSize: "1rem",
              mt: 1,
            }}
          >
            Thank you for your purchase. Your order has been confirmed.
          </Typography>
        </Box>

        <Divider sx={{ borderColor: "rgba(255,255,255,0.1)", mb: 3 }} />

        <Typography
          sx={{
            fontSize: "1.2rem",
            fontWeight: 600,
            color: colors.gold,
            mb: 3,
          }}
        >
          Order Details
        </Typography>

        {/* All sections stacked vertically */}
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          {/* Order Information */}
          <Paper
            sx={{
              p: 2,
              bgcolor: "rgba(255,255,255,0.05)",
              borderRadius: "12px",
              border: "1px solid rgba(255,255,255,0.1)",
            }}
          >
            <Typography sx={{ color: colors.textSecondary, fontSize: "0.75rem", mb: 2 }}>
              ORDER INFORMATION
            </Typography>
            
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
              <Box>
                <Typography sx={{ color: colors.textSecondary, fontSize: "0.75rem" }}>
                  Order Number
                </Typography>
                <Typography sx={{ color: colors.textPrimary, fontWeight: 600, fontSize: "0.95rem" }}>
                  #{Date.now().toString().slice(-8)}
                </Typography>
              </Box>

              <Box>
                <Typography sx={{ color: colors.textSecondary, fontSize: "0.75rem" }}>
                  Date
                </Typography>
                <Typography sx={{ color: colors.textPrimary, fontWeight: 500, fontSize: "0.9rem" }}>
                  {new Date().toLocaleDateString("en-US", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </Typography>
              </Box>

              <Box>
                <Typography sx={{ color: colors.textSecondary, fontSize: "0.75rem" }}>
                  Payment Method
                </Typography>
                <Typography sx={{ color: colors.textPrimary, fontWeight: 500, textTransform: "capitalize", fontSize: "0.9rem" }}>
                  {orderData.paymentMethod === "cash" ? "Cash on Delivery" : "Visa / Credit Card"}
                </Typography>
              </Box>
            </Box>
          </Paper>

          {/* Customer Information */}
          <Paper
            sx={{
              p: 2,
              bgcolor: "rgba(255,255,255,0.05)",
              borderRadius: "12px",
              border: "1px solid rgba(255,255,255,0.1)",
            }}
          >
            <Typography sx={{ color: colors.textSecondary, fontSize: "0.75rem", mb: 2 }}>
              CUSTOMER INFORMATION
            </Typography>
            
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
              <Box>
                <Typography sx={{ color: colors.textSecondary, fontSize: "0.75rem" }}>
                  Full Name
                </Typography>
                <Typography sx={{ color: colors.textPrimary, fontWeight: 600, fontSize: "0.95rem" }}>
                  {orderData.fullName}
                </Typography>
              </Box>

              <Box>
                <Typography sx={{ color: colors.textSecondary, fontSize: "0.75rem" }}>
                  Email
                </Typography>
                <Typography sx={{ color: colors.textPrimary, fontSize: "0.9rem" }}>
                  {orderData.email}
                </Typography>
              </Box>

              <Box>
                <Typography sx={{ color: colors.textSecondary, fontSize: "0.75rem" }}>
                  Phone
                </Typography>
                <Typography sx={{ color: colors.textPrimary, fontSize: "0.9rem" }}>
                  {orderData.phone}
                </Typography>
              </Box>
            </Box>
          </Paper>

          {/* Delivery Address */}
          <Paper
            sx={{
              p: 2,
              bgcolor: "rgba(255,255,255,0.05)",
              borderRadius: "12px",
              border: "1px solid rgba(255,255,255,0.1)",
            }}
          >
            <Typography sx={{ color: colors.textSecondary, fontSize: "0.75rem", mb: 2 }}>
              DELIVERY ADDRESS
            </Typography>
            <Typography sx={{ color: colors.textPrimary, fontWeight: 500, fontSize: "0.95rem" }}>
              {orderData.address}
            </Typography>

            {orderData.notes && (
              <Box sx={{ mt: 2 }}>
                <Typography sx={{ color: colors.textSecondary, fontSize: "0.75rem" }}>
                  Order Notes
                </Typography>
                <Typography sx={{ color: colors.textPrimary, fontSize: "0.9rem", fontStyle: "italic" }}>
                  {orderData.notes}
                </Typography>
              </Box>
            )}
          </Paper>

          {/* Order Items */}
          <Paper
            sx={{
              p: 2,
              bgcolor: "rgba(255,255,255,0.05)",
              borderRadius: "12px",
              border: "1px solid rgba(255,255,255,0.1)",
            }}
          >
            <Typography sx={{ color: colors.textSecondary, fontSize: "0.75rem", mb: 2 }}>
              ORDER ITEMS ({orderData.items.length})
            </Typography>
            
            {orderData.items.map((item, index) => (
              <Box
                key={index}
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  py: 1.5,
                  borderBottom: index < orderData.items.length - 1 ? "1px solid rgba(255,255,255,0.05)" : "none",
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                  <Box
                    component="img"
                    src={item.image ? imagesMap[item.image] || placeholder : placeholder}
                    alt={item.name}
                    sx={{
                      width: 50,
                      height: 50,
                      objectFit: "cover",
                      borderRadius: "8px",
                    }}
                  />
                  <Box>
                    <Typography sx={{ color: colors.textPrimary, fontWeight: 500, fontSize: "0.95rem" }}>
                      {item.name}
                    </Typography>
                    <Typography sx={{ color: colors.textSecondary, fontSize: "0.8rem" }}>
                      Quantity: {item.quantity || 1}
                    </Typography>
                  </Box>
                </Box>
                <Typography sx={{ color: colors.gold, fontWeight: 600, fontSize: "0.95rem" }}>
                  ${(parseFloat(item.price || 0) * (item.quantity || 1)).toFixed(2)}
                </Typography>
              </Box>
            ))}

            <Divider sx={{ borderColor: "rgba(255,255,255,0.1)", my: 2 }} />

            {/* Order Summary */}
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <Typography sx={{ color: colors.textSecondary, fontSize: "0.9rem" }}>Subtotal</Typography>
                <Typography sx={{ color: colors.textPrimary, fontSize: "0.95rem" }}>
                  ${orderData.subtotal.toFixed(2)}
                </Typography>
              </Box>
              
              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <Typography sx={{ color: colors.textSecondary, fontSize: "0.9rem" }}>Delivery Fee</Typography>
                <Typography sx={{ color: colors.textPrimary, fontSize: "0.95rem" }}>
                  {orderData.subtotal > 50 ? "$0.00 (Free)" : "$5.00"}
                </Typography>
              </Box>
              
              <Divider sx={{ borderColor: "rgba(255,255,255,0.1)", my: 1 }} />
              
              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <Typography sx={{ fontSize: "1.1rem", fontWeight: 700, color: colors.textPrimary }}>
                  Total Amount
                </Typography>
                <Typography sx={{ fontSize: "1.5rem", fontWeight: 800, color: colors.gold }}>
                  ${orderData.total.toFixed(2)}
                </Typography>
              </Box>
            </Box>
          </Paper>

          {/* Delivery Estimate */}
          <Paper
            sx={{
              display: "flex",
              gap: 2,
              alignItems: "center",
              p: 2,
              bgcolor: "rgba(76, 175, 80, 0.1)",
              borderRadius: "12px",
              border: "1px solid rgba(76, 175, 80, 0.3)",
            }}
          >
            <LocalShippingIcon sx={{ color: colors.success }} />
            <Box>
              <Typography sx={{ color: colors.textPrimary, fontWeight: 600 }}>
                Estimated Delivery
              </Typography>
              <Typography sx={{ color: colors.textSecondary, fontSize: "0.9rem" }}>
                {new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toLocaleDateString("en-US", {
                  weekday: "long",
                  month: "long",
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
            mt: 3,
            backgroundColor: colors.gold,
            color: "#fff",
            fontWeight: 700,
            padding: "14px",
            borderRadius: "30px",
            fontSize: "1.1rem",
            textTransform: "none",
            "&:hover": {
              backgroundColor: colors.goldHover,
              transform: "scale(1.02)",
            },
            transition: "all 0.3s ease",
          }}
        >
          Continue Shopping
        </Button>
      </Box>
    </Dialog>
  );
};

// Checkout Dialog
const CheckoutDialog = ({ open, onClose, cartItems, total, onSuccess }) => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
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

  const validateForm = () => {
    const newErrors = {};
    if (!fullName.trim()) newErrors.fullName = "Full name is required";
    if (!email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = "Email is invalid";
    if (!address.trim()) newErrors.address = "Address is required";
    if (!phoneNumber.trim()) newErrors.phoneNumber = "Phone number is required";
    else if (!/^\d+$/.test(phoneNumber)) newErrors.phoneNumber = "Phone number must contain only digits";

    if (paymentMethod === "visa") {
      if (!cardNumber.trim()) newErrors.cardNumber = "Card number is required";
      else if (!/^\d{16}$/.test(cardNumber.replace(/\s/g, ""))) newErrors.cardNumber = "Card number must be 16 digits";
      if (!cardName.trim()) newErrors.cardName = "Card holder name is required";
      if (!cardExpiry.trim()) newErrors.cardExpiry = "Expiry date is required";
      else if (!/^(0[1-9]|1[0-2])\/([0-9]{2})$/.test(cardExpiry)) newErrors.cardExpiry = "Format: MM/YY";
      if (!cardCvv.trim()) newErrors.cardCvv = "CVV is required";
      else if (!/^\d{3,4}$/.test(cardCvv)) newErrors.cardCvv = "CVV must be 3 or 4 digits";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      setIsSubmitting(true);
      
      setTimeout(() => {
        const subtotal = cartItems.reduce((sum, item) => sum + (parseFloat(item.price || 0) * (item.quantity || 1)), 0);
        const delivery = subtotal > 50 ? 0 : 5;
        
        const orderData = {
          fullName,
          email,
          address,
          phone: `${countryCode}${phoneNumber}`,
          notes,
          paymentMethod,
          items: cartItems,
          subtotal: subtotal,
          total: subtotal + delivery,
          orderDate: new Date().toISOString(),
          ...(paymentMethod === "visa" && {
            cardDetails: {
              cardNumber: cardNumber.replace(/\s/g, "").slice(-4),
              cardName,
              cardExpiry,
            }
          })
        };
        
        onSuccess(orderData);
        setIsSubmitting(false);
        onClose();
        setFullName("");
        setEmail("");
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
      }, 1500);
    }
  };

  const handleCardNumberChange = (e) => {
    const value = e.target.value.replace(/\s/g, "").slice(0, 16);
    const formatted = value.replace(/(.{4})/g, "$1 ").trim();
    setCardNumber(formatted);
  };

  const handleCardExpiryChange = (e) => {
    let value = e.target.value.replace(/[^0-9]/g, "");
    if (value.length >= 2) {
      const month = value.slice(0, 2);
      const year = value.slice(2, 4);
      if (parseInt(month) > 12) {
        value = "12" + year;
      }
      value = month + "/" + year;
    }
    setCardExpiry(value.slice(0, 5));
  };

  const subtotal = cartItems.reduce((sum, item) => sum + (parseFloat(item.price || 0) * (item.quantity || 1)), 0);
  const delivery = subtotal > 50 ? 0 : 5;
  const totalWithDelivery = subtotal + delivery;

  return (
    <Dialog
      open={open}
      onClose={!isSubmitting ? onClose : undefined}
      fullWidth
      maxWidth="md"
      PaperProps={{
        sx: {
          borderRadius: "20px",
          overflow: "hidden",
          animation: `${scaleIn} 0.35s ease`,
          bgcolor: colors.primaryGreen,
          maxHeight: "90vh",
          overflowY: "auto",
        },
      }}
    >
      <Box sx={{ bgcolor: colors.primaryGreen, p: { xs: 2, md: 3 } }}>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
          <Typography
            sx={{
              fontSize: "1.5rem",
              fontWeight: 700,
              color: colors.textPrimary,
            }}
          >
            Checkout
          </Typography>
          <IconButton onClick={!isSubmitting ? onClose : undefined} sx={{ color: colors.beige }}>
            <CloseIcon />
          </IconButton>
        </Box>

        <Divider sx={{ borderColor: "rgba(255,255,255,0.1)", mb: 3 }} />

        <Grid container spacing={3}>
          <Grid item xs={12} md={7}>
            <Typography
              sx={{
                fontSize: "1rem",
                fontWeight: 600,
                color: colors.gold,
                mb: 2,
              }}
            >
              Personal Information
            </Typography>

            <TextField
              fullWidth
              label="Full Name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              error={!!errors.fullName}
              helperText={errors.fullName}
              disabled={isSubmitting}
              sx={{
                mb: 2,
                "& .MuiInputLabel-root": { color: colors.textSecondary },
                "& .MuiOutlinedInput-root": {
                  color: colors.textPrimary,
                  "& fieldset": { borderColor: "rgba(255,255,255,0.2)" },
                  "&:hover fieldset": { borderColor: colors.gold },
                  "&.Mui-focused fieldset": { borderColor: colors.gold },
                },
              }}
            />

            <TextField
              fullWidth
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={!!errors.email}
              helperText={errors.email}
              disabled={isSubmitting}
              sx={{
                mb: 2,
                "& .MuiInputLabel-root": { color: colors.textSecondary },
                "& .MuiOutlinedInput-root": {
                  color: colors.textPrimary,
                  "& fieldset": { borderColor: "rgba(255,255,255,0.2)" },
                  "&:hover fieldset": { borderColor: colors.gold },
                  "&.Mui-focused fieldset": { borderColor: colors.gold },
                },
              }}
            />

            <TextField
              fullWidth
              label="Delivery Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              error={!!errors.address}
              helperText={errors.address}
              disabled={isSubmitting}
              sx={{
                mb: 2,
                "& .MuiInputLabel-root": { color: colors.textSecondary },
                "& .MuiOutlinedInput-root": {
                  color: colors.textPrimary,
                  "& fieldset": { borderColor: "rgba(255,255,255,0.2)" },
                  "&:hover fieldset": { borderColor: colors.gold },
                  "&.Mui-focused fieldset": { borderColor: colors.gold },
                },
              }}
            />

            <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
              <FormControl sx={{ minWidth: 120 }}>
                <InputLabel sx={{ color: colors.textSecondary }}>Country Code</InputLabel>
                <Select
                  value={countryCode}
                  onChange={(e) => setCountryCode(e.target.value)}
                  label="Country Code"
                  disabled={isSubmitting}
                  sx={{
                    color: colors.textPrimary,
                    "& .MuiOutlinedInput-notchedOutline": {
                      borderColor: "rgba(255,255,255,0.2)",
                    },
                    "&:hover .MuiOutlinedInput-notchedOutline": {
                      borderColor: colors.gold,
                    },
                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                      borderColor: colors.gold,
                    },
                    "& .MuiSvgIcon-root": { color: colors.textSecondary },
                  }}
                >
                  {countryCodes.map((item) => (
                    <MenuItem key={item.code} value={item.code}>
                      {item.code} ({item.country})
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <TextField
                fullWidth
                label="Phone Number"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value.replace(/[^0-9]/g, ""))}
                error={!!errors.phoneNumber}
                helperText={errors.phoneNumber}
                disabled={isSubmitting}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start" sx={{ color: colors.textSecondary }}>
                      {countryCode}
                    </InputAdornment>
                  ),
                }}
                sx={{
                  "& .MuiInputLabel-root": { color: colors.textSecondary },
                  "& .MuiOutlinedInput-root": {
                    color: colors.textPrimary,
                    "& fieldset": { borderColor: "rgba(255,255,255,0.2)" },
                    "&:hover fieldset": { borderColor: colors.gold },
                    "&.Mui-focused fieldset": { borderColor: colors.gold },
                  },
                }}
              />
            </Box>

            <TextField
              fullWidth
              label="Order Notes (Optional)"
              multiline
              rows={3}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              disabled={isSubmitting}
              sx={{
                mb: 2,
                "& .MuiInputLabel-root": { color: colors.textSecondary },
                "& .MuiOutlinedInput-root": {
                  color: colors.textPrimary,
                  "& fieldset": { borderColor: "rgba(255,255,255,0.2)" },
                  "&:hover fieldset": { borderColor: colors.gold },
                  "&.Mui-focused fieldset": { borderColor: colors.gold },
                },
              }}
            />
          </Grid>

          <Grid item xs={12} md={5}>
            <Typography
              sx={{
                fontSize: "1rem",
                fontWeight: 600,
                color: colors.gold,
                mb: 2,
              }}
            >
              Payment Method
            </Typography>

            <Paper
              sx={{
                p: 2,
                bgcolor: "rgba(255,255,255,0.05)",
                borderRadius: "12px",
                border: "1px solid rgba(255,255,255,0.1)",
                mb: 2,
              }}
            >
              <RadioGroup
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
              >
                <FormControlLabel
                  value="cash"
                  control={
                    <Radio
                      sx={{
                        color: colors.textSecondary,
                        "&.Mui-checked": { color: colors.gold },
                      }}
                    />
                  }
                  label={
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <PaymentsIcon sx={{ color: colors.textSecondary }} />
                      <Typography sx={{ color: colors.textPrimary }}>Cash on Delivery</Typography>
                    </Box>
                  }
                  disabled={isSubmitting}
                />
                <FormControlLabel
                  value="visa"
                  control={
                    <Radio
                      sx={{
                        color: colors.textSecondary,
                        "&.Mui-checked": { color: colors.gold },
                      }}
                    />
                  }
                  label={
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <CreditCardIcon sx={{ color: colors.textSecondary }} />
                      <Typography sx={{ color: colors.textPrimary }}>Visa / Credit Card</Typography>
                    </Box>
                  }
                  disabled={isSubmitting}
                />
              </RadioGroup>
            </Paper>

            <Collapse in={paymentMethod === "visa"}>
              <Paper
                sx={{
                  p: 2,
                  bgcolor: "rgba(255,255,255,0.05)",
                  borderRadius: "12px",
                  border: "1px solid rgba(255,255,255,0.1)",
                }}
              >
                <Typography
                  sx={{
                    fontSize: "0.85rem",
                    color: colors.textSecondary,
                    mb: 2,
                  }}
                >
                  Card Details
                </Typography>

                <TextField
                  fullWidth
                  label="Card Number"
                  placeholder="1234 5678 9012 3456"
                  value={cardNumber}
                  onChange={handleCardNumberChange}
                  error={!!errors.cardNumber}
                  helperText={errors.cardNumber}
                  disabled={isSubmitting}
                  sx={{
                    mb: 2,
                    "& .MuiInputLabel-root": { color: colors.textSecondary },
                    "& .MuiOutlinedInput-root": {
                      color: colors.textPrimary,
                      "& fieldset": { borderColor: "rgba(255,255,255,0.2)" },
                      "&:hover fieldset": { borderColor: colors.gold },
                      "&.Mui-focused fieldset": { borderColor: colors.gold },
                    },
                  }}
                />

                <TextField
                  fullWidth
                  label="Card Holder Name"
                  value={cardName}
                  onChange={(e) => setCardName(e.target.value)}
                  error={!!errors.cardName}
                  helperText={errors.cardName}
                  disabled={isSubmitting}
                  sx={{
                    mb: 2,
                    "& .MuiInputLabel-root": { color: colors.textSecondary },
                    "& .MuiOutlinedInput-root": {
                      color: colors.textPrimary,
                      "& fieldset": { borderColor: "rgba(255,255,255,0.2)" },
                      "&:hover fieldset": { borderColor: colors.gold },
                      "&.Mui-focused fieldset": { borderColor: colors.gold },
                    },
                  }}
                />

                <Box sx={{ display: "flex", gap: 2 }}>
                  <TextField
                    fullWidth
                    label="Expiry Date"
                    placeholder="MM/YY"
                    value={cardExpiry}
                    onChange={handleCardExpiryChange}
                    error={!!errors.cardExpiry}
                    helperText={errors.cardExpiry}
                    disabled={isSubmitting}
                    sx={{
                      "& .MuiInputLabel-root": { color: colors.textSecondary },
                      "& .MuiOutlinedInput-root": {
                        color: colors.textPrimary,
                        "& fieldset": { borderColor: "rgba(255,255,255,0.2)" },
                        "&:hover fieldset": { borderColor: colors.gold },
                        "&.Mui-focused fieldset": { borderColor: colors.gold },
                      },
                    }}
                  />

                  <TextField
                    fullWidth
                    label="CVV"
                    placeholder="123"
                    value={cardCvv}
                    onChange={(e) => setCardCvv(e.target.value.replace(/[^0-9]/g, "").slice(0, 4))}
                    error={!!errors.cardCvv}
                    helperText={errors.cardCvv}
                    disabled={isSubmitting}
                    sx={{
                      "& .MuiInputLabel-root": { color: colors.textSecondary },
                      "& .MuiOutlinedInput-root": {
                        color: colors.textPrimary,
                        "& fieldset": { borderColor: "rgba(255,255,255,0.2)" },
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
            mt: 3,
            p: 2,
            bgcolor: "rgba(255,255,255,0.05)",
            borderRadius: "12px",
            border: "1px solid rgba(255,255,255,0.1)",
          }}
        >
          <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
            <Typography sx={{ color: colors.textSecondary }}>
              Items ({cartItems.reduce((sum, item) => sum + (item.quantity || 1), 0)})
            </Typography>
            <Typography sx={{ color: colors.textPrimary }}>
              ${cartItems.reduce((sum, item) => sum + (parseFloat(item.price || 0) * (item.quantity || 1)), 0).toFixed(2)}
            </Typography>
          </Box>
          <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
            <Typography sx={{ color: colors.textSecondary }}>Delivery</Typography>
            <Typography sx={{ color: colors.textPrimary }}>
              {total > 50 ? "FREE" : "$5.00"}
            </Typography>
          </Box>
          <Divider sx={{ borderColor: "rgba(255,255,255,0.1)", my: 1 }} />
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <Typography sx={{ fontSize: "1.1rem", fontWeight: 700, color: colors.textPrimary }}>
              Total
            </Typography>
            <Typography sx={{ fontSize: "1.5rem", fontWeight: 800, color: colors.gold }}>
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
            mt: 3,
            backgroundColor: colors.gold,
            color: "#fff",
            fontWeight: 700,
            padding: "14px",
            borderRadius: "30px",
            fontSize: "1.1rem",
            textTransform: "none",
            backgroundImage: `linear-gradient(90deg, ${colors.gold} 0%, ${colors.goldHover} 25%, ${colors.gold} 50%, ${colors.goldHover} 75%, ${colors.gold} 100%)`,
            backgroundSize: "200% 100%",
            transition: "all 0.35s ease",
            "&:hover": !isSubmitting && {
              transform: "scale(1.02)",
              animation: `${shimmer} 1.6s linear infinite`,
            },
            "&.Mui-disabled": {
              backgroundColor: "rgba(255,255,255,0.1)",
              color: colors.textSecondary,
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
  const [cartItems, setCartItems] = useState([]);
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [successOpen, setSuccessOpen] = useState(false);
  const [orderData, setOrderData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart") || "[]");
    setCartItems(savedCart);
  }, []);

  const updateCart = (newCart) => {
    setCartItems(newCart);
    localStorage.setItem("cart", JSON.stringify(newCart));
  };

  const getImage = (imageName) => {
    if (!imageName || imageName === "" || imageName === "null" || imageName === "undefined") {
      return placeholder;
    }

    if (imageName.startsWith("http://") || imageName.startsWith("https://") || imageName.startsWith("data:")) {
      return imageName;
    }

    if (imageName.startsWith("/uploads")) {
      return `${API_BASE_URL}${imageName}`;
    }

    if (!imagesMap[imageName]) {
      return `${API_BASE_URL}/uploads/${imageName}`;
    }

    return imagesMap[imageName] || placeholder;
  };

  const increaseQuantity = (productId) => {
    const updatedCart = cartItems.map(item =>
      item.id === productId
        ? { ...item, quantity: (item.quantity || 1) + 1 }
        : item
    );
    updateCart(updatedCart);
  };

  const decreaseQuantity = (productId) => {
    const updatedCart = cartItems.map(item =>
      item.id === productId && item.quantity > 1
        ? { ...item, quantity: item.quantity - 1 }
        : item
    ).filter(item => item.quantity > 0);
    updateCart(updatedCart);
  };

  const removeItem = (productId, productName) => {
    const updatedCart = cartItems.filter(item => item.id !== productId);
    updateCart(updatedCart);
    setSnackbar({
      open: true,
      message: `"${productName}" has been removed from your cart`,
      severity: "info"
    });
  };

  const clearCart = () => {
    if (cartItems.length === 0) return;
    updateCart([]);
    setSnackbar({
      open: true,
      message: "Your cart has been cleared",
      severity: "info"
    });
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => {
      const price = parseFloat(item.price) || 0;
      const quantity = item.quantity || 1;
      return total + (price * quantity);
    }, 0);
  };

  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + (item.quantity || 1), 0);
  };

  const handleViewProduct = (product) => {
    setSelectedProduct(product);
  };

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      setSnackbar({
        open: true,
        message: "Your cart is empty. Please add items first",
        severity: "warning"
      });
      return;
    }
    setCheckoutOpen(true);
  };

  const handleOrderSuccess = (data) => {
    setOrderData(data);
    setSuccessOpen(true);
    updateCart([]);
    setSnackbar({
      open: true,
      message: "Order placed successfully!",
      severity: "success"
    });
  };

  const handleSuccessClose = () => {
    setSuccessOpen(false);
    setOrderData(null);
    navigate("/shop");
  };

  if (cartItems.length === 0 && !successOpen) {
    return (
      <Box
        sx={{
          minHeight: "100vh",
          bgcolor: colors.primaryGreen,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Navbar />
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
            mt:20,
            mb:20
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
              sx={{
                fontSize: 100,
                color: colors.gold,
                opacity: 0.3,
                mb: 3,
              }}
            />
          </motion.div>

          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: { opacity: 1, y: 0, transition: { delay: 0.2, duration: 0.6 } },
            }}
          >
            <Typography
              sx={{
                fontSize: { xs: "2rem", md: "3rem" },
                fontWeight: 700,
                color: colors.textPrimary,
                mb: 2,
              }}
            >
              Your Cart is Empty
            </Typography>
            <Typography
              sx={{
                color: colors.textSecondary,
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
              onClick={() => navigate("/shop")}
              sx={{
                backgroundColor: colors.gold,
                color: "#fff",
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
        bgcolor: colors.primaryGreen,
        display: "flex",
        flexDirection: "column",
        
      }}
    >
      <Navbar />

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
          mt: { xs: 8, md: 12 },
          mt:15,
          mb:15

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
              color: colors.textPrimary,
              mb: 1,
            }}
          >
            <span style={{ color: colors.gold }}>{getTotalItems()}</span> Items in Your Cart
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
            onClick={clearCart}
            startIcon={<DeleteIcon />}
            sx={{
              color: colors.textSecondary,
              borderColor: "rgba(255,255,255,0.2)",
              "&:hover": {
                borderColor: "#ff6b6b",
                color: "#ff6b6b",
                backgroundColor: "rgba(255,107,107,0.1)",
              },
              textTransform: "none",
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
          {cartItems.map((item, index) => (
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
                  p: { xs: 2, md: 3 },
                  bgcolor: "rgba(255,255,255,0.05)",
                  backdropFilter: "blur(10px)",
                  borderRadius: "16px",
                  border: "1px solid rgba(255,255,255,0.1)",
                  display: "flex",
                  flexDirection: { xs: "column", sm: "row" },
                  alignItems: "center",
                  gap: { xs: 2, sm: 3 },
                  transition: "all 0.3s ease",
                  "&:hover": {
                    borderColor: colors.goldSoft,
                    boxShadow: `0 8px 30px rgba(0,0,0,0.3)`,
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
                    width: { xs: 100, sm: 120 },
                    height: { xs: 100, sm: 120 },
                    objectFit: "cover",
                    borderRadius: "12px",
                    flexShrink: 0,
                    cursor: "pointer",
                    transition: "transform 0.3s ease",
                    "&:hover": {
                      transform: "scale(1.05)",
                    },
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
                        fontSize: "1.1rem",
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
                        color: "#fff",
                        fontWeight: "bold",
                      }}
                    />
                  </Box>

                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                      backgroundColor: "rgba(255,255,255,0.05)",
                      borderRadius: "30px",
                      padding: "4px",
                    }}
                  >
                    <IconButton
                      size="small"
                      onClick={() => decreaseQuantity(item.id)}
                      sx={{
                        color: colors.textSecondary,
                        "&:hover": {
                          backgroundColor: "rgba(255,255,255,0.1)",
                          color: colors.gold,
                        },
                      }}
                    >
                      <RemoveIcon />
                    </IconButton>

                    <Typography
                      sx={{
                        color: colors.textPrimary,
                        fontWeight: 600,
                        minWidth: 30,
                        textAlign: "center",
                      }}
                    >
                      {item.quantity || 1}
                    </Typography>

                    <IconButton
                      size="small"
                      onClick={() => increaseQuantity(item.id)}
                      sx={{
                        color: colors.textSecondary,
                        "&:hover": {
                          backgroundColor: "rgba(255,255,255,0.1)",
                          color: colors.gold,
                        },
                      }}
                    >
                      <AddIcon />
                    </IconButton>
                  </Box>

                  <Typography
                    sx={{
                      color: colors.gold,
                      fontWeight: 700,
                      fontSize: "1.1rem",
                      minWidth: 80,
                      textAlign: "center",
                    }}
                  >
                    ${(parseFloat(item.price || 0) * (item.quantity || 1)).toFixed(2)}
                  </Typography>

                  <IconButton
                    onClick={() => removeItem(item.id, item.name)}
                    sx={{
                      color: "rgba(255,255,255,0.3)",
                      "&:hover": {
                        color: "#ff6b6b",
                        backgroundColor: "rgba(255,107,107,0.1)",
                      },
                    }}
                  >
                    <DeleteIcon />
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
            p: { xs: 3, md: 4 },
            bgcolor: "rgba(255,255,255,0.05)",
            backdropFilter: "blur(10px)",
            borderRadius: "16px",
            border: "1px solid rgba(255,255,255,0.1)",
          }}
        >
          <Typography
            sx={{
              fontSize: "1.5rem",
              fontWeight: 700,
              color: colors.textPrimary,
              mb: 2,
              textAlign: "left",
            }}
          >
            Order Summary
          </Typography>

          <Divider sx={{ borderColor: "rgba(255,255,255,0.1)", mb: 2 }} />

          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 1,
            }}
          >
            <Typography sx={{ color: colors.textSecondary }}>
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
              mb: 1,
            }}
          >
            <Typography sx={{ color: colors.textSecondary }}>Delivery</Typography>
            <Typography sx={{ color: colors.textPrimary }}>
              {calculateTotal() > 50 ? "FREE" : "$5.00"}
            </Typography>
          </Box>

          <Divider sx={{ borderColor: "rgba(255,255,255,0.1)", my: 2 }} />

          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography
              sx={{
                fontSize: "1.3rem",
                fontWeight: 700,
                color: colors.textPrimary,
              }}
            >
              Total
            </Typography>
            <Typography
              sx={{
                fontSize: "1.8rem",
                fontWeight: 800,
                color: colors.gold,
              }}
            >
              ${(calculateTotal() + (calculateTotal() > 50 ? 0 : 5)).toFixed(2)}
            </Typography>
          </Box>

          <Button
            fullWidth
            variant="contained"
            onClick={handleCheckout}
            sx={{
              mt: 3,
              backgroundColor: colors.gold,
              color: "#fff",
              fontWeight: 700,
              padding: "14px",
              borderRadius: "30px",
              fontSize: "1.1rem",
              textTransform: "none",
              backgroundImage: `linear-gradient(90deg, ${colors.gold} 0%, ${colors.goldHover} 25%, ${colors.gold} 50%, ${colors.goldHover} 75%, ${colors.gold} 100%)`,
              backgroundSize: "200% 100%",
              transition: "all 0.35s ease",
              "&:hover": {
                transform: "scale(1.02)",
                animation: `${shimmer} 1.6s linear infinite`,
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
        cartItems={cartItems}
        total={calculateTotal()}
        onSuccess={handleOrderSuccess}
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
        maxWidth="sm"
        PaperProps={{
          sx: {
            borderRadius: "20px",
            overflow: "hidden",
            animation: `${scaleIn} 0.35s ease`,
            bgcolor: colors.primaryGreen,
          },
        }}
      >
        {selectedProduct && (
          <Box sx={{ bgcolor: colors.primaryGreen }}>
            <Box display="flex" justifyContent="flex-end" p={1}>
              <IconButton onClick={() => setSelectedProduct(null)} sx={{ color: colors.beige }}>
                <CloseIcon />
              </IconButton>
            </Box>

            <DialogContent sx={{ textAlign: "center", pt: 0 }}>
              <Box
                component="img"
                src={getImage(selectedProduct.image)}
                alt={selectedProduct.name || "Product"}
                onError={(e) => {
                  e.target.src = placeholder;
                }}
                sx={{
                  width: "100%",
                  maxHeight: "400px",
                  objectFit: "cover",
                  borderRadius: "16px",
                  mb: 2,
                  animation: `${fadeIn} 0.5s ease`,
                }}
              />

              <Typography
                sx={{
                  fontSize: "1.8rem",
                  fontWeight: "bold",
                  color: colors.beige,
                  mb: 1,
                }}
              >
                {selectedProduct.name}
              </Typography>

              <Typography
                sx={{
                  color: "rgba(245,240,232,0.7)",
                  mb: 2,
                  fontSize: "1rem",
                  lineHeight: 1.6,
                }}
              >
                {selectedProduct.description || "No description available"}
              </Typography>

              <Typography
                sx={{
                  fontSize: "1.8rem",
                  fontWeight: "bold",
                  color: colors.gold,
                  mb: 3,
                }}
              >
                ${selectedProduct.price ? Number(selectedProduct.price).toFixed(2) : "0.00"}
              </Typography>

              <Button
                fullWidth
                variant="contained"
                sx={{
                  backgroundColor: colors.gold,
                  color: "#fff",
                  fontWeight: "bold",
                  padding: "12px",
                  borderRadius: "30px",
                  fontSize: "1.1rem",
                  textTransform: "none",
                  "&:hover": {
                    backgroundColor: colors.goldHover,
                  },
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
            fontSize: "1rem",
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