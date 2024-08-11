import { Permission } from "../../model/permission.model.js";

const updatePermission = async (req, res) => {
  try {
    const { id, permissionName, isDefault } = req.body;

    const isPermissionIdExist = await Permission.findOne({ _id: id });
    if (!isPermissionIdExist) {
      return res.status(400).json({
        success: false,
        message: "Permission id not found",
      });
    }

    const isNameAssigned = await Permission.findOne({
      _id: { $ne: id },
      permissionName,
    });
    if (isNameAssigned) {
      return res.status(400).json({
        success: false,
        message: "Permission name already assigned to another permission ",
      });
    }
    var updatePermission = {
      permissionName,
    };
    if (req.body.isDefault != null) {
      updatePermission.isDefault = parseInt(req.body.isDefault);
    }

    const updatedPermission = await Permission.findByIdAndUpdate(
      {
        _id: id,
      },
      {
        $set: updatePermission,
      },
      {
        new: true,
      }
    );

    return res.status(200).json({
      success: true,

      message: "Permission added successfully",
      data: updatedPermission,
    });
  } catch (error) {
    return res.status(400).json({ sucess: false, message: error.message });
  }
};

export { updatePermission };
