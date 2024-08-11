import mongoose, { Schema } from "mongoose";

const likeSchema = new Schema({
  userId: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: true,
  },
  postId: {
    type: mongoose.Types.ObjectId,
    ref: "Post",
    required: true,
  },
});

export const Like = mongoose.model("Like", likeSchema);
