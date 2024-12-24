import { NextFunction, Request, Response } from "express";

import { ApiError } from "../errors/api-error";
import { userService } from "../services/user.service";

class UserController {
  public async getList(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await userService.getList();
      if (!result) {
        throw new ApiError("Result not found", 404);
      }
      res.json(result);
    } catch (e) {
      next(e);
    }
  }

  public async create(req: Request, res: Response, next: NextFunction) {
    try {
      const dto = req.body;
      const result = await userService.create(dto);
      console.log(result);
      res.status(201).json(result);
    } catch (e) {
      next(e);
    }
  }
}

export const userController = new UserController();
