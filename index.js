const express = require ('express')
const bcrypt = require('bcrypt')
const mongoose = require('mongoose')
const Tasks = require ('./schemas/tasks')
const Users = require ('./schemas/users')
const app = express ()
const db = mongoose.connection
const port = 5000
const saltRounds = 12

mongoose.connect('mongodb://localhost/taskManager', {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true})

app.use(express.json())
db.on('error', console.error.bind(console, 'Connection error.'))
db.once('open', () => {
    app.listen(port, () => {
        console.log(`Conectado à porta ${port}\nBanco de Dados Conectado!`)
    })
})


////////////////
// MIDDLEWARE //
////////////////

const authUserSignUp = (req, res, next) => {
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
    next()
}

const genHash = (value) => {
    return bcrypt.hashSync(value, saltRounds)
}

const authIsLogged = (req, res, next) => {
    if(!req.session._id){
        res.status(401).send('Você precisa estar logado!')
    } else {
        next()
    }
}
///////////
// ROTAS //
///////////

app.get('/', function (req, res){
    res.send('Bem-Vindo!')
})

// USER
app.post('/set-user',authUserSignUp, function(req, res){
    req.body.pass1 = genHash(req.body.pass1)
    Users.create(req.body)
        .then(data => res.json(data))
        .catch(err => res.status(400).send(err))
})

app.get('/get-user', (req, res) => {
    // METODO 1
    //db.collection('users').createIndex({name: "text"})
    // Users.find(
    //     {$text:
    //         {$search: req.body.name}}
    // )
    //     .then(data => res.json(data))
    //     .catch(err => res.status(400).send(err))

    // METODO 2
    Users.find({
        $and: [
            {name: new RegExp(req.body.name, 'i')},
            {email: new RegExp(req.body.email, 'i')}
        ]
    })
        .select('name email')
        .then(data => res.json(data))
        .catch(err => res.status(400).send(err))


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

app.get('/tasks-show/:id?:title?:status?', (req, res) => {
    const task_id = req.query.id
    const title = req.query.title
    const status = req.query.status
    const query = {}
    if(!task_id && !title && !status){
        Tasks.find()
            .then(data => res.json(data))
            .catch(err => res.status(400).send(err))
        return
    }
    if(task_id){
        Object.assign(query, {_id:task_id})
    }
    if(title){
        Object.assign(query, {title:title})
    }
    if(status){
        Object.assign(query, {status:status})
    }
    console.log(query)
    Tasks.find(query)
        .then(data => res.json(data))
        .catch(err => res.status(400).send(err))
}) 
 
// LOGIN
app.get('/login', (req, res) => {
    res.send('Tela de Login')
})

app.post('/login', function(req, res){

    if (!req.body.email || !req.body.pass1){
        return res.status(400).send('Email e Senha devem ser digitados!')
    }
    Users.findOne({email:req.body.email})
        .then((data) => {
            console.log(data)
            bcrypt.compareSync(req.body.pass1, data.pass1) ? res.json({token: 'asdDad*7(¨&¨%**84#'}) : res.status(400).send('Senha inválida')
        })
        .catch(err => res.status(400).send(err))
    
})