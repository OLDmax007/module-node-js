import { Router } from "express";

import { userController } from "../controllers/user.controller";
import { authMiddleware } from "../middlewares/auth.middleware";
import { commonMiddleware } from "../middlewares/common.middleware";
import { UserValidator } from "../validators/user.validator";

const router = Router();
router.get("/", userController.getItems);
router.get("/me", authMiddleware.checkAccessToken, userController.getMe);
router.get(
  "/:userId",
  commonMiddleware.isIdValid("userId"),
  userController.getById
);
router.put(
  "/me",
  authMiddleware.checkAccessToken,
  commonMiddleware.validateBody(UserValidator.update),
  userController.update
);
router.delete("/me", authMiddleware.checkAccessToken, userController.delete);

export const userRouter = router;
