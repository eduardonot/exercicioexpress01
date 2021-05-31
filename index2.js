const express = require('express')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
// const jwt = require('jsonwebtoken')

const UserSchema = require('./schemas/user')

const app = express()
const appPort = 3000

const mongoURL = 'mongodb://localhost/todo'
const mongoSetup = {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
}

const bcryptConfig = {
    saltRounds: 10
}

// const jwtSecretPassword = 'secretHashPassword'

mongoose.connect(mongoURL, mongoSetup)
    .then(() => { console.log('Banco Conectado')})
    .catch(() => { console.log('Banco não Conectado')})


app.use(express.json())

// const genToken = (user) => {
//     return jwt.sign({
//         exp: Math.floor(Date.now() / 1000) + (60 * 60),
//         data: {
//             id: user._id,
//             name: user.name,
//             email: user.email
//         }
//     }, jwtSecretPassword)
// }

// const verifyToken = (token) => {
//     return jwt.verify(token, jwtSecretPassword)
// }

const genHash = (field) => {
    return bcrypt.hashSync(field, bcryptConfig.saltRounds)
}

const compareHash = (currentField, hash) => {
    return bcrypt.compareSync(currentField, hash)
}

const requiredFieldsToCreateUSer = (req, res, next) => {

    const {name, email, password, repassword} = req.body

    if (!name || !email || !password || !repassword) {
        res.status(400).send('Campos obrigatorios não informados')
        return
    }
    
    next()
}

const requiredFieldsToLogin = (req, res, next) => {

    const {email, password} = req.body

    if (!email || !password) {
        res.status(400).send('Campos obrigatorios não informados')
        return
    }
    
    next()
}

const checkEqualPassword = (req, res, next) => {
    const {password, repassword} = req.body

    password !== repassword ? res.status(400).send('Senhas inválidas') : next()
}


app.post('/user', requiredFieldsToCreateUSer, checkEqualPassword, (req, res) => {
    
    delete req.body.repassword
    req.body.password = genHash(req.body.password)

    UserSchema.create(req.body)
        .then(data => res.json(data))
        .catch(err => res.status(400).send(err))
})

app.get('/user', (req, res) => {
    UserSchema.find().select('name email')
        .then(data => res.json(data))
        .catch(err => res.status(400).send(err))
})

app.post('/login', requiredFieldsToLogin, (req, res) => {
    UserSchema.findOne({email: req.body.email})
        .then((data) => {

            if (!data) return res.status(404).send('Usuario Nao encontrado')

            const checkPassword = compareHash(req.body.password, data.password)

            if (!checkPassword) return res.status(401).send('Senha Inválida')

            res.json({
                token: 'será gerado um token, logado com sucesso!'
                // token: genToken(data)
            })

        })
        .catch(err => res.status(400).send(err))
})

// app.get('/check-token', (req, res) => {
//     const validToken = verifyToken(req.headers.authorization)
    
//     validToken ? res.json(validToken.data) : res.status(401).send('Token Invalido')
// })

app.listen(appPort, () => {
    console.log('App rodando ')
})
