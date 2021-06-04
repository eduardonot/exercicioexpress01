const config = require('./config')
const express = require ('express')
const db = require('./infra/mongodb')
const app = express ()

const rootRoute = require('./routes/root')
const loginRoute = require('./routes/login')
// const usersRoute = require('./routes/users')
// const tasksRoute = require('./routes/tasks')
app.use(express.json())
db.connect(app)

rootRoute(app)
loginRoute(app)