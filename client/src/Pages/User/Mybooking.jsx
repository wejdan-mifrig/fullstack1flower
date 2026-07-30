import React, { useEffect, useState } from "react";

import {
  Box,
  Typography,
  Paper,
  Chip,
  CircularProgress,
  Container,
  Divider,
  Button,
  Stack,
  Card,
  CardContent,
  Avatar,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Grid,
} from "@mui/material";

import {
  ShoppingBag as ShoppingBagIcon,
  CheckCircle as CheckCircleIcon,
  Cancel as CancelIcon,
  Pending as PendingIcon,
  Person as PersonIcon,
  Email as EmailIcon,
  Phone as PhoneIcon,
  Home as HomeIcon,
  Payment as PaymentIcon,
  Receipt as ReceiptIcon,
  Close as CloseIcon,
  Visibility as VisibilityIcon,
  LocalShipping as LocalShippingIcon,
  CalendarToday as CalendarTodayIcon,
  AttachMoney as AttachMoneyIcon,
} from "@mui/icons-material";

import { keyframes } from "@emotion/react";

import { useOrders } from "../../Context/OrderContext.jsx";
import { useAuth } from "../../Context/AuthContext.jsx";

import NavbarUser from "../../Components/NavUserAdmin/Navuser.jsx";
import Footer from "../../Components/Footer/Footer.jsx";

import { useNavigate } from "react-router-dom";

