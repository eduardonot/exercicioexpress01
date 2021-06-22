const bot = require('../infra/telegram')
const helper = require ('./../helpers/telegram')
const getCommand = async function getCommand (text, userData) {
	switch (text, userData){
		case '/addtarefa':{
			console.log('tarefa')
			break
		}
		case '/cadastrar':{
			console.log('cadastrar')
			await helper.register(msg, msg.data.token)
			bot.clearTextListeners()
			bot.clearReplyListeners()
			break
		}
		case '/listartarefa':{
			console.log('listar')
			break
		}
		case '/start':{
			console.log('start')
			helper.onStart(userId, userData)
			break
		}
		case '/sessao':{
			console.log(helper.getActiveSessions())
			break
		}
	}
}
module.exports = getCommand
