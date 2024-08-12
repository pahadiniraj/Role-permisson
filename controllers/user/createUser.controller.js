import Randomstring from "randomstring";
import bcrypt from "bcrypt";
import { User } from "../../model/user.model.js";

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