import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import User from "../models/User.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

const getTransporter = () => {
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) return null;
  return nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
};

router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) return res.status(400).json({ error: "All fields are required" });

    const lowerEmail = email.trim().toLowerCase();
    const existingUser = await User.findOne({ email: lowerEmail });
    if (existingUser) return res.status(400).json({ error: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const otp = String(Math.floor(100000 + Math.random() * 900000));
    const otpExpiry = new Date(Date.now() + 10 * 60 * 1000);

    const newUser = new User({
      name,
      email: lowerEmail,
      password: hashedPassword,
      otp,
      otpExpiry,
      emailVerified: false,
      role: "student",
    });

    const transporter = getTransporter();
    if (!transporter) return res.status(500).json({ error: "Email service not configured. Cannot register." });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: lowerEmail,
      subject: "Verify your email - College Fee Payment",
      text: `Hello ${name},\n\nYour OTP is ${otp}. It expires in 10 minutes.\n\nThank you!`,
    });

    await newUser.save();
    res.status(201).json({ message: "OTP sent to your email for verification" });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Failed to register user" });
  }
});

router.post("/verify-otp", async (req, res) => {
  try {
    const { email, otp } = req.body;
    if (!email || !otp) return res.status(400).json({ error: "Email and OTP are required" });

    const lowerEmail = email.trim().toLowerCase();
    const user = await User.findOne({ email: lowerEmail });
    if (!user) return res.status(404).json({ error: "User not found" });

    if (!user.otp || user.otp !== otp || Date.now() > user.otpExpiry.getTime()) {
      return res.status(400).json({ error: "Invalid or expired OTP" });
    }

    user.emailVerified = true;
    user.otp = undefined;
    user.otpExpiry = undefined;

    await user.save();

    const transporter = getTransporter();
    if (transporter) {
      try {
        await transporter.sendMail({
          from: process.env.EMAIL_USER,
          to: lowerEmail,
          subject: "Registration Successful",
          text: `Hi ${user.name},\n\nYour registration is successful! You can now login.`,
        });
      } catch (mailErr) {
        console.error(mailErr.message);
      }
    }

    res.json({ message: "Email verified successfully. You can now login." });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Error verifying OTP" });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password, role } = req.body;
    if (!email || !password) return res.status(400).json({ error: "Email and password are required" });

    const lowerEmail = email.trim().toLowerCase();
    const user = await User.findOne({ email: lowerEmail });
    if (!user) return res.status(404).json({ error: "User not found" });

    if (!user.emailVerified) return res.status(400).json({ error: "Please verify your email first" });
    if (role && role !== user.role) return res.status(403).json({ error: "Unauthorized role" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: "Invalid credentials" });

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "1h" });

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      maxAge: 3600000,
    });

    res.json({
      message: "Login successful",
      user: { id: user._id, name: user.name, email: user.email, role: user.role },
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Login failed" });
  }
});

router.post("/logout", (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
  });
  res.json({ message: "Logged out successfully" });
});

router.get("/me", verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) return res.status(404).json({ error: "User not found" });
    res.json({ user });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Failed to fetch user" });
  }
});

export default router;
