import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

transporter.sendMail({
  from: process.env.EMAIL_USER,
  to: "your-email@gmail.com",
  subject: "Test Mail",
  text: "Hello! This is a test.",
}, (err, info) => {
  if (err) console.error(err);
  else console.log("Email sent:", info.response);
});
