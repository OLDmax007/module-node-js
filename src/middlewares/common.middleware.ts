import { NextFunction, Request, Response } from "express";
import { isObjectIdOrHexString } from "mongoose";

import ApiError from "../errors/api-error";

class CommonMiddleware {
  public isIdValid(key: string) {
    return (req: Request, res: Response, next: NextFunction) => {
      try {
        const id = req.params[key];
        console.log(id);
        if (!isObjectIdOrHexString(id)) {
          console.log("sas");
          throw new ApiError(`Invalid ID: ${id}`, 400);
        }
        next();
      } catch (e) {
        next(e);
      }
    };
  }

  public validateBody(validator: any) {
    return (req: Request, res: Response, next: NextFunction) => {
      try {
        const dto = req.body;
        const { error } = validator.validate(dto);
        if (error) {
          throw new ApiError(
            `Validation erorr: ${error.details
              .map((d) => d.message)
              .join(", ")}`,
            400
          );
        }
        next();
      } catch (e) {
        next(e);
      }
    };
  }
}

export const commonMiddleware = new CommonMiddleware();
