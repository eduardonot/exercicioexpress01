const config = require('./config')//
const express = require ('express')//
const mongoose = require('mongoose')
const rootRoute = require('./routes/root')
const loginRoute = require('./routes/login')
const tasksRoute = require('./routes/tasks')
const usersRoute = require('./routes/users')
const app = express ()
const db = mongoose.connection
mongoose.connect(config.mongoURL, config.mongoSetup)
app.use(express.json())

app.listen(config.appPort, () => {
    console.log(`${config.appName} conectado à porta ${config.appPort}\nBanco de Dados Conectado!`)
})


app.use(loginRoute)
app.use(tasksRoute)
app.use(usersRoute)
app.use(rootRoute)
