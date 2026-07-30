import React, { useEffect, useState } from "react";

import {
  Box,
  Typography,
  Container,
  Paper,
  Avatar,
  Rating,
  TextField,
  Button,
  Card,
  CardContent,
  CardHeader,
  Snackbar,
  Alert,
  IconButton,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Chip,
  Divider,
  Stack,
} from "@mui/material";

import {
  Send as SendIcon,
  Star as StarIcon,
  Favorite as FavoriteIcon,
  FavoriteBorder as FavoriteBorderIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Close as CloseIcon,
  Feedback as FeedbackIcon,
  EmojiEmotions as EmojiEmotionsIcon,
  ExpandMore as ExpandMoreIcon,
  ThumbUp as ThumbUpIcon,
  ThumbUpOffAlt as ThumbUpOffAltIcon,
  Comment as CommentIcon,
} from "@mui/icons-material";

import { keyframes } from "@emotion/react";

import NavbarUser from "../../Components/NavUserAdmin/Navuser.jsx";
import Footer from "../../Components/Footer/Footer.jsx";

import api from "../../api.js";
import { useAuth } from "../../Hooks/useAuth.js";

import reviewVideo from "../../assets/video/rev11.mp4";

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
  danger: "#c62828",
  facebook: "#8B0000",
  facebookLight: "#fdf0ea",
};

