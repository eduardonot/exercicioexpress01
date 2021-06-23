const bot = require('./../infra/telegram')
const controller = require ('./../controllers/telegram-controller')
const TelegramRegister = require('./../Classes/TelegramRegister')
const Register = require('./../infra/Register')
const Session = require('./../infra/Session')
const checkDate = require ('./../middlewares/telegram-tasks-inputs-middleware')

module.exports = {

	checkDate: (dateInput) => {const date = checkDate.compareInput(dateInput)},

    onStart: async (chatId, userData) =>{
		const getUser = await controller.getRegisterStatus(chatId, userData)
		return getUser
    },

    onSignUp: (chatId, userData) => {controller.setTelegramUserName(chatId, userData)},

	setNewUser: (userData) => {controller.signUp(userData)},

	defineSession: async (userData) => {
		const getSession = await Session.getUserSession(userData.chat.id)
		const setToken = await Session.getUserAndSetToken(userData)
		if (!getSession){

			Session.setSession(userData.chat.id, 0, userData)
		}
		const mySessionData = await Session.sessionList.find(x => x.id == userData.from.id)
		return mySessionData
	},

	registerUser: async(userData, token) => {
		return new Promise (async(resolve, reject) => {
			const getMyRegister = await Register.sayMyName(token)
			let tryAgain = true
			//if (!getMyRegister){
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
						resolve({name:name, email:email, pass1:isMatching, telegram_ID:userData.id})
						break
					}
					catch(error){
						console.log('erro')
						tryAgain = true}
				}
				return
			//}
		})
	},

	registerTask: async(userData, token) => {
		return new Promise (async(resolve, reject) => {
			const getMyRegister = await Register.sayMyName(token)
			let tryAgain = true
			var newTask = new TelegramRegister(token, userData.id)
			var myNewTaskRegister = newTask.registerList.push({userData})
			var myTaskRegister = Register.registerList.push({userData})
			while(tryAgain == true){
				try{
					var title = await newTask.requestTitle(token, userData.id)
					tryAgain = false

				}
				catch(error){
					console.log(error)
					tryAgain = true}
			}

			console.log('still here!')
			resolve (title)
		})
	},

	getActiveSessions: ()=>{
		return Session.sessionList
	}
}
