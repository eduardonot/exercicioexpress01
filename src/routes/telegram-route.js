const bot = require('./../infra/telegram')
const command = require ('./../telegram-commands/commands')
const helper = require ('./../helpers/telegram')

module.exports = () => {


	bot.on('polling_error', (err) =>{
		console.log(err)
	})


	bot.on('text', (msg) => {
		console.log(`${msg.chat.first_name} ${msg.chat.id} >> ${msg.text}`)
		bot.sendChatAction(msg.chat.id,'typing')
		command(msg.text, msg.chat.id, msg)
	})
    //     // services.getUserAndSetToken(msg)
    //     //     .then((data) => Object.assign(sessionRegister,{id:data.from.id, token:data.token}))
	// }),

	// bot.onText(/\/cadastrar/, (msg) => {

		
    //     // const getUserSignUpData = services.signUp(msg.from.id)
    //     // telegram.bot.clearReplyListeners()
	// })
}
