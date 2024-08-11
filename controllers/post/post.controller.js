import { Post } from "../../model/post.model.js";

const createPost = async (req, res) => {
  try {
    // Destructure the required fields from the request body
    const { title, description, categories } = req.body;

    // Create a new post instance with the provided data
    const newPost = new Post({ title, description, categories });

    // Save the new post to the database
    const post = await newPost.save();

    const postFullData = await Post.findOne({ _id: post._id }).populate(
      "categories"
    );

    // Respond with success message and created post data
    return res.status(201).json({
      success: true,
      data: postFullData,
      message: "Post created successfully",
    });
  } catch (error) {
    // Handle and respond with an error message
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export { createPost };


