import pool from "../config/db.js";

const createReview = async (userId, rating, comment) => {
  const result = await pool.query(
    `
        INSERT INTO reviews (
            user_id,
            rating,
            comment
        )
        VALUES ($1, $2, $3)
        RETURNING *
        `,
    [userId, rating, comment],
  );

  return result.rows[0];
};

const getAllReviews = async () => {
  const result = await pool.query(
    `
        SELECT 
            reviews.id,
            reviews.user_id,
            users.name AS user_name,
            users.email AS user_email,
            reviews.rating,
            reviews.comment,
            reviews.created_at,

            COUNT(review_likes.id)::INTEGER
            AS likes_count

        FROM reviews

        JOIN users
            ON reviews.user_id = users.id

        LEFT JOIN review_likes
            ON reviews.id = review_likes.review_id

        GROUP BY
            reviews.id,
            users.name,
            users.email

        ORDER BY
            reviews.created_at DESC
        `,
  );

  return result.rows;
};

const getReviewById = async (reviewId) => {
  const result = await pool.query(
    `
        SELECT
            reviews.id,
            reviews.user_id,
            users.name AS user_name,
            users.email AS user_email,
            reviews.rating,
            reviews.comment,
            reviews.created_at,

            COUNT(review_likes.id)::INTEGER
            AS likes_count

        FROM reviews

        JOIN users
            ON reviews.user_id = users.id

        LEFT JOIN review_likes
            ON reviews.id = review_likes.review_id

        WHERE reviews.id = $1

        GROUP BY
            reviews.id,
            users.name,
            users.email
        `,
    [reviewId],
  );

  return result.rows[0];
};

const updateReview = async (reviewId, userId, rating, comment) => {
  const result = await pool.query(
    `
        UPDATE reviews

        SET
            rating = $1,
            comment = $2

        WHERE
            id = $3
            AND user_id = $4

        RETURNING *
        `,
    [rating, comment, reviewId, userId],
  );

  return result.rows[0];
};

const deleteReview = async (reviewId, userId) => {
  const result = await pool.query(
    `
        DELETE FROM reviews

        WHERE
            id = $1
            AND user_id = $2

        RETURNING *
        `,
    [reviewId, userId],
  );

  return result.rows[0];
};

const adminDeleteReview = async (reviewId) => {
  const result = await pool.query(
    `
        DELETE FROM reviews

        WHERE id = $1

        RETURNING *
        `,
    [reviewId],
  );

  return result.rows[0];
};

const likeReview = async (reviewId, userId) => {
  const result = await pool.query(
    `
        INSERT INTO review_likes (
            review_id,
            user_id
        )

        VALUES ($1, $2)

        RETURNING *
        `,
    [reviewId, userId],
  );

  return result.rows[0];
};

const unlikeReview = async (reviewId, userId) => {
  const result = await pool.query(
    `
        DELETE FROM review_likes

        WHERE
            review_id = $1
            AND user_id = $2

        RETURNING *
        `,
    [reviewId, userId],
  );

  return result.rows[0];
};

const Review = {
  createReview,
  getAllReviews,
  getReviewById,
  updateReview,
  deleteReview,
  adminDeleteReview,
  likeReview,
  unlikeReview,
};

export default Review;
