import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import User from "./models/User.js";

dotenv.config();

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

const updatePassword = async () => {
  const hashedPassword = await bcrypt.hash("1727", 10); 

  const user = await User.findOneAndUpdate(
    { email: "krunalgour@gmail.com" },
    { password: hashedPassword },
    { new: true }
  );

  console.log("Updated user:", user);
  process.exit();
};

updatePassword();
