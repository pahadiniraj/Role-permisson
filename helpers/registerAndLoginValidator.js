import Joi from "joi";

const registerSchema = Joi.object({
  email: Joi.string()
    .email() // Must be a valid email
    .required(), // Required field

  password: Joi.string()
    .min(5) // Minimum length of 5 characters
    .required() // Required field
    .custom((value, helpers) => {
      // Check for at least one uppercase letter
      if (!/[A-Z]/.test(value)) {
        return helpers.message(
          "Password must contain at least one uppercase letter"
        );
      }

      // Check for at least one special character
      if (!/[!@#$%^&*(),.?":{}|<>]/.test(value)) {
        return helpers.message(
          "Password must contain at least one special character"
        );
      }

      // Check for at least one number
      if (!/\d/.test(value)) {
        return helpers.message("Password must contain at least one number");
      }

      return value; // If all checks pass, return the value
    }),

  // Other fields...

  fullName: Joi.string()
    .min(1) // Minimum length of 1 character
    .max(50) // Maximum length of 50 characters
    .required(), // Required field
});

export { registerSchema };

const loginSchema = Joi.object({
  email: Joi.string()
    .email() // Must be a valid email
    .required(), // Required field

  password: Joi.string()
    .min(5) // Minimum length of 5 characters
    .required(), // Required field
  // .custom((value, helpers) => {
  //   // Check for at least one uppercase letter
  //   if (!/[A-Z]/.test(value)) {
  //     return helpers.message(
  //       "Password must contain at least one uppercase letter"
  //     );
  //   }

  //   // Check for at least one special character
  //   if (!/[!@#$%^&*(),.?":{}|<>]/.test(value)) {
  //     return helpers.message(
  //       "Password must contain at least one special character"
  //     );
  //   }

  //   // Check for at least one number
  //   if (!/\d/.test(value)) {
  //     return helpers.message("Password must contain at least one number");
  //   }

  //   return value; // If all checks pass, return the value
  // }),

  // Other fields...
});

export { loginSchema };
