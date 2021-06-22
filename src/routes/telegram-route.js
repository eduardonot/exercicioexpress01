const bot = require('./../infra/telegram')
const command = require ('./../telegram-commands/commands')
const TelegramSession = require ('./../Classes/TelegramSessions')
const Session = new TelegramSession()
module.exports = () => {


	bot.on('polling_error', (err) =>{
		console.log(err)
	})

	bot.on('text', async(msg) => {
		// LOG STUFF
		console.log(`${msg.chat.first_name} ${msg.chat.id} >> ${msg.text}`)
		bot.sendChatAction(msg.chat.id,'typing')
		// TELEGRAM SESSIONS
		let getSession = await Session.getUserSession(msg.chat.id)
		const setToken = await Session.getUserAndSetToken(msg)
		if (!getSession){
			bot.sendMessage(msg.chat.id, `Eae men`)
			return Session.setSession(msg.chat.id, msg.chat.username, 0, setToken)
		}
		const mySessionData = await Session.sessionList.find(x => x.id == msg.from.id)
		command(msg.text, msg.from.id, msg, mySessionData.token)
		getSession.messagesCount++

	})

	bot.onText(/\/cadastrar/, (msg) => {
		bot.clearTextListeners()
		bot.clearReplyListeners()
	})
}
