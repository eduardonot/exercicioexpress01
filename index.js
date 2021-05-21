const express = require ('express')
const app = express ()
const validate = require('./classes/Validate')
const mongoose = require('mongoose')
const Tasks = require ('./schemas/tasks')
const Users = require ('./schemas/users')
const db = mongoose.connection
const port = 5000

mongoose.connect('mongodb://localhost/taskManager', {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true})

app.use(express.json())
db.on('error', console.error.bind(console, 'Connection error.'))
db.once('open', () => {
    app.listen(port, () => {
        console.log(`Conectado à porta ${port} e Banco de Dados Conectado!`)
    })
})

app.get('/', function (req, res){
    res.send('Bem-Vindo!')
})

const authUserSignUp = (req, res) => {
    let warns = {}
    let user = req.body
    let mailFormat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
    let passFormat = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/
    let totalWarns = 0
    if (!user.name){
        Object.assign(warns, {totalWarns: totalWarns += 1, nameWarn: "Parâmetro 'name' Inválido"})
    }
    if (!user.telegram_ID || user.telegram_ID == undefined){
        Object.assign(warns, {totalWarns: totalWarns += 1, telegramWarn: "Parâmetro 'telegram_ID' Inválido"})
    }
    if (!user.email || !user.email.match(mailFormat)){
        Object.assign(warns, {totalWarns: totalWarns += 1, mailWarn: "Parâmetro 'email' Inválido"})
    }
    if (user.pass1 !== user.pass2){
        Object.assign(warns, {totalWarns: totalWarns += 1, equalPassWarn: "Parâmetros 'pass1' e 'pass2' não são idênticos"})
    }
    if (!user.pass1 || !user.pass2 || !user.pass1.match(passFormat) || !user.pass2.match(passFormat)){
        Object.assign(warns, {totalWarns: totalWarns += 1, passPatternWarn: "Parâmetro 'pass1' e 'pass2' requer Maiúsculas, Minúsculas, Números e Carac. Especiais!"})
    }
    if(warns.totalWarns > 0){
        console.log(warns)
        return res.status(400).send('Não foi possivel cadastrar. Cheque seu console para mais informacoes!')
    }
    Users.create(req.body)
        .then(data => res.json(data))
        .catch(err => res.status(400).send(err))
}

// USER
app.post('/set-user',authUserSignUp, function(req, res){
    let user = req.body
    authUserSignUp(user)
    res.redirect('/login')
})

// TASKS
app.post('/task-create', (req, res) =>{
    if(!req.body.title){
        return res.status(400).send('Título não informado.')
    }

    Tasks.create(req.body)
        .then(data => res.json(data))
        .catch(err => res.status(400).send(err))
})

app.get('/task-show/:id?&:title?&:status?', (req, res) => {
    // buscar por id title ou status
    if (!req.query){
        Tasks.find()
    }
    const task_id = req.query.id
    const title = req.query.title
    const status = req.query.status
    Tasks.find({
        id: task_id,
        title: title,
        status: status
    })
}) 
 
// LOGIN
app.get('/login', (req, res) => {
    res.send('Tela de Login')
})

app.post('/login', function(req, res){
    let user = {
        name: req.body.name,
        pass: req.body.pass
    }
    const check = new validate(user)
    

    res.send('Login em manutenção')
})