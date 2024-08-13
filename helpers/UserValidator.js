import Joi from "joi";

const createUserSchema = Joi.object({
  email: Joi.string()
    .email() // Must be a valid email
    .required(), // Required field

  fullName: Joi.string()
    .min(1) // Minimum length of 1 character
    .max(50) // Maximum length of 50 characters
    .required(), // Required field

  role: Joi.string().default("0"),
});

const updateUserValidator = Joi.object({
  id: Joi.string().required(),

  fullName: Joi.string()
    .min(1) // Minimum length of 1 character
    .max(50) // Maximum length of 50 characters
    .required(), // Required field

  role: Joi.string().default("0"),
});
export { createUserSchema, updateUserValidator };

const deleteUserValidator = Joi.object({
  id: Joi.string().required(),
});

export { deleteUserValidator };
