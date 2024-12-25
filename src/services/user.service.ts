import { IUser } from "../models/IUser";
import { userRepository } from "../repositories/user.repository";

class UserService {
  public async getItems(): Promise<IUser[]> {
    return await userRepository.getItems();
  }

  public async getById(userId: number): Promise<IUser> {
    return await userRepository.getById(userId);
  }

  public async create(dto: IUser): Promise<IUser> {
    return await userRepository.create(dto);
  }

  public async update(dto: IUser, userId: number): Promise<IUser> {
    return await userRepository.update(dto, userId);
  }

  public async delete(userId: number): Promise<IUser> {
    return await userRepository.delete(userId);
  }
}

export const userService = new UserService();
