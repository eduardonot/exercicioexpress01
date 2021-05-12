const express = require ('express')
const app = express ()
const validate = require('./classes/Validate')

app.use(express.json())
const port = 5000

app.get('/', function (req, res){
    res.send('Bem-Vindo!')
})

app.post('/set-user', function(req, res){
    let userID = 0
    let user = {
        name: req.body.name,
        email: req.body.email,
        pass1: req.body.pass1,
        pass2: req.body.pass2,
        telegram_ID: req.body.telegram_ID
    }
    const check = new validate (user)
    check.userSignUp()

    if(check.userSignUp() == false){
        console.log(check.warns)
        return res.send(`Não foi possível cadastrar \n`)
    }
    Object.assign(user, {id: userID += 1})
    console.log('Usuário cadastrado com sucesso!')
    return res.json(user)
})

app.post('/login', function(req, res){
    let user = {
        name: req.body.name,
        pass: req.body.pass
    }
    const check = new validate(user)
    

    res.send('Login em manutenção')
})



app.listen(port, () => {
    console.log(`Conectado à porta ${port}`)
})