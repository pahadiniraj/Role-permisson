import { Permission } from "../../model/permission.model.js";

const addPermission = async (req, res) => {
  try {
    const { permissionName, isDefault } = req.body; // Destructure with a default value

    // Check if the permission already exists
    const isPermissionExist = await Permission.findOne({ permissionName });
    if (isPermissionExist) {
      return res.status(400).json({
        success: false,
        message: "Permission already exists",
      });
    }

    // Create the new permission object
    const permission = new Permission({
      permissionName,
      isDefault: isDefault ? parseInt(isDefault) : 0, // Ensure it's a number, defaulting to 0
    });

    // Save the new permission to the database
    const newPermission = await permission.save();

    return res.status(201).json({
      success: true,
      message: "Permission added successfully",
      data: newPermission,
    });
  } catch (error) {
    console.error("Error adding permission:", error); // Log the error for debugging
    return res.status(500).json({ success: false, message: error.message });
  }
};

export { addPermission };
