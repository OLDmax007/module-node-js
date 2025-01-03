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
