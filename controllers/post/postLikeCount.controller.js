import { Like } from "../../model/like.model.js";

const postLikeCount = async (req, res) => {
  try {
    const { postId } = req.body;

    const likeCount = await Like.find({
      postId,
    }).countDocuments();
    return res.status(200).json({
      success: true,
      likeCount,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export { postLikeCount };
