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

router.post("/logout", authMiddleware.checkAccessToken, authController.logout);

router.post(
  "/logout-all",
  authMiddleware.checkAccessToken,
  authController.logoutAll
);

router.post(
  "/forgot-password",
  commonMiddleware.validateBody(UserValidator.forgotPassword),
  authController.forgotPassword
);

router.post(
  "/forgot-password",
  // commonMiddleware.validateBody(UserValidator.forgotPassword),
  authController.forgotPasswordSet
);

router.post(
  "/email-verification",
  commonMiddleware.validateBody(UserValidator.emailVerification),
  authController.emailVerification
);

export const authRouter = router;
