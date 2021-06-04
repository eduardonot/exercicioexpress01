module.exports = {
    checkFields: (req, res, next) => {
        if (!req.body.email || !req.body.pass1){
            return res.status(400).send('Email e Senha devem ser digitados!')
        }
        next()
    }
}