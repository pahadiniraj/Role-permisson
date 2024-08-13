import Joi from "joi";

const createPostValidator = Joi.object({
  title: Joi.string()
    .required() // Required field
    .min(3) // Minimum length constraint
    .max(100) // Maximum length constraint
    .trim(), // Trim whitespace

  description: Joi.string()
    .allow("") // Allow empty string
    .default("No description provided"), // Default value if not provided

  categories: Joi.array()
    .optional() // Optional field
    .default([]), // Default to an empty array if not provided
});

// Validator for deleting a post

export { createPostValidator };

const deletePostValidator = Joi.object({
  id: Joi.string().required(), // The ID field is required
});

export { deletePostValidator };

const updatePostValidator = Joi.object({
  id: Joi.string().required(), // The ID field is required
  title: Joi.string()
    .required() // Required field
    .min(3) // Minimum length constraint
    .max(100) // Maximum length constraint
    .trim(), // Trim whitespace

  description: Joi.string()
    .allow("") // Allow empty string
    .default("No description provided"), // Default value if not provided

  categories: Joi.array()
    .optional() // Optional field
    .default([]), // Default to an empty array if not provided
});

export { updatePostValidator };

const postLikeUnlikeValidator = Joi.object({
  userId: Joi.string().required(), // The ID field is required
  postId: Joi.string().required(), // The ID field is required
});
export { postLikeUnlikeValidator };
