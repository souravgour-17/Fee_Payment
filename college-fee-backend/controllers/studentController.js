import Student from "../models/Student.js";

// Get all students
export const getStudents = async (req, res) => {
  try {
    const students = await Student.find();
    res.json(students);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get student by enrollment number
export const getStudentByEnrollment = async (req, res) => {
  try {
    const student = await Student.findOne({ enrollmentNumber: req.params.enrollmentNumber });
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }
    res.json(student);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Add one student
export const createStudent = async (req, res) => {
  try {
    const student = new Student(req.body);
    const savedStudent = await student.save();
    res.status(201).json(savedStudent);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Add multiple students (bulk insert)
export const createStudentsBulk = async (req, res) => {
  try {
    const students = await Student.insertMany(req.body);
    res.status(201).json(students);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
