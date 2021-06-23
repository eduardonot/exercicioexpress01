const bot = require('./../infra/telegram')
const command = require ('./../telegram-commands/commands')
const helper = require ('./../helpers/telegram')
module.exports = () => {


	bot.on('polling_error', (err) =>{
		console.log(err)
	})

	bot.on('text', async(msg) => {
		var defSession = await helper.defineSession(msg)
			.catch((err) => console.log(err))

		var checkSignedUp = await helper.onStart(msg.chat.id, msg)
			.catch((err) => console.log(err))

		command(msg.text, defSession)
		// bot.onText(/\/cadastrar/, () => {command(msg.text, defSession)})
		// bot.onText(/\/sessao/, () => {command(msg.text, defSession)})
		// bot.onText(/\/start/, () => {command(msg.text, defSession)})
		// bot.onText(/\/addtarefa/, () => {command(msg.text, defSession)})
		// bot.onText(/\/listartarefa/, () => {command(msg.text, defSession)})


	})



}
