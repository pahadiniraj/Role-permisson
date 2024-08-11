import { User } from "../../model/user.model.js";
import bcrypt from "bcrypt";

const registerUser = async (req, res) => {
  try {
    const { fullName, email, password } = req.body;
    
    const userExist = await User.findOne({
      email,
    });

    if (userExist) {
      return res.status(400).json({
        success: false,
        error: "User already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      fullName,
      email,
      password: hashedPassword,
    });

    const userData = await user.save();

    return res.status(200).json({
      success: true,
      data: userData,
      message: "User registered successfully",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};

export { registerUser };
