const bot = require('./../infra/telegram')
const command = require ('./../telegram-commands/commands')
const helper = require ('./../helpers/telegram')
module.exports = () => {


	bot.on('polling_error', (err) =>{
		console.log(err)
	})

	bot.on('text', async(msg) => {
		console.log(`${msg.chat.first_name} ${msg.chat.id} >> ${msg.text}`)

		var defSession = await helper.defineSession(msg)
			.catch((err) => console.log(err))

		var checkSignedUp = await helper.onStart(msg.chat.id, msg)
			.catch((err) => console.log(err))

		command(msg.text, defSession)

	})


}
