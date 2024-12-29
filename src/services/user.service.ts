import ApiError from "../errors/api-error";
import { IUser, UserDtoCreateType, UserDtoUpdateType } from "../models/IUser";
import { userRepository } from "../repositories/user.repository";

class UserService {
  public async getItems(): Promise<IUser[]> {
    const users = await userRepository.getItems();
    if (!users) {
      throw new ApiError("User not found", 404);
    }
    return users;
  }

  public async getById(userId: string): Promise<IUser> {
    const user = await userRepository.getById(userId);
    if (!user) {
      throw new ApiError("User not found", 404);
    }

    return user;
  }

  public async create(dto: UserDtoCreateType): Promise<IUser> {
    const user = await userRepository.create(dto);
    if (!user) {
      throw new ApiError("User not found", 404);
    }

    return user;
  }

  public async update(dto: UserDtoUpdateType, userId: string): Promise<IUser> {
    const user = await userRepository.update(dto, userId);
    if (!user) {
      throw new ApiError("User not found", 404);
    }
    return user;
  }

  public async delete(userId: string): Promise<void> {
    const user = await userRepository.getById(userId);
    if (!user) {
      throw new ApiError("User not found", 404);
    }
    await userRepository.delete(userId);
  }
}

export const userService = new UserService();
