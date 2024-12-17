require('dotenv').config()
const express = require('express')
const fs = require('node:fs/promises')
const {join: createPath} = require('node:path')
const app = express()
app.use(express.json())


const func = async () => {
    const filePath = createPath(process.cwd(), 'db', 'usersData.json');
    let users = JSON.parse(await fs.readFile(filePath, 'utf-8'))

    app.get('/users', (req, res) => {
        if (!users) {
            return res.sendStatus(404);
        }
        return res.json(users)
    })
    app.get('/users/:userId', (req, res) => {
        const foundUser = users.find(user => user.id === +req.params.userId)
        if (!foundUser) {
            return res.sendStatus(404);

        }
        return res.json(foundUser);

    })
    app.post('/users', async (req, res) => {

        const {id, name, age, email, isActive} = req.body;
        const foundUser = users.find(user => user.id === id)
        if (foundUser) {
            return res.sendStatus(409);
        }

        if (typeof id !== "number" || typeof name !== 'string' || typeof age !== "number" || typeof email !== 'string'|| typeof isActive !== 'boolean') {
            return res.sendStatus(400)
        }

        const user = {
            id,
            name,
            age,
            email,
            isActive
        }

        users.push(user)
        await fs.writeFile(filePath, JSON.stringify(users))
        return res.sendStatus(204)
    })
    app.delete('/users/:userId', async (req, res) => {
        const pmUserId = +req.params.userId
        const foundUser = users.find(user => user.id === pmUserId)
        if (!foundUser) {
            return res.sendStatus(404);
        }

        users = users.filter(user => user.id !== pmUserId)

        await fs.writeFile(filePath, JSON.stringify(users))
        res.sendStatus(204)
    })
    app.put('/users/:userId', async (req, res) => {
        const {name, age, email, isActive} = req.body;
        const pmUserId = +req.params.userId
        const foundUserIndex = users.findIndex(user => user.id === pmUserId);
        if (foundUserIndex === -1) {
            return res.sendStatus(404);
        }
        if (typeof name !== 'string' || typeof age !== "number" || typeof email !== 'string'|| typeof isActive !== 'boolean') {
            return res.sendStatus(400)
        }

        users[foundUserIndex] = {
            id: pmUserId,
            name,
            age,
            email,
            isActive

        }
        await fs.writeFile(filePath, JSON.stringify(users))
        return  res.sendStatus(204)
    })


    app.listen(process.env.PORT, () => {
        console.log(`http://localhost:${process.env.PORT}/users`)
    })

}

void func()