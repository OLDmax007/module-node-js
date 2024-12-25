import { IUser } from "../models/IUser";
import { readFile, writeFile } from "../services/fs.service";

class UserRepository {
  public async getItems(): Promise<IUser[]> {
    return await readFile();
  }

  public async getById(userId: number): Promise<IUser> {
    const users: IUser[] = await readFile();
    const user: IUser = users.find((user) => user.id === userId);
    return user;
  }

  public async create(dto: IUser): Promise<IUser> {
    const users: IUser[] = await readFile();
    const newUser = {
      id: users.length ? users[users.length - 1].id + 1 : 1,
      name: dto.name,
      age: dto.age,
      email: dto.email,
      isActive: dto.isActive,
    };

    users.push(newUser);
    await writeFile(users);
    return newUser;
  }

  public async update(dto: IUser, userId: number): Promise<IUser> {
    const { name, age, email, isActive } = dto;

    const users: IUser[] = await readFile();
    const userIndex: number = users.findIndex((user) => user.id === userId);

    users[userIndex] = {
      id: userId,
      name,
      age,
      email,
      isActive,
    };

    const updatedUser: IUser = users[userIndex];
    await writeFile(users);
    return updatedUser;
  }

  public async delete(userId: number): Promise<IUser> {
    const users: IUser[] = await readFile();
    const userIndex: number = users.findIndex((user) => user.id === userId);
    const deletedUser = users[userIndex];
    users.splice(userIndex, 1);
    await writeFile(users);
    return deletedUser;
  }
}

export const userRepository = new UserRepository();
