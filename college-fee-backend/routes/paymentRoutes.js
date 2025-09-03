import express from "express";
import Payment from "../models/Payment.js";

const router = express.Router();

// GET all payments
router.get("/", async (req, res) => {
  try {
    const payments = await Payment.find().populate("studentId");
    res.json(payments);
  } catch (err) {
    console.error("Error fetching payments:", err.message);
    res.status(500).json({ message: "Error fetching payments" });
  }
});

// POST payment
router.post("/", async (req, res) => {
  try {
    const { studentId, amount, method, status } = req.body;
    if (!studentId || !amount || !method)
      return res.status(400).json({ message: "Missing fields" });

    const payment = new Payment({
      studentId,
      amount,
      method,
      status: status || "Success",
      transactionId: "TXN" + Date.now(),
    });

    await payment.save();
    res.json({ message: "Payment saved", payment });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error logging payment" });
  }
});

export default router;
