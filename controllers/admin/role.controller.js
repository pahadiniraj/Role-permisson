import { Role } from "../../model/role.model.js";

const storeRole = async (req, res) => {
  try {
    const { roleName, value } = req.body;
    const role = new Role({
      roleName,
      value,
    });

    const roleData = await role.save();
    return res.status(201).json({
      success: true,
      message: "Role created successfully",
      data: roleData,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export { storeRole };

const getRoles = async (req, res) => {
  try {
    const roles = await Role.find({
      value: {
        $ne: 1,
      },
    });

    return res.status(200).json({
      success: true,
      message: "Roles featch successfully",
      data: roles,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export { getRoles };
