const express = require ('express')
const app = express ()

app.use(express.json())
const port = 5000


app.post('/set-user', (req, res) => {
    let user = {
        "name": "Eduardo",
        "email": "eduardo_not@hotmail.com"
    }
    let userID = 0
    if (user = {}){
        res.send("Invalido")
    }
    Object.assign(user, {id: userID += 1})
    res.json(user)
})

app.listen(port, () => {
    console.log(`Conectado à porta ${port}`)
})