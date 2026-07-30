import express from "express";

import {
  addToCartController,
  getMyCartController,
  removeCartItemController,
  clearCartController,
  updateCartItemQuantityController,
} from "../controller/cart.Controller.js";

import { protect } from "../middleware/protect.Middleware.js";

const route = express.Router();

route.post("/cart", protect, addToCartController);

route.get("/cart", protect, getMyCartController);

route.put("/cart/:id", protect, updateCartItemQuantityController);

route.delete("/cart/:id", protect, removeCartItemController);

route.delete("/cart", protect, clearCartController);

export default route;
