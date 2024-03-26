import express, { Application, NextFunction, Request, Response } from "express";
import cors from "cors";
import "dotenv/config";
import mongoose from "mongoose";
import { apiRouter } from "./routes";
import CustomError from "./utils/CustomError";
import { globalErrorHandler } from "./controllers/Error.controller.";
import passport from "passport";
import { jwtStrategy } from "./config/passport";

async function connectMongodb() {
  console.log("Connecting successfully");

  await mongoose.connect(process.env.MONGODB_CONNECTION_STRING as string);
}

connectMongodb();

// Create the express app and  import the type of app from express;
const app: Application = express();

// Parser
app.use(express.json());
// Xử lí request HTTP json -> parse to use
app.use(express.urlencoded({ extended: true }));

// Cors
app.use(cors());

// jwt authentication
app.use(passport.initialize());
passport.use(jwtStrategy);

app.use("/v1", apiRouter);

// Define catch-all route handler for unmatched routes
app.all("*", (req: Request, res: Response, next: NextFunction) => {
  console.log("============================");
  const err = new CustomError("Error occurs", 400);
  next(err);
});

app.use(globalErrorHandler);

const server = app.listen(7000, () => {
  console.log("Sever running on local host 7000");
});

process.on("unhandledRejection", (error: any) => {
  console.log("err", error.name, error.massage);
  console.log("Unhandled rejection occured! Shutting down...");
  server.close(() => {
    process.exit(1);
  });
});

process.on("uncaughtException", (error: any) => {
  console.log("err", error.name, error.massage);
});
