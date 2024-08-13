import { User } from "../../model/user.model.js";

const deleteUser = async (req, res) => {
  try {
    const { id } = req.body;
    const user = await User.findOne({ _id: id });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not found",
      });
    }
    await User.findByIdAndDelete({ _id: id });
    return res.status(200).json({
      success: true,
      message: "User deleted successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export { deleteUser };
