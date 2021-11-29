const hash = require('./../helpers/hash')

module.exports = {
    checkFields: (req, res, next) => {
        const warns = {}
        const user = req.body
        const mailFormat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
        const passFormat = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/
        let totalWarns = 0
        if (!user.name) {
			totalWarns += 1
            Object.assign(warns, { nameWarn: "Nome inválido" })
        }
        // if (!user.telegram_ID || user.telegram_ID === undefined) {
        //     Object.assign(warns, { totalWarns: totalWarns += 1, telegramWarn: "Parâmetro 'telegram_ID' Inválido" })
        // }
        if (!user.email || !user.email.match(mailFormat)) {
			totalWarns += 1
            Object.assign(warns, { mailWarn: "Email Inválido" })
        }
        if (user.pass1 !== user.pass2) {
			totalWarns += 1
            Object.assign(warns, { equalPassWarn: "Senhas não são idênticas" })
        }
        if (!user.pass1 || !user.pass2 || !user.pass1.match(passFormat) || !user.pass2.match(passFormat)) {
			totalWarns += 1
            Object.assign(warns, { passPatternWarn: "Senhas requerem Maiúsculas, Minúsculas, Números e Carac. Especiais!" })
        }
        if (totalWarns > 0) {
            return res.status(400).send(warns)
        }
        const hasehdPass = hash.genHash(req.body.pass1)
        req.body.pass1 = hasehdPass
        next()
    }
}
