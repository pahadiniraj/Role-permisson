import Randomstring from "randomstring";
import bcrypt from "bcrypt";
import { User } from "../../model/user.model.js";
import { sendMail } from "../../helpers/mailer.js";

const createUser = async (req, res) => {
  try {
    const { fullName, email } = req.body;

    const isExist = await User.findOne({
      email: email,
    });

    if (isExist) {
      return res.status(400).json({
        success: false,
        message: "Email already exists",
      });
    }
    const password = Randomstring.generate(6);
    const hashPassword = await bcrypt.hash(password, 10);

    var obj = {
      fullName: fullName,
      email: email,
      password: hashPassword,
    };
    if (req.body.role && req.body.role === 1) {
      return res.status(403).json({
        success: false,
        message: "You can't create admin ",
      });
    } else if (req.body.role) {
      obj.role = req.body.role;
    }

    const user = new User(obj);
    const savedUser = await user.save();

    console.log(password);

    const content = `
   <!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Account Created</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      background-color: #f4f4f4;
      margin: 0;
      padding: 0;
      color: #333;
    }
    .container {
      width: 100%;
      max-width: 600px;
      margin: 50px auto;
      background-color: #fff;
      border-radius: 10px;
      box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
      overflow: hidden;
    }
    .header {
      background-color: #4CAF50;
      color: #fff;
      padding: 20px;
      text-align: center;
    }
    .header h1 {
      margin: 0;
      font-size: 24px;
    }
    .content {
      padding: 20px;
    }
    .content p {
      line-height: 1.6;
    }
    .content table {
      width: 100%;
      margin-top: 20px;
      border-collapse: collapse;
    }
    .content th, .content td {
      padding: 10px;
      text-align: left;
      border-bottom: 1px solid #ddd;
    }
    .content th {
      background-color: #f2f2f2;
    }
    .password-box {
      background-color: #f9f9f9;
      border: 1px solid #ddd;
      padding: 10px;
      border-radius: 5px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 20px;
    }
    .password-box input {
      border: none;
      background: none;
      font-size: 16px;
      width: 80%;
    }
    .password-box button {
      background-color: #4CAF50;
      color: white;
      border: none;
      padding: 10px 15px;
      border-radius: 5px;
      cursor: pointer;
      transition: background-color 0.3s;
    }
    .password-box button:hover {
      background-color: #45a049;
    }
    .footer {
      background-color: #4CAF50;
      color: #fff;
      padding: 10px;
      text-align: center;
      font-size: 14px;
      border-top: 1px solid #ddd;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Welcome to Our Platform, ${savedUser.fullName}!</h1>
    </div>
    <div class="content">
      <p>We're excited to have you on board. Your account has been successfully created! Below are your account details:</p>
      <table>
        <tr>
          <th>Name:</th>
          <td>${savedUser.fullName}</td>
        </tr>
        <tr>
          <th>Email:</th>
          <td>${savedUser.email}</td>
        </tr>
        <tr>
          <th>Password:</th>
          <td>
            <div class="password-box">
              <input type="text" value="${password}" id="passwordField" readonly>
            </div>
          </td>
        </tr>
      </table>
      <p>Please remember to change your password after logging in for the first time to keep your account secure.</p>
    </div>
    <div class="footer">
      <p>If you have any questions, feel free to reach out to our support team. We're here to help!</p>
    </div>
  </div>


</body>
</html>

    `;

    sendMail(savedUser.email, "Account created successfully", content);
    return res.status(200).json({
      success: true,
      message: "User created successfully",
      data: savedUser,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export { createUser };
