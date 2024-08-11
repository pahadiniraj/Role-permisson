import mongoose, { Schema } from "mongoose";

const userPermissionSchema = new Schema({
  userId: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: true,
  },

  permissions: [
    {
      permissionName: String,
      permissionValue: [Number], // 0- create 1-read 2-edit 3-delete
    },
  ],
});

export const UserPermission = mongoose.model(
  "UserPermission",
  userPermissionSchema
);
