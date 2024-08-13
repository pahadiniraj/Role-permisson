import { User } from "../../model/user.model.js";

const updateUser = async (req, res) => {
  try {
    const { id, fullName } = req.body;

    const isExist = await User.findOne({
      _id: id,
    });

    if (!isExist) {
      return res.status(400).json({
        success: false,
        message: "User not found",
      });
    }

    var updateObj = {
      fullName: fullName,
    };

    if (req.body.role != undefined) {
      updateObj.role = req.body.role;
    }

    const updatedData = await User.findByIdAndUpdate(
      {
        _id: id,
      },
      {
        $set: updateObj,
      },
      {
        new: true,
      }
    );
    return res.status(200).json({
      success: true,
      data: updatedData,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
export { updateUser };
