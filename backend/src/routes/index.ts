import { Router } from "express";
import { usersRouter } from "./user";

const apiRouter = Router();

apiRouter.use("/users", usersRouter);

export { apiRouter };
