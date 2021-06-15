const telegramController = require('./../controllers/telegram-controller')
const telegram = require ('./../helpers/telegram')
const services = require("./../services/telegram-requests")
const jwt = require('./../helpers/jwt')

module.exports = () => {	
	var session = []
    var sessionRegister = {id:0,token:0}
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

		telegram.bot.sendChatAction(msg.chat.id,'typing')

        services.getUserAndSetToken(msg)
            .then((data) => Object.assign(sessionRegister,{id:data.from.id, token:data.token}))
	})

	telegram.bot.onText(/\/cadastrar/, (msg) => {

		
        const getUserSignUpData = services.signUp(msg.from.id)
        telegram.bot.clearReplyListeners()
	})
}
