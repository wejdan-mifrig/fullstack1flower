import express from "express";
import { adminOnly } from "../middleware/adminOnly.Middleware.js";
import { protect } from "../middleware/protect.Middleware.js";
import {
  createCategoryController,
  getAllCategoriesController,
  getCategoryByIdController,
  updateCategoryController,
  deleteCategoryController,
} from "../controller/categories.Controller.js";
import { validate } from "../middleware/validate.Middleware.js";
import categoriesSchema from "../validation/categories.Validation.js";
import { globalRateLimit } from "../middleware/ratelimit.Middleware.js";

const route = express.Router();


route.get("/all-categories", getAllCategoriesController);


route.get("/category/:id", protect, getCategoryByIdController);


route.post(
  "/category",
  protect,
  // adminOnly,
  validate(categoriesSchema),
  globalRateLimit,
  createCategoryController,
);


route.put(
  "/category/:id",
  protect,
  // adminOnly,
  validate(categoriesSchema),
  globalRateLimit,
  updateCategoryController
);


route.delete(
  "/category/:id",
  protect,
  // adminOnly,
  globalRateLimit,
  deleteCategoryController
);

export default route;
