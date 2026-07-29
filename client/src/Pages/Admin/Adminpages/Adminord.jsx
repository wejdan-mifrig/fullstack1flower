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
  Avatar,
  Snackbar,
  Card,
  CardContent,
  IconButton,
  InputAdornment,
} from "@mui/material";

import VisibilityIcon from "@mui/icons-material/Visibility";
import CloseIcon from "@mui/icons-material/Close";
import SearchIcon from "@mui/icons-material/Search";
import AdminNavbar from "../../../Components/NavUserAdmin/Navadmin.jsx";

import { useOrders } from "../../../Context/OrderContext.jsx";
import { useAuth } from "../../../Context/AuthContext.jsx";

import { useNavigate } from "react-router-dom";

const AdminOrders = () => {
  const { orders, loading, getAllOrders, updateOrderStatus } = useOrders();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [selectedOrder, setSelectedOrder] = useState(null);
  const [detailsDialog, setDetailsDialog] = useState(false);
  const [search, setSearch] = useState("");
  const [rejectDialog, setRejectDialog] = useState({
    open: false,
    orderId: null,
    reason: "",
  });
  const [actionLoading, setActionLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  // ==============================
  // CHECK ADMIN
  // ==============================
  useEffect(() => {
    if (user && user.role === "admin") {
      getAllOrders();
    } else if (user) {
      navigate("/");
    }
  }, [user]);

  // ==============================
  // SEARCH FILTER
  // ==============================
  const filteredOrders = orders?.filter((order) =>
    order?.name?.toLowerCase().includes(search.toLowerCase()) ||
    order?.email?.toLowerCase().includes(search.toLowerCase()) ||
    order?.id?.toString().includes(search)
  );

  // ==============================
  // ACCEPT
  // ==============================
  const handleAccept = async (id) => {
    setActionLoading(true);
    try {
      await updateOrderStatus(id, "accepted");
      await getAllOrders();
      setSnackbar({
        open: true,
        message: "Order accepted successfully",
        severity: "success",
      });
    } catch (error) {
      setSnackbar({
        open: true,
        message: error.response?.data?.message || "Failed to accept order",
        severity: "error",
      });
    } finally {
      setActionLoading(false);
    }
  };

  // ==============================
  // REJECT
  // ==============================
  const handleReject = async () => {
    const { orderId, reason } = rejectDialog;

    if (!reason.trim()) {
      setSnackbar({
        open: true,
        message: "Please enter rejection reason",
        severity: "error",
      });
      return;
    }

    setActionLoading(true);
    try {
      await updateOrderStatus(orderId, "rejected", reason);
      await getAllOrders();
      setSnackbar({
        open: true,
        message: "Order rejected successfully",
        severity: "success",
      });
      setRejectDialog({
        open: false,
        orderId: null,
        reason: "",
      });
    } catch (error) {
      setSnackbar({
        open: true,
        message: error.response?.data?.message || "Failed to reject order",
        severity: "error",
      });
    } finally {
      setActionLoading(false);
    }
  };

  // ==============================
  // DETAILS
  // ==============================
  const openDetails = (order) => {
    setSelectedOrder(order);
    setDetailsDialog(true);
  };

  const closeDetails = () => {
    setSelectedOrder(null);
    setDetailsDialog(false);
  };

  // ==============================
  // STATUS
  // ==============================
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
        return "Accepted";
      case "rejected":
        return "Rejected";
      default:
        return "Pending";
    }
  };

  // ==============================
  // STATISTICS
  // ==============================
  const getStats = () => {
    const total = orders.length;
    const accepted = orders.filter((o) => o.status?.toLowerCase() === "accepted").length;
    const rejected = orders.filter((o) => o.status?.toLowerCase() === "rejected").length;
    const pending = orders.filter((o) => o.status?.toLowerCase() === "pending").length;

    return { total, accepted, rejected, pending };
  };

  const stats = getStats();

  // ==============================
  // LOADING
  // ==============================
  if (loading) {
    return (
      <>
        <AdminNavbar />
        <Box
          sx={{
            minHeight: "70vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "#6f8a67",
          }}
        >
          <CircularProgress sx={{ color: "#fff" }} />
        </Box>
      </>
    );
  }

  // ==============================
  // PAGE
  // ==============================
  return (
    <>
      <AdminNavbar />

      <Box
        sx={{
          minHeight: "100vh",
          background: "#6f8a67",
          pt: 12,
          pb: 6,
        }}
      >
        <Container maxWidth="xl">
          {/* ======================================
              HEADER
              ====================================== */}
          <Paper
            elevation={0}
            sx={{
              p: 4,
              mb: 4,
              borderRadius: 4,
              backgroundColor: "#fff",
              boxShadow: "0 18px 45px rgba(0,0,0,.15)",
              textAlign: "center",
            }}
          >
            <Typography
              variant="h4"
              sx={{
                fontWeight: "bold",
                color: "#1f3d2b",
              }}
            >
              Orders Management
            </Typography>

            <Typography variant="body2" sx={{ color: "#777", mt: 0.5 }}>
              Manage customer orders
            </Typography>

            <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
              <Chip
                label={`${orders.length} Orders`}
                sx={{
                  backgroundColor: "#6f8a67",
                  color: "#fff",
                  fontWeight: 600,
                  borderRadius: 3,
                  px: 2,
                }}
              />
            </Box>
          </Paper>

          {/* ======================================
              STATISTICS - CENTERED
              ====================================== */}
          <Grid container spacing={3} sx={{ mb: 4, justifyContent: "center" }}>
            <Grid item xs={12} sm={6} md={3}>
              <Paper
                elevation={0}
                sx={{
                  p: 3,
                  borderRadius: 4,
                  backgroundColor: "#fff",
                  boxShadow: "0 12px 35px rgba(0,0,0,.1)",
                  textAlign: "center",
                }}
              >
                <Typography sx={{ color: "#899186", mb: 1, fontSize: "0.8rem", fontWeight: 600 }}>
                  TOTAL ORDERS
                </Typography>
                <Typography variant="h3" sx={{ fontWeight: 700, color: "#1f3d2b" }}>
                  {stats.total}
                </Typography>
              </Paper>
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <Paper
                elevation={0}
                sx={{
                  p: 3,
                  borderRadius: 4,
                  backgroundColor: "#fff",
                  boxShadow: "0 12px 35px rgba(0,0,0,.1)",
                  textAlign: "center",
                }}
              >
                <Typography sx={{ color: "#899186", mb: 1, fontSize: "0.8rem", fontWeight: 600 }}>
                  ACCEPTED
                </Typography>
                <Typography variant="h3" sx={{ fontWeight: 700, color: "#4caf50" }}>
                  {stats.accepted}
                </Typography>
              </Paper>
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <Paper
                elevation={0}
                sx={{
                  p: 3,
                  borderRadius: 4,
                  backgroundColor: "#fff",
                  boxShadow: "0 12px 35px rgba(0,0,0,.1)",
                  textAlign: "center",
                }}
              >
                <Typography sx={{ color: "#899186", mb: 1, fontSize: "0.8rem", fontWeight: 600 }}>
                  REJECTED
                </Typography>
                <Typography variant="h3" sx={{ fontWeight: 700, color: "#d9534f" }}>
                  {stats.rejected}
                </Typography>
              </Paper>
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <Paper
                elevation={0}
                sx={{
                  p: 3,
                  borderRadius: 4,
                  backgroundColor: "#fff",
                  boxShadow: "0 12px 35px rgba(0,0,0,.1)",
                  textAlign: "center",
                }}
              >
                <Typography sx={{ color: "#899186", mb: 1, fontSize: "0.8rem", fontWeight: 600 }}>
                  PENDING
                </Typography>
                <Typography variant="h3" sx={{ fontWeight: 700, color: "#f9a825" }}>
                  {stats.pending}
                </Typography>
              </Paper>
            </Grid>
          </Grid>

          {/* ======================================
              SEARCH & ORDERS
              ====================================== */}
          <Paper
            elevation={0}
            sx={{
              p: 4,
              borderRadius: 4,
              backgroundColor: "#fff",
              boxShadow: "0 15px 45px rgba(0,0,0,.15)",
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                mb: 3,
              }}
            >
              <TextField
                size="small"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search orders by name, email or ID..."
                sx={{
                  width: { xs: "100%", sm: 400 },
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 3,
                    backgroundColor: "#f7f7f7",
                  },
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon sx={{ color: "#6f8a67" }} />
                    </InputAdornment>
                  ),
                }}
              />
            </Box>

            {/* ======================================
                ORDERS CARDS - CENTERED LIKE REVIEWS
                ====================================== */}
            {filteredOrders?.length === 0 ? (
              <Alert severity="info" sx={{ borderRadius: 3 }}>
                No orders found.
              </Alert>
            ) : (
              <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
                <Grid 
                  container 
                  spacing={3} 
                  sx={{ 
                    maxWidth: '1200px',
                    justifyContent: 'center',
                  }}
                >
                  {filteredOrders?.map((order) => (
                    <Grid
                      item
                      xs={12}
                      sm={6}
                      md={4}
                      key={order.id}
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                      }}
                    >
                      <Card
                        sx={{
                          width: '100%',
                          maxWidth: 360,
                          borderRadius: 4,
                          background: "#fff",
                          boxShadow: "0 12px 35px rgba(0,0,0,0.07)",
                          transition: "0.3s",
                          "&:hover": {
                            transform: "translateY(-6px)",
                            boxShadow: "0 18px 45px rgba(0,0,0,0.12)",
                          },
                        }}
                      >
                        <CardContent sx={{ p: 3 }}>
                          {/* ORDER HEADER */}
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "space-between",
                              mb: 2,
                            }}
                          >
                            <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                              <Avatar
                                sx={{
                                  width: 48,
                                  height: 48,
                                  bgcolor: "#6f8a67",
                                  fontWeight: 700,
                                  color: "#fff",
                                }}
                              >
                                {order.name?.charAt(0)?.toUpperCase()}
                              </Avatar>

                              <Box>
                                <Typography sx={{ fontWeight: 700, color: "#1f3d2b", fontSize: '0.95rem' }}>
                                  {order.name}
                                </Typography>
                                <Typography sx={{ fontSize: "0.75rem", color: "#8b9388" }}>
                                  {order.email}
                                </Typography>
                              </Box>
                            </Box>

                            <Chip
                              label={getStatusLabel(order.status)}
                              color={getStatusColor(order.status)}
                              size="small"
                              sx={{ fontWeight: 600 }}
                            />
                          </Box>

                          {/* ORDER DETAILS */}
                          <Box
                            sx={{
                              p: 2,
                              borderRadius: 3,
                              background: "#f7f8f5",
                              border: "1px solid #edf0eb",
                              mb: 2,
                            }}
                          >
                            <Typography sx={{ fontSize: "0.85rem", color: "#596257" }}>
                              <strong>Order #:</strong> {order.id}
                            </Typography>
                            <Typography sx={{ fontSize: "0.85rem", color: "#596257" }}>
                              <strong>Total:</strong> {order.total_price} JD
                            </Typography>
                            <Typography sx={{ fontSize: "0.85rem", color: "#596257" }}>
                              <strong>Payment:</strong> {order.payment_method}
                            </Typography>
                            <Typography sx={{ fontSize: "0.75rem", color: "#9ba39a", mt: 1 }}>
                              {new Date(order.created_at).toLocaleString()}
                            </Typography>
                          </Box>

                          {/* ACTION BUTTONS */}
                          <Stack spacing={1}>
                            <Button
                              fullWidth
                              startIcon={<VisibilityIcon />}
                              onClick={() => openDetails(order)}
                              sx={{
                                background: "#6f8a67",
                                color: "#fff",
                                borderRadius: 3,
                                "&:hover": {
                                  background: "#5a7a52",
                                },
                              }}
                            >
                              View Details
                            </Button>

                            {order.status?.toLowerCase() === "pending" && (
                              <Stack direction="row" spacing={1}>
                                <Button
                                  fullWidth
                                  variant="contained"
                                  color="success"
                                  disabled={actionLoading}
                                  onClick={() => handleAccept(order.id)}
                                  sx={{
                                    borderRadius: 3,
                                    fontWeight: 600,
                                  }}
                                >
                                  Accept
                                </Button>
                                <Button
                                  fullWidth
                                  variant="contained"
                                  color="error"
                                  disabled={actionLoading}
                                  onClick={() =>
                                    setRejectDialog({
                                      open: true,
                                      orderId: order.id,
                                      reason: "",
                                    })
                                  }
                                  sx={{
                                    borderRadius: 3,
                                    fontWeight: 600,
                                  }}
                                >
                                  Reject
                                </Button>
                              </Stack>
                            )}
                          </Stack>
                        </CardContent>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              </Box>
            )}
          </Paper>
        </Container>
      </Box>

      {/* ======================================
          ORDER DETAILS DIALOG
          ====================================== */}
      <Dialog
        open={detailsDialog}
        onClose={closeDetails}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 4,
            p: 0,
            overflow: "hidden",
          },
        }}
      >
        {selectedOrder && (
          <>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                p: 3,
                background: "#6f8a67",
                color: "#fff",
              }}
            >
              <Box>
                <Typography variant="h6" fontWeight="bold">
                  Order #{selectedOrder.id}
                </Typography>
                <Typography fontSize="0.9rem">Complete Order Details</Typography>
              </Box>
              <IconButton onClick={closeDetails} sx={{ color: "#fff" }}>
                <CloseIcon />
              </IconButton>
            </Box>

            <DialogContent sx={{ p: 3 }}>
              {/* CUSTOMER INFO */}
              <Typography fontWeight="bold" color="#1f3d2b" mb={2}>
                Customer Information
              </Typography>

              <Paper
                sx={{
                  p: 2,
                  mb: 3,
                  borderRadius: 3,
                  background: "#f7f8f5",
                  border: "1px solid #edf0eb",
                }}
              >
                <Typography>Name : {selectedOrder.name}</Typography>
                <Typography>Email : {selectedOrder.email}</Typography>
                <Typography>Phone : {selectedOrder.phone}</Typography>
                <Typography>Address : {selectedOrder.address}</Typography>
                <Typography>Payment : {selectedOrder.payment_method}</Typography>
              </Paper>

              {/* PRODUCTS */}
              <Typography fontWeight="bold" color="#1f3d2b" mb={2}>
                Products
              </Typography>

              {selectedOrder.items?.map((item) => (
                <Paper
                  key={item.id}
                  sx={{
                    p: 2,
                    mb: 2,
                    borderRadius: 3,
                    background: "#fafafa",
                  }}
                >
                  <Typography fontWeight="700" color="#1f3d2b">
                    {item.name}
                  </Typography>
                  <Typography color="#777">Quantity : {item.quantity}</Typography>
                  <Typography color="#777">Price : {item.price} JD</Typography>
                </Paper>
              ))}

              <Divider sx={{ my: 3 }} />

              <Typography fontWeight="bold" color="#1f3d2b">
                Total Amount
              </Typography>
              <Typography variant="h5" fontWeight="bold" sx={{ color: "#6f8a67" }}>
                {selectedOrder.total_price} JD
              </Typography>

              {selectedOrder.admin_message && (
                <Alert
                  severity={
                    selectedOrder.status?.toLowerCase() === "rejected" ? "error" : "success"
                  }
                  sx={{
                    mt: 3,
                    borderRadius: 3,
                  }}
                >
                  {selectedOrder.admin_message}
                </Alert>
              )}
            </DialogContent>
          </>
        )}
      </Dialog>

      {/* ======================================
          REJECT DIALOG
          ====================================== */}
      <Dialog
        open={rejectDialog.open}
        onClose={() =>
          setRejectDialog({
            open: false,
            orderId: null,
            reason: "",
          })
        }
        PaperProps={{
          sx: {
            borderRadius: 4,
            p: 1,
          },
        }}
      >
        <DialogTitle sx={{ fontWeight: "bold", color: "#1f3d2b" }}>
          Reject Order
        </DialogTitle>

        <DialogContent>
          <TextField
            autoFocus
            fullWidth
            multiline
            rows={3}
            label="Rejection Reason"
            value={rejectDialog.reason}
            onChange={(e) =>
              setRejectDialog((prev) => ({
                ...prev,
                reason: e.target.value,
              }))
            }
          />
        </DialogContent>

        <DialogActions sx={{ p: 2 }}>
          <Button
            onClick={() =>
              setRejectDialog({
                open: false,
                orderId: null,
                reason: "",
              })
            }
            sx={{ color: "#777" }}
          >
            Cancel
          </Button>

          <Button
            variant="contained"
            color="error"
            disabled={actionLoading}
            onClick={handleReject}
            sx={{
              borderRadius: 3,
              px: 3,
            }}
          >
            Reject
          </Button>
        </DialogActions>
      </Dialog>

      {/* ======================================
          SNACKBAR
          ====================================== */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          severity={snackbar.severity}
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          sx={{
            borderRadius: 3,
            fontWeight: 600,
          }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  );
};

export default AdminOrders;