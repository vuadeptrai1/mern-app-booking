import { Router } from "express";
import authValidation from "../validators/auth.validation";
import { AuthController } from "../controllers";
import passport from "passport";

const usersRouter = Router();

// Registration user
usersRouter.post(
  "/register",
  authValidation.registerUser(),
  AuthController.createUser
);

usersRouter.post(
  "/send-verification-email",
  passport.authenticate("jwt", { session: false }),
  AuthController.sendVerificationEmail
);

export { usersRouter };
