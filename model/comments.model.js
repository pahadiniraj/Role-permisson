import mongoose, { Schema } from "mongoose";

const commentSchema = new Schema({
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
  comment: {
    type: String,
    required: true,
  },
});

export const Comment = mongoose.model("Comment", commentSchema);
