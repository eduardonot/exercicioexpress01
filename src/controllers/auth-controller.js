const authService = require('./../repository/auth-repository')
const bcrypt = require ('bcrypt')
const jwt = require ('./../helpers/jwt')
const telegramHelper = require('./../helpers/telegram')

module.exports = {
    login: (req, res) => {
        authService.post(req.body)
            .then((data) => {
                if (!data) {
                    return res.status(404).send('Usuário não encontrado!')
                }
                const checkPass = bcrypt.compareSync(req.body.pass1, data.pass1)
                if (checkPass){
                    telegramHelper.resMessage(data.telegram_ID)
                    res.json({token: jwt.genToken(data)})
                } else {
                    return res.status(400).send('Senha inválida')
                }
            })
            .catch(err => res.status(400).send(err))
    }
}