const express = require('express')
const db = require('./infra/mongodb')
const app = express()
const telegramRoute = require('./routes/telegram-route')
const session = require('express-session')
const config = require('./config')

app.use(express.json())
db.connect(app)

app.use(session({
	secret: config.jwtSecretPassword,
	resave: false,
	saveUninitialized: true,
	cookie: {
		maxAge: 1000 * 24 * 60 * 60
	}
}))

const rootRoute = require('./routes/root')
const loginRoute = require('./routes/login')
const usersRoute = require('./routes/users')
const tasksRoute = require('./routes/tasks')

rootRoute(app)
loginRoute(app)
usersRoute(app)
tasksRoute(app)
telegramRoute(app)
