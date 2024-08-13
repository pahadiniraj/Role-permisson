import { User } from "../../model/user.model.js";
import bcrypt from "bcrypt";
import crypto from "crypto";

const resetPassword = async (req, res) => {
  try {
    // Correctly access the token from req.params
    const token = req.params.token;
    const { newPassword } = req.body;

    console.log("Token:", token);
    console.log("New Password:", newPassword);

    // Check if token or newPassword is missing
    if (!token || !newPassword) {
      return res.status(400).json({
        success: false,
        message: "Token and new password are required",
      });
    }

    // Hash the token to compare with the hashed token in the database
    const hashToken = crypto.createHash("sha256").update(token).digest("hex");
    console.log("Hashed Token:", hashToken);

    // Find the user by comparing the hashed token and checking if the token is not expired
    const user = await User.findOne({
      resetPasswordToken: hashToken,
      resetPasswordExpires: { $gt: Date.now() },
    });

    console.log("Found User:", user);

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid or expired token",
      });
    }

    // Hash the new password and save it
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Check if the user object is valid
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not found",
      });
    }

    user.password = hashedPassword;
    user.resetPasswordToken = null;
    user.resetPasswordExpires = null;

    const updatedPassword = await user.save();
    return res.status(200).json({
      success: true,
      message: "Password reset successfully",
      data: updatedPassword,
    });
  } catch (error) {
    console.error("Error resetting password:", error);
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

export { resetPassword };
