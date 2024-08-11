import { Permission } from "../../model/permission.model.js";

const deletePermission = async (req, res) => {
  try {
    const { id } = req.body;
    await Permission.findByIdAndDelete({ _id: id });

    return res
      .status(200)
      .json({ sucess: true, message: "Permission deleted sucessfully" });
  } catch (error) {
    return res.status(400).json({ sucess: false, message: error.message });
  }
};

export { deletePermission };
