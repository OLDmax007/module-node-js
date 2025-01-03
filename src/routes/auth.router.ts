import { Router } from "express";

import { authController } from "../controllers/auth.controller";
import { commonMiddleware } from "../middlewares/common.middleware";
import { UserValidator } from "../validators/user.validator";

const router = Router();

router.post(
  "/sing-up",
  commonMiddleware.validateBody(UserValidator.create),
  authController.singUp
);

router.post("/sing-in", authController.singIn);
export const authRouter = router;
