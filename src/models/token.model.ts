import { model, Schema } from "mongoose";

import { IToken } from "../interfaces/token.interface";
import { User } from "./user.model";

const tokenSchema = new Schema(
  {
    _userId: { type: Schema.Types.ObjectId, required: true, ref: User },
    accessToken: { type: String, required: true },
    refreshToken: { type: String, required: true },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export const Token = model<IToken>("tokens", tokenSchema);
