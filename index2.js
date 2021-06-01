const express = require ('express')
const mongoose = require('mongoose')
const app = express ()
const port = 5000

const bcrypt = require('bcrypt')
const Tasks = require ('./schemas/tasks')
const Users = require ('./schemas/users')

const saltRounds = 12

const db = mongoose.connection
mongoose.connect('mongodb://localhost/taskManager', {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true})

app.use(express.json())
db.on('error', console.error.bind(console, 'Connection error.'))
db.once('open', () => {
    app.listen(port, () => {
        console.log(`Conectado à porta ${port}\nBanco de Dados Conectado!`)
    })
})
