import { Like } from "../../model/like.model.js";
import { Post } from "../../model/post.model.js";
import { User } from "../../model/user.model.js";

const postLike = async (req, res) => {
  try {
    const { userId, postId } = req.body;

    const userExist = await User.findById({
      _id: userId,
    });
    if (!userExist) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
      
    }
    const postExist = await Post.findOne({
      _id: postId,
    });

    if (!postExist) {
      return res.status(404).json({
        success: false,
        message: "Post not found",
      });
    }
    const isLiked = await Like.findOne({ userId, postId });
    if (isLiked) {
      return res.status(400).json({
        success: false,
        message: "Already liked this post",
      });
    }
    const newLike = new Like({
      userId,
      postId,
    });

    const likeData = await newLike.save();
    return res.status(200).json({
      success: true,
      message: "Liked successfully",
      data: likeData,
    });
  } catch (error) {
    return res.status(404).json({
      success: false,
      error: error.message,
    });
  }
};

export { postLike };
