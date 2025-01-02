import { ApiError } from "../errors/api-error";
import { IUser, UserDtoCreateType, UserDtoUpdateType } from "../models/IUser";
import { userRepository } from "../repositories/user.repository";

class UserService {
  public async getItems(): Promise<IUser[]> {
    return await userRepository.getItems();
  }

  public async getById(userId: string): Promise<IUser> {
    return await userRepository.getById(userId);
  }

  public async create(dto: UserDtoCreateType): Promise<IUser> {
    await this.isEmailUnique(dto.email);
    return await userRepository.create(dto);
  }

  public async update(dto: UserDtoUpdateType, userId: string): Promise<IUser> {
    return await userRepository.update(dto, userId);
  }

  public async delete(userId: string): Promise<void> {
    await userRepository.delete(userId);
  }

  private async isEmailUnique(email: string): Promise<void> {
    const user = await userRepository.getByEmail(email);
    if (user) {
      throw new ApiError("Email is already in use", 409);
    }
  }
}

export const userService = new UserService();
