import { Permission } from "../../model/permission.model.js";
import { User } from "../../model/user.model.js";
import bcrypt from "bcrypt";
import { UserPermission } from "../../model/userPermission.model.js";

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

    // assign default permissions

    const defaultPermissions = await Permission.find({
      isDefault: 1,
    });

    if (defaultPermissions.length > 0) {
      const permissionArray = [];
      defaultPermissions.forEach((permission) => {
        permissionArray.push({
          permissionName: permission.permissionName,
          permissionValue: [0, 1, 2, 3],
        });
      });

      const userPermission = new UserPermission({
        userId: userData._id,
        permissions: permissionArray,
      });

      await userPermission.save();
    }

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
