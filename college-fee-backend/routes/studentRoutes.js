import express from "express";
import Student from "../models/Student.js";
import jwt from "jsonwebtoken";

const router = express.Router();

const protect = (req, res, next) => {
  try {
    const token = req.cookies.token; // ✅ use cookie
    if (!token) return res.status(401).json({ message: "No token" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    console.error("JWT verification error:", err.message);
    res.status(401).json({ message: "Invalid token" });
  }
};

// GET all students
router.get("/", protect, async (req, res) => {
  try {
    const students = await Student.find();
    res.json(students);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET student by enrollment
router.get("/:enrollment", protect, async (req, res) => {
  try {
    const student = await Student.findOne({ enrollment: req.params.enrollment });
    if (!student) return res.status(404).json({ message: "Student not found" });
    res.json(student);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
