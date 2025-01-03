import { NextFunction, Request, Response } from "express";

import { IUserCreate } from "../interfaces/user.interface";
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
      const dto = req.body as any;
      const result = await authService.singIn(dto);
      res.status(201).json(result);
    } catch (e) {
      next(e);
    }
  }
}

export const authController = new AuthController();
