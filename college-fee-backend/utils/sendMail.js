import nodemailer from "nodemailer";

export const sendMail = async (to, subject, html) => {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.BREVO_HOST,
      port: process.env.BREVO_PORT,
      secure: false,
      auth: {
        user: process.env.BREVO_USER,
        pass: process.env.BREVO_PASS,
      },
    });

    await transporter.sendMail({
      from: `"Fee Payment System" <${process.env.BREVO_USER}>`,
      to,
      subject,
      html,
    });

    console.log("Mail Sent Successfully 🚀");
    return { success: true };

  } catch (error) {
    console.error("Mail Error:", error);
    return { success: false, error };
  }
};
