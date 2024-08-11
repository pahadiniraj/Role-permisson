import { Post } from "../../model/post.model.js";

const deletePost = async (req, res) => {
  try {
    const { id } = req.body;

    const findPost = await Post.findOne({ _id: id });
    if (!findPost) {
      return res
        .status(400)
        .json({ success: false, message: "Post not found" });
    }

    const deletedPost = await Post.findByIdAndDelete({ _id: id });
    return res.status(200).json({
      success: true,
      message: "Post deleted successfully",
      data: deletedPost,
    });
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message });
  }
};

export { deletePost };
