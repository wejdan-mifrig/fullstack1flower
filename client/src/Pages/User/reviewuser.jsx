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
} from "@mui/icons-material";

import { keyframes } from "@emotion/react";

import NavbarUser from "../../Components/NavUserAdmin/Navuser.jsx";
import Footer from "../../Components/Footer/Footer.jsx";

import api from "../../api.js";
import { useAuth } from "../../Hooks/useAuth.js";

// ✅ استيراد الفيديو
import reviewVideo from "../../assets/video/rev11.mp4";


// =====================================================
// ANIMATION
// =====================================================

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


// =====================================================
// COLORS - مثل صفحة Contact
// =====================================================

const colors = {
  primary: "#8B0000", // Dark Red - الخلفية الرئيسية
  primaryDark: "#660000",
  primaryLight: "#a52a2a",
  secondary: "#ffffff", // White
  accent: "#c9a84c", // Gold
  accentLight: "#e8d48a",
  textPrimary: "#000000", // Black
  textSecondary: "rgba(0,0,0,0.8)",
  textMuted: "rgba(0,0,0,0.5)",
  textWhite: "#ffffff",
  textWhiteMuted: "rgba(255,255,255,0.7)",
  gold: "#c9a84c",
  goldHover: "#b8943a",
  red: "#8B0000",
  darkRed: "#660000",
  lightRed: "#a52a2a",
  background: "#f5f0e8",
  cardBg: "#ffffff",
  danger: "#d9534f",
};


// =====================================================
// COMPONENT
// =====================================================

