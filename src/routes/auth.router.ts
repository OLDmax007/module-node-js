import { Router } from "express";

import { authController } from "../controllers/auth.controller";
import { authMiddleware } from "../middlewares/auth.middleware";
import { commonMiddleware } from "../middlewares/common.middleware";
import { UserValidator } from "../validators/user.validator";

const router = Router();

router.post(
  "/sing-up",
  commonMiddleware.validateBody(UserValidator.create),
  authController.singUp
);

router.post(
  "/sing-in",
  commonMiddleware.validateBody(UserValidator.login),
  authController.singIn
);

router.post(
  "/refresh",
  authMiddleware.checkRefreshToken,
  authController.refresh
);

export const authRouter = router;
