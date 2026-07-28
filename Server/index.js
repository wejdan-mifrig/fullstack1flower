import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import path from "path";
import { fileURLToPath } from "url";


// ================= Routes =================

import authRoutes from "./src/routes/auth.Routes.js";
import userRoutes from "./src/routes/user.Routes.js";
import categoryRoutes from "./src/routes/categories.Routes.js";
import menuRoutes from "./src/routes/menu.Routes.js";
import messagesRoutes from "./src/routes/messages.Routes.js";
import reviewRoutes from "./src/routes/review.routes.js";
import ordersRoutes from "./src/routes/orders.Routes.js";
import cartRoutes from "./src/routes/cart.Routes.js";


// ================= Middleware =================

import { errorHandler } from "./src/middleware/errorHandler.Middleware.js";



dotenv.config();



const app = express();



// ==========================================
// ES Modules Paths
// ==========================================

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);




// ==========================================
// Security
// ==========================================


app.use(
  helmet({
    crossOriginResourcePolicy: {
      policy: "cross-origin",
    },
  })
);




// ==========================================
// CORS
// ==========================================


app.use(
  cors({
    origin: "http://localhost:5173",

    credentials: true,

    methods:[
      "GET",
      "POST",
      "PUT",
      "PATCH",
      "DELETE"
    ],

  })
);




// ==========================================
// Body Parser
// ==========================================


app.use(cookieParser());


app.use(
  bodyParser.json()
);


app.use(
  bodyParser.urlencoded({
    extended:true
  })
);




// ==========================================
// Static Files
// ==========================================


app.use(
  "/uploads",
  express.static(
    path.join(__dirname,"uploads")
  )
);




// ==========================================
// API Routes
// ==========================================


app.use(
  "/api",
  authRoutes
);



app.use(
  "/api",
  userRoutes
);



app.use(
  "/api",
  categoryRoutes
);



app.use(
  "/api",
  menuRoutes
);



app.use(
  "/api/messages",
  messagesRoutes
);



app.use(
  "/api",
  reviewRoutes
);



// Orders

app.use(
  "/api",
  ordersRoutes
);



// Cart

app.use(
  "/api",
  cartRoutes
);




// ==========================================
// Error Handler
// ==========================================


app.use(
  errorHandler
);




// ==========================================
// Server
// ==========================================


const port = process.env.PORT || 3000;



app.listen(
  port,
  ()=>{
    console.log(
      `server running on port ${port}`
    );
  }
);