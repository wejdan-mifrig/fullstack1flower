import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Button,
  Paper,
  Box,
  InputAdornment,
  TextField,
  Grid,
  Card,
  CardContent,
  Avatar,
  Rating,
  IconButton,
  CircularProgress,
  Alert,
  Snackbar,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Chip,
} from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";
import DeleteIcon from "@mui/icons-material/Delete";
import RateReviewIcon from "@mui/icons-material/RateReview";
import StarIcon from "@mui/icons-material/Star";
import CloseIcon from "@mui/icons-material/Close";

import AdminNavbar from "../../../Components/NavUserAdmin/Navadmin.jsx";
import api from "../../../api.js";

export default function AdminReviews() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedReview, setSelectedReview] = useState(null);
  const [deleteDialog, setDeleteDialog] = useState(false);
  const [viewDialog, setViewDialog] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const fetchReviews = async () => {
    try {
      setLoading(true);
      const response = await api.get("/all-reviews");
      setReviews(response.data.reviews || []);
    } catch (error) {
      console.error("Fetch reviews error:", error);
      setSnackbar({
        open: true,
        message: error.response?.data?.message || "Failed to load reviews",
        severity: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  const filteredReviews = reviews?.filter(
    (review) =>
      review?.user_name?.toLowerCase().includes(search.toLowerCase()) ||
      review?.comment?.toLowerCase().includes(search.toLowerCase()),
  );

  const handleOpenDelete = (review) => {
    setSelectedReview(review);
    setDeleteDialog(true);
  };

  const handleCloseDelete = () => {
    setSelectedReview(null);
    setDeleteDialog(false);
  };

  const handleDelete = async () => {
    if (!selectedReview) return;

    try {
      await api.delete(`/admin/review/${selectedReview.id}`);
      setReviews((prev) =>
        prev.filter((review) => review.id !== selectedReview.id),
      );
      setSnackbar({
        open: true,
        message: "Review deleted successfully",
        severity: "success",
      });
      handleCloseDelete();
    } catch (error) {
      console.error("Delete review error:", error);
      setSnackbar({
        open: true,
        message: error.response?.data?.message || "Failed to delete review",
        severity: "error",
      });
    }
  };

  const handleOpenView = (review) => {
    setSelectedReview(review);
    setViewDialog(true);
  };

  const handleCloseView = () => {
    setSelectedReview(null);
    setViewDialog(false);
  };

  const getStats = () => {
    const total = reviews.length;
    const average =
      total > 0
        ? (
            reviews.reduce((sum, r) => sum + Number(r.rating), 0) / total
          ).toFixed(1)
        : 0;
    const fiveStar = reviews.filter((r) => Number(r.rating) === 5).length;
    const fourStar = reviews.filter((r) => Number(r.rating) === 4).length;
    const threeStar = reviews.filter((r) => Number(r.rating) === 3).length;

    return { total, average, fiveStar, fourStar, threeStar };
  };

  const stats = getStats();

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
              Customer Reviews
            </Typography>

            <Typography variant="body2" sx={{ color: "#777", mt: 0.5 }}>
              Manage and moderate customer reviews
            </Typography>

            <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
              <Chip
                icon={<RateReviewIcon />}
                label={`${reviews.length} Reviews`}
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
                <Typography
                  sx={{
                    color: "#899186",
                    mb: 1,
                    fontSize: "0.8rem",
                    fontWeight: 600,
                  }}
                >
                  TOTAL REVIEWS
                </Typography>
                <Typography
                  variant="h3"
                  sx={{ fontWeight: 700, color: "#1f3d2b" }}
                >
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
                <Typography
                  sx={{
                    color: "#899186",
                    mb: 1,
                    fontSize: "0.8rem",
                    fontWeight: 600,
                  }}
                >
                  AVERAGE RATING
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 1,
                  }}
                >
                  <Typography
                    variant="h3"
                    sx={{ fontWeight: 700, color: "#f9a825" }}
                  >
                    {stats.average}
                  </Typography>
                  <StarIcon sx={{ color: "#f9a825", fontSize: 30 }} />
                </Box>
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
                <Typography
                  sx={{
                    color: "#899186",
                    mb: 1,
                    fontSize: "0.8rem",
                    fontWeight: 600,
                  }}
                >
                  5 STAR REVIEWS
                </Typography>
                <Typography
                  variant="h3"
                  sx={{ fontWeight: 700, color: "#4caf50" }}
                >
                  {stats.fiveStar}
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
                <Typography
                  sx={{
                    color: "#899186",
                    mb: 1,
                    fontSize: "0.8rem",
                    fontWeight: 600,
                  }}
                >
                  4+ STAR REVIEWS
                </Typography>
                <Typography
                  variant="h3"
                  sx={{ fontWeight: 700, color: "#6f8a67" }}
                >
                  {stats.fourStar + stats.fiveStar}
                </Typography>
              </Paper>
            </Grid>
          </Grid>

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
                placeholder="Search reviews..."
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

            {filteredReviews?.length === 0 ? (
              <Alert severity="info" sx={{ borderRadius: 3 }}>
                No reviews found.
              </Alert>
            ) : (
              <Grid container spacing={3} justifyContent="center">
                {filteredReviews?.map((review) => {
                  const commentLength = review.comment?.length || 0;
                  const isLongComment = commentLength > 15;
                  const displayComment = isLongComment
                    ? review.comment?.slice(0, 15) + "..."
                    : review.comment;

                  return (
                    <Grid item xs={12} sm={6} md={4} key={review.id}>
                      <Card
                        sx={{
                          height: "100%",
                          display: "flex",
                          flexDirection: "column",
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
                        <CardContent
                          sx={{
                            p: 3,
                            flex: 1,
                            display: "flex",
                            flexDirection: "column",
                          }}
                        >
                          {/* USER */}
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "space-between",
                              mb: 2,
                            }}
                          >
                            <Box
                              sx={{
                                display: "flex",
                                alignItems: "center",
                                gap: 1.5,
                              }}
                            >
                              <Avatar
                                sx={{
                                  width: 48,
                                  height: 48,
                                  bgcolor: "#6f8a67",
                                  fontWeight: 700,
                                  color: "#fff",
                                }}
                              >
                                {review.user_name?.charAt(0)?.toUpperCase()}
                              </Avatar>

                              <Box>
                                <Typography
                                  sx={{ fontWeight: 700, color: "#1f3d2b" }}
                                >
                                  {review.user_name}
                                </Typography>
                                <Typography
                                  sx={{ fontSize: "0.75rem", color: "#8b9388" }}
                                >
                                  Customer
                                </Typography>
                              </Box>
                            </Box>

                            <IconButton
                              onClick={() => handleOpenDelete(review)}
                              sx={{
                                color: "#d9534f",
                                "&:hover": { bgcolor: "#fff0f0" },
                              }}
                            >
                              <DeleteIcon />
                            </IconButton>
                          </Box>

                          {/* RATING */}
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              gap: 1,
                              mb: 2,
                            }}
                          >
                            <Rating
                              value={Number(review.rating)}
                              readOnly
                              size="small"
                            />
                            <Typography
                              sx={{ fontSize: "0.8rem", color: "#999" }}
                            >
                              {review.rating}/5
                            </Typography>
                          </Box>

                          <Box
                            sx={{
                              p: 2,
                              borderRadius: 3,
                              background: "#f7f8f5",
                              border: "1px solid #edf0eb",
                              flex: 1,
                              display: "flex",
                              flexDirection: "column",
                            }}
                          >
                            <Typography
                              sx={{ color: "#596257", lineHeight: 1.8 }}
                            >
                              “{displayComment}”
                            </Typography>

                            {isLongComment && (
                              <Button
                                size="small"
                                onClick={() => handleOpenView(review)}
                                sx={{
                                  mt: 1,
                                  color: "#6f8a67",
                                  fontWeight: 600,
                                  textTransform: "none",
                                  alignSelf: "flex-start",
                                  "&:hover": {
                                    backgroundColor: "transparent",
                                    color: "#5a7a52",
                                  },
                                }}
                              >
                                See More
                              </Button>
                            )}
                          </Box>

                          <Typography
                            sx={{
                              mt: 2,
                              fontSize: "0.75rem",
                              color: "#9ba39a",
                            }}
                          >
                            {new Date(review.created_at).toLocaleDateString(
                              "en-US",
                              {
                                month: "short",
                                day: "numeric",
                                year: "numeric",
                              },
                            )}
                          </Typography>
                        </CardContent>
                      </Card>
                    </Grid>
                  );
                })}
              </Grid>
            )}
          </Paper>
        </Container>
      </Box>

      <Dialog
        open={viewDialog}
        onClose={handleCloseView}
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
        {selectedReview && (
          <>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                p: 3,
                borderBottom: "1px solid #eee",
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <Avatar
                  sx={{
                    width: 56,
                    height: 56,
                    bgcolor: "#6f8a67",
                    fontWeight: 700,
                    color: "#fff",
                    fontSize: "1.5rem",
                  }}
                >
                  {selectedReview.user_name?.charAt(0)?.toUpperCase()}
                </Avatar>
                <Box>
                  <Typography
                    sx={{
                      fontWeight: 700,
                      color: "#1f3d2b",
                      fontSize: "1.1rem",
                    }}
                  >
                    {selectedReview.user_name}
                  </Typography>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <Rating
                      value={Number(selectedReview.rating)}
                      readOnly
                      size="small"
                    />
                    <Typography sx={{ fontSize: "0.8rem", color: "#999" }}>
                      {selectedReview.rating}/5
                    </Typography>
                  </Box>
                </Box>
              </Box>
              <IconButton onClick={handleCloseView} sx={{ color: "#777" }}>
                <CloseIcon />
              </IconButton>
            </Box>

            <DialogContent sx={{ p: 3 }}>
              <Typography
                sx={{
                  color: "#1f3d2b",
                  fontSize: "1rem",
                  lineHeight: 2,
                  whiteSpace: "pre-wrap",
                  wordBreak: "break-word",
                }}
              >
                {selectedReview.comment}
              </Typography>

              <Typography
                sx={{
                  mt: 2,
                  fontSize: "0.75rem",
                  color: "#9ba39a",
                }}
              >
                {new Date(selectedReview.created_at).toLocaleDateString(
                  "en-US",
                  {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  },
                )}
              </Typography>
            </DialogContent>

            <DialogActions sx={{ p: 2, borderTop: "1px solid #eee" }}>
              <Button
                onClick={handleCloseView}
                sx={{
                  color: "#6f8a67",
                  fontWeight: 600,
                  borderRadius: 3,
                  px: 3,
                }}
              >
                Close
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>

      <Dialog
        open={deleteDialog}
        onClose={handleCloseDelete}
        PaperProps={{
          sx: {
            borderRadius: 4,
            p: 1,
          },
        }}
      >
        <DialogTitle sx={{ fontWeight: "bold", color: "#1f3d2b" }}>
          Delete Review?
        </DialogTitle>

        <DialogContent>
          <Typography sx={{ color: "#777" }}>
            Are you sure you want to delete this review?
          </Typography>
        </DialogContent>

        <DialogActions sx={{ p: 2 }}>
          <Button onClick={handleCloseDelete} sx={{ color: "#777" }}>
            Cancel
          </Button>

          <Button
            onClick={handleDelete}
            color="error"
            variant="contained"
            sx={{
              borderRadius: 3,
              px: 3,
            }}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>

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
}
