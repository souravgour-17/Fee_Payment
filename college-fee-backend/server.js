import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import session from "express-session";

import connectDB from "./config/db.js";
import studentRoutes from "./routes/studentRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js";
import authRoutes from "./routes/auth.js";
import { verifyToken } from "./middleware/auth.js";

dotenv.config();
connectDB();

const app = express();

// ✅ Middlewares
app.use(express.json({ limit: "1mb" }));
app.use(cookieParser());

// ✅ Session setup
app.use(
  session({
    secret: process.env.SESSION_SECRET || "supersecret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // must be true on HTTPS
      sameSite: "none", // important for cross-site cookies
      maxAge: 1000 * 60 * 60 * 24, // 1 day
    },
  })
);

// ✅ Allowed origins
const allowedOrigins = [
  process.env.FRONTEND_URL,  // e.g. "https://fee-payment-frontend.onrender.com"
  "http://localhost:5173",   // local dev frontend
].filter(Boolean);

// ✅ CORS setup
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true); // allow Postman / curl
      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }
      console.error("❌ Blocked by CORS:", origin);
      return callback(new Error("CORS not allowed: " + origin), false);
    },
    credentials: true, // allow cookies
  })
);

// ✅ Debug incoming requests
app.use((req, res, next) => {
  console.log(
    "👉", req.method, req.url,
    "| Origin:", req.headers.origin || "N/A"
  );
  next();
});

// ✅ Routes
app.use("/api/auth", authRoutes);
app.use("/api/students", verifyToken, studentRoutes);
app.use("/api/payments", verifyToken, paymentRoutes);

// ✅ Health check
app.get("/health", (req, res) => res.json({ ok: true }));
app.get("/", (req, res) => res.send("✅ API running"));

// ✅ Server listen
const PORT = process.env.PORT || 5000;
app.listen(PORT, "0.0.0.0", () =>
  console.log(`🚀 Server running on port ${PORT}`)
);
