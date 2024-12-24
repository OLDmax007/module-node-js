import { readFile, writeFile } from "../services/fs.service";

class UserRepository {
  public async getList() {
    return await readFile();
  }

  public async create(dto: any) {
    const users = await readFile();
    const { name, age, email, isActive } = dto;

    const user = {
      id: users.length ? users[users.length - 1].id + 1 : 1,
      name,
      age,
      email,
      isActive,
    };

    users.push(user);
    await writeFile(users);
    return user;
  }
}

export const userRepository = new UserRepository();
