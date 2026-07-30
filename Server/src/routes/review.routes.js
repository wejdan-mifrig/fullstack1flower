import express from "express";

import {
  createReview,
  getAllReviews,
  getReviewById,
  updateReview,
  deleteReview,
  adminDeleteReview,
  likeReview,
  unlikeReview,
} from "../controller/review.Controller.js";

import { protect } from "../middleware/protect.Middleware.js";
import { adminOnly } from "../middleware/adminOnly.Middleware.js";

const router = express.Router();

router.get("/all-reviews", getAllReviews);

router.get("/review/:id", getReviewById);

router.post("/review", protect, createReview);

router.put("/review/:id", protect, updateReview);

router.delete("/review/:id", protect, deleteReview);

router.post("/review/:id/like", protect, likeReview);

router.delete("/review/:id/like", protect, unlikeReview);

router.delete("/admin/review/:id", protect, adminOnly, adminDeleteReview);

export default router;
