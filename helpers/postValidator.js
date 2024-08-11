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

export { createPostValidator };
