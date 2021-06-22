const bot = require('./../infra/telegram')
const controller = require ('./../controllers/telegram-controller')
const Register = require('./../infra/Register')
const Session = require('./../infra/Session')

module.exports = {

    onStart: async (chatId, userData) =>{
		const getUser = await controller.getRegisterStatus(chatId, userData)
		if (getUser == !getUser){
			return bot.removeListener(/\/cadastrar/)
		}
		await bot.sendMessage(chatId, `Digite */cadastrar* para continuar`,{parse_mode: "Markdown"})
    },

    onSignUp: (chatId, userData) => {
        controller.setTelegramUserName(chatId, userData)

    },

	defineSession: async (userData) => {
		const getSession = await Session.getUserSession(userData.chat.id)
		const setToken = await Session.getUserAndSetToken(userData)
		if (!getSession){
			await bot.sendMessage(userData.chat.id, `Olá, ${userData.chat.first_name}, posso ajudar?`)
			Session.setSession(userData.chat.id, 0, userData)
		}
		const mySessionData = await Session.sessionList.find(x => x.id == userData.from.id)
		return mySessionData
	},

	register: async(userData, token) => {
		const getMyRegister = await Register.sayMyName(token)
			if (!getMyRegister){
				Register.registerList.push({userData: userData})
			}
			try{
				const name = await Register.requestName(token, userData.id)
				const email = await Register.requestEmail(token,  userData.id)
				const pass = await Register.requestPassword(token,  userData.id)
				const rePass = await Register.requestRePassword(token,  userData.id)
				const isMatching = await Register.requestIsMatching(pass, rePass, token,  userData.id)
				bot.removeListener(/\/cadastrar/)
				return {name:name, email:email, pass:pass}
			}
			catch {((error) => console.log(error))}
			return
	},

	getActiveSessions: ()=>{
		return Session.sessionList
	}


}
