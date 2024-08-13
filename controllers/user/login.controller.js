import { User } from "../../model/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const generateAccessToken = (user) => {
  const token = jwt.sign(user, process.env.SECRET_ACCESS_TOKEN, {
    expiresIn: "2h",
  });
  return token;
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const userExist = await User.findOne({ email });

    if (!userExist) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    const isPasswordMatch = await bcrypt.compare(password, userExist.password);
    if (!isPasswordMatch) {
      return res
        .status(400)
        .json({ success: false, message: "Incorrect password" });
    }

    const accessToken = generateAccessToken({ user: userExist });

    // get user data with all permissions

    const result = await User.aggregate([
      {
        $match: { email: userExist.email },
      },
      {
        $lookup: {
          from: "userpermissions",
          localField: "_id",
          foreignField: "userId",
          as: "permissions",
        },
      },
      {
        $project: {
          _id: 1, // only id can be kept 0
          fullName: 1,
          email: 1,
          permissions: {
            $cond: {
              if: { $isArray: "$permissions" },
              then: { $arrayElemAt: ["$permissions", 0] },
              else: null,
            },
          },
          role: 1,
        },
      },
      {
        $addFields: {
          permissions: {
            permissions: "$permissions.permissions",
          },
        },
      },
    ]);

    return res.json({
      success: true,
      message: "Login successful",
      accessToken,
      tokenType: "Bearer",
      data: result[0],
    });
  } catch (error) {
    res.status(500).json({ sucess: false, message: error.message });
  }
};

export { loginUser };
