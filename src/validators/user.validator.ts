import Joi from "joi";

import { regexConstant } from "../constants/regex.constant";
import { RoleEnum } from "../enums/role.enum";

export class UserValidator {
  private static name = Joi.string()
    .min(3)
    .max(20)
    .trim()
    .regex(regexConstant.NAME)
    .messages({
      "string.base": "The name must be a string",
      "string.empty": "The name can not be empty",
      "any.required": "The name must be entered",
      "string.min": "The name must be no less than 3 letters",
      "string.max": "The name must be no larger than 20 letters",
      "string.pattern.base": "The name is not valid",
    });

  private static password = Joi.string()
    .regex(regexConstant.PASSWORD)
    .min(3)
    .max(20)
    .trim()
    .messages({
      "string.base": "The password must be a string",
      "string.empty": "The password can not be empty",
      "any.required": "The password must be entered",
      "string.min": "The password must be no less than 3 symbols",
      "string.max": "The password must be no larger than 20 symbols",
      "string.pattern.base": "The password is not valid",
    });

  private static email = Joi.string()
    .regex(regexConstant.EMAIL)
    .min(3)
    .max(50)
    .trim()
    .messages({
      "string.base": "The email must be a string",
      "string.empty": "The email can not be empty",
      "any.required": "The email must be entered",
      "string.min": "The email must be no less than 3 letters",
      "string.max": "The email must be no larger than 50 letters",
      "string.pattern.base": "The email is not valid",
    });

  private static age = Joi.number().min(18).max(90).messages({
    "number.base": "The age must be a number",
    "any.required": "The age must be entered",
    "number.min": "The age must be no less than 18",
    "number.max": "The age must be no larger than 90",
  });

  private static role = Joi.string()
    .valid(...Object.values(RoleEnum))
    .default("user")
    .messages({
      "any.only": "The role must be one of 'admin' or 'user'",
    });

  private static phone = Joi.string()
    .optional()
    .regex(regexConstant.PHONE)
    .trim()
    .messages({
      "string.base": "The phone must be a string",
      "string.pattern.base": "The phone is not valid",
    });

  private static isDeleted = Joi.boolean().default(false).messages({
    "boolean.base": "The isDeleted field must be a boolean",
  });

  private static isVerified = Joi.boolean().default(false).messages({
    "boolean.base": "The isVerified field must be a boolean",
  });

  public static create = Joi.object({
    name: this.name.required(),
    age: this.age.required(),
    email: this.email.required(),
    password: this.password.required(),
    role: this.role,
    phone: this.phone,
    isDeleted: this.isDeleted,
    isVerified: this.isVerified,
  });

  public static update = Joi.object({
    name: this.name.required(),
    password: this.password.required(),
    role: this.role,
    isDeleted: this.isDeleted,
    isVerified: this.isVerified,
  });

  public static login = Joi.object({
    email: this.email.required(),
    password: this.password.required(),
  });
}
