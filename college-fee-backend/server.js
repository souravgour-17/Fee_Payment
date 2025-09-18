import dotenv from "dotenv";
dotenv.config({ path: ".env.local" }); // <-- load env immediately

import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDB from "./config/db.js";
import studentRoutes from "./routes/studentRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js";
import authRoutes from "./routes/auth.js";
import { verifyToken } from "./middleware/auth.js";

// ===== Connect to MongoDB =====
connectDB();

const app = express();

// ===== Middlewares =====
app.use(express.json({ limit: "1mb" }));
app.use(cookieParser());

// ===== CORS =====
const allowedOrigins = [
  process.env.FRONTEND_URL,
  "http://localhost:5173",
].filter(Boolean);

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) return callback(null, true);
      return callback(new Error("CORS not allowed: " + origin), false);
    },
    credentials: true,
  })
);

// ===== Routes =====
app.use("/api/auth", authRoutes);
app.use("/api/students", verifyToken, studentRoutes);
app.use("/api/payments", verifyToken, paymentRoutes);

// ===== Health check =====
app.get("/health", (req, res) => res.json({ ok: true }));
app.get("/", (req, res) => res.send("API running"));

// ===== Start server =====
const PORT = process.env.PORT || 5000;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`EMAIL_USER: ${process.env.EMAIL_USER ? "found ✅" : "missing ❌"}`);
  console.log(`EMAIL_PASS: ${process.env.EMAIL_PASS ? "found ✅" : "missing ❌"}`);
});
