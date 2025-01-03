import { ApiError } from "../errors/api-error";
import { ITokenPayload } from "../interfaces/token.interface";
import { IUser, IUserUpdate } from "../interfaces/user.interface";
import { userRepository } from "../repositories/user.repository";

class UserService {
  public async getItems(): Promise<IUser[]> {
    return await userRepository.getItems();
  }

  public async getById(userId: string): Promise<IUser> {
    return await userRepository.getById(userId);
  }

  public async getMe(tokenPayload: ITokenPayload): Promise<IUser> {
    return await userRepository.getById(tokenPayload.userId);
  }

  public async update(
    dto: IUserUpdate,
    tokenPayload: ITokenPayload
  ): Promise<IUser> {
    return await userRepository.update(dto, tokenPayload.userId);
  }

  public async delete(tokenPayload: ITokenPayload): Promise<void> {
    await userRepository.delete(tokenPayload.userId);
  }

  public async isEmailUnique(email: string): Promise<void> {
    const user = await userRepository.getByEmail(email);
    if (user) {
      throw new ApiError("Email is already in use", 409);
    }
  }
}

export const userService = new UserService();
