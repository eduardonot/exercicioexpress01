/* eslint-disable no-unused-vars */
const bot = require('./../infra/telegram')
const command = require('./../telegram-commands/commands')
const helper = require('./../helpers/telegram')
module.exports = (app) => {
	bot.on('polling_error', (err) => {
		console.log(err)
	})

	bot.on('text', async (msg) => {
		const messageContent = msg.text
		const userData = await helper.defineSession(msg)
			.catch((err) => console.log(err))

		const checkSignedUp = await helper.onStart(msg.chat.id, msg)
			.catch((err) => console.log(err))

		command({ messageContent, userData })
	})
}
