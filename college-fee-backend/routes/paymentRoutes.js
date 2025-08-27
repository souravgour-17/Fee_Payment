// backend/routes/paymentRoutes.js
import express from "express";
import Payment from "../models/Payment.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    // 👇 Add this line here
    console.log("📩 Received payment data:", req.body);

    const { studentId, enrollmentNo, name, course, amount, method, status } = req.body;

    if (!studentId || !amount || !method) {
      return res.status(400).json({ message: "❌ Missing required fields" });
    }

    const payment = new Payment({
      studentId,
      enrollmentNo,
      name,
      course,
      amount,
      method,
      status: status || "SUCCESS",
      transactionId: "TXN" + Date.now(),
    });

    await payment.save();
    res.json({ message: "✅ Payment logged successfully", payment });
  } catch (err) {
    console.error("❌ Error logging payment:", err.message);
    res.status(500).json({ message: "❌ Backend rejected the payment log" });
  }
});

export default router;
