import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import User from "./models/User.js";

dotenv.config();

mongoose.connect("mongodb://127.0.0.1:27017/mydb")
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

const createUser = async () => {
  const hashedPassword = await bcrypt.hash("1727", 10); // tumhara password
  const user = new User({
    name: "Sourav",
    email: "souravgour798@gmail.com",
    password: hashedPassword
  });
  await user.save();
  console.log("User created with hashed password!");
  process.exit();
};

createUser();
