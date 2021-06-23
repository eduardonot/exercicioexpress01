const bot = require('./../infra/telegram')
const controller = require ('./../controllers/telegram-controller')
const TelegramRegister = require('./../Classes/TelegramRegister')
const Register = require('./../infra/Register')
const Session = require('./../infra/Session')

module.exports = {

    onStart: async (chatId, userData) =>{
		const getUser = await controller.getRegisterStatus(chatId, userData)
		if (getUser == !getUser){
			return bot.removeListener(/\/cadastrar/)
		}
    },

    onSignUp: (chatId, userData) => {
        controller.setTelegramUserName(chatId, userData)

    },

	setNewUser: (userData) => {

	},

	defineSession: async (userData) => {
		const getSession = await Session.getUserSession(userData.chat.id)
		const setToken = await Session.getUserAndSetToken(userData)
		if (!getSession){
			await bot.sendMessage(userData.chat.id, `Olá ${userData.chat.first_name}, posso ajudar?`)
			Session.setSession(userData.chat.id, 0, userData)
		}
		const mySessionData = await Session.sessionList.find(x => x.id == userData.from.id)
		return mySessionData
	},

	register: async(userData, token) => {
		const getMyRegister = await Register.sayMyName(token)
		let tryAgain = true
			if (!getMyRegister){
				const newUser = new TelegramRegister(token, userData.id)
				const myNewRegister = newUser.registerList.push({userData})
				const myRegister = Register.registerList.push({userData})

				while(tryAgain == true){
					try{
						const name = await newUser.requestName(token, userData.id)
						console.log(name)
						const email = await newUser.requestEmail(token, userData.id)
						console.log(email)
						const pass = await newUser.requestPassword(token, userData.id)
						console.log(pass)
						const rePass = await newUser.requestRePassword(token, userData.id)
						console.log(rePass)
						const isMatching = await newUser.requestIsMatching(pass, rePass, token,  userData.id)

						tryAgain = false
						return {name:name, email:email, pass1:pass, telegram_ID:userData.id}
					}
					catch(error){
						console.log('erro')
						tryAgain = true
					}
				}
				return
			}
	},

	getActiveSessions: ()=>{
		return Session.sessionList
	}


}
