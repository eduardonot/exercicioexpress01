const checkFields = require('./../middlewares/telegram-fields-signUp')
const bot = require('./../infra/telegram')
const jwt = require('./../helpers/jwt')

module.exports = class TelegramRegister {

    constructor(userData){
        this.name = userData.chat.first_name
        this.id = userData.chat.id
        this.text = userData.text
        this.userName = userData.chat.username
    }

    requestName(session) {
		const checkSession = jwt.verifyToken(session)
		if (checkSession != false){
			bot.sendMessage(this.id, 'Insira seu Nome')
			return new Promise ((resolve, reject) => {
				bot.once('text', (insertName) => {
					const isNameCorrect = checkFields.name(insertName.text)
					if(isNameCorrect === true){
						return resolve(insertName.text)

					}
					bot.sendMessage(this.id, `Você precisa fornecer um dado válido. Digite */cadastrar* e tente novamente.`,{parse_mode:"Markdown"})
					return reject(Error ('Nome inválido para os padrões do sistema.'))
				})
			})
		}
    }

    requestEmail (session) {
		const checkSession =  jwt.verifyToken(session)
		if (checkSession != false){
			bot.sendMessage(this.id, 'Insira seu Email')
			return new Promise((resolve,reject) =>{
				bot.once('text', (insertEmail) => {
					const isEmailCorrect = checkFields.email(insertEmail.text)
					if (isEmailCorrect === false) {
						bot.sendMessage(this.id, `Você precisa fornecer um dado válido. Digite */cadastrar* e tente novamente.`, { parse_mode: "Markdown" })
						return reject(Error ('Email inválido'))

					}
					return resolve(insertEmail.text)
				})

			})
		}
    }

    requestPassword (session) {
		const checkSession =  jwt.verifyToken(session)
		if (checkSession != false){
			bot.sendMessage(this.id, 'Insira sua Senha\n Deve conter:\n-Maisculas\n-Minusculas\n-Numeros\n-Caracteres Especiais')
			return new Promise ((resolve,reject) =>{
				bot.on('text', (insertPass) => {
					let password = insertPass.text
					var passID1 = insertPass.message_id
					const isPassCorrect = checkFields.pass(password)
					if(isPassCorrect === false){
						bot.sendMessage(this.id, `Você precisa fornecer um dado válido. Digite */cadastrar* e tente novamente.`,{parse_mode:"Markdown"})
						return reject (Error('Valor digitado não válido'))

					}
					return resolve(password)
				})
			})
		}
    }

    requestRePassword (session) {
		const checkSession =  jwt.verifyToken(session)
		if (checkSession != false){
			bot.sendMessage(this.id, 'Insira sua senha novamente...')
			return new Promise ((resolve,reject) =>{
				bot.on('text', (insertRePass) => {
					let rePassword = insertRePass.text
					var passID2 = insertRePass.message_id
					const isPassCorrect = checkFields.pass(rePassword)
					if(isPassCorrect === false){
						bot.sendMessage(this.id, `Você precisa fornecer um dado válido. Digite */cadastrar* e tente novamente.`,{parse_mode:"Markdown"})
						return reject (Error('Valor digitado não válido'))

					}
					return resolve(rePassword)
				})
			})
		}
    }

	requestIsMatching(firstValue, secondValue, session){
		const checkSession =  jwt.verifyToken(session)
		if (checkSession != false){
			return new Promise ((resolve, reject) => {
				const isPassMatching = checkFields.passMatch(firstValue, secondValue)
				if (isPassMatching === false) {
					bot.sendMessage(this.id, `Senhas não conferem. Digite */cadastrar* e tente novamente.`, { parse_mode: "Markdown" })
					console.log('Unmatch')
					return reject(false)
				}
				bot.sendMessage(this.id, 'Cadastro concluído com sucesso!')
				console.log('Matched')
				return resolve(true)
			})
		}
    }

}
