import express from "express";

import { validate } from "../middleware/validate.Middleware.js";
import { protect } from "../middleware/protect.Middleware.js";
import { authRateLimit } from "../middleware/rateLimit.Middleware.js";

import { registerSchema, loginSchema } from "../validation/auth.Validation.js";

import {
  registerController,
  loginController,
  refreshToken,
  me,
  logoutController,
} from "../controller/auth.Controller.js";

const route = express.Router();

route.post("/auth/register", validate(registerSchema), registerController);

route.post(
  "/auth/login",
  validate(loginSchema),
  authRateLimit,
  loginController,
);

route.post("/auth/refresh", refreshToken);

route.post("/auth/logout", protect, logoutController);

route.get("/auth/me", protect, me);

export default route;
