import { Router } from "express";

import { userController } from "../controllers/user.controller";
import { commonMiddleware } from "../middlewares/common.middleware";

const router = Router();
router.get("/", userController.getItems);
router.get("/:userId", commonMiddleware.isIdValid("userId"));
router.post("/", commonMiddleware.validateUserData, userController.create);
router.put(
  "/:userId",
  commonMiddleware.validateUserData,
  userController.update
);
router.delete(
  "/:userId",
  commonMiddleware.isIdValid("userId"),
  userController.delete
);

export const userRouter = router;
