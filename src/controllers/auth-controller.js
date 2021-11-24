const authService = require('./../repository/auth-repository')
const bcrypt = require('bcrypt')
const jwt = require('./../helpers/jwt')

module.exports = {
    login: (req, res, next) => {
        authService.post(req.body)
            .then((data) => {
                if (!data) {
                    return res.status(404).send('Usuário não encontrado!')
                }
                const checkPass = bcrypt.compareSync(req.body.pass1, data.pass1)
                if (checkPass) {
                    res.json({ token: jwt.genToken(data), user: { name: data.name, email: data.email, picture: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fd2kf8ptlxcina8.cloudfront.net%2FAI80KTLQZO-preview.png&f=1&nofb=1' } })
                    next()
                } else {
                    return res.status(400).send('Senha inválida')
                }
            })
            .catch(err => console.log(err))
    }
}
