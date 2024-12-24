import { userRepository } from "../repositories/user.repository";

class UserService {
  public async getList() {
    return await userRepository.getList();
  }

  public async create(body: any) {
    return await userRepository.create(body);
  }
}

export const userService = new UserService();
