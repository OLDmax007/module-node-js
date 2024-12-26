import ApiError from "../errors/api-error";
import { IUser, TypeUserDto } from "../models/IUser";
import { userRepository } from "../repositories/user.repository";

class UserService {
  public async getItems(): Promise<IUser[]> {
    const users = await userRepository.getItems();
    if (!users) {
      throw new ApiError("User not found", 404);
    }
    return users;
  }

  public async getById(userId: number): Promise<IUser> {
    const user = await userRepository.getById(userId);
    if (!user) {
      throw new ApiError("User not found", 404);
    }

    return user;
  }

  public async create(dto: TypeUserDto): Promise<IUser> {
    if (
      typeof dto.name !== "string" ||
      typeof dto.age !== "number" ||
      typeof dto.email !== "string" ||
      typeof dto.isActive !== "boolean"
    ) {
      throw new ApiError("Incorrect entered data", 400);
    }
    const user = await userRepository.create(dto);
    if (!user) {
      throw new ApiError("User not found", 404);
    }

    return user;
  }

  public async update(dto: IUser, userId: number): Promise<IUser> {
    const user = await userRepository.update(dto, userId);
    if (!user) {
      throw new ApiError("User not found", 404);
    }
    return user;
  }

  public async delete(userId: number): Promise<void> {
    const user = await userRepository.getById(userId);
    if (!user) {
      throw new ApiError("User not found", 404);
    }
    await userRepository.delete(userId);
  }
}

export const userService = new UserService();
