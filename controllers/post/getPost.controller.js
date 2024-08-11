import { Post } from "../../model/post.model.js";

const getPost = async (req, res) => {
  try {
    const post = await Post.find({}).populate("categories");
    res.status(200).json({
      success: true,
      data: post,
      message: "Posts fetched successfully",
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: error.message,
    });
    
  }
};

export { getPost };
