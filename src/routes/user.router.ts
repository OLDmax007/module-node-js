import { Router } from "express";

import { userController } from "../controllers/user.controller";
import { commonMiddleware } from "../middlewares/common.middleware";
import {
  userCreateValidator,
  userUpdateValidator,
} from "../validators/user.validator";

const router = Router();
router.get("/", userController.getItems);
router.get(
  "/:userId",
  commonMiddleware.isIdValid("userId"),
  userController.getById
);
router.post(
  "/",
  commonMiddleware.validateBody(userCreateValidator),
  userController.create
);
router.put(
  "/:userId",
  commonMiddleware.validateBody(userUpdateValidator),
  userController.update
);
router.delete(
  "/:userId",
  commonMiddleware.isIdValid("userId"),
  userController.delete
);

export const userRouter = router;
