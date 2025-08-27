// backend/routes/payments.js
import express from "express";
import Payment from "../models/Payment.js";

const router = express.Router();

// POST /api/payments (log transaction)
router.post("/", async (req, res) => {
  try {
    const { studentId, enrollmentNo, name, amount, status } = req.body;

    const payment = new Payment({
      studentId,
      enrollmentNo,
      name,
      amount,
      status,
    });

    const saved = await payment.save();
    res.status(201).json(saved);
  } catch (err) {
    console.error("❌ Payment logging failed:", err.message);
    res.status(500).json({ error: "Server error" });
  }
});

export default router;
