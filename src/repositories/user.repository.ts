import { IUser, UserDtoType } from "../models/IUser";
import { User } from "../models/user.model";

class UserRepository {
  public async getItems(): Promise<IUser[]> {
    return await User.find();
  }

  public async getById(userId: string): Promise<IUser> {
    return await User.findById(userId);
  }

  public async create(dto: UserDtoType): Promise<any> {
    return await User.create(dto);
  }

  public async update(dto: IUser, userId: string): Promise<IUser> {
    return await User.findByIdAndUpdate(userId, dto, { new: true });
  }

  public async delete(userId: string): Promise<void> {
    await User.deleteOne({ _id: userId });
  }
}

export const userRepository = new UserRepository();
