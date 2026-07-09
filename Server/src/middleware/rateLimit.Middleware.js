import rateLimit from "express-rate-limit";

export const globalRateLimit = rateLimit({
  windowMs: 60 * 1000 * 15, 
  limit: 10,
  message: {
    success: false,
    message: "Many reuquests, try again after 15 minutes",
  },
  standardHeaders: true,
  legacyHeaders: false,
  skipSuccessfulRequests: true,
});

export const authRateLimit = rateLimit({
  windowMs: 60 * 1000 * 15, 
  limit: 3,
  message: {
    success: false,
    message: "You haved tried to login many times, try again later.",
  },
  standardHeaders: true,
  legacyHeaders: false,
  skipSuccessfulRequests: true,
});
