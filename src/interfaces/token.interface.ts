import { RoleEnum } from "../enums/role.enum";

export interface IToken {
  _id: string;
  userId: string;
  accessToken: string;
  refreshToken: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ITokenPair {
  accessToken: string;
  refreshToken: string;
}
export interface ITokenPayload {
  userId: string;
  role: RoleEnum;
}
