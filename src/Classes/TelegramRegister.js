const checkFields = require('./../middlewares/telegram-fields-signUp')
const bot = require('./../infra/telegram')
const jwt = require('./../helpers/jwt')

module.exports = class TelegramRegister {

    constructor(token, reqId){
		this.token = token
		this.reqId = reqId
		this.registerList = []
    }

    async requestName(token, reqId) {

		await bot.sendMessage(this.reqId, 'Insira seu Nome')
			return new Promise ((resolve, reject) => {
				bot.once('text', async(insertName) => {
					if (insertName.chat.id !== this.reqId){
						await bot.sendMessage(reqId, `Houve um problema durante sua requisição. Tente novamente!`)
						return reject('conflito de tokens durante o tráfego de dados')
					}
					const isNameCorrect = checkFields.name(insertName.text)
					if(isNameCorrect === true){
						console.log(insertName.text)
						return resolve(insertName.text)
					}
					await bot.sendMessage(this.reqId, `Você precisa fornecer um dado válido. Digite */cadastrar* e tente novamente.`,{parse_mode:"Markdown"})
					return reject(Error ('Nome inválido para os padrões do sistema.'))
				})
			})

    }

    async requestEmail (token, reqId) {
		await bot.sendMessage(this.reqId, 'Insira seu Email')
		return new Promise((resolve,reject) =>{
			bot.once('text', async(insertEmail) => {
				if (insertEmail.chat.id !== this.reqId){
					await bot.sendMessage(reqId, `Houve um problema durante sua requisição. Tente novamente!`)
					return reject('conflito de tokens durante o tráfego de dados')
				}
				const isEmailCorrect = checkFields.email(insertEmail.text)
				if (isEmailCorrect === false) {
					await bot.sendMessage(this.reqId, `Você precisa fornecer um dado válido. Digite */cadastrar* e tente novamente.`, { parse_mode: "Markdown" })
					return reject(Error ('Email inválido'))

				}
				return resolve(insertEmail.text)
			})

		})

    }

    async requestPassword (token, reqId) {
		await bot.sendMessage(this.reqId, 'Insira sua Senha\n Deve conter:\n-Maisculas\n-Minusculas\n-Numeros\n-Caracteres Especiais')
		return new Promise ((resolve,reject) =>{
			bot.on('text', async(insertPass) => {
				if (insertPass.chat.id !== this.reqId){
					await bot.sendMessage(reqId, `Houve um problema durante sua requisição. Tente novamente!`)
					return reject('conflito de tokens durante o tráfego de dados')
				}
				let password = insertPass.text
				const isPassCorrect = checkFields.pass(password)
				if(isPassCorrect === false){
					await bot.sendMessage(this.reqId, `Você precisa fornecer um dado válido. Digite */cadastrar* e tente novamente.`,{parse_mode:"Markdown"})
					return reject (Error('Valor digitado não válido'))

				}
				bot.deleteMessage(this.reqId, insertPass.message_id)
				return resolve(password)
			})
		})
    }

    async requestRePassword (token, reqId) {
		await bot.sendMessage(this.reqId, 'Insira sua senha novamente...')
		return new Promise ((resolve,reject) =>{
			bot.on('text', async(insertRePass) => {
				if (insertRePass.chat.id !== this.reqId){
					await bot.sendMessage(reqId, `Houve um problema durante sua requisição. Tente novamente!`)
					return reject('conflito de tokens durante o tráfego de dados')
				}
				let rePassword = insertRePass.text
				const isPassCorrect = checkFields.pass(rePassword)
				if(isPassCorrect === false){
					await bot.sendMessage(this.reqId, `Você precisa fornecer um dado válido. Digite */cadastrar* e tente novamente.`,{parse_mode:"Markdown"})
					return reject (Error('Valor digitado não válido'))

				}
				return resolve(rePassword)
			})
		})
    }

	async requestIsMatching(firstValue, secondValue, token, reqId){
		return new Promise ((resolve, reject) => {
			const isPassMatching = checkFields.passMatch(firstValue, secondValue)
			if (isPassMatching === false) {
				bot.sendMessage(this.reqId, `Senhas não conferem. Digite */cadastrar* e tente novamente.`, { parse_mode: "Markdown" })
				console.log('Unmatch')
				return reject(false)
			}
			bot.sendMessage(this.reqId, 'Cadastro concluído com sucesso!')
			console.log('Matched')
			return resolve(true)
		})
	}

	sayMyName(token){
		return this.registerList.find(x => x.userData.token === token)
	}
}
