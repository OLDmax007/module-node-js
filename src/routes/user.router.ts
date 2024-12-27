import { Router } from "express";

import { userController } from "../controllers/user.controller";
import { commonMiddleware } from "../middlewares/common.middlewares";

const router = Router();
router.get("/", userController.getItems);
router.get(
  "/:userId",
  commonMiddleware.isValid("userId"),
  userController.getById
);
router.post("/", commonMiddleware.validateUser, userController.create);
router.put("/:userId", commonMiddleware.validateUser, userController.update);
router.delete("/:userId", userController.delete);

export const userRouter = router;
