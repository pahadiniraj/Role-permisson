import mongoose, { Schema } from "mongoose";

const permissionSchema = new Schema({
  permissionName: {
    type: String,
    required: true,
  },
  isDefault: {
    type: Number,
    default: 0,
  },
});
export const Permission = mongoose.model("Permission", permissionSchema);