const Reviewuser = () => {

  const {
    user,
    authLoading,
  } = useAuth();


  // =====================================================
  // STATES
  // =====================================================

  const [
    reviews,
    setReviews,
  ] = useState([]);


  const [
    newComment,
    setNewComment,
  ] = useState("");


  const [
    newRating,
    setNewRating,
  ] = useState(5);


  const [
    loading,
    setLoading,
  ] = useState(false);


  const [
    fetchingReviews,
    setFetchingReviews,
  ] = useState(true);


  // EDIT STATES

  const [
    editDialogOpen,
    setEditDialogOpen,
  ] = useState(false);


  const [
    selectedReview,
    setSelectedReview,
  ] = useState(null);


  const [
    editComment,
    setEditComment,
  ] = useState("");


  const [
    editRating,
    setEditRating,
  ] = useState(5);


  const [
    editLoading,
    setEditLoading,
  ] = useState(false);


  // DELETE STATES

  const [
    deleteDialogOpen,
    setDeleteDialogOpen,
  ] = useState(false);


  const [
    reviewToDelete,
    setReviewToDelete,
  ] = useState(null);


  const [
    deleteLoading,
    setDeleteLoading,
  ] = useState(false);


  // VIEW FULL REVIEW DIALOG

  const [
    viewDialogOpen,
    setViewDialogOpen,
  ] = useState(false);


  const [
    viewReview,
    setViewReview,
  ] = useState(null);


  // SNACKBAR

  const [
    snackbar,
    setSnackbar,
  ] = useState({
    open: false,
    message: "",
    severity: "success",
  });


  // =====================================================
  // SHOW MESSAGE
  // =====================================================

  const showMessage = (
    message,
    severity = "success"
  ) => {

    setSnackbar({
      open: true,
      message,
      severity,
    });

  };


  // =====================================================
  // FETCH REVIEWS
  // =====================================================

  const fetchReviews = async () => {

    try {

      setFetchingReviews(true);

      const response =
        await api.get(
          "/all-reviews"
        );

      setReviews(
        response.data.reviews || []
      );

    } catch (error) {

      console.error(
        "Fetch reviews error:",
        error
      );

      showMessage(
        error.response?.data?.message ||
        "Failed to load reviews",
        "error"
      );

    } finally {

      setFetchingReviews(false);

    }

  };


  // =====================================================
  // PAGE LOAD
  // =====================================================

  useEffect(() => {

    fetchReviews();

  }, []);


  // =====================================================
  // STATISTICS
  // =====================================================

  const getStats = () => {

    const total =
      reviews.length;


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

      reviews.reduce(
        (
          sum,
          review
        ) =>
          sum +
          Number(
            review.rating
          ),
        0
      ) / total

    ).toFixed(1);


    return {

      total,

      average,

      fiveStar:
        reviews.filter(
          (review) =>
            Number(
              review.rating
            ) === 5
        ).length,

      fourStar:
        reviews.filter(
          (review) =>
            Number(
              review.rating
            ) === 4
        ).length,

      threeStar:
        reviews.filter(
          (review) =>
            Number(
              review.rating
            ) === 3
        ).length,

      twoStar:
        reviews.filter(
          (review) =>
            Number(
              review.rating
            ) === 2
        ).length,

      oneStar:
        reviews.filter(
          (review) =>
            Number(
              review.rating
            ) === 1
        ).length,

    };

  };


  const stats =
    getStats();


  // =====================================================
  // LIKE / UNLIKE
  // =====================================================

  const handleLike = async (
    reviewId
  ) => {

    if (authLoading) {
      return;
    }


    if (!user) {

      showMessage(
        "Please login first",
        "warning"
      );

      return;

    }


    try {


      const review =
        reviews.find(
          (item) =>
            item.id === reviewId
        );


      if (!review) {
        return;
      }


      const method =
        review.liked
          ? "delete"
          : "post";


      await api.request({

        method,

        url:
          `/review/${reviewId}/like`,

      });


      setReviews(
        (
          previousReviews
        ) =>

          previousReviews.map(
            (item) =>

              item.id === reviewId
                ? {

                    ...item,

                    liked:
                      !item.liked,

                    likes_count:
                      item.liked

                        ? Math.max(
                            0,
                            (
                              item.likes_count ||
                              0
                            ) - 1
                          )

                        : (
                            item.likes_count ||
                            0
                          ) + 1,

                  }

                : item

          )

      );

    } catch (error) {

      console.error(
        "Like error:",
        error
      );


      showMessage(

        error.response?.data?.message ||
        "Like action failed",

        "error"

      );

    }

  };


  // =====================================================
  // ADD REVIEW
  // =====================================================

  const handleAddReview = async () => {

    if (!newComment.trim()) {

      showMessage(
        "Please write a comment",
        "warning"
      );

      return;

    }


    if (authLoading) {
      return;
    }


    if (!user) {

      showMessage(
        "Please login first",
        "warning"
      );

      return;

    }


    try {

      setLoading(true);


      await api.post(
        "/review",
        {
          rating: newRating,
          comment:
            newComment.trim(),
        }
      );


      setNewComment("");

      setNewRating(5);


      await fetchReviews();


      showMessage(
        "✨ Your review has been posted! Thank you for your feedback!",
        "success"
      );

    } catch (error) {

      console.error(
        "Create review error:",
        error
      );


      showMessage(

        error.response?.data?.message ||
        "Failed to create review",

        "error"

      );

    } finally {

      setLoading(false);

    }

  };


  // =====================================================
  // OPEN EDIT DIALOG
  // =====================================================

  const handleOpenEdit = (
    review
  ) => {

    setSelectedReview(
      review
    );


    setEditComment(
      review.comment
    );


    setEditRating(
      Number(
        review.rating
      )
    );


    setEditDialogOpen(
      true
    );

  };


  // =====================================================
  // CLOSE EDIT DIALOG
  // =====================================================

  const handleCloseEdit = () => {

    if (editLoading) {
      return;
    }


    setEditDialogOpen(
      false
    );


    setSelectedReview(
      null
    );


    setEditComment(
      ""
    );


    setEditRating(
      5
    );

  };


  // =====================================================
  // UPDATE REVIEW
  // =====================================================

  const handleUpdateReview = async () => {

    if (!editComment.trim()) {

      showMessage(
        "Please write a comment",
        "warning"
      );

      return;

    }


    if (!selectedReview) {
      return;
    }


    try {

      setEditLoading(
        true
      );


      const response =
        await api.put(

          `/review/${selectedReview.id}`,

          {
            rating: editRating,

            comment:
              editComment.trim(),
          }

        );


      const updatedReview =
        response.data.review;


      setReviews(

        (previousReviews) =>

          previousReviews.map(

            (review) =>

              review.id ===
              selectedReview.id

                ? {
                    ...review,

                    rating:
                      updatedReview?.rating ||
                      editRating,

                    comment:
                      updatedReview?.comment ||
                      editComment.trim(),

                  }

                : review

          )

      );


      handleCloseEdit();


      showMessage(
        "✅ Review updated successfully",
        "success"
      );


    } catch (error) {

      console.error(
        "Update review error:",
        error
      );


      showMessage(

        error.response?.data?.message ||
        "Failed to update review",

        "error"

      );

    } finally {

      setEditLoading(
        false
      );

    }

  };


  // =====================================================
  // OPEN DELETE DIALOG
  // =====================================================

  const handleOpenDelete = (
    review
  ) => {

    setReviewToDelete(
      review
    );


    setDeleteDialogOpen(
      true
    );

  };


  // =====================================================
  // DELETE REVIEW
  // =====================================================

  const handleDeleteReview = async () => {

    if (!reviewToDelete) {
      return;
    }


    try {

      setDeleteLoading(
        true
      );


      await api.delete(

        `/review/${reviewToDelete.id}`

      );


      setReviews(

        (previousReviews) =>

          previousReviews.filter(

            (review) =>

              review.id !==
              reviewToDelete.id

          )

      );


      setDeleteDialogOpen(
        false
      );


      setReviewToDelete(
        null
      );


      showMessage(
        "🗑️ Review deleted successfully",
        "success"
      );


    } catch (error) {

      console.error(
        "Delete review error:",
        error
      );


      showMessage(

        error.response?.data?.message ||
        "Failed to delete review",

        "error"

      );

    } finally {

      setDeleteLoading(
        false
      );

    }

  };


  // =====================================================
  // OPEN VIEW FULL REVIEW
  // =====================================================

  const handleOpenView = (
    review
  ) => {

    setViewReview(
      review
    );

    setViewDialogOpen(
      true
    );

  };


  // =====================================================
  // CLOSE VIEW FULL REVIEW
  // =====================================================

  const handleCloseView = () => {

    setViewDialogOpen(
      false
    );

    setViewReview(
      null
    );

  };


  // =====================================================
  // RENDER
  // =====================================================

  return (

    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: colors.primary,
      }}
    >

      <NavbarUser />

      {/* ============================================
          HERO SECTION - مع فيديو خلفية rev11
          ============================================ */}

      <Box
        sx={{
          position: "relative",
          width: "100%",
          height: "100vh",
          overflow: "hidden",
        }}
      >

        {/* ✅ فيديو الخلفية */}
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

        {/* طبقة تعتيم حمراء خفيفة فوق الفيديو */}
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "rgba(139,0,0,0.5)",
            zIndex: 1,
          }}
        />

        {/* المحتوى فوق الفيديو */}
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

          <Box sx={{ mt: { xs: 10, md: 12 } }}>

            <Typography
              sx={{
                color: colors.gold,
                fontWeight: 700,
                letterSpacing: 4,
                fontSize: ".8rem",
                textShadow: "0 2px 20px rgba(0,0,0,0.5)",
              }}
            >
              💬 YOUR VOICE MATTERS
            </Typography>

            <Typography
              variant="h2"
              sx={{
                mt: 2,

                fontFamily:
                  "'Cormorant Garamond', serif",

                fontWeight: 700,

                color:
                  colors.textWhite,

                fontSize: {
                  xs: "2.5rem",
                  md: "4rem",
                },

                textShadow: "0 2px 30px rgba(0,0,0,0.5)",
              }}
            >
              We Value Your Feedback
            </Typography>

            <Typography
              sx={{
                mt: 2,
                color:
                  colors.textWhiteMuted,
                maxWidth: 600,
                mx: "auto",
                textShadow: "0 2px 20px rgba(0,0,0,0.3)",
                fontSize: { xs: "0.9rem", md: "1.1rem" },
              }}
            >
              Your opinions help us grow and improve. Share your experience with us 
              and help us create even better floral experiences for you.
            </Typography>

            {/* رسائل تشجيعية */}
            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "center",
                gap: 2,
                mt: 4,
              }}
            >
              <Chip
                icon={<EmojiEmotionsIcon />}
                label="Your opinion matters to us"
                sx={{
                  backgroundColor: colors.gold,
                  color: "#fff",
                  fontWeight: 600,
                  borderRadius: 3,
                  px: 1,
                }}
              />
              <Chip
                icon={<FeedbackIcon />}
                label="Help us improve"
                sx={{
                  backgroundColor: "#1a1a1a",
                  color: "#fff",
                  fontWeight: 600,
                  borderRadius: 3,
                  px: 1,
                }}
              />
              <Chip
                icon={<StarIcon />}
                label="Share your experience"
                sx={{
                  backgroundColor: "#1a1a1a",
                  color: "#fff",
                  fontWeight: 600,
                  borderRadius: 3,
                  px: 1,
                }}
              />
            </Box>

            {/* خط فاصل تحت العنوان */}
            <Box
              sx={{
                width: 80,
                height: "3px",
                background: `linear-gradient(90deg, ${colors.gold}, ${colors.goldHover})`,
                mx: "auto",
                mt: 4,
                borderRadius: "3px",
              }}
            />

            <Typography
              sx={{
                mt: 2,
                color: colors.textWhiteMuted,
                fontStyle: "italic",
                fontSize: "0.9rem",
                textShadow: "0 2px 20px rgba(0,0,0,0.3)",
              }}
            >
              "Your feedback is the key to our growth and excellence." 🌸
            </Typography>

          </Box>

        </Box>

      </Box>


      {/* ============================================
          MAIN CONTENT - خلفية حمراء
          ============================================ */}

      <Container
        maxWidth="lg"
        sx={{
          pt: 8,
          pb: 8,
        }}
      >


        {/* ============================================
            STATISTICS - خلفية بيضاء
        ============================================ */}

        <Paper
          sx={{
            p: {
              xs: 2,
              md: 4,
            },

            mb: 6,

            borderRadius: 4,

            bgcolor: "#ffffff",

            boxShadow:
              "0 10px 40px rgba(0,0,0,0.15)",

            animation:
              `${fadeInUp} .6s ease`,
          }}
        >

          <Box
            sx={{
              display: "flex",

              flexDirection: {
                xs: "column",
                md: "row",
              },

              alignItems: "center",

              gap: 5,
            }}
          >

            <Box
              sx={{
                minWidth: 180,
                textAlign: "center",
              }}
            >

              <Typography
                sx={{
                  fontSize: "4rem",
                  fontWeight: 800,
                  color: colors.gold,
                }}
              >
                {stats.average}
              </Typography>


              <Rating
                value={
                  Number(
                    stats.average
                  )
                }
                precision={0.5}
                readOnly
                sx={{
                  color:
                    colors.gold,
                }}
              />


              <Typography
                variant="body2"
                sx={{
                  mt: 1,
                  color:
                    colors.textMuted,
                }}
              >
                Based on {stats.total} reviews
              </Typography>

            </Box>


            <Box
              sx={{
                flex: 1,
                width: "100%",
              }}
            >

              {[

                {
                  stars: 5,
                  count:
                    stats.fiveStar,
                },

                {
                  stars: 4,
                  count:
                    stats.fourStar,
                },

                {
                  stars: 3,
                  count:
                    stats.threeStar,
                },

                {
                  stars: 2,
                  count:
                    stats.twoStar,
                },

                {
                  stars: 1,
                  count:
                    stats.oneStar,
                },

              ].map(
                ({
                  stars,
                  count,
                }) => (

                  <Box
                    key={stars}
                    sx={{
                      display:
                        "flex",

                      alignItems:
                        "center",

                      gap: 1,

                      mb: 1,
                    }}
                  >

                    <Typography
                      sx={{
                        width: 20,
                        color:
                          colors.textMuted,
                      }}
                    >
                      {stars}
                    </Typography>


                    <StarIcon
                      sx={{
                        fontSize: 16,
                        color:
                          colors.gold,
                      }}
                    />


                    <Box
                      sx={{
                        flex: 1,
                        height: 7,
                        bgcolor:
                          "#e5e5e5",
                        borderRadius: 10,
                        overflow:
                          "hidden",
                      }}
                    >

                      <Box
                        sx={{
                          width:
                            stats.total > 0

                              ? `${
                                  (
                                    count /
                                    stats.total
                                  ) *
                                  100
                                }%`

                              : "0%",

                          height: "100%",

                          bgcolor:
                            colors.gold,

                          borderRadius:
                            10,

                          transition:
                            "width .5s ease",
                        }}
                      />

                    </Box>


                    <Typography
                      sx={{
                        width: 30,
                        color:
                          colors.textMuted,
                      }}
                    >
                      {count}
                    </Typography>

                  </Box>

                )

              )}

            </Box>

          </Box>

        </Paper>


        {/* ============================================
            ADD REVIEW - خلفية بيضاء
        ============================================ */}

        <Paper
          sx={{
            p: {
              xs: 2,
              md: 4,
            },

            mb: 7,

            borderRadius: 4,

            bgcolor: "#ffffff",

            boxShadow:
              "0 10px 40px rgba(0,0,0,0.15)",

            border: `2px solid ${colors.gold}30`,
          }}
        >

          <Typography
            variant="h5"
            sx={{
              mb: 1,
              fontWeight: 700,
              color:
                colors.textPrimary,
            }}
          >
            Share Your Experience
          </Typography>

          <Typography
            sx={{
              mb: 3,
              color: colors.textMuted,
              fontSize: "0.9rem",
            }}
          >
            We value your opinion! Let us know about your experience with us.
          </Typography>


          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 2,
              mb: 3,
            }}
          >

            <Typography
              sx={{
                color:
                  colors.textMuted,
              }}
            >
              Rating
            </Typography>


            <Rating
              value={newRating}
              onChange={(
                event,
                value
              ) => {

                setNewRating(
                  value || 5
                );

              }}
              sx={{
                color:
                  colors.gold,
              }}
            />

          </Box>


          <Box
            sx={{
              display: "flex",
              gap: 2,

              flexDirection: {
                xs: "column",
                md: "row",
              },
            }}
          >

            <TextField
              fullWidth
              multiline
              rows={3}
              placeholder="Write your review here... Your feedback helps us improve!"
              value={newComment}
              onChange={(
                event
              ) =>

                setNewComment(
                  event.target.value
                )

              }
              sx={{
                "& .MuiOutlinedInput-root":
                  {
                    borderRadius: 3,
                    bgcolor: "#f5f5f5",
                  },
              }}
            />


            <Button
              variant="contained"
              onClick={
                handleAddReview
              }
              disabled={
                loading ||
                authLoading
              }
              sx={{
                minWidth: {
                  xs: "100%",
                  md: 100,
                },

                borderRadius: 3,

                bgcolor:
                  colors.gold,

                "&:hover": {
                  bgcolor:
                    colors.goldHover,
                },
              }}
            >

              {loading ? (

                <CircularProgress
                  size={24}
                  sx={{
                    color: "#fff",
                  }}
                />

              ) : (

                <SendIcon />

              )}

            </Button>

          </Box>

        </Paper>


        {/* ============================================
            REVIEWS GRID
        ============================================ */}

        {fetchingReviews ? (

          <Box
            sx={{
              display: "flex",
              justifyContent:
                "center",
              py: 10,
            }}
          >

            <CircularProgress
              sx={{
                color:
                  colors.gold,
              }}
            />

          </Box>

        ) : reviews.length === 0 ? (

          <Paper
            sx={{
              p: 6,
              textAlign: "center",
              borderRadius: 4,
              bgcolor: "#ffffff",
            }}
          >

            <Typography
              color="text.secondary"
            >
              No reviews yet. Be the first to share your experience!
            </Typography>

          </Paper>

        ) : (

          <Box
            sx={{
              display: "grid",

              gridTemplateColumns: {
                xs: "1fr",
                sm: "repeat(2, 1fr)",
                md: "repeat(3, 1fr)",
              },

              gap: 3,
            }}
          >

            {reviews.map(
              (
                review,
                index
              ) => {

                const isOwner =
                  user &&
                  Number(
                    user.id
                  ) ===
                  Number(
                    review.user_id
                  );

                // ✅ التحقق من طول التعليق (أكثر من 15 حرف)
                const isLongComment =
                  review.comment?.length > 15;

                // ✅ عرض أول 15 حرف فقط + ...
                const displayComment =
                  isLongComment
                    ? review.comment?.slice(0, 15) + "..."
                    : review.comment;

                return (

                  <Card
                    key={
                      review.id
                    }

                    sx={{
                      position:
                        "relative",

                      minHeight:
                        360,

                      display:
                        "flex",

                      flexDirection:
                        "column",

                      borderRadius:
                        4,

                      overflow:
                        "hidden",

                      bgcolor: "#ffffff",

                      boxShadow:
                        "0 10px 30px rgba(0,0,0,.12)",

                      animation:
                        `${fadeInUp} .5s ease forwards`,

                      animationDelay:
                        `${index * .05}s`,

                      opacity: 0,

                      transition:
                        "all .3s ease",

                      "&:hover":
                        {
                          transform:
                            "translateY(-8px)",

                          boxShadow:
                            "0 20px 45px rgba(0,0,0,.2)",
                        },
                    }}
                  >

                    {/* TOP */}

                    <Box
                      sx={{
                        p: 3,

                        display:
                          "flex",

                        alignItems:
                          "center",

                        gap: 2,

                        bgcolor:
                          "#faf8f4",
                      }}
                    >

                      <Avatar
                        sx={{
                          width: 58,
                          height: 58,

                          bgcolor:
                            colors.gold,

                          fontSize:
                            "1.3rem",

                          fontWeight:
                            700,
                          color: "#fff",
                        }}
                      >

                        {review.user_name
                          ?.charAt(
                            0
                          )
                          .toUpperCase()}

                      </Avatar>


                      <Box
                        sx={{
                          flex: 1,
                        }}
                      >

                        <Typography
                          sx={{
                            fontWeight:
                              700,

                            color:
                              colors.textPrimary,
                          }}
                        >
                          {
                            review.user_name
                          }
                        </Typography>


                        <Typography
                          variant="caption"
                          sx={{
                            color:
                              colors.textMuted,
                          }}
                        >
                          {new Date(
                            review.created_at
                          ).toLocaleDateString(
                            "en-US",
                            {
                              month:
                                "short",

                              day:
                                "numeric",

                              year:
                                "numeric",
                            }
                          )}
                        </Typography>

                      </Box>

                    </Box>


                    {/* RATING */}

                    <Box
                      sx={{
                        px: 3,
                        pt: 2,
                      }}
                    >

                      <Rating
                        value={
                          Number(
                            review.rating
                          )
                        }
                        readOnly
                        size="small"
                        sx={{
                          color:
                            colors.gold,
                        }}
                      />

                    </Box>


                    {/* COMMENT - مع See More */}

                    <CardContent
                      sx={{
                        flex: 1,
                        px: 3,
                        py: 2,
                      }}
                    >

                      <Typography
                        sx={{
                          color:
                            colors.textSecondary,

                          lineHeight:
                            1.8,

                          fontSize:
                            ".95rem",
                        }}
                      >
                        {displayComment}
                      </Typography>

                      {/* ✅ زر See More - يفتح Dialog */}
                      {isLongComment && (
                        <Button
                          size="small"
                          onClick={() => handleOpenView(review)}
                          sx={{
                            mt: 1,
                            color: colors.gold,
                            fontWeight: 600,
                            textTransform: "none",
                            "&:hover": {
                              backgroundColor: "transparent",
                              color: colors.goldHover,
                            },
                          }}
                          startIcon={<ExpandMoreIcon />}
                        >
                          See More
                        </Button>
                      )}

                    </CardContent>


                    {/* ACTIONS */}

                    <Box
                      sx={{
                        p: 2,

                        display:
                          "flex",

                        justifyContent:
                          "space-between",

                        alignItems:
                          "center",

                        borderTop:
                          "1px solid #eee",
                      }}
                    >

                      {/* LIKE */}

                      <Button
                        size="small"
                        onClick={() =>
                          handleLike(
                            review.id
                          )
                        }
                        startIcon={
                          review.liked ? (

                            <FavoriteIcon
                              sx={{
                                color:
                                  "#e74c3c",
                              }}
                            />

                          ) : (

                            <FavoriteBorderIcon
                              sx={{
                                color:
                                  colors.textMuted,
                              }}
                            />

                          )
                        }
                        sx={{
                          color:
                            colors.textMuted,
                          textTransform:
                            "none",
                        }}
                      >
                        {review.likes_count || 0}
                      </Button>


                      {/* OWNER ACTIONS */}

                      {isOwner && (

                        <Box
                          sx={{
                            display:
                              "flex",

                            gap: 1,
                          }}
                        >

                          <Button
                            size="small"
                            startIcon={
                              <EditIcon />
                            }
                            onClick={() =>
                              handleOpenEdit(
                                review
                              )
                            }
                            sx={{
                              color:
                                colors.gold,

                              textTransform:
                                "none",
                            }}
                          >
                            Edit
                          </Button>


                          <Button
                            size="small"
                            startIcon={
                              <DeleteIcon />
                            }
                            onClick={() =>
                              handleOpenDelete(
                                review
                              )
                            }
                            sx={{
                              color:
                                colors.danger,

                              textTransform:
                                "none",
                            }}
                          >
                            Delete
                          </Button>

                        </Box>

                      )}

                    </Box>

                  </Card>

                );

              }

            )}

          </Box>

        )}


        <Box
          sx={{
            textAlign:
              "center",

            mt: 5,
          }}
        >

          <Typography
            variant="caption"
            sx={{
              color:
                colors.textWhiteMuted,
            }}
          >
            Showing {reviews.length} reviews
          </Typography>

        </Box>

      </Container>


      {/* ============================================
          VIEW FULL REVIEW DIALOG
      ============================================ */}

      <Dialog
        open={viewDialogOpen}
        onClose={handleCloseView}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 4,
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
                bgcolor: "#faf8f4",
                borderBottom: "1px solid #eee",
              }}
            >

              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 2,
                }}
              >

                <Avatar
                  sx={{
                    width: 56,
                    height: 56,
                    bgcolor: colors.gold,
                    fontWeight: 700,
                    fontSize: "1.5rem",
                    color: "#fff",
                  }}
                >
                  {viewReview.user_name?.charAt(0)?.toUpperCase()}
                </Avatar>

                <Box>
                  <Typography sx={{ fontWeight: 700, color: colors.textPrimary, fontSize: "1.1rem" }}>
                    {viewReview.user_name}
                  </Typography>

                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                      mt: 0.5,
                    }}
                  >
                    <Rating
                      value={Number(viewReview.rating)}
                      readOnly
                      size="small"
                      sx={{ color: colors.gold }}
                    />
                    <Typography sx={{ fontSize: "0.8rem", color: colors.textMuted }}>
                      {viewReview.rating}/5
                    </Typography>
                  </Box>
                </Box>

              </Box>

              <IconButton
                onClick={handleCloseView}
                sx={{ color: colors.textMuted }}
              >
                <CloseIcon />
              </IconButton>

            </Box>


            <DialogContent sx={{ p: 3 }}>

              <Typography
                sx={{
                  color: colors.textSecondary,
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
                  color: colors.textMuted,
                }}
              >
                {new Date(viewReview.created_at).toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </Typography>

            </DialogContent>


            <DialogActions sx={{ p: 2, borderTop: "1px solid #eee" }}>

              <Button
                onClick={handleCloseView}
                sx={{
                  color: colors.gold,
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


      {/* ============================================
          EDIT DIALOG
      ============================================ */}

      <Dialog
        open={
          editDialogOpen
        }
        onClose={
          handleCloseEdit
        }
        fullWidth
        maxWidth="sm"
        PaperProps={{
          sx: {
            borderRadius: 4,
            bgcolor: "#ffffff",
          },
        }}
      >

        <DialogTitle
          sx={{
            display:
              "flex",

            justifyContent:
              "space-between",

            alignItems:
              "center",

            fontWeight:
              700,

            color: colors.textPrimary,
          }}
        >

          ✏️ Edit Your Review


          <IconButton
            onClick={
              handleCloseEdit
            }
          >

            <CloseIcon />

          </IconButton>

        </DialogTitle>


        <DialogContent>

          <Box
            sx={{
              pt: 1,
            }}
          >

            <Typography
              sx={{
                mb: 1,
                color:
                  colors.textSecondary,
              }}
            >
              Your Rating
            </Typography>


            <Rating
              value={
                editRating
              }
              onChange={(
                event,
                value
              ) => {

                setEditRating(
                  value || 5
                );

              }}
              sx={{
                color:
                  colors.gold,

                mb: 3,
              }}
            />


            <TextField
              fullWidth
              multiline
              rows={4}
              value={
                editComment
              }
              onChange={(
                event
              ) =>

                setEditComment(
                  event.target.value
                )

              }
              placeholder="Edit your review..."
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: 2,
                  bgcolor: "#f5f5f5",
                },
              }}
            />

          </Box>

        </DialogContent>


        <DialogActions
          sx={{
            p: 2,
          }}
        >

          <Button
            onClick={
              handleCloseEdit
            }
            disabled={
              editLoading
            }
            sx={{ color: colors.textMuted }}
          >
            Cancel
          </Button>


          <Button
            variant="contained"
            onClick={
              handleUpdateReview
            }
            disabled={
              editLoading
            }
            sx={{
              bgcolor:
                colors.gold,

              "&:hover": {
                bgcolor:
                  colors.goldHover,
              },
            }}
          >

            {editLoading ? (

              <CircularProgress
                size={22}
                sx={{
                  color:
                    "#fff",
                }}
              />

            ) : (

              "Save Changes"

            )}

          </Button>

        </DialogActions>

      </Dialog>


      {/* ============================================
          DELETE DIALOG
      ============================================ */}

      <Dialog
        open={
          deleteDialogOpen
        }
        onClose={() =>
          !deleteLoading &&
          setDeleteDialogOpen(
            false
          )
        }
        maxWidth="xs"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 4,
            bgcolor: "#ffffff",
          },
        }}
      >

        <DialogTitle
          sx={{
            fontWeight:
              700,

            color: colors.textPrimary,
          }}
        >
          Delete Review?
        </DialogTitle>


        <DialogContent>

          <Typography
            color="text.secondary"
          >
            Are you sure you want to delete this review? This action cannot be undone.
          </Typography>

        </DialogContent>


        <DialogActions
          sx={{
            p: 2,
          }}
        >

          <Button
            onClick={() =>
              setDeleteDialogOpen(
                false
              )
            }
            disabled={
              deleteLoading
            }
            sx={{ color: colors.textMuted }}
          >
            Cancel
          </Button>


          <Button
            variant="contained"
            onClick={
              handleDeleteReview
            }
            disabled={
              deleteLoading
            }
            sx={{
              bgcolor:
                colors.danger,

              "&:hover": {
                bgcolor:
                  "#b52b27",
              },
            }}
          >

            {deleteLoading ? (

              <CircularProgress
                size={22}
                sx={{
                  color:
                    "#fff",
                }}
              />

            ) : (

              "Delete"

            )}

          </Button>

        </DialogActions>

      </Dialog>


      {/* ============================================
          SNACKBAR
      ============================================ */}

      <Snackbar
        open={
          snackbar.open
        }
        autoHideDuration={
          3000
        }
        onClose={() =>
          setSnackbar({
            ...snackbar,
            open: false,
          })
        }
        anchorOrigin={{
          vertical:
            "bottom",

          horizontal:
            "center",
        }}
      >

        <Alert
          severity={
            snackbar.severity
          }
          onClose={() =>
            setSnackbar({
              ...snackbar,
              open: false,
            })
          }
          sx={{
            borderRadius: 3,
            fontWeight: 600,
          }}
        >

          {
            snackbar.message
          }

        </Alert>

      </Snackbar>


      <Footer />

    </Box>

  );

};


export default Reviewuser;