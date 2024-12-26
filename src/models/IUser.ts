export interface IUser {
  id: number;
  name: string;
  age: number;
  email: string;
  isActive: boolean;
}

export type TypeUserDto = Omit<IUser, "id">;
