// backend/seeder.js
import mongoose from "mongoose";
import dotenv from "dotenv";
import Student from "./models/Student.js";
import { mockStudents } from "./mockStudents.js";

dotenv.config();

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    // Drop old indexes that may still exist
    await Student.collection.dropIndexes();

    // Clear old data
    await Student.deleteMany();

    // Insert mock students
    await Student.insertMany(mockStudents);

    console.log("✅ Mock students inserted successfully!");
    process.exit();
  } catch (error) {
    console.error("❌ Error inserting students:", error.message);
    process.exit(1);
  }
};

seedData();
