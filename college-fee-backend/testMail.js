import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

// Create transporter with full SMTP config
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // use TLS
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS, // Gmail App Password
  },
  tls: {
    rejectUnauthorized: false, // Required for Render
  },
});

// Test email
transporter.sendMail(
  {
    from: process.env.EMAIL_USER,
    to: "your-email@gmail.com", // test email
    subject: "Test Mail",
    text: "Hello! This is a test email from Render.",
  },
  (err, info) => {
    if (err) console.error("Email error:", err);
    else console.log("Email sent:", info.response);
  }
);
