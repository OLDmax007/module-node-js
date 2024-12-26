import { IUser, TypeUserDto } from "../models/IUser";
import { readFile, writeFile } from "../services/fs.service";

class UserRepository {
  public async getItems(): Promise<IUser[]> {
    return await readFile();
  }

  public async getById(userId: number): Promise<IUser> {
    const users = await readFile();
    return users.find((user) => user.id === userId);
  }

  public async create(dto: TypeUserDto): Promise<IUser> {
    const users = await readFile();
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

    const users = await readFile();
    const userIndex = users.findIndex((user) => user.id === userId);

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

  public async delete(userId: number): Promise<void> {
    const users = await readFile();
    const userIndex = users.findIndex((user) => user.id === userId);
    users.splice(userIndex, 1);
    await writeFile(users);
  }
}

export const userRepository = new UserRepository();
