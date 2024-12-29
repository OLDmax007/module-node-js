import Joi from "joi";

export const userCreateValidator = Joi.object({
  name: Joi.string()
    .required()
    .min(3)
    .max(20)
    .trim()
    .pattern(/^[a-zA-Z]+$/)
    .messages({
      "string.base": "The name must be a string",
      "string.empty": "The name can not be empty",
      "any.required": "The name must be entered",
      "string.min": "The name must be no less than 3 letters",
      "string.max": "The name must be no larger than 20 letters",
      "string.pattern.name": "The name must has only letters",
    }),
  age: Joi.number().required().min(18).max(90).messages({
    "number.base": "The age must be a number",
    "any.required": "The age must be entered",
    "number.min": "The age must be no less than 18",
    "number.max": "The age must be no larger than 90",
  }),
  email: Joi.string().email().required().min(3).max(20).trim().messages({
    "string.base": "The email must be a string",
    "string.empty": "The email can not be empty",
    "any.required": "The email must be entered",
    "string.min": "The email must be no less than 3 letters",
    "string.max": "The email must be no larger than 20 letters",
    "string.email": "The email data is incorrect",
  }),
  password: Joi.string()
    .pattern(/^[a-zA-Z0-9]+$/)
    .required()
    .min(3)
    .max(20)
    .trim()
    .messages({
      "string.base": "The password must be a string",
      "string.empty": "The password can not be empty",
      "any.required": "The password must be entered",
      "string.min": "The password must be no less than 3 symbols",
      "string.max": "The password must be no larger than 20 symbols",
      "string.pattern.name": "The password must have only letters and numbers",
    }),
  role: Joi.string()
    .valid("admin", "user")
    .optional()
    .default("user")
    .messages({
      "any.only": "The role must be one of 'admin' or 'user'",
    }),
  phone: Joi.string().optional().trim().messages({
    "string.base": "The phone must be a string",
  }),
  isDeleted: Joi.boolean().optional().default(false).messages({
    "boolean.base": "The isDeleted field must be a boolean",
  }),
  isVerified: Joi.boolean().optional().default(false).messages({
    "boolean.base": "The isVerified field must be a boolean",
  }),
});

export const userUpdateValidator = Joi.object({
  name: Joi.string()
    .required()
    .min(3)
    .max(20)
    .trim()
    .pattern(/^[a-zA-Z]+$/)
    .messages({
      "string.base": "The name must be a string",
      "string.empty": "The name can not be empty",
      "any.required": "The name must be entered",
      "string.min": "The name must be no less than 3 letters",
      "string.max": "The name must be no larger than 20 letters",
      "string.pattern.name": "The name must has only letters",
    }),
  password: Joi.string()
    .pattern(/^[a-zA-Z0-9]+$/)
    .required()
    .min(3)
    .max(20)
    .trim()
    .messages({
      "string.base": "The password must be a string",
      "string.empty": "The password can not be empty",
      "any.required": "The password must be entered",
      "string.min": "The password must be no less than 3 symbols",
      "string.max": "The password must be no larger than 20 symbols",
      "string.pattern.name": "The password must have only letters and numbers",
    }),
  role: Joi.string()
    .valid("admin", "user")
    .optional()
    .default("user")
    .messages({
      "any.only": "The role must be one of 'admin' or 'user'",
    }),
  isDeleted: Joi.boolean().optional().default(false).messages({
    "boolean.base": "The isDeleted field must be a boolean",
  }),
  isVerified: Joi.boolean().optional().default(false).messages({
    "boolean.base": "The isVerified field must be a boolean",
  }),
});
