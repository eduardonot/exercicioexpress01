const express = require ('express')
const app = express ()
const validate = require('./classes/Validate')
const mongoose = require('mongoose')
const Tasks = require ('./schemas/tasks')
const db = mongoose.connection
const port = 5000
mongoose.connect('mongodb://localhost/tasks', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
})

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

const authenticate = (req, res) => {
    let warns = {}
    let userID = 0
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

    Object.assign(user, {id: userID += 1})
    res.status(201).redirect('/login')
}


app.post('/set-user',authenticate, function(req, res){
    let user = req.body
    authenticate(user)
    res.redirect('/login')
})

app.post('/task', (req, res) =>{
    if(!req.body.title){
        return res.status(400).send('Título não informado.')
    }

    Tasks.create(req.body)
        .then(data => res.json(data))
        .catch(err => res.status(400).send(err))
})

 

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