import { Post } from "../../model/post.model.js";

const updatePost = async (req, res) => {
  try {
    const { id, title, description, categories } = req.body;

    // Find and update the post in a single query
    const updatedPost = await Post.findByIdAndUpdate(
      { _id: id },
      {
        $set: {
          title,
          description,
          ...(categories && { categories }), // Conditionally add `categories` only if provided
        },
      },
      {
        new: true, // Return the updated document
      }
    );

    if (!updatedPost) {
      return res.status(404).json({
        success: false,
        message: "Post not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Post updated successfully",
      data: updatedPost,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export { updatePost };
