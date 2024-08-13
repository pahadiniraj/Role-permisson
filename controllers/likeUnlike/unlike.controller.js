import { Like } from "../../model/like.model.js";
import { Post } from "../../model/post.model.js";
import { User } from "../../model/user.model.js";

const postUnlike = async (req, res) => {
  try {
    const { userId, postId } = req.body;

    // Check if the user exists
    const userExist = await User.findById(userId);
    if (!userExist) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Check if the post exists
    const postExist = await Post.findById(postId);
    if (!postExist) {
      return res.status(404).json({
        success: false,
        message: "Post not found",
      });
    }

    // Check if the like exists
    const likeExist = await Like.findOne({
      userId,
      postId,
    });
    if (!likeExist) {
      return res.status(400).json({
        success: false,
        message: "You have not liked this post",
      });
    }

    // Delete the like
    await Like.findOneAndDelete({
      userId,
      postId,
    });

    return res.status(200).json({
      success: true,
      message: "Post unliked successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export { postUnlike };
