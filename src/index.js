const express = require('express')
const db = require('./infra/mongodb')
const app = express()
const telegramRoute = require('./routes/telegram-route')
const cookieSession = require('cookie-session')
const config = require('./config')
const cors = require('cors')

app.use(express.json())
app.use(cors())
db.connect(app)

// app.use(session({
// 	secret: config.jwtSecretPassword,
// 	resave: false,
// 	saveUninitialized: true,
// 	cookie: {
// 		maxAge: 1000 * 24 * 60 * 60
// 	}
// }))

app.use(cookieSession({
	name: 'session',
	secret: config.jwtSecretPassword,
	keys: ['chave1'],
	maxAge: 24 * 60 * 60 * 1000
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