const Reviewuser = () => {
  const { user, authLoading } = useAuth();

  const [reviews, setReviews] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [newRating, setNewRating] = useState(5);
  const [loading, setLoading] = useState(false);
  const [fetchingReviews, setFetchingReviews] = useState(true);

  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [selectedReview, setSelectedReview] = useState(null);
  const [editComment, setEditComment] = useState("");
  const [editRating, setEditRating] = useState(5);
  const [editLoading, setEditLoading] = useState(false);

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [reviewToDelete, setReviewToDelete] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const [viewDialogOpen, setViewDialogOpen] = useState(false);
  const [viewReview, setViewReview] = useState(null);

  const [viewAllDialogOpen, setViewAllDialogOpen] = useState(false);

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const showMessage = (message, severity = "success") => {
    setSnackbar({
      open: true,
      message,
      severity,
    });
  };

  const fetchReviews = async () => {
    try {
      setFetchingReviews(true);
      const response = await api.get("/all-reviews");
      const sortedReviews = (response.data.reviews || []).sort(
        (a, b) => new Date(b.created_at) - new Date(a.created_at),
      );
      setReviews(sortedReviews);
    } catch (error) {
      console.error("Fetch reviews error:", error);
      showMessage(
        error.response?.data?.message || "Failed to load reviews",
        "error",
      );
    } finally {
      setFetchingReviews(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  const getStats = () => {
    const total = reviews.length;
    if (total === 0) {
      return {
        total: 0,
        average: 0,
        fiveStar: 0,
        fourStar: 0,
        threeStar: 0,
        twoStar: 0,
        oneStar: 0,
      };
    }

    const average = (
      reviews.reduce((sum, review) => sum + Number(review.rating), 0) / total
    ).toFixed(1);

    return {
      total,
      average,
      fiveStar: reviews.filter((review) => Number(review.rating) === 5).length,
      fourStar: reviews.filter((review) => Number(review.rating) === 4).length,
      threeStar: reviews.filter((review) => Number(review.rating) === 3).length,
      twoStar: reviews.filter((review) => Number(review.rating) === 2).length,
      oneStar: reviews.filter((review) => Number(review.rating) === 1).length,
    };
  };

  const stats = getStats();

  const handleLike = async (reviewId) => {
    if (authLoading) return;
    if (!user) {
      showMessage("Please login first", "warning");
      return;
    }

    try {
      const review = reviews.find((item) => item.id === reviewId);
      if (!review) return;

      const method = review.liked ? "delete" : "post";

      await api.request({
        method,
        url: `/review/${reviewId}/like`,
      });

      setReviews((previousReviews) =>
        previousReviews.map((item) =>
          item.id === reviewId
            ? {
                ...item,
                liked: !item.liked,
                likes_count: item.liked
                  ? Math.max(0, (item.likes_count || 0) - 1)
                  : (item.likes_count || 0) + 1,
              }
            : item,
        ),
      );
    } catch (error) {
      console.error("Like error:", error);
      showMessage(
        error.response?.data?.message || "Like action failed",
        "error",
      );
    }
  };

  const handleAddReview = async () => {
    if (!newComment.trim()) {
      showMessage("Please write a comment", "warning");
      return;
    }

    if (authLoading) return;
    if (!user) {
      showMessage("Please login first", "warning");
      return;
    }

    try {
      setLoading(true);
      await api.post("/review", {
        rating: newRating,
        comment: newComment.trim(),
      });

      setNewComment("");
      setNewRating(5);
      await fetchReviews();

      showMessage(
        "✨ Your review has been posted! Thank you for your feedback!",
        "success",
      );
    } catch (error) {
      console.error("Create review error:", error);
      showMessage(
        error.response?.data?.message || "Failed to create review",
        "error",
      );
    } finally {
      setLoading(false);
    }
  };

  const handleOpenEdit = (review) => {
    setSelectedReview(review);
    setEditComment(review.comment);
    setEditRating(Number(review.rating));
    setEditDialogOpen(true);
  };

  const handleCloseEdit = () => {
    if (editLoading) return;
    setEditDialogOpen(false);
    setSelectedReview(null);
    setEditComment("");
    setEditRating(5);
  };

  const handleUpdateReview = async () => {
    if (!editComment.trim()) {
      showMessage("Please write a comment", "warning");
      return;
    }

    if (!selectedReview) return;

    try {
      setEditLoading(true);
      const response = await api.put(`/review/${selectedReview.id}`, {
        rating: editRating,
        comment: editComment.trim(),
      });

      const updatedReview = response.data.review;

      setReviews((previousReviews) =>
        previousReviews.map((review) =>
          review.id === selectedReview.id
            ? {
                ...review,
                rating: updatedReview?.rating || editRating,
                comment: updatedReview?.comment || editComment.trim(),
              }
            : review,
        ),
      );

      handleCloseEdit();
      showMessage("✅ Review updated successfully", "success");
    } catch (error) {
      console.error("Update review error:", error);
      showMessage(
        error.response?.data?.message || "Failed to update review",
        "error",
      );
    } finally {
      setEditLoading(false);
    }
  };

  const handleOpenDelete = (review) => {
    setReviewToDelete(review);
    setDeleteDialogOpen(true);
  };

  const handleDeleteReview = async () => {
    if (!reviewToDelete) return;

    try {
      setDeleteLoading(true);
      await api.delete(`/review/${reviewToDelete.id}`);

      setReviews((previousReviews) =>
        previousReviews.filter((review) => review.id !== reviewToDelete.id),
      );

      setDeleteDialogOpen(false);
      setReviewToDelete(null);
      showMessage("🗑️ Review deleted successfully", "success");
    } catch (error) {
      console.error("Delete review error:", error);
      showMessage(
        error.response?.data?.message || "Failed to delete review",
        "error",
      );
    } finally {
      setDeleteLoading(false);
    }
  };

  const handleOpenView = (review) => {
    setViewReview(review);
    setViewDialogOpen(true);
  };

  const handleCloseView = () => {
    setViewDialogOpen(false);
    setViewReview(null);
  };

  const handleOpenViewAll = () => {
    setViewAllDialogOpen(true);
  };

  const handleCloseViewAll = () => {
    setViewAllDialogOpen(false);
  };

  const displayedReviews = reviews.slice(0, 3);
  const hasMoreReviews = reviews.length > 3;

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: colors.secondary,
      }}
    >
      <NavbarUser />

      <Box
        sx={{
          position: "relative",
          width: "100%",
          height: "100vh",
          overflow: "hidden",
        }}
      >
        <Box
          component="video"
          src={reviewVideo}
          autoPlay
          loop
          muted
          playsInline
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            zIndex: 0,
          }}
        />

        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "rgba(139,0,0,0.2)",
            zIndex: 1,
          }}
        />

        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 2,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
            px: { xs: 3, md: 6 },
          }}
        >
          <Typography
            sx={{
              color: colors.textWhite,
              fontSize: { xs: "1.2rem", md: "2rem" },
              fontWeight: 300,
              letterSpacing: 2,
              textShadow: "0 2px 20px rgba(0,0,0,0.3)",
              fontFamily: "'Cormorant Garamond', serif",
              opacity: 0.9,
            }}
          >
            Your Voice Matters
          </Typography>
        </Box>
      </Box>

      <Container
        maxWidth="md"
        sx={{
          pt: 4,
          pb: 8,
        }}
      >
        <Paper
          sx={{
            p: { xs: 2, md: 3 },
            mb: 4,
            borderRadius: 3,
            bgcolor: "#ffffff",
            boxShadow: "0 2px 12px rgba(139,0,0,0.1)",
            animation: `${fadeInUp} .6s ease`,
            border: "1px solid rgba(201,168,76,0.2)",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              alignItems: "center",
              gap: 3,
            }}
          >
            <Box
              sx={{
                textAlign: "center",
                minWidth: 120,
              }}
            >
              <Typography
                sx={{
                  fontSize: "3rem",
                  fontWeight: 800,
                  color: colors.primary,
                }}
              >
                {stats.average}
              </Typography>
              <Rating
                value={Number(stats.average)}
                precision={0.5}
                readOnly
                sx={{ color: colors.accent }}
              />
              <Typography
                variant="body2"
                sx={{
                  mt: 0.5,
                  color: colors.textSecondary,
                }}
              >
                {stats.total} reviews
              </Typography>
            </Box>

            <Divider
              orientation="vertical"
              flexItem
              sx={{ display: { xs: "none", md: "block" } }}
            />

            <Box sx={{ flex: 1, width: "100%" }}>
              {[
                { stars: 5, count: stats.fiveStar },
                { stars: 4, count: stats.fourStar },
                { stars: 3, count: stats.threeStar },
                { stars: 2, count: stats.twoStar },
                { stars: 1, count: stats.oneStar },
              ].map(({ stars, count }) => (
                <Box
                  key={stars}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                    mb: 0.5,
                  }}
                >
                  <Typography sx={{ width: 20, color: colors.textSecondary }}>
                    {stars}
                  </Typography>
                  <StarIcon sx={{ fontSize: 14, color: colors.accent }} />
                  <Box
                    sx={{
                      flex: 1,
                      height: 6,
                      bgcolor: colors.lightGray,
                      borderRadius: 10,
                      overflow: "hidden",
                    }}
                  >
                    <Box
                      sx={{
                        width:
                          stats.total > 0
                            ? `${(count / stats.total) * 100}%`
                            : "0%",
                        height: "100%",
                        bgcolor: colors.primary,
                        borderRadius: 10,
                        transition: "width .5s ease",
                      }}
                    />
                  </Box>
                  <Typography sx={{ width: 30, color: colors.textSecondary }}>
                    {count}
                  </Typography>
                </Box>
              ))}
            </Box>
          </Box>
        </Paper>

        <Paper
          sx={{
            p: { xs: 2, md: 3 },
            mb: 4,
            borderRadius: 3,
            bgcolor: "#ffffff",
            boxShadow: "0 2px 12px rgba(139,0,0,0.08)",
            border: "1px solid rgba(201,168,76,0.15)",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}>
            <Avatar
              sx={{
                width: 48,
                height: 48,
                bgcolor: colors.primary,
                color: "#fff",
                fontWeight: 700,
              }}
            >
              {user?.name?.charAt(0)?.toUpperCase() || "U"}
            </Avatar>
            <Box sx={{ flex: 1 }}>
              <Typography sx={{ fontWeight: 600, color: colors.textPrimary }}>
                {user?.name || "Guest User"}
              </Typography>
              <Typography
                sx={{ fontSize: "0.75rem", color: colors.textSecondary }}
              >
                Share your experience
              </Typography>
            </Box>
          </Box>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 2,
              mb: 2,
            }}
          >
            <Typography
              sx={{ color: colors.textSecondary, fontSize: "0.9rem" }}
            >
              Rating:
            </Typography>
            <Rating
              value={newRating}
              onChange={(event, value) => {
                setNewRating(value || 5);
              }}
              sx={{ color: colors.accent }}
            />
          </Box>

          <Box
            sx={{
              display: "flex",
              gap: 2,
              flexDirection: { xs: "column", md: "row" },
            }}
          >
            <TextField
              fullWidth
              multiline
              rows={2}
              placeholder="What's on your mind? Share your experience..."
              value={newComment}
              onChange={(event) => setNewComment(event.target.value)}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: 2,
                  bgcolor: colors.secondary,
                  border: "none",
                  "& fieldset": {
                    border: "none",
                  },
                },
              }}
            />

            <Button
              variant="contained"
              onClick={handleAddReview}
              disabled={loading || authLoading}
              sx={{
                minWidth: { xs: "100%", md: 120 },
                borderRadius: 3,
                bgcolor: colors.primary,
                textTransform: "none",
                fontWeight: 600,
                "&:hover": {
                  bgcolor: colors.primaryDark,
                },
              }}
            >
              {loading ? (
                <CircularProgress size={24} sx={{ color: "#fff" }} />
              ) : (
                "Post Review"
              )}
            </Button>
          </Box>
        </Paper>

        {fetchingReviews ? (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              py: 10,
            }}
          >
            <CircularProgress sx={{ color: colors.primary }} />
          </Box>
        ) : reviews.length === 0 ? (
          <Paper
            sx={{
              p: 6,
              textAlign: "center",
              borderRadius: 3,
              bgcolor: "#ffffff",
              boxShadow: "0 2px 12px rgba(139,0,0,0.08)",
            }}
          >
            <Typography color="text.secondary">
              No reviews yet. Be the first to share your experience! 🎉
            </Typography>
          </Paper>
        ) : (
          <>
            <Stack spacing={3}>
              {displayedReviews.map((review, index) => {
                const isOwner =
                  user && Number(user.id) === Number(review.user_id);
                const isLongComment = review.comment?.length > 50;
                const displayComment = isLongComment
                  ? review.comment?.slice(0, 50) + "..."
                  : review.comment;

                return (
                  <Card
                    key={review.id}
                    sx={{
                      borderRadius: 3,
                      overflow: "hidden",
                      bgcolor: "#ffffff",
                      boxShadow: "0 2px 12px rgba(139,0,0,0.08)",
                      border: "1px solid rgba(201,168,76,0.15)",
                      animation: `${fadeInUp} .5s ease forwards`,
                      animationDelay: `${index * 0.05}s`,
                      opacity: 0,
                      transition: "all .2s ease",
                      "&:hover": {
                        boxShadow: "0 4px 20px rgba(139,0,0,0.15)",
                      },
                    }}
                  >
                    {/* HEADER */}
                    <CardHeader
                      avatar={
                        <Avatar
                          sx={{
                            width: 48,
                            height: 48,
                            bgcolor: colors.primary,
                            color: "#fff",
                            fontWeight: 700,
                          }}
                        >
                          {review.user_name?.charAt(0)?.toUpperCase() || "U"}
                        </Avatar>
                      }
                      title={
                        <Typography
                          sx={{ fontWeight: 600, color: colors.textPrimary }}
                        >
                          {review.user_name}
                        </Typography>
                      }
                      subheader={
                        <Box
                          sx={{ display: "flex", alignItems: "center", gap: 1 }}
                        >
                          <Rating
                            value={Number(review.rating)}
                            readOnly
                            size="small"
                            sx={{ color: colors.accent }}
                          />
                          <Typography
                            sx={{
                              fontSize: "0.75rem",
                              color: colors.textSecondary,
                            }}
                          >
                            •{" "}
                            {new Date(review.created_at).toLocaleDateString(
                              "en-US",
                              {
                                month: "short",
                                day: "numeric",
                                year: "numeric",
                              },
                            )}
                          </Typography>
                        </Box>
                      }
                      action={
                        isOwner && (
                          <Box>
                            <IconButton
                              size="small"
                              onClick={() => handleOpenEdit(review)}
                              sx={{ color: colors.textSecondary }}
                            >
                              <EditIcon fontSize="small" />
                            </IconButton>
                            <IconButton
                              size="small"
                              onClick={() => handleOpenDelete(review)}
                              sx={{ color: colors.danger }}
                            >
                              <DeleteIcon fontSize="small" />
                            </IconButton>
                          </Box>
                        )
                      }
                      sx={{
                        pb: 1,
                        "& .MuiCardHeader-content": {
                          overflow: "hidden",
                        },
                      }}
                    />

                    <CardContent sx={{ pt: 0, pb: 1 }}>
                      <Typography
                        sx={{
                          color: colors.textPrimary,
                          lineHeight: 1.8,
                          fontSize: "0.95rem",
                          whiteSpace: "pre-wrap",
                          wordBreak: "break-word",
                        }}
                      >
                        {displayComment}
                      </Typography>

                      {isLongComment && (
                        <Button
                          size="small"
                          onClick={() => handleOpenView(review)}
                          sx={{
                            mt: 0.5,
                            color: colors.accent,
                            fontWeight: 600,
                            textTransform: "none",
                            "&:hover": {
                              backgroundColor: "transparent",
                              color: colors.accentHover,
                            },
                          }}
                        >
                          See More
                        </Button>
                      )}
                    </CardContent>

                    <Box
                      sx={{
                        px: 2,
                        py: 1,
                        borderTop: "1px solid rgba(201,168,76,0.15)",
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <Button
                        size="small"
                        onClick={() => handleLike(review.id)}
                        startIcon={
                          review.liked ? (
                            <ThumbUpIcon sx={{ color: colors.primary }} />
                          ) : (
                            <ThumbUpOffAltIcon
                              sx={{ color: colors.textSecondary }}
                            />
                          )
                        }
                        sx={{
                          color: review.liked
                            ? colors.primary
                            : colors.textSecondary,
                          textTransform: "none",
                          fontWeight: review.liked ? 600 : 400,
                          "&:hover": {
                            backgroundColor: colors.facebookLight,
                          },
                        }}
                      >
                        {review.likes_count || 0} Like
                      </Button>
                    </Box>
                  </Card>
                );
              })}
            </Stack>

            {hasMoreReviews && (
              <Box sx={{ textAlign: "center", mt: 4 }}>
                <Button
                  variant="outlined"
                  onClick={handleOpenViewAll}
                  sx={{
                    color: colors.primary,
                    borderColor: colors.primary,
                    borderRadius: 3,
                    px: 4,
                    py: 1.5,
                    textTransform: "none",
                    fontWeight: 600,
                    "&:hover": {
                      borderColor: colors.primaryDark,
                      backgroundColor: "rgba(139,0,0,0.05)",
                    },
                  }}
                  endIcon={<ExpandMoreIcon />}
                >
                  See All {reviews.length} Reviews
                </Button>
              </Box>
            )}
          </>
        )}

        <Box sx={{ textAlign: "center", mt: 4 }}>
          <Typography variant="caption" sx={{ color: colors.textSecondary }}>
            Showing {displayedReviews.length} of {reviews.length} reviews
          </Typography>
        </Box>
      </Container>

      <Dialog
        open={viewDialogOpen}
        onClose={handleCloseView}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 3,
            overflow: "hidden",
            bgcolor: "#ffffff",
          },
        }}
      >
        {viewReview && (
          <>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                p: 3,
                bgcolor: colors.secondary,
                borderBottom: "1px solid rgba(201,168,76,0.2)",
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <Avatar
                  sx={{
                    width: 48,
                    height: 48,
                    bgcolor: colors.primary,
                    color: "#fff",
                    fontWeight: 700,
                  }}
                >
                  {viewReview.user_name?.charAt(0)?.toUpperCase()}
                </Avatar>

                <Box>
                  <Typography
                    sx={{ fontWeight: 600, color: colors.textPrimary }}
                  >
                    {viewReview.user_name}
                  </Typography>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <Rating
                      value={Number(viewReview.rating)}
                      readOnly
                      size="small"
                      sx={{ color: colors.accent }}
                    />
                    <Typography
                      sx={{ fontSize: "0.75rem", color: colors.textSecondary }}
                    >
                      {viewReview.rating}/5
                    </Typography>
                  </Box>
                </Box>
              </Box>

              <IconButton
                onClick={handleCloseView}
                sx={{ color: colors.textSecondary }}
              >
                <CloseIcon />
              </IconButton>
            </Box>

            <DialogContent sx={{ p: 3 }}>
              <Typography
                sx={{
                  color: colors.textPrimary,
                  fontSize: "1rem",
                  lineHeight: 2,
                  whiteSpace: "pre-wrap",
                  wordBreak: "break-word",
                }}
              >
                {viewReview.comment}
              </Typography>

              <Typography
                sx={{
                  mt: 2,
                  fontSize: "0.75rem",
                  color: colors.textSecondary,
                }}
              >
                {new Date(viewReview.created_at).toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </Typography>
            </DialogContent>

            <DialogActions
              sx={{ p: 2, borderTop: "1px solid rgba(201,168,76,0.2)" }}
            >
              <Button
                onClick={handleCloseView}
                sx={{
                  color: colors.primary,
                  fontWeight: 600,
                  borderRadius: 2,
                  px: 3,
                  textTransform: "none",
                }}
              >
                Close
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>

      <Dialog
        open={viewAllDialogOpen}
        onClose={handleCloseViewAll}
        maxWidth="md"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 3,
            overflow: "hidden",
            bgcolor: "#ffffff",
            maxHeight: "80vh",
          },
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            p: 3,
            bgcolor: colors.secondary,
            borderBottom: "1px solid rgba(201,168,76,0.2)",
          }}
        >
          <Typography
            sx={{
              fontWeight: 700,
              color: colors.textPrimary,
              fontSize: "1.2rem",
            }}
          >
            All Reviews ({reviews.length})
          </Typography>

          <IconButton
            onClick={handleCloseViewAll}
            sx={{ color: colors.textSecondary }}
          >
            <CloseIcon />
          </IconButton>
        </Box>

        <DialogContent sx={{ p: 0 }}>
          <Stack spacing={0}>
            {reviews.map((review, index) => {
              const isOwner =
                user && Number(user.id) === Number(review.user_id);

              return (
                <Box
                  key={review.id}
                  sx={{
                    p: 3,
                    borderBottom:
                      index < reviews.length - 1
                        ? "1px solid rgba(201,168,76,0.1)"
                        : "none",
                    "&:hover": {
                      bgcolor: colors.lightBg,
                    },
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "flex-start",
                    }}
                  >
                    <Box sx={{ display: "flex", gap: 2, flex: 1 }}>
                      <Avatar
                        sx={{
                          width: 40,
                          height: 40,
                          bgcolor: colors.primary,
                          color: "#fff",
                          fontWeight: 700,
                          fontSize: "1rem",
                        }}
                      >
                        {review.user_name?.charAt(0)?.toUpperCase() || "U"}
                      </Avatar>

                      <Box sx={{ flex: 1 }}>
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 1,
                            flexWrap: "wrap",
                          }}
                        >
                          <Typography
                            sx={{ fontWeight: 600, color: colors.textPrimary }}
                          >
                            {review.user_name}
                          </Typography>
                          <Typography
                            sx={{
                              fontSize: "0.75rem",
                              color: colors.textSecondary,
                            }}
                          >
                            •{" "}
                            {new Date(review.created_at).toLocaleDateString(
                              "en-US",
                              {
                                month: "short",
                                day: "numeric",
                                year: "numeric",
                              },
                            )}
                          </Typography>
                        </Box>

                        <Rating
                          value={Number(review.rating)}
                          readOnly
                          size="small"
                          sx={{ color: colors.accent, mt: 0.5 }}
                        />

                        <Typography
                          sx={{
                            color: colors.textPrimary,
                            lineHeight: 1.8,
                            fontSize: "0.95rem",
                            mt: 1,
                            whiteSpace: "pre-wrap",
                            wordBreak: "break-word",
                          }}
                        >
                          {review.comment}
                        </Typography>
                      </Box>
                    </Box>

                    {isOwner && (
                      <Box sx={{ display: "flex", gap: 0.5, ml: 2 }}>
                        <IconButton
                          size="small"
                          onClick={() => {
                            handleCloseViewAll();
                            handleOpenEdit(review);
                          }}
                          sx={{ color: colors.textSecondary }}
                        >
                          <EditIcon fontSize="small" />
                        </IconButton>
                        <IconButton
                          size="small"
                          onClick={() => {
                            handleCloseViewAll();
                            handleOpenDelete(review);
                          }}
                          sx={{ color: colors.danger }}
                        >
                          <DeleteIcon fontSize="small" />
                        </IconButton>
                      </Box>
                    )}
                  </Box>

                  <Box sx={{ mt: 1, ml: 7 }}>
                    <Button
                      size="small"
                      onClick={() => handleLike(review.id)}
                      startIcon={
                        review.liked ? (
                          <ThumbUpIcon
                            sx={{ color: colors.primary, fontSize: "0.9rem" }}
                          />
                        ) : (
                          <ThumbUpOffAltIcon
                            sx={{
                              color: colors.textSecondary,
                              fontSize: "0.9rem",
                            }}
                          />
                        )
                      }
                      sx={{
                        color: review.liked
                          ? colors.primary
                          : colors.textSecondary,
                        textTransform: "none",
                        fontWeight: review.liked ? 600 : 400,
                        fontSize: "0.8rem",
                        "&:hover": {
                          backgroundColor: colors.facebookLight,
                        },
                      }}
                    >
                      {review.likes_count || 0} Like
                    </Button>
                  </Box>
                </Box>
              );
            })}
          </Stack>
        </DialogContent>
      </Dialog>

      <Dialog
        open={editDialogOpen}
        onClose={handleCloseEdit}
        fullWidth
        maxWidth="sm"
        PaperProps={{
          sx: {
            borderRadius: 3,
            bgcolor: "#ffffff",
          },
        }}
      >
        <DialogTitle
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontWeight: 700,
            color: colors.textPrimary,
            borderBottom: "1px solid rgba(201,168,76,0.2)",
          }}
        >
          ✏️ Edit Review
          <IconButton onClick={handleCloseEdit}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>

        <DialogContent>
          <Box sx={{ pt: 2 }}>
            <Typography sx={{ mb: 1, color: colors.textSecondary }}>
              Your Rating
            </Typography>

            <Rating
              value={editRating}
              onChange={(event, value) => {
                setEditRating(value || 5);
              }}
              sx={{ color: colors.accent, mb: 3 }}
            />

            <TextField
              fullWidth
              multiline
              rows={4}
              value={editComment}
              onChange={(event) => setEditComment(event.target.value)}
              placeholder="Edit your review..."
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: 2,
                  bgcolor: colors.secondary,
                },
              }}
            />
          </Box>
        </DialogContent>

        <DialogActions
          sx={{ p: 2, borderTop: "1px solid rgba(201,168,76,0.2)" }}
        >
          <Button
            onClick={handleCloseEdit}
            disabled={editLoading}
            sx={{ color: colors.textSecondary, textTransform: "none" }}
          >
            Cancel
          </Button>

          <Button
            variant="contained"
            onClick={handleUpdateReview}
            disabled={editLoading}
            sx={{
              bgcolor: colors.primary,
              textTransform: "none",
              fontWeight: 600,
              "&:hover": {
                bgcolor: colors.primaryDark,
              },
            }}
          >
            {editLoading ? (
              <CircularProgress size={22} sx={{ color: "#fff" }} />
            ) : (
              "Save Changes"
            )}
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={deleteDialogOpen}
        onClose={() => !deleteLoading && setDeleteDialogOpen(false)}
        maxWidth="xs"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 3,
            bgcolor: "#ffffff",
          },
        }}
      >
        <DialogTitle sx={{ fontWeight: 700, color: colors.textPrimary }}>
          Delete Review?
        </DialogTitle>

        <DialogContent>
          <Typography color="text.secondary">
            Are you sure you want to delete this review? This action cannot be
            undone.
          </Typography>
        </DialogContent>

        <DialogActions
          sx={{ p: 2, borderTop: "1px solid rgba(201,168,76,0.2)" }}
        >
          <Button
            onClick={() => setDeleteDialogOpen(false)}
            disabled={deleteLoading}
            sx={{ color: colors.textSecondary, textTransform: "none" }}
          >
            Cancel
          </Button>

          <Button
            variant="contained"
            onClick={handleDeleteReview}
            disabled={deleteLoading}
            sx={{
              bgcolor: colors.danger,
              textTransform: "none",
              fontWeight: 600,
              "&:hover": {
                bgcolor: "#b71c1c",
              },
            }}
          >
            {deleteLoading ? (
              <CircularProgress size={22} sx={{ color: "#fff" }} />
            ) : (
              "Delete"
            )}
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() =>
          setSnackbar({
            ...snackbar,
            open: false,
          })
        }
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
      >
        <Alert
          severity={snackbar.severity}
          onClose={() =>
            setSnackbar({
              ...snackbar,
              open: false,
            })
          }
          sx={{
            borderRadius: 2,
            fontWeight: 600,
          }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>

      <Footer />
    </Box>
  );
};

export default Reviewuser;
