import { Types } from "mongoose";

export interface IUser {
  _id: Types.ObjectId;
  name: string;
  age: number;
  email: string;
  password: string;
  role?: string;
  phone: string;
  isDeleted?: boolean;
  isVerifed?: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export type UserDtoType = Pick<IUser, "name" | "age" | "email">;
