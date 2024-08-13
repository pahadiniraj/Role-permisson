import { User } from "../../model/user.model.js";
import mongoose from "mongoose";

const getUsers = async (req, res) => {
  try {
    // const users = await User.find({
    //   _id: {
    //     $ne: req.user._id, // exclude current user from the list
    //   },
    // });

    const users = await User.aggregate([
      {
        $match: {
          _id: {
            $ne: new mongoose.Types.ObjectId(
              req.user._id // exclude current user from the list
            ),
          },
        },
      },
      {
        $lookup: {
          from: "userpermissions",
          localField: "_id",
          foreignField: "userId",
          as: "permissions",
        },
      },
      {
        $project: {
          _id: 1, // only id can be kept 0
          fullName: 1,
          email: 1,
          permissions: {
            $cond: {
              if: { $isArray: "$permissions" },
              then: { $arrayElemAt: ["$permissions", 0] },
              else: null,
            },
          },
          role: 1,
        },
      },
      {
        $addFields: {
          permissions: {
            permissions: "$permissions.permissions",
          },
        },
      },
    ]);

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
