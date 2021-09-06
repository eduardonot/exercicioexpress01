/* eslint-disable no-async-promise-executor */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
const controller = require('./../controllers/telegram-controller')
const TelegramRegister = require('./../Classes/TelegramRegister')
const Register = require('./../infra/Register')
const Session = require('./../infra/Session')
const checkDate = require('./../middlewares/telegram-tasks-inputs-middleware')

module.exports = {

	checkDate: (dateInput) => { const date = checkDate.compareInput(dateInput) },

    onStart: async (chatId, userData) => {
		const getUser = await controller.getRegisterStatus(chatId, userData)
		return getUser
    },

    onSignUp: (chatId, userData) => {
		controller.setTelegramUserName(chatId, userData)
	},

	defineSession: async (userData) => {
		const getSession = await Session.getUserSession(userData.chat.id)
		if (!getSession) {
			const setToken = await Session.getUserAndSetToken(userData)
			Session.setSession(userData.chat.id, userData)
		}
		const mySessionData = await Session.sessionList.find(x => x.id === userData.from.id)
		return mySessionData
	},

	registerUser: async (userData, token) => {
		return new Promise(async (resolve, reject) => {
			const getMyRegister = await Register.sayMyName(token)
			let tryAgain = true
			// if (!getMyRegister){
				const newUser = new TelegramRegister(token, userData.id)
				const myNewRegister = newUser.registerList.push({ userData })
				const myRegister = Register.registerList.push({ userData })

				while (tryAgain === true) {
					try {
						const name = await newUser.requestName(token, userData.id)
						// console.log(name)
						const email = await newUser.requestEmail(token, userData.id)
						// console.log(email)
						const pass = await newUser.requestPassword(token, userData.id)
						// console.log(pass)
						const rePass = await newUser.requestRePassword(token, userData.id)
						// console.log(rePass)
						const isMatching = await newUser.requestIsMatching(pass, rePass, token, userData.id)

						tryAgain = false
						resolve({ name: name, email: email, pass1: isMatching, telegram_ID: userData.id })
						break
					} catch (error) {
						console.log('erro')
						tryAgain = true
					}
				}
		})
	},

	registerTask: async (userData, token) => {
		return new Promise(async (resolve, reject) => {
			const getMyRegister = await Register.sayMyName(token)
			let tryAgain = true
			const newTask = new TelegramRegister(token, userData.id)
			const myNewTaskRegister = newTask.registerList.push({ userData })
			const myTaskRegister = Register.registerList.push({ userData })
			while (tryAgain === true) {
				try {
					const title = await newTask.requestTitle(token, userData.id)
					tryAgain = false
					resolve(title)
				} catch (error) {
					console.log(error)
					tryAgain = true
				}
			}
		})
	},

	getActiveSessions: () => {
		return Session.sessionList
	}
}
