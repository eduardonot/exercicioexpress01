const telegramController = require('./../controllers/telegram-controller')
const bot = require('./../infra/telegram')
const telegram = require ('./../helpers/telegram')
const services = require("./../services/telegram-requests")
const jwt = require('./../helpers/jwt')

module.exports = {
    //var sessionRegister = {id:0,token:0}

	onStart: () =>{ 
		bot.onText(/\/start/, (msg) => {
		telegram.onStart(msg.chat.id, msg)
		console.log(telegramController)
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
	})

	bot.on('polling_error',(err)=>{
		console.log(err)
	})


	bot.on('text', (msg) => {
		// telegram.bot.sendChatAction(msg.chat.id,'typing')

        // services.getUserAndSetToken(msg)
        //     .then((data) => Object.assign(sessionRegister,{id:data.from.id, token:data.token}))
	})

	bot.onText(/\/cadastrar/, (msg) => {

		
        // const getUserSignUpData = services.signUp(msg.from.id)
        // telegram.bot.clearReplyListeners()
	})
}
