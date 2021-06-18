const bot = require('./../infra/telegram')

module.exports = () => {


	// onStart: () => { 
	// 	bot.onText(/\/start/, (msg) => {
	// 	telegram.onStart(msg.chat.id, msg)
	// 	console.log(telegramController)
		// function getRegisterStatus () {
		// 	telegramController.checkSignUp(chatId)
		// 		.then((data) => {
		// 			if(data){
		// 				telegram.bot.removeTextListener(/\/cadastrar/)
		// 				return telegram.oldUserGreetings(chatId, msg.from)

		// 			}
		// 			return telegram.newUserGreetings(chatId, msg.from)
		// 		})}
		// const chatId = msg.chat.id
		// telegram.bot.sendMessage(chatId, `Olá, ${msg.chat.first_name}!`)
		// getRegisterStatus()
		
	// 	})
	// }

	bot.on('polling_error', (err) =>{
		console.log(err)
	})


	bot.on('text', (msg) => {
		bot.sendChatAction(msg.chat.id,'typing')
		
	})
    //     // services.getUserAndSetToken(msg)
    //     //     .then((data) => Object.assign(sessionRegister,{id:data.from.id, token:data.token}))
	// }),

	// bot.onText(/\/cadastrar/, (msg) => {

		
    //     // const getUserSignUpData = services.signUp(msg.from.id)
    //     // telegram.bot.clearReplyListeners()
	// })
}
