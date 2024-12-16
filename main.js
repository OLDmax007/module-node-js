const express = require('express')
const {json} = require("express");
require('dotenv').config();

const app = express()
app.use(express.json())
app.use(express.urlencoded({extended: true}))

let users = [
    {id: 1, name: "Иван", age: 25, email: "ivan@example.com"},
    {id: 2, name: "Мария", age: 30, email: "maria@example.com"},
    {id: 3, name: "Алексей", age: 28, email: "aleksey@example.com"},
    {id: 4, name: "Ольга", age: 35, email: "olga@example.com"},
    {id: 5, name: "Дмитрий", age: 40, email: "dmitriy@example.com"},
    {id: 6, name: "Екатерина", age: 22, email: "ekaterina@example.com"},
    {id: 7, name: "Андрей", age: 33, email: "andrey@example.com"},
    {id: 8, name: "Наталья", age: 27, email: "natalya@example.com"},
    {id: 9, name: "Петр", age: 38, email: "petr@example.com"},
    {id: 10, name: "Светлана", age: 29, email: "svetlana@example.com"}
];


app.get('/users', (req, res) => {
    res.json(users)
})
app.post('/users', (req, res) => {
    const newUser = {
        id: users.length + 1,
        name: req.body.name,
        age: req.body.age,
        email: req.body.email
    }
    users.push(newUser)
    res.status(201).json(newUser)
})
app.get('/users/:userId', (req, res) => {
    const user = users.find(user => user.id === +req.params.userId)
    res.json(user)
})
app.delete('/users/:userId', (req, res) => {
    const deletedUser = users.find(user => user.id === +req.params.userId);

    if (!deletedUser) {
        res.json({message: 'user not found'})
    }

    users = users.filter(user => user.id !== +req.params.userId)
    res.json({user: deletedUser, message: 'user has deleted'})
})

app.listen(process.env.PORT, () => {
    console.log(`http://localhost:${process.env.PORT}/users`)
})