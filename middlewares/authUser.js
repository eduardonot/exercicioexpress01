const bcrypt = require('bcrypt')
const jwt = require ('jsonwebtoken')
const Users = require ('./../schemas/users')
const saltRounds = 12

const jwtSecretPassword = '0🤣🎆D🎍1🧨l🎨3🥽せひけのR👱🏻‍♂️4👩🏻‍🦱6%$h#.👶🏻ひ👱🏿‍♀️🎅🏿©↘↛↸↹¾ⅤⅫ⅒(☞ﾟヮﾟ)☞☜(ﾟヮﾟ☜)o((⊙﹏⊙))o.®༼ つ ◕_◕ ༽つ▓WND1l3r4!░«▒▓│🧛‍♂️🧄🔟®©💲✔'

const checkFields = (req, res, next) => {
    let warns = {}
    let user = req.body
    let mailFormat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
    let passFormat = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/
    let totalWarns = 0
    if (!user.name){
        Object.assign(warns, {totalWarns: totalWarns += 1, nameWarn: "Parâmetro 'name' Inválido"})
    }
    if (!user.telegram_ID || user.telegram_ID == undefined){
        Object.assign(warns, {totalWarns: totalWarns += 1, telegramWarn: "Parâmetro 'telegram_ID' Inválido"})
    }
    if (!user.email || !user.email.match(mailFormat)){
        Object.assign(warns, {totalWarns: totalWarns += 1, mailWarn: "Parâmetro 'email' Inválido"})
    }
    if (user.pass1 !== user.pass2){
        Object.assign(warns, {totalWarns: totalWarns += 1, equalPassWarn: "Parâmetros 'pass1' e 'pass2' não são idênticos"})
    }
    if (!user.pass1 || !user.pass2 || !user.pass1.match(passFormat) || !user.pass2.match(passFormat)){
        Object.assign(warns, {totalWarns: totalWarns += 1, passPatternWarn: "Parâmetro 'pass1' e 'pass2' requer Maiúsculas, Minúsculas, Números e Carac. Especiais!"})
    }
    if(warns.totalWarns > 0){
        console.log(warns)
        return res.status(400).send('Não foi possivel cadastrar. Cheque seu console para mais informacoes!')
    }
    req.body.pass1 = genHash(req.body.pass1)
    next()
}
const genToken = (user) => {
    return jwt.sign({
        exp:Math.floor(Date.now() / 1000) + (60 * 60),
        data:{
            id: user._id,
            name: user.name,
            email: user.email
        }
    }, jwtSecretPassword)
}


const verifyToken = (token) =>{
    try{
        return jwt.verify(token, jwtSecretPassword)
    } catch (error){
        return false
    }
}

const verifyUserToken = (req, res, next) => {
    const token = req.headers.authorization
    if(!token){
        return res.status(401).send('Token não informado')
    }
    const validToken = verifyToken(token)

    if(validToken){
        Object.assign(req.body, {userId: validToken.data.id})
        return next()
    }
    return res.status(401).send('Token inválido')
}

const genHash = (value) => {
    return bcrypt.hashSync(value, saltRounds)
}

const authLogin = (req, res, next) => {
    if (!req.body.email || !req.body.pass1){
		return res.status(400).send('Email e Senha devem ser digitados!')
	}
	Users.findOne({email:req.body.email})
		.then((data) => {
			if (!data) {
				return res.status(404).send('Usuário não encontrado!')
			}
			const checkPass = bcrypt.compareSync(req.body.pass1, data.pass1)
			if (checkPass){
				return res.json({token: genToken(data)})
			} else {
				return res.status(400).send('Senha inválida')
			}
		})
		.catch(err => res.status(400).send(err))
}

const isLogged = (req, res, next) => {
    if(!req.session._id){
        res.status(401).send('Você precisa estar logado!')
    } else {
        next()
    }
}

module.exports = {checkFields, genToken, verifyUserToken, genHash, authLogin,isLogged}