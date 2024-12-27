import { model, Schema } from "mongoose";

import { IUser } from "./user.interface";

const userScheme = new Schema(
  {
    name: { type: String, required: true, trim: true },
    age: { type: Number, required: true, trim: true },
    email: { type: String, required: true, trim: true },
    role: { type: String, required: false, trim: true, default: "user" },
    isActive: { type: Boolean, required: true, trim: true, default: true },
    isVerified: { type: Boolean, required: true, trim: true, default: true },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export const User = model<IUser>("user", userScheme);
