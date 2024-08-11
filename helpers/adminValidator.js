import Joi from "joi";

const permissionAddValidator = Joi.object({
  permissionName: Joi.string().required(), // Required field
  isDefault: Joi.string()
    .empty("") // Treat empty string as undefined
    .default("0"), // Default value is '0'
});

export { permissionAddValidator };

const permissionDeleteValidator = Joi.object({
  id: Joi.string().required(), // Required field
});

export { permissionDeleteValidator };

const permissionUpdateValidator = Joi.object({
  id: Joi.string().required(), // Required field
  permissionName: Joi.string().required(), // Required field
  isDefault: Joi.string()
    .empty("") // Treat empty string as undefined
    .default("0"), // Default value is '0'
});

export { permissionUpdateValidator };
