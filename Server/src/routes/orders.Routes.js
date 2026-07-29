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


// ===============================
// User
// ===============================


// Create Order
route.post(
  "/orders",
  protect,
  createOrderController
);


// My Orders
route.get(
  "/my-orders",
  protect,
  getMyOrdersController
);


// Single Order
route.get(
  "/orders/:id",
  protect,
  getSingleOrderController
);



// ===============================
// Admin
// ===============================


// All Orders
route.get(
  "/orders",
  protect,
  adminOnly,
  getAllOrdersController
);



// Accept Order
route.put(
  "/orders/:id/accept",
  protect,
  adminOnly,
  acceptOrderController
);



// Reject Order
route.put(
  "/orders/:id/reject",
  protect,
  adminOnly,
  rejectOrderController
);



export default route;