const telegramController = require('./../controllers/telegram-controller')
const telegram = require ('./../helpers/telegram')
const services = require("./../services/telegram-requests")
const debug = require('debug')('node-telegram-bot-api');

module.exports = () => {	
	var session = []
	telegram.bot.onText(/\/start/, (msg) => {
		function getRegisterStatus () {
			telegramController.checkSignUp(chatId)
				.then((data) => {
					if(data){
						telegram.bot.removeTextListener(/\/cadastrar/)
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

	telegram.bot.on('polling_error',(err)=>{
		console.log(err)
	})


	telegram.bot.on('text', (msg) => {
		
		function activeSessions(id){
			
			if(session.indexOf(id) == -1){
				session.push(id)
				console.log(session.indexOf(id))
			}else{
				console.log('já tenho')
			}
		}
		//let checkSession = activeSessions(msg.from.id)
		
		telegram.bot.sendChatAction(msg.chat.id,'typing')
		console.log(`________________\nLOG:${msg.from.id} digitou ${msg.text}`)
		
	})

	telegram.bot.onText(/\/cadastrar/, (msg) => {
		
        const getUserSignUpData = services.signUp(msg.from.id)
        telegram.bot.clearReplyListeners()
	})
}
