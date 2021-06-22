const checkFields = require('./../middlewares/telegram-fields-signUp')
const bot = require('./../infra/telegram')
const jwt = require('./../helpers/jwt')

module.exports = class TelegramRegister {

    constructor(){
		this.registerList = []
		this.SESSION_ID = 0
    }

    async requestName(token, reqId) {
		const findRegisterList = await this.registerList.find((x => x.userData.token == token))
		console.log(this.registerList.length)
		const checkSession = jwt.verifyToken(this.token)
		if (reqId === checkSession.data.id && checkSession.data.id === findRegisterList.userData.chat.id){
			await bot.sendMessage(this.id, 'Insira seu Nome')
			return new Promise ((resolve, reject) => {
				bot.once('text', async(insertName) => {
					const isNameCorrect = checkFields.name(insertName.text)
					if(isNameCorrect === true){
						return resolve(insertName.text)

					}
					await bot.sendMessage(this.id, `Você precisa fornecer um dado válido. Digite */cadastrar* e tente novamente.`,{parse_mode:"Markdown"})
					return reject(Error ('Nome inválido para os padrões do sistema.'))
				})
			})
		}
		throw new Error('Inválido')
    }

    async requestEmail (token, reqId) {
		const findRegisterList = await this.registerList.find((x => x.userData.token == token))
		const checkSession = jwt.verifyToken(this.token)
		if (reqId === checkSession.data.id && checkSession.data.id === findRegisterList.userData.chat.id){
			await bot.sendMessage(this.id, 'Insira seu Email')
			return new Promise((resolve,reject) =>{
				bot.once('text', async(insertEmail) => {
					const isEmailCorrect = checkFields.email(insertEmail.text)
					if (isEmailCorrect === false) {
						await bot.sendMessage(this.id, `Você precisa fornecer um dado válido. Digite */cadastrar* e tente novamente.`, { parse_mode: "Markdown" })
						return reject(Error ('Email inválido'))

					}
					return resolve(insertEmail.text)
				})

			})
		}
		throw new Error('Inválido')
    }

    async requestPassword (token, reqId) {
		const findRegisterList = await this.registerList.find((x => x.userData.token == token))
		const checkSession = jwt.verifyToken(this.token)
		if (reqId === checkSession.data.id && checkSession.data.id === findRegisterList.userData.chat.id){
			await bot.sendMessage(this.id, 'Insira sua Senha\n Deve conter:\n-Maisculas\n-Minusculas\n-Numeros\n-Caracteres Especiais')
			return new Promise ((resolve,reject) =>{
				bot.on('text', async(insertPass) => {
					let password = insertPass.text
					const isPassCorrect = checkFields.pass(password)
					if(isPassCorrect === false){
						await bot.sendMessage(this.id, `Você precisa fornecer um dado válido. Digite */cadastrar* e tente novamente.`,{parse_mode:"Markdown"})
						return reject (Error('Valor digitado não válido'))

					}
					bot.deleteMessage(insertPass.chat.id,insertPass.message_id)
					return resolve(password)
				})
			})
		}
		throw new Error('Inválido')
    }

    async requestRePassword (token, reqId) {
		const findRegisterList = await this.registerList.find((x => x.userData.token == token))
		const checkSession = jwt.verifyToken(this.token)
		if (reqId === checkSession.data.id && checkSession.data.id === findRegisterList.userData.chat.id){
			await bot.sendMessage(this.id, 'Insira sua senha novamente...')
			return new Promise ((resolve,reject) =>{
				bot.on('text', async(insertRePass) => {
					let rePassword = insertRePass.text
					const isPassCorrect = checkFields.pass(rePassword)
					if(isPassCorrect === false){
						await bot.sendMessage(this.id, `Você precisa fornecer um dado válido. Digite */cadastrar* e tente novamente.`,{parse_mode:"Markdown"})
						return reject (Error('Valor digitado não válido'))

					}
					return resolve(rePassword)
				})
			})
		}
		throw new Error('Inválido')
    }

	async requestIsMatching(firstValue, secondValue, token, reqId){
		const findRegisterList = await this.registerList.find((x => x.userData.token == token))
		const checkSession = jwt.verifyToken(this.token)
		if (reqId === checkSession.data.id && checkSession.data.id === findRegisterList.userData.chat.id){
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
		throw new Error('Inválido')
    }

	sayMyName(token){
		return this.registerList.find(x => x.userData.token === token)
	}
}
