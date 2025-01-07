import { NextFunction, Request, Response } from "express";

import { ITokenPayload } from "../interfaces/token.interface";
import { ILogin, IUserCreate } from "../interfaces/user.interface";
import { authService } from "../services/auth.service";

class AuthController {
  public async singUp(req: Request, res: Response, next: NextFunction) {
    try {
      const dto = req.body as IUserCreate;
      const result = await authService.singUp(dto);
      res.status(201).json(result);
    } catch (e) {
      next(e);
    }
  }

  public async singIn(req: Request, res: Response, next: NextFunction) {
    try {
      const dto = req.body as ILogin;
      const result = await authService.singIn(dto);
      res.status(201).json(result);
    } catch (e) {
      next(e);
    }
  }

  public async refresh(req: Request, res: Response, next: NextFunction) {
    try {
      const tokenPayload = req.res.locals.tokenPayload as ITokenPayload;
      const refreshToken = req.res.locals.refreshToken as string;

      const result = await authService.refresh(tokenPayload, refreshToken);
      res.status(201).json(result);
    } catch (e) {
      next(e);
    }
  }

  public async logout(req: Request, res: Response, next: NextFunction) {
    try {
      const tokenPayload = req.res.locals.tokenPayload as ITokenPayload;
      console.log(tokenPayload);
      const accessToken = req.res.locals.accessToken as string;
      await authService.logout(accessToken, tokenPayload);
      res.status(204).json({ message: "You have exited from app" });
    } catch (e) {
      next(e);
    }
  }

  public async logoutAll(req: Request, res: Response, next: NextFunction) {
    try {
      const tokenPayload = req.res.locals.tokenPayload as ITokenPayload;
      await authService.logoutAll(tokenPayload);
      res
        .status(204)
        .json({ message: "You have exited from app (all your devices)" });
    } catch (e) {
      next(e);
    }
  }
}
export const authController = new AuthController();
