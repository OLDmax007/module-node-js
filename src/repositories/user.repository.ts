import { IUser, UserDtoCreateType, UserDtoUpdateType } from "../models/IUser";
import { User } from "../models/user.model";

class UserRepository {
  public async getItems(): Promise<IUser[]> {
    return await User.find();
  }

  public async getById(userId: string): Promise<IUser> {
    return await User.findById(userId);
  }

  public async getByEmail(email: string): Promise<IUser> {
    return await User.findOne({ email });
  }

  public async create(dto: UserDtoCreateType): Promise<IUser> {
    return await User.create(dto);
  }

  public async update(dto: UserDtoUpdateType, userId: string): Promise<IUser> {
    return await User.findByIdAndUpdate(userId, dto, { new: true });
  }

  public async delete(userId: string): Promise<void> {
    await User.deleteOne({ _id: userId });
  }
}

export const userRepository = new UserRepository();
