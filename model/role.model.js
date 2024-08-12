import mongoose, { Schema } from "mongoose";

const roleSchema = Schema({
  roleName: {
    type: String,
    required: true,
  },
  value: {
    type: Number,
    required: true,
  },
});

export const Role = mongoose.model("Role", roleSchema);
