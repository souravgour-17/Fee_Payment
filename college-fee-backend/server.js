// server.js
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";

import connectDB from "./config/db.js";
import studentRoutes from "./routes/studentRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js";
import authRoutes from "./routes/auth.js"; // your auth routes
import { verifyToken } from "./middleware/auth.js";

dotenv.config();
connectDB();

const app = express();
app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: " https://souravian-university.netlify.app", //  http://localhost:5173
    credentials: true,
  })
);

app.use("/api/auth", authRoutes);
app.use("/api/students", verifyToken, studentRoutes);
app.use("/api/payments", verifyToken, paymentRoutes);

app.get("/", (req, res) => res.send("✅ API running"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
