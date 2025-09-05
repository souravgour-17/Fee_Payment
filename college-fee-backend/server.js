import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";

import connectDB from "./config/db.js";
import studentRoutes from "./routes/studentRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js";
import authRoutes from "./routes/auth.js";
import { verifyToken } from "./middleware/auth.js";

dotenv.config();
connectDB();

const app = express();

app.use(express.json({ limit: "1mb" }));
app.use(cookieParser());

// ✅ CORS setup for frontend
const allowedOrigins = [
  process.env.FRONTEND_URL, // your deployed frontend
  "http://localhost:5173",   // dev frontend
].filter(Boolean);

app.use(cors({
  origin: (origin, callback) => {
    if (!origin) return callback(null, true); // for postman/curl
    if (allowedOrigins.includes(origin)) return callback(null, true);
    return callback(new Error("CORS not allowed: " + origin), false);
  },
  credentials: true, // ✅ allow cookies
}));

// ✅ Routes
app.use("/api/auth", authRoutes);
app.use("/api/students", verifyToken, studentRoutes);
app.use("/api/payments", verifyToken, paymentRoutes);

// Health check
app.get("/health", (req, res) => res.json({ ok: true }));
app.get("/", (req, res) => res.send("✅ API running"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
