import dotenv from 'dotenv';
import express, {Request, Response} from 'express';
import {readFile, writeFile} from './services/fs.service';


dotenv.config();
const app = express();
app.use(express.json());

console.log(process.env.PORT)

const func = async () => {
    app.get('/users', async (req:Request, res:Response):Promise<any> => {
        try {
            const users = await readFile();
            if (!users) {
                return res.sendStatus(404);
            }
            return res.json(users);
        } catch (e) {
            return res.status(500).json({error: e.message});
        }
    });

    app.get('/users/:userId', async (req:Request, res:Response):Promise<void> => {
        try {
            const users = await readFile();
            const foundUser = users.find(user => user.id === +req.params.userId);
            if (!foundUser) {
                return res.sendStatus(404);
            }
            return res.json(foundUser);
        } catch (e) {
            return res.status(500).json({error: e.message});
        }
    });

    app.post('/users', async (req:Request, res:Response):Promise<void> => {
        try {
            const users = await readFile();
            const {name, age, email, isActive} = req.body;

            if (typeof name !== 'string' || typeof age !== 'number' || typeof email !== 'string' || typeof isActive !== 'boolean') {
                return res.sendStatus(400);
            }

            const user = {
                id: users.length ? users[users.length - 1].id + 1 : 1,
                name,
                age,
                email,
                isActive,
            };

            users.push(user);
            await writeFile(users);
            return res.sendStatus(204);
        } catch (e) {
            return res.status(500).json({error: e.message});
        }
    });

    app.delete('/users/:userId', async (req:Request, res:Response):Promise<void> => {
        try {
            const users = await readFile();
            const pmUserId = +req.params.userId;
            const foundUserIndex = users.findIndex(user => user.id === pmUserId);

            if (foundUserIndex === -1) {
                return res.sendStatus(404);
            }

            users.splice(foundUserIndex, 1);
            await writeFile(users);
            return res.sendStatus(204);
        } catch (e) {
            return res.status(500).json({error: e.message});
        }
    });

    app.put('/users/:userId', async (req:Request, res:Response):Promise<void> => {
        try {
            const users = await readFile();
            const {name, age, email, isActive} = req.body;
            const pmUserId = +req.params.userId;

            const foundUserIndex = users.findIndex(user => user.id === pmUserId);
            if (foundUserIndex === -1) {
                return res.sendStatus(404);
            }

            if (typeof name !== 'string' || typeof age !== 'number' || typeof email !== 'string' || typeof isActive !== 'boolean') {
                return res.sendStatus(400);
            }

            users[foundUserIndex] = {
                id: pmUserId,
                name,
                age,
                email,
                isActive,
            };

            await writeFile(users);
            return res.sendStatus(204);
        } catch (e) {
            return res.status(500).json({error: e.message});
        }
    });

    app.listen(process.env.PORT, () => {
        console.log(`http://localhost:${process.env.PORT}/users`);
    });
};

void func();
