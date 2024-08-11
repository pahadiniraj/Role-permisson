import { Permission } from "../../model/permission.model.js";

const getPermission = async (req, res) => {
  try {
    const permission = await Permission.find({});
    return res.status(200).json({
      success: true,
      message: "permission featched sucessfully",
      data: permission,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};
export { getPermission };
