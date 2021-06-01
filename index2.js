const express = require ('express')
const mongoose = require('mongoose')
const loginRoute = require('./routes/login')
const tasksRoute = require('./routes/tasks')
const usersRoute = require('./routes/users')
const rootRoute = require('./routes/root')

const app = express ()
const port = 5000
const db = mongoose.connection
mongoose.connect('mongodb://localhost/taskManager', 
{useNewUrlParser: true, 
useUnifiedTopology: true,
useFindAndModify: false,
useCreateIndex: true})

app.use(express.json())
db.on('error', console.error.bind(console, 'Connection error.'))
db.once('open', () => {
    app.listen(port, () => {
        console.log(`Conectado à porta ${port}\nBanco de Dados Conectado!`)
    })
})

app.use(loginRoute)
app.use(tasksRoute)
app.use(usersRoute)
app.use(rootRoute)
