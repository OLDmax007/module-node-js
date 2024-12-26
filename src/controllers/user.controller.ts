import { NextFunction, Request, Response } from "express";

import { IUser } from "../models/IUser";
import { userService } from "../services/user.service";

class UserController {
  public async getItems(req: Request, res: Response, next: NextFunction) {
    try {
      const result: IUser[] = await userService.getItems();
      res.json(result);
    } catch (e) {
      next(e);
    }
  }

  public async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const result: IUser = await userService.getById(+req.params.userId);
      res.json(result);
    } catch (e) {
      next(e);
    }
  }

  public async create(req: Request, res: Response, next: NextFunction) {
    try {
      const dto = req.body;
      const result: IUser = await userService.create(dto);
      res.status(201).json(result);
    } catch (e) {
      next(e);
    }
  }

  public async update(req: Request, res: Response, next: NextFunction) {
    try {
      const dto = req.body;
      const result: IUser = await userService.update(dto, +req.params.userId);
      res.json(result);
    } catch (e) {
      next(e);
    }
  }

  public async delete(req: Request, res: Response, next: NextFunction) {
    try {
      await userService.delete(+req.params.userId);
      res.sendStatus(204);
    } catch (e) {
      next(e);
    }
  }
}

export const userController = new UserController();
