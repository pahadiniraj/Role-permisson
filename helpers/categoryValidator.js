import Joi from "joi";

const categoryAddValidator = Joi.object({
  categoryName: Joi.string()
    .min(3) // Minimum length of 3 characters
    .max(50) // Maximum length of 50 characters
    .trim() // Automatically trim whitespace from the start and end
    .required(), // Required field
});

export { categoryAddValidator };
