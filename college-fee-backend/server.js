// backend/server.js
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import studentRoutes from "./routes/studentRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js"; // ✅ only once

dotenv.config();

// Connect DB
connectDB();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Diagnostic logs
app.use((req, res, next) => {
  console.log(`➡️ ${req.method} ${req.originalUrl}`);
  next();
});

// Routes
app.use("/api/students", studentRoutes);
app.use("/api/payments", paymentRoutes); // ✅ mount here (after app is defined)

// Root
app.get("/", (req, res) => {
  res.send("✅ API is running...");
});

// Port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`🚀 Server running on http://localhost:${PORT}`)
);
