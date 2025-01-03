import * as bcrypt from "bcrypt";

class PasswordService {
  public async hashPassword(password: string) {
    return await bcrypt.hash(password, 10);
  }

  public async comparePassword(password: string, hashedPassword: string) {
    return await bcrypt.compare(password, hashedPassword);
  }
}

export const passwordService = new PasswordService();
