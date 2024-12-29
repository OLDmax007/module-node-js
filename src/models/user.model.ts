import { model, Schema } from "mongoose";

import { RoleEnum } from "../enums/role.enum";

const userSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, trim: true },
    age: { type: Number, required: true, trim: true },
    password: { type: String, required: true, trim: true },
    role: {
      enum: RoleEnum,
      type: String,
      required: false,
      trim: true,
      default: RoleEnum.USER,
    },
    phone: { type: String, required: false, trim: true },
    isDeleted: { type: Boolean, required: false, default: false },
    isVerifed: { type: Boolean, required: false, default: false },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export const User = model("users", userSchema);
