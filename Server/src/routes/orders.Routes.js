import express from "express";

import {
  createOrderController,
  getAllOrdersController,
  getMyOrdersController,
  getSingleOrderController,
  acceptOrderController,
  rejectOrderController,
} from "../controller/orders.Controller.js";

import { protect } from "../middleware/protect.Middleware.js";
import { adminOnly } from "../middleware/adminOnly.Middleware.js";

const route = express.Router();

route.post("/orders", protect, createOrderController);

route.get("/my-orders", protect, getMyOrdersController);

route.get("/orders/:id", protect, getSingleOrderController);

route.get("/orders", protect, adminOnly, getAllOrdersController);

route.put("/orders/:id/accept", protect, adminOnly, acceptOrderController);

route.put("/orders/:id/reject", protect, adminOnly, rejectOrderController);

export default route;
