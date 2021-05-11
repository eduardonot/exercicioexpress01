const express = require ('express')
const app = express ()
const validate = require('./classes/Validate')

app.use(express.json())
const port = 5000

app.get('/', function (req, res){
    res.send('Bem-Vindo!')
})

app.post('/set-user', (req, res) => {
    let user = req.body
    let userID = 0
    
    if (!user['name']){
        res.send("Insira um valor no campo name")
        res.send("Teste")
    }
    Object.assign(user, {id: userID += 1})
    res.json(user)
})

app.listen(port, () => {
    console.log(`Conectado à porta ${port}`)
})