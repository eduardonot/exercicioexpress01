const express = require ('express')
const app = express ()
const validate = require('./classes/Validate')

app.use(express.json())
const port = 5000

app.get('/', function (req, res){
    res.send('Bem-Vindo!')
})

const authenticate = (req, res, next) => {
    let userID = 0
    let usuario = req.body
    const check = new validate (usuario)
    check.userSignUp()

    if(check.userSignUp() == false){
        console.log(check.warns)
        res.status(400).send('Não foi possivel cadastrar. Cheque seu console para mais informacoes!')
    }
    Object.assign(usuario, {id: userID += 1})
    res.status(201).redirect('/login')
}


app.post('/set-user',authenticate, function(req, res){
    let user = req.body
    authenticate(user)
    res.redirect('/login')
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



app.listen(port, () => {
    console.log(`Conectado à porta ${port}`)
})