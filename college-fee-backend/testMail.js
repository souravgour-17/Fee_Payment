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

transporter.verify((err, success) => {
  if (err) console.log("SMTP Error:", err);
  else console.log("SMTP is ready");
});

transporter.sendMail(
  {
    from: process.env.EMAIL_USER,
    to: "your-email@gmail.com",
    subject: "Test Mail",
    text: "Hello! This is a test email from Render.",
  },
  (err, info) => {
    if (err) console.error("Email error:", err);
    else console.log("Email sent:", info.response);
  }
);
