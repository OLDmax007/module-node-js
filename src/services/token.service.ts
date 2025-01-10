import * as jwt from "jsonwebtoken";

import config from "../configs/config";
import { ActionTokenTypeEnum } from "../enums/action-token-type.enum";
import { TokenTypeEnum } from "../enums/token-type.enum";
import { ApiError } from "../errors/api-error";
import { ITokenPair, ITokenPayload } from "../interfaces/token.interface";

class TokenService {
  public generateTokens(payload: ITokenPayload): ITokenPair {
    const accessToken = jwt.sign(payload, config.jwt.accessSecret, {
      expiresIn: config.jwt.accessExpiresIn,
    });

    const refreshToken = jwt.sign(payload, config.jwt.refreshSecret, {
      expiresIn: config.jwt.refreshExpiresIn,
    });

    return { accessToken, refreshToken };
  }

  public generateActionToken(
    payload: ITokenPayload,
    type: ActionTokenTypeEnum
  ): string {
    let secret: string;
    let expiresIn: string;

    switch (type) {
      case ActionTokenTypeEnum.FORGOT_PASSWORD:
        secret = config.action.forgotPasswordSecret;
        expiresIn = config.action.forgotPasswordExpiresIn;
        break;
      case ActionTokenTypeEnum.EMAIL_VERIFICATION:
        secret = config.action.emailVerificationSecret;
        expiresIn = config.action.emailVerificationExpiresIn;
        break;
      default:
        throw new ApiError("Invalid token type", 401);
    }

    return jwt.sign(payload, secret, { expiresIn });
  }

  public verifyToken(
    token: string,
    type: TokenTypeEnum | ActionTokenTypeEnum
  ): ITokenPayload {
    try {
      let secret: string;

      switch (type) {
        case TokenTypeEnum.ACCESS:
          secret = config.jwt.accessSecret;
          break;
        case TokenTypeEnum.REFRESH:
          secret = config.jwt.refreshSecret;
          break;
        case ActionTokenTypeEnum.FORGOT_PASSWORD:
          secret = config.action.forgotPasswordSecret;
          break;
        case ActionTokenTypeEnum.EMAIL_VERIFICATION:
          secret = config.action.emailVerificationSecret;
          break;
        default:
          throw new ApiError("Invalid token type", 401);
      }

      return jwt.verify(token, secret) as ITokenPayload;
    } catch (e) {
      throw new ApiError(e.message, 401);
    }
  }
}
export const tokenService = new TokenService();
