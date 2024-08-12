import NodeMailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();
// Ensure that SMTP_PORT is an integer
const transporter = NodeMailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: false,
  auth: {
    user: process.env.SMTP_EMAIL,
    pass: process.env.SMTP_PASSWORD,
  },
  family: 4, // Force IPv4
});

const sendMail = async (email, subject, content) => {
  try {
    const mailOptions = {
      from: process.env.SMTP_EMAIL,
      to: email,
      subject: subject,
      html: content,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent:", info.messageId);
  } catch (error) {
    console.error("Error sending email:", error.message);
  }
};
export { sendMail };
