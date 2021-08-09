/* eslint-disable prefer-promise-reject-errors */
/* eslint-disable no-undef */
const checkFields = require('./../middlewares/telegram-fields-signUp')
const checkDate = require('./../middlewares/telegram-tasks-inputs-middleware')
const bot = require('./../infra/telegram')
const hash = require('./../helpers/hash')

module.exports = class TelegramRegister {
	// ESTA CLASSE É RESPONSÁVEL POR
	// REGISTRAR USUARIOS
	// (TODO) EDITAR USUARIOS
	// (TODO) REGISTRAR TAREFAS
	// (TODO) EDITAR TAREFAS

    constructor (token, reqId) {
		this.token = token
		this.reqId = reqId
		this.registerList = []
    }

	// INSERE USERNAME

    async requestName (token, reqId) {
		await bot.sendMessage(this.reqId, 'Insira seu Nome')
		return new Promise((resolve, reject) => {
			bot.once('text', async (insertName) => {
				if (insertName.chat.id !== this.reqId) {
					await bot.sendMessage(reqId, `Houve um problema durante sua requisição. Tente novamente!`)
					return reject('conflito de tokens durante o tráfego de dados')
				}
				const isNameCorrect = checkFields.name(insertName.text)
				if (isNameCorrect === true) {
					console.log(insertName.text)
					return resolve(insertName.text)
				}
				await bot.sendMessage(this.reqId, `Nome: Você precisa fornecer um dado válido. Digite */cadastrar* e tente novamente.`, { parse_mode: "Markdown" })
				return reject(Error('Nome inválido para os padrões do sistema.'))
			})
		})
    }

	// INSERE EMAIL
    async requestEmail (token, reqId) {
		await bot.sendMessage(this.reqId, 'Insira seu Email')
		return new Promise((resolve, reject) => {
			bot.once('text', async (insertEmail) => {
				if (insertEmail.chat.id !== this.reqId) {
					await bot.sendMessage(reqId, `Houve um problema durante sua requisição. Tente novamente!`)
					return reject('conflito de tokens durante o tráfego de dados')
				}
				const isEmailCorrect = checkFields.email(insertEmail.text)
				if (isEmailCorrect === false) {
					await bot.sendMessage(this.reqId, `Email: Você precisa fornecer um dado válido. Digite */cadastrar* e tente novamente.`, { parse_mode: "Markdown" })
					return reject(Error('Email inválido'))
				}
				return resolve(insertEmail.text)
			})
		})
    }

	// INSERE PASSWORD
    async requestPassword (token, reqId) {
		await bot.sendMessage(this.reqId, 'Insira sua Senha\n Deve conter:\n-Maisculas\n-Minusculas\n-Numeros\n-Caracteres Especiais')
		return new Promise((resolve, reject) => {
			bot.once('text', async (insertPass) => {
				if (insertPass.chat.id !== this.reqId) {
					await bot.sendMessage(reqId, `Houve um problema durante sua requisição. Tente novamente!`)
					return reject('conflito de tokens durante o tráfego de dados')
				}
				const password = insertPass.text
				const isPassCorrect = checkFields.pass(password)
				if (isPassCorrect === false) {
					await bot.sendMessage(this.reqId, `Pass1: Você precisa fornecer um dado válido. Digite */cadastrar* e tente novamente.`, { parse_mode: "Markdown" })
					return reject(Error('Valor digitado não válido'))
				}
				bot.deleteMessage(reqId, insertPass.message_id)
				return resolve(password)
			})
		})
    }

	// INSERE REPASSWORD
    async requestRePassword (token, reqId) {
		await bot.sendMessage(this.reqId, 'Insira sua senha novamente...')
		return new Promise((resolve, reject) => {
			bot.once('text', async (insertRePass) => {
				if (insertRePass.chat.id !== this.reqId) {
					await bot.sendMessage(reqId, `Houve um problema durante sua requisição. Tente novamente!`)
					return reject('conflito de tokens durante o tráfego de dados')
				}
				const rePassword = insertRePass.text
				const isPassCorrect = checkFields.pass(rePassword)
				if (isPassCorrect === false) {
					await bot.sendMessage(this.reqId, `rePass: Você precisa fornecer um dado válido. Digite */cadastrar* e tente novamente.`, { parse_mode: "Markdown" })
					return reject(Error('Valor digitado não válido'))
				}
				bot.deleteMessage(reqId, insertRePass.message_id)
				return resolve(rePassword)
			})
		})
    }

	// COMPARA PASSWORD E GERA HASH
	async requestIsMatching (firstValue, secondValue, token, reqId) {
		return new Promise((resolve, reject) => {
			const isPassMatching = checkFields.passMatch(firstValue, secondValue)
			if (isPassMatching === false) {
				bot.sendMessage(this.reqId, `Senhas não conferem. Digite */cadastrar* e tente novamente.`, { parse_mode: "Markdown" })
				console.log('Unmatch')
				return reject(false)
			}
			const hashedPassword = hash.genHash(firstValue)
			bot.sendMessage(this.reqId, 'Cadastro concluído com sucesso!')
			console.log('Matched')
			return resolve(hashedPassword)
		})
	}
	// FIM DE REGISTRO DE USUARIO

	// REGISTRO DE TAREFAS
	async requestTitle (token, reqId) {
		// await bot.sendMessage(this.reqId, `Insira sua tarefa\n Ex. "_Médico: Dr. Silva no dia 21/12/2021_"`, { parse_mode: 'Markdown' })
		return new Promise((resolve, reject) => {
			bot.once('text', async (insertTask) => {
				if (insertTask.chat.id !== this.reqId) {
					// await bot.sendMessage(reqId, `Houve um problema durante sua requisição. Tente novamente!`)
					return reject('conflito de tokens durante o tráfego de dados')
				}
				const getTaskPatterns = checkDate.compareInput(insertTask.text)
				if (getTaskPatterns !== false) {
					return resolve(getTaskPatterns)
				}
				// await bot.sendMessage(this.reqId, `Task: Você precisa fornecer um dado válido. Tente novamente.`, { parse_mode: "Markdown" })
				return reject(Error('Nome inválido para os padrões do sistema.'))
			})
		})
    }

	// FIM DE REGISTRO DE TAREFAS
	sayMyName (token) {
		return this.registerList.find(x => x.userData.token === token)
	}
}
