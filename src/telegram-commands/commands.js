const bot = require('../infra/telegram')
const helper = require ('./../helpers/telegram')
const controller = require('./../controllers/telegram-controller')
const getCommand = async function getCommand (text, userData) {
	switch (text){
		case '/ajuda':{
			await bot.sendMessage(userData.id, `*AJUDA*:\nEstou aqui para te ajudar e espero poder ser útil!`,{parse_mode:'Markdown'})
			await bot.sendMessage(userData.id, `Basicamente, aqui você encontrará dois comandos essenciais: *addtarefa* e *listartarefa*`,{parse_mode:'Markdown'})
			await bot.sendMessage(userData.id, `Antes de levá-lo diretamente até lá, não custa explicar o que estes dois fazem`,{parse_mode:'Markdown'})
			await bot.sendMessage(userData.id, `*/addtarefa* te permite agendar tarefas futuras a serem realizadas.\nAqui, você será perguntado sobre dois pontos essenciais para o agendamento sendo estes:\n*1- Tarefa a ser feita*\n*2- Data de conclusão*\n A forma correta de passar este comando é como no exemplo a seguir: "_Médico: Dr. Silva no dia 21/12/2021_"\n Deste modo, eu entenderei como melhor agendar para você!`,{parse_mode:'Markdown'})
			await bot.sendMessage(userData.id, `Assim, quando esta tarefa estiver devidamente cadastrada, será quando poderá então partir para o uso do segundo comando...`,{parse_mode:'Markdown'})
			await bot.sendMessage(userData.id, `*/listartarefa* é o comando onde eu te enviarei todas as tarefas cadastradas. Ainda, num futuro próximo, lhe permitirei listar também somente aquelas que já foram concluídas ou as que ainda estão para concluir. Mas, por enquanto, isto é apenas um sonho distante...`,{parse_mode:'Markdown'})
			await bot.sendMessage(userData.id, `Espero ter te ajudado. Até mais!`,{parse_mode:'Markdown'})
			break
		}
		case '/addtarefa':{
			const isSignedUp = await helper.onStart(userData.id, userData)
			if(!isSignedUp){
				await bot.sendMessage(userData.id, 'Digite */cadastrar* para realizar seu cadastro',{parse_mode:'Markdown'})
				break
			}
			const setTask = await helper.registerTask(userData, userData.data.token)
			const getUser = await controller.getUser(userData.id)
			//const strDate = controller.strToDate(setTask.date)
			const task = {title: setTask.title, expectedDate: setTask.date, userId: getUser._id, status:true}
			await controller.setTask(task)
			await bot.sendMessage(userData.id, `Tarefa cadastrada com sucesso!`)
			break
		}
		case '/cadastrar':{
			const isSignedUp = await helper.onStart(userData.id, userData)
			if(!isSignedUp){
				const cadastro = await helper.registerUser(userData, userData.data.token)
				controller.signUp(cadastro)
				break
			}
			break
		}
		case '/listartarefa':{
			const getUser = await controller.getUser(userData.id)
			const getTask = await controller.getTask(getUser._id)
			if(getTask.length === 0){
				await bot.sendMessage(userData.id, `Você não possui tarefas cadastradas. Digite /addtarefa para adicionar tarefas.`)
				break
			}

			await bot.sendMessage(userData.id, `Estas são as tarefas que você tem cadastrada:`)
			for (tarefas of getTask){
				await bot.sendMessage(userData.id, `${tarefas.title} ${tarefas.expectedDate}.`)
			}
			break
		}
		case '/start':{
			const isSignedUp = await helper.onStart(userData.id, userData)
			if(!isSignedUp){
				await bot.sendMessage(userData.id, 'Digite */cadastrar* para realizar seu cadastro',{parse_mode:'Markdown'})
			}
			break
		}
		case '/sessao':{
			console.log(helper.getActiveSessions())
			break
		}
	}
}
module.exports = getCommand
