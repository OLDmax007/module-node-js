import { NextFunction, Request, Response } from "express";

import ApiError from "../errors/api-error";
import { IUser } from "../models/IUser";
import { readFile } from "../services/fs.service";
import { userService } from "../services/user.service";

class UserController {
  public async getItems(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const result: IUser[] = await userService.getItems();
      if (!result) {
        throw new ApiError("Users not found", 404);
      }

      res.json(result);
    } catch (e) {
      next(e);
    }
  }

  public async getById(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const result: IUser = await userService.getById(+req.params.userId);
      if (!result) {
        throw new ApiError("User not found", 404);
      }
      res.json(result);
    } catch (e) {
      next(e);
    }
  }

  public async create(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const dto = req.body;
      if (
        typeof dto.name !== "string" ||
        typeof dto.age !== "number" ||
        typeof dto.email !== "string" ||
        typeof dto.isActive !== "boolean"
      ) {
        throw new ApiError("Incorrect entered data", 400);
      }
      const result: IUser = await userService.create(dto);
      if (!result) {
        throw new ApiError("User not found", 404);
      }
      res.status(201).json(result);
    } catch (e) {
      next(e);
    }
  }

  public async update(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const dto = req.body;
      if (
        typeof dto.name !== "string" ||
        typeof dto.age !== "number" ||
        typeof dto.email !== "string" ||
        typeof dto.isActive !== "boolean"
      ) {
        throw new ApiError("Incorrect entered data", 400);
      }

      const users: IUser[] = await readFile();
      const userIndex: number = users.findIndex(
        (user) => user.id === +req.params.userId
      );
      if (userIndex === -1) {
        throw new ApiError("User not found", 404);
      }

      const result: IUser = await userService.update(dto, +req.params.userId);
      if (!result) {
        throw new ApiError("User not found", 404);
      }
      res.json(result);
    } catch (e) {
      next(e);
    }
  }

  public async delete(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const result: IUser = await userService.delete(+req.params.userId);
      if (!result) {
        throw new ApiError("User not found", 404);
      }
      res.json(result);
    } catch (e) {
      next(e);
    }
  }
}

export const userController = new UserController();
