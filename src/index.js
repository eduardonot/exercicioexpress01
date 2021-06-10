const express = require ('express')
const db = require('./infra/mongodb')
const app = express ()
const telegramRoute = require('./routes/telegram-route')


app.use(express.json())
db.connect(app)

const rootRoute = require('./routes/root')
const loginRoute = require('./routes/login')
const usersRoute = require('./routes/users')
const tasksRoute = require('./routes/tasks')

rootRoute(app)
loginRoute(app)
usersRoute(app)
tasksRoute(app)
telegramRoute(app)