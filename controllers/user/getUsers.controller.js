import { User } from "../../model/user.model.js";

const getUsers = async (req, res) => {
  try {
    const users = await User.find({
      _id: {
        $ne: req.user._id, // exclude current user from the list
      },
    });
    return res.status(200).json({
      success: true,
      data: users,
      message: "Users fetched successfully",
    });
  } catch (error) {
    return res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};

export { getUsers };
