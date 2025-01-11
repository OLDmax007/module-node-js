import { Types } from "mongoose";

import { RoleEnum } from "../enums/role.enum";

export interface IUser {
  _id: Types.ObjectId;
  name: string;
  age: number;
  email: string;
  password: string;
  role: RoleEnum;
  phone?: string;
  isDeleted: boolean;
  isVerifed: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export type IUserCreate = Pick<IUser, "name" | "age" | "email" | "password">;
export type IUserUpdate = Pick<IUser, "name" | "password">;
export type ILogin = Pick<IUser, "email" | "password">;
export type IForgotPassword = Pick<IUser, "email">;
export type IForgotPasswordSet = Pick<IUser, "password"> & { token: string };
export type IEmailVerification = Pick<IUser, "email"> & { token: string };
