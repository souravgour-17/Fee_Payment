import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true, lowercase: true },
  password: { type: String, required: true },
  otp: { type: String, default: null },
  otpExpiry: { type: Date, default: null },
  emailVerified: { type: Boolean, default: false }, // <-- use this consistently
});

export default mongoose.model("User", userSchema);
