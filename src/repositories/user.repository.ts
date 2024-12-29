import { IUser, IUserDto } from "../models/user.interface";
import { User } from "../models/user.model";

class UserRepository {
  public async getList(): Promise<IUser[]> {
    return await User.find();
  }

  public async getById(userId: string): Promise<IUser> {
    return await User.findById(userId);
  }

  public async create(dto: IUserDto): Promise<IUser> {
    return await User.create(dto);
  }

  // public async update(userId: string, dto: IUserDto): Promise<any> {}
  //
  // public async delete(userId: string): Promise<void> {}
}

export const userRepository = new UserRepository();
