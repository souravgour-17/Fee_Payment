import Student from "../models/Student.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";

// Gmail transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// ================= STUDENT CRUD =================

// Get all students
export const getStudents = async (req, res) => {
  try {
    const students = await Student.find();
    res.status(200).json(students);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch students", details: error.message });
  }
};

// Get student by enrollment number
export const getStudentByEnrollment = async (req, res) => {
  try {
    const student = await Student.findOne({ enrollmentNumber: req.params.enrollmentNumber });
    if (!student) return res.status(404).json({ message: "Student not found" });
    res.status(200).json(student);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch student", details: error.message });
  }
};

// Add one student
export const createStudent = async (req, res) => {
  try {
    const student = new Student(req.body);
    const savedStudent = await student.save();
    res.status(201).json(savedStudent);
  } catch (error) {
    res.status(400).json({ message: "Failed to create student", details: error.message });
  }
};

// Add multiple students (bulk insert)
export const createStudentsBulk = async (req, res) => {
  try {
    if (!Array.isArray(req.body)) {
      return res.status(400).json({ message: "Input should be an array of students" });
    }
    const students = await Student.insertMany(req.body);
    res.status(201).json(students);
  } catch (error) {
    res.status(400).json({ message: "Failed to create students", details: error.message });
  }
};

// ================= STUDENT AUTH & OTP =================

// Register student (send OTP)
export const registerStudent = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password)
      return res.status(400).json({ message: "All fields are required" });

    const lowerEmail = email.toLowerCase();
    const existingStudent = await Student.findOne({ email: lowerEmail });
    if (existingStudent) return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const otp = String(Math.floor(100000 + Math.random() * 900000));
    const otpExpiry = new Date(Date.now() + 10 * 60 * 1000);

    const student = new Student({
      name,
      email: lowerEmail,
      password: hashedPassword,
      otp,
      otpExpiry,
      isVerified: false,
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: lowerEmail,
      subject: "Verify your email - College Fee Payment",
      text: `Hello ${name},\n\nYour OTP is ${otp}. It expires in 10 minutes.\n\nThank you!`,
    });

    await student.save();
    res.status(201).json({ message: "OTP sent to your email for verification" });
  } catch (error) {
    res.status(500).json({ message: "Registration failed", details: error.message });
  }
};

// Verify OTP
export const verifyOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;
    if (!email || !otp) {
      return res.status(400).json({ message: "Email and OTP are required" });
    }

    const lowerEmail = email.toLowerCase();
    const student = await Student.findOne({ email: lowerEmail });

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    // Check OTP validity
    if (!student.otp || student.otp !== otp || Date.now() > student.otpExpiry.getTime()) {
      return res.status(400).json({ message: "Invalid or expired OTP" });
    }

    // ✅ Update directly in DB
    await Student.updateOne(
      { email: lowerEmail },
      { $set: { isVerified: true }, $unset: { otp: "", otpExpiry: "" } }
    );

    // Send confirmation email
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: lowerEmail,
      subject: "Registration Successful",
      text: `Hi ${student.name},\n\nYour registration is successful! You can now login.`,
    });

    res.status(200).json({ message: "Email verified successfully. You can now login." });
  } catch (error) {
    console.error("Verify OTP error:", error.message);
    res.status(500).json({ message: "OTP verification failed", details: error.message });
  }
};


// Login student
export const loginStudent = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ message: "Email and password required" });

    const lowerEmail = email.toLowerCase();
    const student = await Student.findOne({ email: lowerEmail });
    if (!student) return res.status(404).json({ message: "Student not found" });
    if (!student.isVerified) return res.status(400).json({ message: "Email not verified" });

    const isMatch = await bcrypt.compare(password, student.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: student._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      maxAge: 3600000,
    });

    res.status(200).json({
      message: "Login successful",
      student: { id: student._id, name: student.name, email: student.email },
    });
  } catch (error) {
    res.status(500).json({ message: "Login failed", details: error.message });
  }
};
