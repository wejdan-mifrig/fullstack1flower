import Review from "../model/review.Model.js";

// ==========================================
// CREATE REVIEW
// ==========================================

const createReview = async (
    req,
    res,
    next
) => {
    try {
        const {
            rating,
            comment,
        } = req.body;

        const userId =
            req.user.id;

        const review =
            await Review.createReview(
                userId,
                rating,
                comment
            );

        res.status(201).json({
            success: true,

            message:
                "Review created successfully",

            review,
        });

    } catch (error) {
        next(error);
    }
};


// ==========================================
// GET ALL REVIEWS
// ==========================================

const getAllReviews = async (
    req,
    res,
    next
) => {
    try {
        const reviews =
            await Review.getAllReviews();

        res.status(200).json({
            success: true,
            reviews,
        });

    } catch (error) {
        next(error);
    }
};


// ==========================================
// GET REVIEW BY ID
// ==========================================

const getReviewById = async (
    req,
    res,
    next
) => {
    try {
        const {
            id,
        } = req.params;

        const review =
            await Review.getReviewById(
                id
            );

        if (!review) {
            return res.status(404).json({
                success: false,

                message:
                    "Review not found",
            });
        }

        res.status(200).json({
            success: true,
            review,
        });

    } catch (error) {
        next(error);
    }
};


// ==========================================
// UPDATE OWN REVIEW
// ==========================================

const updateReview = async (
    req,
    res,
    next
) => {
    try {
        const {
            id,
        } = req.params;

        const {
            rating,
            comment,
        } = req.body;

        const userId =
            req.user.id;

        const review =
            await Review.updateReview(
                id,
                userId,
                rating,
                comment
            );

        if (!review) {
            return res.status(404).json({
                success: false,

                message:
                    "Review not found or you are not the owner",
            });
        }

        res.status(200).json({
            success: true,

            message:
                "Review updated successfully",

            review,
        });

    } catch (error) {
        next(error);
    }
};


// ==========================================
// USER DELETE OWN REVIEW
// ==========================================

const deleteReview = async (
    req,
    res,
    next
) => {
    try {
        const {
            id,
        } = req.params;

        const userId =
            req.user.id;

        const review =
            await Review.deleteReview(
                id,
                userId
            );

        if (!review) {
            return res.status(404).json({
                success: false,

                message:
                    "Review not found or you are not the owner",
            });
        }

        res.status(200).json({
            success: true,

            message:
                "Review deleted successfully",
        });

    } catch (error) {
        next(error);
    }
};


// ==========================================
// ADMIN DELETE ANY REVIEW
// ==========================================

const adminDeleteReview = async (
    req,
    res,
    next
) => {
    try {
        const {
            id,
        } = req.params;

        const review =
            await Review.adminDeleteReview(
                id
            );

        if (!review) {
            return res.status(404).json({
                success: false,

                message:
                    "Review not found",
            });
        }

        res.status(200).json({
            success: true,

            message:
                "Review deleted by admin successfully",
        });

    } catch (error) {
        next(error);
    }
};


// ==========================================
// LIKE REVIEW
// ==========================================

const likeReview = async (
    req,
    res,
    next
) => {
    try {
        const {
            id,
        } = req.params;

        const userId =
            req.user.id;

        const like =
            await Review.likeReview(
                id,
                userId
            );

        res.status(201).json({
            success: true,

            message:
                "Review liked successfully",

            like,
        });

    } catch (error) {

        if (
            error.code ===
            "23505"
        ) {
            return res.status(409).json({
                success: false,

                message:
                    "You already liked this review",
            });
        }

        next(error);
    }
};


// ==========================================
// UNLIKE REVIEW
// ==========================================

const unlikeReview = async (
    req,
    res,
    next
) => {
    try {
        const {
            id,
        } = req.params;

        const userId =
            req.user.id;

        const unlike =
            await Review.unlikeReview(
                id,
                userId
            );

        if (!unlike) {
            return res.status(404).json({
                success: false,

                message:
                    "Like not found",
            });
        }

        res.status(200).json({
            success: true,

            message:
                "Review unliked successfully",
        });

    } catch (error) {
        next(error);
    }
};


// ==========================================
// EXPORT
// ==========================================

export {
    createReview,
    getAllReviews,
    getReviewById,
    updateReview,
    deleteReview,
    adminDeleteReview,
    likeReview,
    unlikeReview,
};