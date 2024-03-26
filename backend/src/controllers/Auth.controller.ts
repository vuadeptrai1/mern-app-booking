import { Request, Response } from "express";
import { asyncFunctionHandler } from "../utils/asyncFunctionHandler";
import { emailService, tokenService, userService } from "../services";
import { validationResult } from "express-validator";
import httpStatus from "http-status";

const createUser = asyncFunctionHandler(async (req: Request, res: Response) => {
  const result = validationResult(req);
  if (!result.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: result.array(),
    });
  }
  // "name": "Khanh Pham",
  // "email": "booking_account@gmail.com",
  // "password": "phamdinhkhanh121",
  // "confirmPassword": "phamdinhkhanh121"
  const user = await userService.createUser(req.body);
  const token = await tokenService.generateAuthTokens(user);
  res.status(httpStatus.CREATED).send({
    user,
    token,
  });
});

const sendVerificationEmail = asyncFunctionHandler(
  async (req: any, res: Response) => {
    // const verifyEmailToken = await tokenService.generateVerifyEmailToken(
    //   req.body
    // );
    res.status(200).json({
      success: "true",
    });
    console.log("verifyEmailToken");
    // await emailService.sendVerificationEmail(req.user.email, verifyEmailToken);
  }
);

export { createUser, sendVerificationEmail };
