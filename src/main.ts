import express, { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";

import config from "./configs/config";
import { ApiError } from "./errors/api-error";
import { userRouter } from "./routes/user.router";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const func = async () => {
  app.use("/users", userRouter);
  app.use(
    "*",
    (error: ApiError, req: Request, res: Response, next: NextFunction) => {
      const status = error.status || 500;
      const message = error.message || "Something bad";
      res.status(status).json({ status, message });
    }
  );

  process.on("uncaughtException", (error) => {
    console.error("Uncaught Exception:", error);
    process.exit(1);
  });

  app.listen(config.port, async () => {
    await mongoose.connect(config.mongoUrl);
  });
};

void func();
