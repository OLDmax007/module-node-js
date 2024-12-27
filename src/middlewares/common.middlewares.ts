import { NextFunction, Request, Response } from "express";
import { isObjectIdOrHexString } from "mongoose";

import ApiError from "../errors/api-error";

class CommonMiddleware {
  public isValid(key: string) {
    return (req: Request, res: Response, next: NextFunction) => {
      try {
        const id = req.params[key];
        if (!isObjectIdOrHexString(id)) {
          throw new ApiError(`Invalid is ${key}`, 400);
        }
        next();
      } catch (e) {
        next(e);
      }
    };
  }

  public validateUser(req: Request, res: Response, next: NextFunction) {
    try {
      const dto = req.body;
      if (!dto.name || dto.name.length < 3) {
        throw new ApiError(
          "Name is required and should be minimum 3 symbols",
          400
        );
      }
      if (!dto.email || !dto.email.includes("@")) {
        throw new ApiError("Email is required", 400);
      }
      if (typeof dto.age !== "number" || dto.age < 18) {
        throw new ApiError("Age is required and should be at least 18", 400);
      }
      req.body = dto;
      next();
    } catch (e) {
      next(e);
    }
  }
}

export const commonMiddleware = new CommonMiddleware();
