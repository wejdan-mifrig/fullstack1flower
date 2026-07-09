import express from "express";
import { validate } from "../middleware/validate.Middleware.js";
import { registerSchema, loginSchema } from "../validation/auth.Validation.js";
import {
  loginController,
  me,
  refreshToken,
  registerController,
} from "../controller/auth.Controller.js";
import { authRateLimit } from "../middleware/rateLimit.Middleware.js";
import { protect } from "../middleware/protect.Middleware.js";
const route = express.Router();

route.post("/auth/register", validate(registerSchema), registerController);
route.post(
  "/auth/login",
  validate(loginSchema),
  authRateLimit,
  loginController,
);
route.post("/auth/refresh", refreshToken);
route.get("/auth/me", protect, me);

export default route;
