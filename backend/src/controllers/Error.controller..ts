import { NextFunction, Request, Response } from "express";
import CustomError from "../utils/CustomError";

// If in the development, log more detailed information as much as possible
const devErrors = (res: Response, err: CustomError) => {
  console.log("dev", err.statusCode);
  return res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
    stackStrace: err.stack,
    error: err,
  });
};

// Just show the vital information
const prodErrors = (res: Response, err: CustomError) => {
  if (err.isOperational) {
    res.status(500).json({
      status: "error",
      message: "Something went wrong! Please try again later.",
    });
  } else {
    res.status(500).json({
      status: "error",
      message: "Something went wrong! Please try again later.",
    });
  }
};

const castErrorHandler = (err: any) => {
  const msg = `Invalid value ${err.value} for field ${err.path}!`;
  return new CustomError(msg, 404);
};

const validationErrorHandler = (err: any) => {
  const errors = Object.values(err.errors);
  const errorMessage = errors.join(". ");
  const msg = `Invalid input data: ${errorMessage}`;
  return new CustomError(msg, 400);
};

const duplicateKeyErrorHandler = (err: any) => {
  const msg = `There is already a something with name ......Please use another name!`;
  return new CustomError(msg, 404);
};
//  Middleware to handle error
const globalErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log("err1", err);
  err.statusCode = err.statusCode;
  err.status = err.status || "error";
  if (process.env.NODE_ENV === "development") {
    devErrors(res, err);
  } else if (process.env.NODE_ENV === "production") {
    let error = err;
    if (err.name === "CastError") {
      error = castErrorHandler(err);
    }
    if (err.code === 11000) {
      error = duplicateKeyErrorHandler(err);
    }
    if (err.name === "ValidationError") {
      err = validationErrorHandler(err);
    }
    prodErrors(res, error);
  }
};

export { globalErrorHandler };
