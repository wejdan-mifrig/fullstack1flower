import express from "express";

import {
  markAsRead,
  sendMessage,
  getMessages,
  deleteMessage,
} from "../controller/messages.Controller.js";

import { protect } from "../middleware/protect.Middleware.js";
import { adminOnly } from "../middleware/adminOnly.Middleware.js";
import { globalRateLimit } from "../middleware/rateLimit.Middleware.js";

const router = express.Router();

router.post("/", globalRateLimit, sendMessage);

router.get("/", protect, adminOnly, getMessages);

router.delete("/:id", protect, adminOnly, deleteMessage);
router.patch("/:id/read", protect, adminOnly, markAsRead);
export default router;
