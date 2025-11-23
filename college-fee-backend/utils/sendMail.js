import { Resend } from "resend";
import dotenv from "dotenv";
dotenv.config();

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendMail = async (to, subject, html) => {
  try {
    const data = await resend.emails.send({
      from: "souravgour798@gmail.com",  // 🔥 Change done here
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
