import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  enrollment: { type: String, required: true, unique: true },
  department: { type: String, required: true },
  feesPaid: { type: Number, default: 0 },
});

const Student = mongoose.model("Student", studentSchema);
export default Student;
