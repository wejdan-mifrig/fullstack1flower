import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Container,
  Paper,
  Grid,
  Chip,
  Button,
  Divider,
  CircularProgress,
  Alert,
  Stack,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from "@mui/material";
import AdminNavbar from "../../../Components/NavUserAdmin/Navadmin.jsx";
import { useOrders } from "../../../Context/OrderContext.jsx";
import { useAuth } from "../../../Context/AuthContext.jsx";
import { useNavigate } from "react-router-dom";

const AdminOrders = () => {
  const { orders, loading, getAllOrders, updateOrderStatus } = useOrders();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [rejectDialog, setRejectDialog] = useState({ open: false, orderId: null, reason: "" });
  const [actionLoading, setActionLoading] = useState(false);

  // تحقق من صلاحية الأدمن
  useEffect(() => {
    if (user && user.role === "admin") {
      getAllOrders();
    } else if (user) {
      navigate("/");
    }
  }, [user]);

  const handleAccept = async (orderId) => {
    setActionLoading(true);
    try {
      await updateOrderStatus(orderId, "accepted");
      await getAllOrders();
    } catch (error) {
      console.error(error);
    } finally {
      setActionLoading(false);
    }
  };

  const handleReject = async () => {
    const { orderId, reason } = rejectDialog;
    if (!reason.trim()) {
      alert("Please enter a reason for rejection");
      return;
    }
    setActionLoading(true);
    try {
      await updateOrderStatus(orderId, "rejected", reason);
      await getAllOrders();
      setRejectDialog({ open: false, orderId: null, reason: "" });
    } catch (error) {
      console.error(error);
    } finally {
      setActionLoading(false);
    }
  };

  const openRejectDialog = (orderId) => {
    setRejectDialog({ open: true, orderId, reason: "" });
  };

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
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          bgcolor: "#f5f5f5",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "#f5f5f5" }}>
      <AdminNavbar />
      <Container maxWidth="xl" sx={{ pt: 12, pb: 5 }}>
        <Typography variant="h4" fontWeight="bold" mb={1}>
          Orders Management
        </Typography>
        <Typography color="text.secondary" mb={4}>
          Manage all customer orders.
        </Typography>

        <Grid container spacing={3}>
          {orders.length === 0 ? (
            <Grid size={{ xs: 12 }}>
              <Alert severity="info">No orders found.</Alert>
            </Grid>
          ) : (
            orders.map((order) => (
              <Grid key={order.id} size={{ xs: 12, md: 6, lg: 4 }}>
                <Paper elevation={4} sx={{ p: 3, borderRadius: 3, height: "100%" }}>
                  <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
                    <Typography variant="h6" fontWeight="bold">
                      Order #{order.id}
                    </Typography>
                    <Chip
                      label={getStatusLabel(order.status)}
                      color={getStatusColor(order.status)}
                    />
                  </Stack>
                  <Typography fontWeight={600}>Customer</Typography>
                  <Typography mb={1}>{order.name}</Typography>
                  <Typography fontWeight={600}>Email</Typography>
                  <Typography mb={2}>{order.email}</Typography>
                  <Divider sx={{ mb: 2 }} />
                  <Typography fontWeight="bold" mb={1}>
                    Products
                  </Typography>
                  {order.items?.map((item) => (
                    <Box
                      key={item.id}
                      sx={{
                        mb: 2,
                        p: 1,
                        borderRadius: 2,
                        bgcolor: "#fafafa",
                      }}
                    >
                      <Typography fontWeight={600}>{item.name}</Typography>
                      <Typography variant="body2" color="text.secondary">
                        Quantity : {item.quantity}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Price : {item.price} JD
                      </Typography>
                    </Box>
                  ))}
                  <Divider sx={{ my: 2 }} />
                  <Typography fontWeight="bold">Total</Typography>
                  <Typography color="success.main" fontWeight="bold" mb={2}>
                    {order.total_price} JD
                  </Typography>
                  <Typography variant="body2" color="text.secondary" mb={3}>
                    {new Date(order.created_at).toLocaleString()}
                  </Typography>

                  {order.status === "Pending" && (
                    <Stack direction="row" spacing={2}>
                      <Button
                        fullWidth
                        variant="contained"
                        color="success"
                        onClick={() => handleAccept(order.id)}
                        disabled={actionLoading}
                      >
                        Accept
                      </Button>
                      <Button
                        fullWidth
                        variant="contained"
                        color="error"
                        onClick={() => openRejectDialog(order.id)}
                        disabled={actionLoading}
                      >
                        Reject
                      </Button>
                    </Stack>
                  )}

                  {order.status === "Accepted" && (
                    <Alert severity="success">Order Accepted</Alert>
                  )}
                  {order.status === "Rejected" && (
                    <Alert severity="error">
                      Order Rejected
                      {order.admin_message && (
                        <Typography variant="body2" sx={{ mt: 1 }}>
                          Reason: {order.admin_message}
                        </Typography>
                      )}
                    </Alert>
                  )}
                </Paper>
              </Grid>
            ))
          )}
        </Grid>

        {/* Dialog لإدخال سبب الرفض */}
        <Dialog
          open={rejectDialog.open}
          onClose={() => setRejectDialog({ open: false, orderId: null, reason: "" })}
        >
          <DialogTitle>Reject Order</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              label="Rejection Reason"
              fullWidth
              multiline
              rows={3}
              value={rejectDialog.reason}
              onChange={(e) =>
                setRejectDialog((prev) => ({ ...prev, reason: e.target.value }))
              }
              placeholder="Please provide a reason for rejection..."
            />
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => setRejectDialog({ open: false, orderId: null, reason: "" })}
            >
              Cancel
            </Button>
            <Button onClick={handleReject} color="error" variant="contained">
              Reject
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </Box>
  );
};

export default AdminOrders;