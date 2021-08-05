const hash = require('./../helpers/hash')

module.exports = {
    checkFields: (req, res, next) => {
        const warns = {}
        const user = req.body
        const mailFormat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
        const passFormat = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/
        let totalWarns = 0
        if (!user.name) {
            Object.assign(warns, { totalWarns: totalWarns += 1, nameWarn: "Parâmetro 'name' Inválido" })
        }
        if (!user.telegram_ID || user.telegram_ID === undefined) {
            Object.assign(warns, { totalWarns: totalWarns += 1, telegramWarn: "Parâmetro 'telegram_ID' Inválido" })
        }
        if (!user.email || !user.email.match(mailFormat)) {
            Object.assign(warns, { totalWarns: totalWarns += 1, mailWarn: "Parâmetro 'email' Inválido" })
        }
        if (user.pass1 !== user.pass2) {
            Object.assign(warns, { totalWarns: totalWarns += 1, equalPassWarn: "Parâmetros 'pass1' e 'pass2' não são idênticos" })
        }
        if (!user.pass1 || !user.pass2 || !user.pass1.match(passFormat) || !user.pass2.match(passFormat)) {
            Object.assign(warns, { totalWarns: totalWarns += 1, passPatternWarn: "Parâmetro 'pass1' e 'pass2' requer Maiúsculas, Minúsculas, Números e Carac. Especiais!" })
        }
        if (warns.totalWarns > 0) {
            console.log(warns)
            return res.status(400).send('Não foi possivel cadastrar. Cheque seu console para mais informacoes!')
        }
        const hasehdPass = hash.genHash(req.body.pass1)
        req.body.pass1 = hasehdPass
        next()
    }
}
