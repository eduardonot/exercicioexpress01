const authService = require('./../repository/auth-repository')
const bcrypt = require('bcrypt')
const jwt = require('./../helpers/jwt')

module.exports = {
    login: (req, res) => {
        authService.post(req.body)
            .then((data) => {
                if (!data) {
                    return res.status(404).send('Usuário não encontrado!')
                }
                const checkPass = bcrypt.compareSync(req.body.pass1, data.pass1)
                if (checkPass) {
                    res.json({ token: jwt.genToken(data) })
                } else {
                    return res.status(400).send('Senha inválida')
                }
            })
            .catch(err => console.log(err))
    }
}
