import { RoleEnum } from "../enums/role.enum";
import { ApiError } from "../errors/api-error";
import { ITokenPair } from "../interfaces/token.interface";
import { IUser, IUserCreate } from "../interfaces/user.interface";
import { tokenRepository } from "../repositories/token.repository";
import { userRepository } from "../repositories/user.repository";
import { passwordService } from "./password.service";
import { tokenService } from "./token.service";
import { userService } from "./user.service";

class AuthService {
  public async singUp(
    dto: IUserCreate
  ): Promise<{ user: IUser; tokens: ITokenPair }> {
    await userService.isEmailUnique(dto.email);
    const password = await passwordService.hashPassword(dto.password);
    const user = await userRepository.create({ ...dto, password });
    const tokens = tokenService.generateToken({
      userId: user._id.toString(),
      role: RoleEnum.USER,
    });
    await tokenRepository.create({ ...tokens, _userId: user._id });
    return { user, tokens };
  }

  public async singIn(
    dto: IUser
  ): Promise<{ user: IUser; tokens: ITokenPair }> {
    const user = await userRepository.getByEmail(dto.email);
    const isPasswordCorrect = await passwordService.comparePassword(
      dto.password,
      user.password
    );

    if (!isPasswordCorrect) {
      throw new ApiError("Incorrect email or password", 401);
    }
    const tokens = tokenService.generateToken({
      userId: user._id.toString(),
      role: RoleEnum.USER,
    });
    await tokenRepository.create({ ...tokens, _userId: user._id });
    return { user, tokens };
  }
}

export const authService = new AuthService();
