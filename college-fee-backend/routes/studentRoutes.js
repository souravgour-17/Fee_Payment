import express from "express";
import Student from "../models/Student.js";
import jwt from "jsonwebtoken";

const router = express.Router();

// ===== Middleware =====
const protect = (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) return res.status(401).json({ message: "No token" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ message: "Invalid token" });
  }
};

const adminOnly = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Admin access required" });
  }
  next();
};

// ===== ADMIN FEATURES FIRST =====

// SEARCH students by name or enrollment (admin only)
router.get("/search/:query", protect, adminOnly, async (req, res) => {
  try {
    const query = req.params.query;
    const students = await Student.find({
      $or: [
        { name: { $regex: query, $options: "i" } },
        { enrollment: { $regex: query, $options: "i" } },
      ],
    });
    res.json(students);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// BULK DELETE students (admin only)
router.post("/bulk-delete", protect, adminOnly, async (req, res) => {
  try {
    const { enrollments } = req.body;
    if (!enrollments || !Array.isArray(enrollments))
      return res.status(400).json({ error: "Provide array of enrollments" });

    const result = await Student.deleteMany({ enrollment: { $in: enrollments } });
    res.json({ message: `${result.deletedCount} students deleted successfully` });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ===== MAIN ROUTES =====

// GET all students (any logged-in user)
router.get("/", protect, async (req, res) => {
  try {
    const students = await Student.find();
    res.json(students);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET student by enrollment (any logged-in user)
router.get("/:enrollment", protect, async (req, res) => {
  try {
    const student = await Student.findOne({ enrollment: req.params.enrollment });
    if (!student) return res.status(404).json({ message: "Student not found" });
    res.json(student);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// CREATE student (admin only)
router.post("/", protect, adminOnly, async (req, res) => {
  try {
    const { enrollment, name, course, year, feesDue, upiid } = req.body;

    // Field validation
    if (!enrollment || !name || !course || !year || !feesDue || !upiid) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // Prevent duplicate enrollment
    const existing = await Student.findOne({ enrollment });
    if (existing) {
      return res.status(400).json({ error: "Enrollment already exists" });
    }

    const newStudent = new Student({
      enrollment,
      name,
      course,
      year,
      feesDue,
      upiid,
    });

    await newStudent.save();
    res.status(201).json({ message: "Student added successfully", newStudent });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// UPDATE student by enrollment (admin only)
router.put("/:enrollment", protect, adminOnly, async (req, res) => {
  try {
    const updatedStudent = await Student.findOneAndUpdate(
      { enrollment: req.params.enrollment },
      req.body,
      { new: true }
    );
    if (!updatedStudent) return res.status(404).json({ message: "Student not found" });
    res.json(updatedStudent);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE student by enrollment (admin only)
router.delete("/:enrollment", protect, adminOnly, async (req, res) => {
  try {
    const deletedStudent = await Student.findOneAndDelete({ enrollment: req.params.enrollment });
    if (!deletedStudent) return res.status(404).json({ message: "Student not found" });
    res.json({ message: "Student deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
