// backend/models/Student.js
import mongoose from "mongoose";

const studentSchema = new mongoose.Schema(
  {
    enrollment: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    course: { type: String, required: true },
    year: { type: String, required: true },
    feesDue: { type: Number, required: true },
    upiId: { type: String, required: true }
  },
  { timestamps: true }
);

const Student = mongoose.model("Student", studentSchema);
export default Student;
