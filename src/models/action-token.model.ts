import { model, Schema } from "mongoose";

import { IToken } from "../interfaces/token.interface";
import { User } from "./user.model";

const actionTokenSchema = new Schema(
  {
    _userId: { type: Schema.Types.ObjectId, required: true, ref: User },
    token: { type: String, required: true },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export const ActionToken = model<IToken>("action-tokens", actionTokenSchema);
