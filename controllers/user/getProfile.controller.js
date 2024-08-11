import { User } from "../../model/user.model.js";

const getProfile = async (req, res) => {
  try {
    const userId = req.user._id;
    const userData = await User.findOne({ _id: userId });
    res.status(200).json({
      success: true,
      data: userData,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};
export { getProfile };
