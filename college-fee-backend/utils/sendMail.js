import { Resend } from "resend";
import dotenv from "dotenv";
dotenv.config();

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendMail = async (to, subject, html) => {
  try {
    const data = await resend.emails.send({
      from: "Fee Payment System <onboarding@resend.dev>",
      to,
      subject,
      html,
    });

    console.log("Mail Sent:", data);
    return { success: true };
  } catch (error) {
    console.error("Mail Error:", error);
    return { success: false, error };
  }
};
