import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import User from "./models/User.js";

dotenv.config({ path: ".env.local" });

const createAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB connected ✅");

    const email = "krunalgour@gmail.com"; // ✅ yaha ek hi rakho (same everywhere)

    const existingAdmin = await User.findOne({ email });
    if (existingAdmin) {
      console.log("Admin already exists ✅");
      process.exit(0);
    }

    const hashedPassword = await bcrypt.hash("1727", 10);

    const adminUser = new User({
      name: "Sourav",
      email,
      password: hashedPassword,
      isVerified: true,   
      role: "admin",
    });

    await adminUser.save();
    console.log("Admin user created successfully ✅");
    process.exit(0);
  } catch (err) {
    console.error("Error creating admin:", err.message);
    process.exit(1);
  }
};

createAdmin();
