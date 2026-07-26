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

// ================= PUBLIC =================

router.get(
    "/all-reviews",
    getAllReviews
);

router.get(
    "/review/:id",
    getReviewById
);

// ================= USER =================

// Create review
router.post(
    "/review",
    protect,
    createReview
);

// User updates ONLY his own review
router.put(
    "/review/:id",
    protect,
    updateReview
);

// User deletes ONLY his own review
router.delete(
    "/review/:id",
    protect,
    deleteReview
);

// Like
router.post(
    "/review/:id/like",
    protect,
    likeReview
);

// Unlike
router.delete(
    "/review/:id/like",
    protect,
    unlikeReview
);

// ================= ADMIN =================

// Admin deletes ANY review
router.delete(
    "/admin/review/:id",
    protect,
    adminOnly,
    adminDeleteReview
);

export default router;