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
    <p>Hey <b> ${savedUser.fullName} </b> your account is created.below is your details.</p>
    <table style = "border-style : none">
    <tr>
    <th>Name</th>
    <td>${savedUser.fullName}</td>
    </tr>
    <tr>
    <th>Email</th>
    <td>${savedUser.email}</td>
    </tr><tr>
    <th>Password</th>
    <td>${password}</td>
    </tr>
    
    </table>
    <p>Please remember to change your password after logging in for the first time.</p>
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
