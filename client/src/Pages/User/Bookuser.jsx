import React, { useEffect } from "react";
import {
  Box,
  Typography,
  Paper,
  Chip,
  CircularProgress,
  Container,
  Divider,
  Button,
  Alert,
  Stack,
} from "@mui/material";
import { useOrders } from "../../Context/OrderContext.jsx";
import { useAuth } from "../../context/AuthContext.jsx";
import NavbarUser from "../../Components/NavUserAdmin/Navuser.jsx";
import Footer from "../../Components/Footer/Footer.jsx";
import { useNavigate } from "react-router-dom";

const Mybooking = () => {
  const { orders, loading, getMyOrders } = useOrders();
  const { user } = useAuth();
  const navigate = useNavigate();

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

  const getStatusLabel = (status) => {
    switch (status?.toLowerCase()) {
      case "accepted":
        return "✅ Accepted";
      case "rejected":
        return "❌ Rejected";
      default:
        return "⏳ Pending";
    }
  };

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          bgcolor: "#1c1b18",
        }}
      >
        <CircularProgress sx={{ color: "#d4a843" }} />
      </Box>
    );
  }

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "#1c1b18",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <NavbarUser />
      <Container maxWidth="lg" sx={{ flex: 1, py: 8, mt: 10, mb: 10 }}>
        <Typography
          variant="h4"
          sx={{ color: "#f4f1ea", fontWeight: 700, mb: 4, textAlign: "center" }}
        >
          📋 My Bookings
        </Typography>

        {orders.length === 0 ? (
          <Paper
            sx={{
              p: 4,
              textAlign: "center",
              bgcolor: "rgba(255,255,255,0.05)",
              borderRadius: 4,
            }}
          >
            <Typography sx={{ color: "#d6d1c4" }}>No orders yet.</Typography>
            <Button
              variant="contained"
              sx={{ mt: 2, bgcolor: "#d4a843" }}
              onClick={() => navigate("/shop")}
            >
              Shop Now
            </Button>
          </Paper>
        ) : (
          orders.map((order) => (
            <Paper
              key={order.id}
              sx={{
                p: 3,
                mb: 3,
                bgcolor: "rgba(255,255,255,0.07)",
                borderRadius: 3,
                border: "1px solid rgba(255,255,255,0.1)",
              }}
            >
              {/* رأس الطلب */}
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  flexWrap: "wrap",
                  mb: 2,
                }}
              >
                <Box>
                  <Typography sx={{ color: "#f4f1ea", fontWeight: 600 }}>
                    Order #{order.id}
                  </Typography>
                  <Typography sx={{ color: "#d6d1c4", fontSize: "0.85rem" }}>
                    {new Date(order.created_at).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </Typography>
                </Box>
                <Chip
                  label={getStatusLabel(order.status)}
                  color={getStatusColor(order.status)}
                  variant="outlined"
                  sx={{ fontWeight: 600 }}
                />
              </Box>

              <Divider sx={{ my: 2, borderColor: "rgba(255,255,255,0.1)" }} />

              {/* معلومات العميل */}
              <Typography sx={{ color: "#d6d1c4", mb: 0.5 }}>
                <strong>Customer:</strong> {order.name || user?.name || "Guest"}
              </Typography>
              <Typography sx={{ color: "#d6d1c4", mb: 0.5 }}>
                <strong>Email:</strong> {order.email || user?.email || "N/A"}
              </Typography>
              <Typography sx={{ color: "#d6d1c4", mb: 0.5 }}>
                <strong>Phone:</strong> {order.phone || "Not provided"}
              </Typography>
              <Typography sx={{ color: "#d6d1c4", mb: 0.5 }}>
                <strong>Address:</strong>{" "}
                {order.delivery_address ||
                  order.shipping_address ||
                  order.address ||
                  "Not specified"}
              </Typography>

              {order.notes && (
                <Typography sx={{ color: "#d6d1c4", mb: 0.5, fontStyle: "italic" }}>
                  <strong>Notes:</strong> {order.notes}
                </Typography>
              )}

              <Divider sx={{ my: 2, borderColor: "rgba(255,255,255,0.1)" }} />

              {/* المنتجات */}
              <Typography sx={{ color: "#d6d1c4", fontWeight: 600, mb: 1 }}>
                Products:
              </Typography>
              {order.items?.map((item, idx) => (
                <Box
                  key={idx}
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    color: "#d6d1c4",
                    fontSize: "0.85rem",
                    py: 0.5,
                    borderBottom:
                      idx < order.items.length - 1
                        ? "1px solid rgba(255,255,255,0.05)"
                        : "none",
                  }}
                >
                  <span>
                    {item.name} × {item.quantity || 1}
                  </span>
                  <span>${(Number(item.price || 0) * (item.quantity || 1)).toFixed(2)}</span>
                </Box>
              ))}

              <Divider sx={{ my: 2, borderColor: "rgba(255,255,255,0.1)" }} />

              {/* الإجمالي */}
              <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
                <Typography sx={{ color: "#d6d1c4" }}>
                  <strong>Subtotal:</strong>
                </Typography>
                <Typography sx={{ color: "#d6d1c4" }}>
                  ${Number(order.subtotal || order.total_price || 0).toFixed(2)}
                </Typography>
              </Box>
              <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
                <Typography sx={{ color: "#d6d1c4" }}>
                  <strong>Delivery:</strong>
                </Typography>
                <Typography sx={{ color: "#d6d1c4" }}>
                  {Number(order.subtotal || 0) > 50 ? "Free" : "$5.00"}
                </Typography>
              </Box>
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography sx={{ color: "#f4f1ea", fontWeight: 700, fontSize: "1.1rem" }}>
                  <strong>Total:</strong>
                </Typography>
                <Typography sx={{ color: "#d4a843", fontWeight: 700, fontSize: "1.2rem" }}>
                  ${Number(order.total_price || 0).toFixed(2)}
                </Typography>
              </Box>

              {/* رسالة الرفض إن وجدت */}
              {order.status === "rejected" && order.admin_message && (
                <Alert severity="error" sx={{ mt: 2 }}>
                  Rejection Reason: {order.admin_message}
                </Alert>
              )}

              {order.status === "accepted" && (
                <Alert severity="success" sx={{ mt: 2 }}>
                  ✅ Your order has been accepted!
                </Alert>
              )}
            </Paper>
          ))
        )}
      </Container>
      <Footer />
    </Box>
  );
};

export default Mybooking;