import express from "express";
import Student from "../models/Student.js";

const router = express.Router();

// ✅ GET all students
router.get("/", async (req, res) => {
  try {
    const students = await Student.find();
    res.json(students);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ✅ GET students with pending fees
router.get("/pending-fees", async (req, res) => {
  try {
    // Assuming your Student model has a boolean field 'fees_paid'
    const pendingStudents = await Student.find({ fees_paid: false });
    res.json(pendingStudents);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ✅ GET total fees collected per department
router.get("/fees-by-department", async (req, res) => {
  try {
    const feesByDepartment = await Student.aggregate([
      {
        $group: {
          _id: "$department", // Group documents by the 'department' field
          totalFees: { $sum: "$fees_collected" } // Sum the 'fees_collected' field for each group
        }
      }
    ]);
    res.json(feesByDepartment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ✅ GET student by enrollment
router.get("/:enrollment", async (req, res) => {
  try {
    const student = await Student.findOne({ enrollment: req.params.enrollment });
    if (!student) return res.status(404).json({ message: "Student not found" });
    res.json(student);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ✅ CREATE new student
router.post("/", async (req, res) => {
  try {
    const newStudent = new Student(req.body);
    const savedStudent = await newStudent.save();
    res.status(201).json(savedStudent);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// ✅ UPDATE student by enrollment
router.put("/:enrollment", async (req, res) => {
  try {
    const updatedStudent = await Student.findOneAndUpdate(
      { enrollment: req.params.enrollment },
      req.body,
      { new: true }
    );
    if (!updatedStudent) return res.status(404).json({ message: "Student not found" });
    res.json(updatedStudent);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// ✅ DELETE student by enrollment
router.delete("/:enrollment", async (req, res) => {
  try {
    const deletedStudent = await Student.findOneAndDelete({ enrollment: req.params.enrollment });
    if (!deletedStudent) return res.status(404).json({ message: "Student not found" });
    res.json({ message: "Student deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;