app.get('/login', (req, res) => {
    res.send('Tela de Login')
})

app.post('/login', function(req, res){

    if (!req.body.email || !req.body.pass1){
        return res.status(400).send('Email e Senha devem ser digitados!')
    }
    Users.findOne({email:req.body.email})
        .then((data) => {
            bcrypt.compareSync(req.body.pass1, data.pass1) ? res.json({token: '!q@@wW4eFD5c.r.az,x.,hh,j.,y¨%7*`~?}[+_)XZC//*/WWW.y0ut##'}) : res.status(400).send('Senha inválida')
        })
        .catch(err => res.status(400).send(err))
    
})