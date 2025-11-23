import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { sendMail } from "../utils/sendMail.js"; // ⬅ Resend utility import

let otpStore = {}; // temporary in-memory storage { email: { otp, expiresAt } }

// =============================
// REGISTER — Generate OTP & Send Mail
// =============================
export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existing = await User.findOne({ email });
    if (existing)
      return res.status(400).json({ error: "Email already registered" });

    const hashed = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      password: hashed,
      isVerified: false,
      role: "user",
    });

    await newUser.save();

    // Generate OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    otpStore[email] = {
      otp,
      expiresAt: Date.now() + 10 * 60 * 1000,
    };

    // Send mail via Resend
    await sendMail(
      email,
      "Verify your email",
      `<p>Your OTP is <b>${otp}</b>. It will expire in 10 minutes.</p>`
    );

    res.json({ message: "OTP sent to your email" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

// =============================
// VERIFY OTP
// =============================
export const verifyOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;
    const record = otpStore[email];

    if (!record) return res.status(400).json({ error: "No OTP requested" });
    if (record.expiresAt < Date.now())
      return res.status(400).json({ error: "OTP expired" });
    if (record.otp !== otp)
      return res.status(400).json({ error: "Invalid OTP" });

    await User.findOneAndUpdate({ email }, { isVerified: true });
    delete otpStore[email];

    res.json({ message: "Email verified successfully" });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

// =============================
// LOGIN — JWT Token Send
// =============================
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: "User not found" });

    if (!user.isVerified)
      return res.status(400).json({ error: "Email not verified" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ error: "Invalid credentials" });

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.json({
      message: "Login successful",
      user: {
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};
