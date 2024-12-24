import dotenv from "dotenv";
import express, { NextFunction, Request, Response } from "express";

import ApiError from "./errors/api-error";
import { readFile } from "./services/fs.service";

dotenv.config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const func = async () => {
  app.get(
    "/users",
    async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      try {
        const users = await readFile();
        if (!users) {
          throw new ApiError("Users not found", 404);
        }
        res.json(users);
      } catch (e) {
        next(e);
      }
    }
  );

  // app.get('/users/:userId', async (req, res) => {
  //     try {
  //         const users = await readFile();
  //         const foundUser = users.find(user => user.id === +req.params.userId);
  //         if (!foundUser) {
  //             return res.sendStatus(404);
  //         }
  //         return res.json(foundUser);
  //     } catch (e) {
  //         return res.status(500).json({ error: e.message });
  //     }
  // });
  //
  // app.post('/users', async (req, res) => {
  //     try {
  //         const users = await readFile();
  //         const { name, age, email, isActive } = req.body;
  //
  //         if (typeof name !== 'string' || typeof age !== 'number' || typeof email !== 'string' || typeof isActive !== 'boolean') {
  //             return res.sendStatus(400);
  //         }
  //
  //         const user = {
  //             id: users.length ? users[users.length - 1].id + 1 : 1,
  //             name,
  //             age,
  //             email,
  //             isActive,
  //         };
  //
  //         users.push(user);
  //         await writeFile(users);
  //         return res.sendStatus(204);
  //     } catch (e) {
  //         return res.status(500).json({ error: e.message });
  //     }
  // });
  //
  // app.delete('/users/:userId', async (req, res) => {
  //     try {
  //         const users = await readFile();
  //         const pmUserId = +req.params.userId;
  //         const foundUserIndex = users.findIndex(user => user.id === pmUserId);
  //
  //         if (foundUserIndex === -1) {
  //             return res.sendStatus(404);
  //         }
  //
  //         users.splice(foundUserIndex, 1);
  //         await writeFile(users);
  //         return res.sendStatus(204);
  //     } catch (e) {
  //         return res.status(500).json({ error: e.message });
  //     }
  // });
  //
  // app.put('/users/:userId', async (req, res) => {
  //     try {
  //         const users = await readFile();
  //         const { name, age, email, isActive } = req.body;
  //         const pmUserId = +req.params.userId;
  //
  //         const foundUserIndex = users.findIndex(user => user.id === pmUserId);
  //         if (foundUserIndex === -1) {
  //             return res.sendStatus(404);
  //         }
  //
  //         if (typeof name !== 'string' || typeof age !== 'number' || typeof email !== 'string' || typeof isActive !== 'boolean') {
  //             return res.sendStatus(400);
  //         }
  //
  //         users[foundUserIndex] = {
  //             id: pmUserId,
  //             name,
  //             age,
  //             email,
  //             isActive,
  //         };
  //
  //         await writeFile(users);
  //         return res.sendStatus(204);
  //     } catch (e) {
  //         return res.status(500).json({ error: e.message });
  //     }

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

  app.listen(process.env.PORT, () => {
    console.log(`http://localhost:${process.env.PORT}/users`);
  });
};

void func();
