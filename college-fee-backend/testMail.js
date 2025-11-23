import { Resend } from "resend";
import dotenv from "dotenv";
dotenv.config();

const resend = new Resend(process.env.RESEND_API_KEY);

async function sendTestMail() {
  try {
    const response = await resend.emails.send({
      from: "Fee Payment System <onboarding@resend.dev>",
      to: process.env.EMAIL_USER,   // YOUR GMAIL
      subject: "Fee Payment System - Test Mail",
      html: `
        <h2>Hello Sourav! 👋</h2>
        <p>This is a test email sent using <strong>Resend</strong> from your localhost.</p>
        <p>Your setup is working perfectly 🎉</p>
      `,
    });

    console.log("Mail Sent Successfully:", response);
  } catch (error) {
    console.error("Error Sending Mail:", error);
  }
}

sendTestMail();
