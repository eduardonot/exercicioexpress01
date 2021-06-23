const bot = require('../infra/telegram')
const helper = require ('./../helpers/telegram')
const getCommand = async function getCommand (text, userData) {
	switch (text){
		case '/addtarefa':{
			console.log('tarefa')
			break
		}
		case '/cadastrar':{
			console.log(`${userData.data.chat.username} >> cadastrar`)
			const cadastro = await helper.register(userData, userData.data.token)
			helper.setNewUser(cadastro)
			break
		}
		case '/listartarefa':{
			console.log('listar')
			break
		}
		case '/start':{
			console.log('start')
			helper.onStart(userData.id, userData)
			break
		}
		case '/sessao':{
			console.log(helper.getActiveSessions())
			break
		}
	}
}
module.exports = getCommand
