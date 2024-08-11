import mongoose, { Schema } from "mongoose";

const postSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  catagories: [
    {
      type: mongoose.Types.ObjectId,
      ref: "Category",
      required: true,
    },
  ],
});

export const Post = mongoose.model("Post", postSchema);
