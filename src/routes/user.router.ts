import { NextFunction, Request, Response, Router } from "express";

import { userController } from "../controllers/user.controller";
import ApiError from "../errors/api-error";

const validateUserData = (req: Request, res: Response, next: NextFunction) => {
  try {
    const dto = req.body;

    if (
      typeof dto.name !== "string" ||
      typeof dto.age !== "number" ||
      typeof dto.email !== "string"
    ) {
      throw new ApiError("Incorrect entered data", 400);
    }

    if (!dto.name || dto.name.length < 3) {
      throw new ApiError(
        "Name is required and should be minimum 3 symbols",
        400
      );
    }

    if (!dto.email || !dto.email.includes("@")) {
      throw new ApiError("Email is required", 400);
    }

    if (!dto.password || dto.password.length < 8) {
      throw new ApiError(
        "Password is required and should be minimum 8 symbols",
        400
      );
    }

    req.body = dto;
    next();
  } catch (e) {
    next(e);
  }
};

const router = Router();
router.get("/", userController.getItems);
router.get("/:userId", userController.getById);
router.post("/", validateUserData, userController.create);
router.put("/:userId", validateUserData, userController.update);
router.delete("/:userId", userController.delete);

export const userRouter = router;
