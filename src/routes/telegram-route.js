const { bot } = require('../infra/telegram')
const telegramController = require('./../controllers/telegram-controller')
const telegram = require ('./../helpers/telegram')
const services = require("./../services/telegram-requests")

module.exports = () => {	
	telegram.bot.onText(/\/start/, (msg) => {
		function getRegisterStatus () {
			telegramController.checkSignUp(chatId)
				.then((data) => {
					if(data){
						return telegram.oldUserGreetings(chatId, msg.from)
					}
					return telegram.newUserGreetings(chatId, msg.from)
				})
				.catch((err) => console.log(err))
		}
		const chatId = msg.chat.id
		telegram.bot.sendMessage(chatId, `Olá, ${msg.chat.first_name}!`)
		getRegisterStatus()
	})

	telegram.bot.on("polling_error", (err) => console.log(err))
	telegram.bot.on('text', (msg) => {
		console.log(msg.from.id + ' digitou: '+ msg.text)
	})

	telegram.bot.onText(/\/cadastrar/, (msg) => {
        
        const getUserSignUpData = services.signUp(msg.chat.id)
	})
}
