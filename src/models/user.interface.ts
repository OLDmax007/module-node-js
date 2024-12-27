export interface IUser {
  _id: string;
  name: string;
  age: number;
  email: string;
  role?: string;
  isActive: boolean;
  isVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export type IUserDto = Pick<IUser, "name" | "age" | "email">;
