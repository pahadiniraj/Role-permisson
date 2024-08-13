import crypto from "crypto";
import { User } from "../../model/user.model.js";
import { sendMail } from "../../helpers/mailer.js";

const forgetPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const resetToken = crypto.randomBytes(32).toString("hex");
    const hasToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");

    user.resetPasswordToken = hasToken;
    user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
    await user.save();
    // Create the reset URL
    const resetUrl = `${resetToken}`; // Just the token

    // Email content
    const content = `
 <!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Password Reset</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      background-color: #f4f4f4;
      margin: 0;
      padding: 0;
      color: #333;
    }
    .container {
      max-width: 600px;
      margin: 20px auto;
      background-color: #fff;
      border-radius: 8px;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
      padding: 20px;
      animation: fadeIn 1s ease-in-out;
    }
    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }
    .header {
      background-color: #4CAF50;
      color: #fff;
      padding: 20px;
      text-align: left;
      border-radius: 8px 8px 0 0;
      animation: slideIn 1s ease-out;
    }
    @keyframes slideIn {
      from { transform: translateY(-20px); opacity: 0; }
      to { transform: translateY(0); opacity: 1; }
    }
    .header h2 {
      margin: 0;
      font-size: 24px;
    }
    .content {
      padding: 20px;
      text-align: left;
    }
    .content p {
      line-height: 1.6;
    }
    .token {
      background-color: #e8f5e9;
      border: 1px solid #c8e6c9;
      padding: 10px;
      border-radius: 5px;
      display: inline-block;
      font-size: 16px;
      word-break: break-all;
      box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
    }
    .code {
      background-color: #f1f1f1;
      border: 1px solid #ddd;
      padding: 10px;
      border-radius: 5px;
      font-family: monospace;
      white-space: pre-wrap;
      display: block;
      margin-top: 10px;
      box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
    }
    .footer {
      text-align: left;
      font-size: 14px;
      color: #777;
      padding: 20px;
      border-top: 1px solid #ddd;
    }
    .button {
      display: inline-block;
      margin-top: 20px;
      padding: 10px 20px;
      background-color: #4CAF50;
      color: #fff;
      text-decoration: none;
      border-radius: 5px;
      font-size: 16px;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      transition: background-color 0.3s, transform 0.3s;
    }
    .button:hover {
      background-color: #45a049;
      transform: translateY(-2px);
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h2>Password Reset Request</h2>
    </div>
    <div class="content">
      <p>Hello ${user.fullName},</p>
      <p>We received a request to reset your password. To proceed, use the token below to set a new password:</p>
      <p><strong>Your Reset Token:</strong></p>
      <p class="token">${resetToken}</p>
      <p>This token is valid for 1 hour. To reset your password, make a POST request to the following endpoint:</p>
      <p><code class="code">POST /reset-password/${resetToken}</code></p>
      <p>Include the following in your request body:</p>
      <pre class="code">
{
  "newPassword": "your-new-password"
}
      </pre>
      <p>If you did not request a password reset, please ignore this email.</p>
      <a href="${resetUrl}" class="button">Reset Password</a>
    </div>
    <div class="footer">
      <p>Thank you for using our service!</p>
    </div>
  </div>
</body>
</html>

`;

    await sendMail(user.email, "password reset request", content);

    return res.status(200).json({
      message: "Reset password email sent successfully",
      success: true,
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Failed to send reset password email" });
  }
};
export { forgetPassword };
