import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import path from "path";
import { fileURLToPath } from "url";

import authRoutes from "./src/routes/auth.Routes.js";
import userRoutes from "./src/routes/user.Routes.js";
import categoryRoutes from "./src/routes/categories.Routes.js";
import menuRoutes from "./src/routes/menu.Routes.js";
import messagesRoutes from "./src/routes/messages.Routes.js";
import reviewRoutes from "./src/routes/review.routes.js";
import ordersRoutes from "./src/routes/orders.Routes.js";
import cartRoutes from "./src/routes/cart.Routes.js";

import { errorHandler } from "./src/middleware/errorHandler.Middleware.js";

dotenv.config();

const app = express();

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

app.use(
  helmet({
    crossOriginResourcePolicy: {
      policy: "cross-origin",
    },
  }),
);

app.use(
  cors({
    origin: "http://localhost:5173",

    credentials: true,

    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  }),
);

app.use(cookieParser());

app.use(bodyParser.json());

app.use(
  bodyParser.urlencoded({
    extended: true,
  }),
);

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use("/api", authRoutes);

app.use("/api", userRoutes);

app.use("/api", categoryRoutes);

app.use("/api", menuRoutes);

app.use("/api/messages", messagesRoutes);

app.use("/api", reviewRoutes);

app.use("/api", ordersRoutes);

app.use("/api", cartRoutes);

app.use(errorHandler);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`server running on port ${port}`);
});