const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(25px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const colors = {
  primary: "#8B0000",
  primaryLight: "#a52a2a",
  primaryDark: "#660000",
  secondary: "#f5f0e8",
  secondaryDark: "#e8ddd0",
  accent: "#c9a84c",
  accentLight: "#e8d48a",
  accentHover: "#b8943a",
  white: "#ffffff",
  lightBg: "#faf6f0",
  gray: "#8a7a6a",
  lightGray: "#f0ebe3",
  textPrimary: "#3d2a1a",
  textSecondary: "#8a7a6a",
  textWhite: "#ffffff",
  success: "#2e7d32",
  successLight: "#e8f5e9",
  danger: "#c62828",
  dangerLight: "#ffebee",
  warning: "#ed6c02",
  warningLight: "#fff3e0",
};

const Mybooking = () => {
  const { orders, loading, getMyOrders } = useOrders();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [selectedOrder, setSelectedOrder] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  useEffect(() => {
    if (user) {
      getMyOrders();
    }
  }, [user]);

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "accepted":
        return "success";
      case "rejected":
        return "error";
      default:
        return "warning";
    }
  };

  const getStatusIcon = (status) => {
    switch (status?.toLowerCase()) {
      case "accepted":
        return <CheckCircleIcon sx={{ fontSize: 20 }} />;
      case "rejected":
        return <CancelIcon sx={{ fontSize: 20 }} />;
      default:
        return <PendingIcon sx={{ fontSize: 20 }} />;
    }
  };

  const getStatusLabel = (status) => {
    switch (status?.toLowerCase()) {
      case "accepted":
        return "✅ Successful";
      case "rejected":
        return "❌ Rejected";
      default:
        return "⏳ Pending";
    }
  };

  const getBorderColor = (status) => {
    switch (status?.toLowerCase()) {
      case "accepted":
        return colors.success;
      case "rejected":
        return colors.danger;
      default:
        return colors.accent;
    }
  };

  const getBorderLight = (status) => {
    switch (status?.toLowerCase()) {
      case "accepted":
        return colors.successLight;
      case "rejected":
        return colors.dangerLight;
      default:
        return colors.warningLight;
    }
  };

  const handleOpenDialog = (order) => {
    setSelectedOrder(order);
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setSelectedOrder(null);
  };

  if (loading) {
    return (
      <Box
        sx={{
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          bgcolor: colors.secondary,
        }}
      >
        <CircularProgress sx={{ color: colors.primary }} />
      </Box>
    );
  }

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: colors.secondary,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <NavbarUser />

      <Box
        sx={{
          position: "relative",
          width: "100%",
          height: "100vh",
          background: `linear-gradient(135deg, ${colors.primaryDark} 0%, ${colors.primary} 50%, ${colors.primaryLight} 100%)`,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          px: { xs: 3, md: 6 },
          overflow: "hidden",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "rgba(0,0,0,0.15)",
            zIndex: 0,
          }}
        />

        <Box
          sx={{
            position: "absolute",
            top: "10%",
            right: "5%",
            width: 300,
            height: 300,
            borderRadius: "50%",
            background: "rgba(201,168,76,0.08)",
            zIndex: 0,
          }}
        />
        <Box
          sx={{
            position: "absolute",
            bottom: "15%",
            left: "5%",
            width: 200,
            height: 200,
            borderRadius: "50%",
            background: "rgba(201,168,76,0.06)",
            zIndex: 0,
          }}
        />

        <Box sx={{ position: "relative", zIndex: 1 }}>
          <ShoppingBagIcon
            sx={{
              fontSize: { xs: 80, md: 120 },
              color: colors.accent,
              mb: 3,
              filter: "drop-shadow(0 4px 20px rgba(201,168,76,0.3))",
            }}
          />

          <Typography
            sx={{
              color: colors.textWhite,
              fontSize: { xs: "2.5rem", md: "4.5rem" },
              fontWeight: 700,
              letterSpacing: 2,
              fontFamily: "'Cormorant Garamond', serif",
              mb: 2,
              textShadow: "0 4px 30px rgba(0,0,0,0.3)",
            }}
          >
            Customer Orders
          </Typography>

          <Typography
            sx={{
              color: "rgba(255,255,255,0.85)",
              fontSize: { xs: "1rem", md: "1.3rem" },
              fontWeight: 300,
              letterSpacing: 3,
              textShadow: "0 2px 20px rgba(0,0,0,0.2)",
              maxWidth: 600,
              mx: "auto",
            }}
          >
            Track and manage all your orders in one place
          </Typography>

          <Box
            sx={{
              mt: 4,
              display: "flex",
              gap: 2,
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            <Chip
              icon={<ReceiptIcon />}
              label={`${orders.length} Orders`}
              sx={{
                bgcolor: "rgba(255,255,255,0.15)",
                color: colors.textWhite,
                fontWeight: 600,
                borderRadius: 2,
                px: 1,
                backdropFilter: "blur(10px)",
                "& .MuiChip-icon": {
                  color: colors.accent,
                },
              }}
            />
          </Box>
        </Box>

        <Box
          sx={{
            position: "absolute",
            bottom: 40,
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: 1,
            animation: "bounce 2s infinite",
            color: "rgba(255,255,255,0.6)",
            "@keyframes bounce": {
              "0%, 100%": {
                transform: "translateX(-50%) translateY(0)",
              },
              "50%": {
                transform: "translateX(-50%) translateY(10px)",
              },
            },
          }}
        >
          <Typography sx={{ fontSize: "0.85rem", letterSpacing: 2 }}>
            SCROLL DOWN
          </Typography>
        </Box>
      </Box>

      <Container
        maxWidth="lg"
        sx={{
          flex: 1,
          py: { xs: 6, md: 8 },
          bgcolor: colors.secondary,
        }}
      >
        {orders.length === 0 ? (
          <Paper
            sx={{
              p: { xs: 4, md: 6 },
              textAlign: "center",
              borderRadius: 3,
              bgcolor: colors.white,
              boxShadow: "0 2px 12px rgba(139,0,0,0.08)",
              border: `2px solid ${colors.accent}`,
              animation: `${fadeInUp} .6s ease`,
            }}
          >
            <ShoppingBagIcon
              sx={{
                fontSize: 80,
                color: colors.gray,
                opacity: 0.5,
                mb: 2,
              }}
            />

            <Typography
              sx={{
                color: colors.textPrimary,
                fontSize: "1.2rem",
                fontWeight: 600,
                mb: 1,
              }}
            >
              No Orders Yet
            </Typography>

            <Typography color={colors.textSecondary} sx={{ mb: 3 }}>
              You haven't placed any orders. Start shopping now!
            </Typography>

            <Button
              variant="contained"
              onClick={() => navigate("/shop")}
              sx={{
                bgcolor: colors.primary,
                textTransform: "none",
                fontWeight: 600,
                borderRadius: 3,
                px: 4,
                py: 1.5,
                "&:hover": {
                  bgcolor: colors.primaryDark,
                },
              }}
            >
              Shop Now
            </Button>
          </Paper>
        ) : (
          <Stack spacing={4}>
            {orders.map((order, index) => {
              const borderColor = getBorderColor(order.status);
              const borderLight = getBorderLight(order.status);

              return (
                <Card
                  key={order.id}
                  sx={{
                    borderRadius: 3,
                    overflow: "hidden",
                    bgcolor: colors.white,
                    boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
                    border: `3px solid ${borderColor}`,
                    transition: "all .3s ease",
                    animation: `${fadeInUp} .5s ease forwards`,
                    animationDelay: `${index * 0.05}s`,
                    opacity: 0,
                    "&:hover": {
                      boxShadow: `0 8px 35px ${borderColor}40`,
                      transform: "translateY(-4px)",
                    },
                  }}
                >
                  <Box
                    sx={{
                      p: 3,
                      bgcolor: borderLight,
                      borderBottom: `3px solid ${borderColor}`,
                      display: "flex",
                      flexDirection: { xs: "column", sm: "row" },
                      justifyContent: "space-between",
                      alignItems: { xs: "flex-start", sm: "center" },
                      gap: 2,
                    }}
                  >
                    <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                      <ReceiptIcon sx={{ color: borderColor, fontSize: 28 }} />

                      <Box>
                        <Typography
                          sx={{
                            fontWeight: 700,
                            color: colors.textPrimary,
                            fontSize: "1.1rem",
                          }}
                        >
                          Order #{order.id}
                        </Typography>

                        <Typography
                          sx={{
                            color: colors.textSecondary,
                            fontSize: "0.85rem",
                          }}
                        >
                          <CalendarTodayIcon
                            sx={{
                              fontSize: 14,
                              verticalAlign: "middle",
                              mr: 0.5,
                            }}
                          />
                          {new Date(order.created_at).toLocaleDateString(
                            "en-US",
                            {
                              month: "long",
                              day: "numeric",
                              year: "numeric",
                            },
                          )}
                          {" • "}
                          {new Date(order.created_at).toLocaleTimeString(
                            "en-US",
                            {
                              hour: "2-digit",
                              minute: "2-digit",
                            },
                          )}
                        </Typography>
                      </Box>
                    </Box>

                    <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
                      <Chip
                        icon={getStatusIcon(order.status)}
                        label={getStatusLabel(order.status)}
                        color={getStatusColor(order.status)}
                        variant="outlined"
                        sx={{
                          fontWeight: 600,
                          borderRadius: 2,
                          px: 1,
                          borderWidth: 2,
                          "& .MuiChip-icon": {
                            color: "inherit",
                          },
                        }}
                      />

                      <Button
                        variant="outlined"
                        size="small"
                        startIcon={<VisibilityIcon />}
                        onClick={() => handleOpenDialog(order)}
                        sx={{
                          borderColor: borderColor,
                          color: borderColor,
                          borderRadius: 2,
                          textTransform: "none",
                          fontWeight: 600,
                          "&:hover": {
                            borderColor: colors.primary,
                            bgcolor: `${borderColor}10`,
                          },
                        }}
                      >
                        View Details
                      </Button>
                    </Box>
                  </Box>

                  <CardContent sx={{ p: 3 }}>
                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={6}>
                        <Box
                          sx={{ display: "flex", alignItems: "center", gap: 1 }}
                        >
                          <PersonIcon
                            sx={{ fontSize: 18, color: colors.gray }}
                          />
                          <Typography color={colors.textPrimary}>
                            <strong>Name:</strong>{" "}
                            {order.name || "Not specified"}
                          </Typography>
                        </Box>
                      </Grid>

                      <Grid item xs={12} sm={6}>
                        <Box
                          sx={{ display: "flex", alignItems: "center", gap: 1 }}
                        >
                          <EmailIcon
                            sx={{ fontSize: 18, color: colors.gray }}
                          />
                          <Typography color={colors.textPrimary}>
                            <strong>Email:</strong>{" "}
                            {order.email || "Not specified"}
                          </Typography>
                        </Box>
                      </Grid>

                      <Grid item xs={12} sm={6}>
                        <Box
                          sx={{ display: "flex", alignItems: "center", gap: 1 }}
                        >
                          <PhoneIcon
                            sx={{ fontSize: 18, color: colors.gray }}
                          />
                          <Typography color={colors.textPrimary}>
                            <strong>Phone:</strong>{" "}
                            {order.phone || "Not specified"}
                          </Typography>
                        </Box>
                      </Grid>

                      <Grid item xs={12} sm={6}>
                        <Box
                          sx={{ display: "flex", alignItems: "center", gap: 1 }}
                        >
                          <AttachMoneyIcon
                            sx={{ fontSize: 18, color: colors.gray }}
                          />
                          <Typography
                            sx={{
                              color: colors.primary,
                              fontWeight: 700,
                              fontSize: "1.1rem",
                            }}
                          >
                            <strong>Total:</strong> $
                            {Number(order.total_price || 0).toFixed(2)}
                          </Typography>
                        </Box>
                      </Grid>
                    </Grid>

                    <Box
                      sx={{ mt: 2, display: "flex", gap: 1, flexWrap: "wrap" }}
                    >
                      <Typography
                        color={colors.textSecondary}
                        sx={{ fontSize: "0.85rem" }}
                      >
                        <strong>Payment:</strong>{" "}
                        {order.payment_method || "Cash"}
                      </Typography>
                      <Typography
                        color={colors.textSecondary}
                        sx={{ fontSize: "0.85rem" }}
                      >
                        <strong>Items:</strong> {order.items?.length || 0}
                      </Typography>
                    </Box>
                  </CardContent>
                </Card>
              );
            })}
          </Stack>
        )}
      </Container>

      <Dialog
        open={dialogOpen}
        onClose={handleCloseDialog}
        maxWidth="md"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 3,
            overflow: "hidden",
            bgcolor: colors.white,
            maxHeight: "90vh",
          },
        }}
      >
        {selectedOrder && (
          <>
            <Box
              sx={{
                p: 3,
                bgcolor: getBorderLight(selectedOrder.status),
                borderBottom: `3px solid ${getBorderColor(selectedOrder.status)}`,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <ReceiptIcon
                  sx={{
                    color: getBorderColor(selectedOrder.status),
                    fontSize: 32,
                  }}
                />
                <Box>
                  <Typography
                    sx={{
                      fontWeight: 700,
                      color: colors.textPrimary,
                      fontSize: "1.2rem",
                    }}
                  >
                    Order #{selectedOrder.id}
                  </Typography>
                  <Typography
                    sx={{ color: colors.textSecondary, fontSize: "0.85rem" }}
                  >
                    {new Date(selectedOrder.created_at).toLocaleDateString(
                      "en-US",
                      {
                        month: "long",
                        day: "numeric",
                        year: "numeric",
                      },
                    )}
                    {" • "}
                    {new Date(selectedOrder.created_at).toLocaleTimeString(
                      "en-US",
                      {
                        hour: "2-digit",
                        minute: "2-digit",
                      },
                    )}
                  </Typography>
                </Box>
              </Box>

              <IconButton
                onClick={handleCloseDialog}
                sx={{ color: colors.textSecondary }}
              >
                <CloseIcon />
              </IconButton>
            </Box>

            <DialogContent sx={{ p: 3 }}>
              {/* Status */}
              <Box sx={{ mb: 3 }}>
                <Chip
                  icon={getStatusIcon(selectedOrder.status)}
                  label={getStatusLabel(selectedOrder.status)}
                  color={getStatusColor(selectedOrder.status)}
                  sx={{
                    fontWeight: 600,
                    borderRadius: 2,
                    px: 1,
                    fontSize: "1rem",
                    "& .MuiChip-icon": {
                      color: "inherit",
                    },
                  }}
                />
              </Box>

              <Typography
                sx={{
                  fontWeight: 700,
                  color: colors.textPrimary,
                  mb: 2,
                  fontSize: "1.1rem",
                  borderBottom: `2px solid ${getBorderColor(selectedOrder.status)}`,
                  pb: 1,
                }}
              >
                <PersonIcon
                  sx={{
                    fontSize: 20,
                    color: colors.accent,
                    mr: 1,
                    verticalAlign: "middle",
                  }}
                />
                Customer Information
              </Typography>

              <Grid container spacing={2} sx={{ mb: 3 }}>
                <Grid item xs={12} sm={6}>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1.5,
                      p: 1,
                      bgcolor: colors.lightBg,
                      borderRadius: 1,
                    }}
                  >
                    <PersonIcon sx={{ fontSize: 20, color: colors.gray }} />
                    <Box>
                      <Typography
                        sx={{
                          fontSize: "0.75rem",
                          color: colors.textSecondary,
                        }}
                      >
                        Name
                      </Typography>
                      <Typography
                        sx={{ color: colors.textPrimary, fontWeight: 500 }}
                      >
                        {selectedOrder.name || "Not specified"}
                      </Typography>
                    </Box>
                  </Box>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1.5,
                      p: 1,
                      bgcolor: colors.lightBg,
                      borderRadius: 1,
                    }}
                  >
                    <EmailIcon sx={{ fontSize: 20, color: colors.gray }} />
                    <Box>
                      <Typography
                        sx={{
                          fontSize: "0.75rem",
                          color: colors.textSecondary,
                        }}
                      >
                        Email
                      </Typography>
                      <Typography
                        sx={{ color: colors.textPrimary, fontWeight: 500 }}
                      >
                        {selectedOrder.email || "Not specified"}
                      </Typography>
                    </Box>
                  </Box>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1.5,
                      p: 1,
                      bgcolor: colors.lightBg,
                      borderRadius: 1,
                    }}
                  >
                    <PhoneIcon sx={{ fontSize: 20, color: colors.gray }} />
                    <Box>
                      <Typography
                        sx={{
                          fontSize: "0.75rem",
                          color: colors.textSecondary,
                        }}
                      >
                        Phone
                      </Typography>
                      <Typography
                        sx={{ color: colors.textPrimary, fontWeight: 500 }}
                      >
                        {selectedOrder.phone || "Not specified"}
                      </Typography>
                    </Box>
                  </Box>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1.5,
                      p: 1,
                      bgcolor: colors.lightBg,
                      borderRadius: 1,
                    }}
                  >
                    <PaymentIcon sx={{ fontSize: 20, color: colors.gray }} />
                    <Box>
                      <Typography
                        sx={{
                          fontSize: "0.75rem",
                          color: colors.textSecondary,
                        }}
                      >
                        Payment
                      </Typography>
                      <Typography
                        sx={{ color: colors.textPrimary, fontWeight: 500 }}
                      >
                        {selectedOrder.payment_method || "Cash"}
                      </Typography>
                    </Box>
                  </Box>
                </Grid>

                <Grid item xs={12}>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1.5,
                      p: 1,
                      bgcolor: colors.lightBg,
                      borderRadius: 1,
                    }}
                  >
                    <HomeIcon sx={{ fontSize: 20, color: colors.gray }} />
                    <Box>
                      <Typography
                        sx={{
                          fontSize: "0.75rem",
                          color: colors.textSecondary,
                        }}
                      >
                        Address
                      </Typography>
                      <Typography
                        sx={{ color: colors.textPrimary, fontWeight: 500 }}
                      >
                        {selectedOrder.address || "Not specified"}
                      </Typography>
                    </Box>
                  </Box>
                </Grid>
              </Grid>

              <Typography
                sx={{
                  fontWeight: 700,
                  color: colors.textPrimary,
                  mb: 2,
                  fontSize: "1.1rem",
                  borderBottom: `2px solid ${getBorderColor(selectedOrder.status)}`,
                  pb: 1,
                }}
              >
                <ShoppingBagIcon
                  sx={{
                    fontSize: 20,
                    color: colors.accent,
                    mr: 1,
                    verticalAlign: "middle",
                  }}
                />
                Products
              </Typography>

              <Stack spacing={2} sx={{ mb: 3 }}>
                {selectedOrder.items?.map((item, idx) => (
                  <Box
                    key={idx}
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      p: 2,
                      bgcolor: colors.lightBg,
                      borderRadius: 2,
                      border: `1px solid ${getBorderColor(selectedOrder.status)}`,
                    }}
                  >
                    <Box>
                      <Typography
                        sx={{ fontWeight: 600, color: colors.textPrimary }}
                      >
                        {item.name}
                      </Typography>
                      <Typography
                        sx={{
                          color: colors.textSecondary,
                          fontSize: "0.85rem",
                        }}
                      >
                        Quantity: {item.quantity}
                      </Typography>
                      <Typography
                        sx={{
                          color: colors.textSecondary,
                          fontSize: "0.85rem",
                        }}
                      >
                        ${Number(item.price).toFixed(2)} each
                      </Typography>
                    </Box>
                    <Typography
                      sx={{
                        color: getBorderColor(selectedOrder.status),
                        fontWeight: 700,
                        fontSize: "1.1rem",
                      }}
                    >
                      ${(Number(item.price) * item.quantity).toFixed(2)}
                    </Typography>
                  </Box>
                ))}
              </Stack>

              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  p: 2,
                  bgcolor: getBorderLight(selectedOrder.status),
                  borderRadius: 2,
                  border: `2px solid ${getBorderColor(selectedOrder.status)}`,
                }}
              >
                <Typography
                  sx={{
                    fontWeight: 700,
                    color: colors.textPrimary,
                    fontSize: "1.1rem",
                  }}
                >
                  Total Amount
                </Typography>
                <Typography
                  sx={{
                    color: getBorderColor(selectedOrder.status),
                    fontWeight: 800,
                    fontSize: "1.5rem",
                  }}
                >
                  ${Number(selectedOrder.total_price || 0).toFixed(2)}
                </Typography>
              </Box>

              {selectedOrder.status?.toLowerCase() === "rejected" &&
                selectedOrder.admin_message && (
                  <Box
                    sx={{
                      mt: 3,
                      p: 2.5,
                      borderRadius: 2,
                      bgcolor: colors.dangerLight,
                      border: `2px solid ${colors.danger}`,
                    }}
                  >
                    <Typography
                      sx={{ color: colors.danger, fontWeight: 700, mb: 0.5 }}
                    >
                      Admin Message
                    </Typography>
                    <Typography color={colors.textPrimary}>
                      {selectedOrder.admin_message}
                    </Typography>
                  </Box>
                )}
            </DialogContent>

            <DialogActions
              sx={{ p: 3, borderTop: "1px solid rgba(201,168,76,0.2)" }}
            >
              <Button
                onClick={handleCloseDialog}
                variant="contained"
                sx={{
                  bgcolor: colors.primary,
                  textTransform: "none",
                  fontWeight: 600,
                  borderRadius: 2,
                  px: 4,
                  "&:hover": {
                    bgcolor: colors.primaryDark,
                  },
                }}
              >
                Close
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>

      <Footer />
    </Box>
  );
};

export default Mybooking;
