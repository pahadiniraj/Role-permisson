import Joi from "joi";

const forgetPasswordValidator = Joi.object({
  email: Joi.string()
    .email() // Ensure it's a valid email address
    .required(), // The email field is required
});

export { forgetPasswordValidator };

const resetPasswordValidator = Joi.object({
  newPassword: Joi.string()
    .min(5) // The password must be at least 8 characters long
    .required(), // The password field is required
});

export { resetPasswordValidator };
