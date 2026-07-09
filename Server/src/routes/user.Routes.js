import express from "express";
import { adminOnly } from "../middleware/adminOnly.Middleware.js";
import { protect } from "../middleware/protect.Middleware.js";
import {
  deleteUserController,
  getAllUsersController,
  getUserByEmailController,
  getUserByIdController,
  updateUserInfoController,
  createUserController,
} from "../controller/user.Controller.js";

import { globalRateLimit } from "../middleware/ratelimit.Middleware.js";

const route = express.Router();


route.get(
  "/all-users",
  protect,
  adminOnly,
  getAllUsersController
);

route.get(
  "/user-email/:email",
  protect,
  adminOnly,
  getUserByEmailController
);

route.get(
  "/user-id/:id",
  protect,
  adminOnly,
  getUserByIdController
);

route.post(
  "/user/create",
  protect,
  adminOnly,
  createUserController
);

route.put(
  "/user/update/:id",
  protect,
  adminOnly,
  globalRateLimit,
  updateUserInfoController
);

route.delete(
  "/user/delete/:id",
  protect,
  adminOnly,
  deleteUserController
);

export default route;
