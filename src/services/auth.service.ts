import config from "../configs/config";
import { EmailTypeEnum } from "../enums/email-type.enum";
import { RoleEnum } from "../enums/role.enum";
import { ApiError } from "../errors/api-error";
import { ITokenPair, ITokenPayload } from "../interfaces/token.interface";
import { ILogin, IUser, IUserCreate } from "../interfaces/user.interface";
import { tokenRepository } from "../repositories/token.repository";
import { userRepository } from "../repositories/user.repository";
import { emailService } from "./email.service";
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

    await tokenRepository.create({ ...tokens, _userId: user._id.toString() });
    await emailService.sendEmail(
      "maxsim.dobrovolskyimd@gmail.com",
      EmailTypeEnum.WELCOME,
      { name: dto.name, frontUrl: config.frontUrl }
    );
    return { user, tokens };
  }

  public async singIn(
    dto: ILogin
  ): Promise<{ user: IUser; tokens: ITokenPair }> {
    const user = await userRepository.getByEmail(dto.email);
    if (!user) {
      throw new ApiError("Incorrect email or password", 401);
    }

    const isPasswordCorrect = await passwordService.comparePassword(
      dto.password,
      user.password
    );

    if (!isPasswordCorrect) {
      throw new ApiError("Incorrect email or password", 401);
    }
    await tokenRepository.deleteAllByParams({ _userId: user._id.toString() });
    const tokens = tokenService.generateToken({
      userId: user._id.toString(),
      role: RoleEnum.USER,
    });
    await tokenRepository.create({ ...tokens, _userId: user._id.toString() });
    return { user, tokens };
  }

  public async refresh(
    tokenPayload: ITokenPayload,
    refreshToken: string
  ): Promise<ITokenPair> {
    await tokenRepository.deleteOneByParams({ refreshToken });
    const tokens = tokenService.generateToken({
      userId: tokenPayload.userId,
      role: tokenPayload.role,
    });

    await tokenRepository.create({ ...tokens, _userId: tokenPayload.userId });

    return tokens;
  }

  public async logout(
    accessToken: string,
    tokenPayload: ITokenPayload
  ): Promise<void> {
    const user = await userRepository.getById(tokenPayload.userId);
    await tokenRepository.deleteOneByParams({ accessToken });
    await emailService.sendEmail(
      "maxsim.dobrovolskyimd@gmail.com",
      EmailTypeEnum.LOGOUT,
      { name: user.name, frontUrl: config.frontUrl }
    );
  }

  public async logoutAll(tokenPayload: ITokenPayload): Promise<void> {
    const user = await userRepository.getById(tokenPayload.userId);
    await tokenRepository.deleteAllByParams({ _userId: tokenPayload.userId });
    await emailService.sendEmail(
      "maxsim.dobrovolskyimd@gmail.com",
      EmailTypeEnum.LOGOUT,
      { name: user.name, frontUrl: config.frontUrl }
    );
  }
}

export const authService = new AuthService();
