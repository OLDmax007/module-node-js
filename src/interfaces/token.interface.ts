import { RoleEnum } from "../enums/role.enum";

export interface IToken {
  _id: string;
  _userId: string;
  accessToken: string;
  refreshToken: string;
  createdAt: Date;
  updatedAt: Date;
}

export type ITokenPair = Pick<IToken, "accessToken" | "refreshToken">;

export interface ITokenPayload {
  userId: string;
  role: RoleEnum;
}

export type ITokenPairWithUserId = ITokenPair & { _userId: string };
