// backend/models/Payment.js
import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema(
  {
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
      required: true,
    },
    amount: { type: Number, required: true },
    method: {
      type: String,
      enum: ["Credit Card", "Debit Card", "UPI", "NetBanking"],
      required: true,
    },
    status: {
      type: String,
      enum: ["Success", "Failed", "SUCCESS"], // ✅ now allows both
      default: "Success",
    },
    transactionId: { type: String, required: true },
  },
  { timestamps: true }
);

const Payment = mongoose.model("Payment", paymentSchema);
export default Payment;
