/* eslint-disable no-undef */
const bot = require('../infra/telegram')
const helper = require('./../helpers/telegram')
const controller = require('./../controllers/telegram-controller')

const getCommand = async function getCommand (data) {
	switch (data.messageContent) {
		case '/ajuda': {
			await bot.sendMessage(data.userData.id, `*AJUDA*:\nEstou aqui para te ajudar e espero poder ser útil!`, { parse_mode: 'Markdown' })
			await bot.sendMessage(data.userData.id, `Basicamente, aqui você encontrará dois comandos essenciais: *addtarefa* e *listartarefa*`, { parse_mode: 'Markdown' })
			await bot.sendMessage(data.userData.id, `Antes de levá-lo diretamente até lá, não custa explicar o que estes dois fazem`, { parse_mode: 'Markdown' })
			await bot.sendMessage(data.userData.id, `*/addtarefa* te permite agendar tarefas futuras a serem realizadas.\nAqui, você será perguntado sobre dois pontos essenciais para o agendamento sendo estes:\n*1- Tarefa a ser feita*\n*2- Data de conclusão*\n A forma correta de passar este comando é como no exemplo a seguir: "_Médico: Dr. Silva no dia 21/12/2021_"\n Deste modo, eu entenderei como melhor agendar para você!`, { parse_mode: 'Markdown' })
			await bot.sendMessage(data.userData.id, `Assim, quando esta tarefa estiver devidamente cadastrada, será quando poderá então partir para o uso do segundo comando...`, { parse_mode: 'Markdown' })
			await bot.sendMessage(data.userData.id, `*/listartarefa* é o comando onde eu te enviarei todas as tarefas cadastradas. Ainda, num futuro próximo, lhe permitirei listar também somente aquelas que já foram concluídas ou as que ainda estão para concluir. Mas, por enquanto, isto é apenas um sonho distante...`, { parse_mode: 'Markdown' })
			await bot.sendMessage(data.userData.id, `Espero ter te ajudado. Até mais!`, { parse_mode: 'Markdown' })
			break
		}
		case '/addtarefa': {
			const isSignedUp = await helper.onStart(data.userData.id, data.userData)
			if (!isSignedUp) {
				await bot.sendMessage(data.userData.id, 'Digite */cadastrar* para realizar seu cadastro', { parse_mode: 'Markdown' })
				break
			}
			await bot.sendMessage(data.userData.id, `Insira sua tarefa\n Ex. "_Médico: Dr. Silva no dia 21/12/2021_"`, { parse_mode: 'Markdown' })
			const setTask = await helper.registerTask(data.userData, data.userData.data.token)
			const getUser = await controller.getUser(data.userData.id)
			const formatedDate = setTask.date.trim().split('/')
			const newDate = `${formatedDate[1]}/${formatedDate[0]}/${formatedDate[2]}`
			const task = { title: setTask.title.trim(), date: newDate, userId: getUser._id, status: false, tags: ['Telegram BOT'], icon: 'notifications' }
			await controller.setTask(task)
			await bot.sendMessage(data.userData.id, `Tarefa cadastrada com sucesso!`)
			break
		}
		case '/cadastrar': {
			const isSignedUp = await helper.onStart(data.userData.id, data.userData)
			if (!isSignedUp) {
				const cadastro = await helper.registerUser(data.userData, data.userData.data.token)
				controller.signUp(cadastro)
				break
			}
			break
		}
		case '/listartarefa': {
			const getUser = await controller.getUser(data.userData.id)
            if (getUser) {
                const getTask = await controller.getTask(getUser._id)
                if (getTask.length === 0) {
                    await bot.sendMessage(data.userData.id, `Você não possui tarefas cadastradas. Digite /addtarefa para adicionar tarefas.`)
                    break
                }
                await bot.sendMessage(data.userData.id, `Estas são as tarefas que você tem cadastrada:`)
                for (tarefas of getTask) {
					const getTaskDate = tarefas.date.split('/')
					const newDate = `${getTaskDate[1]}/${getTaskDate[0]}/${getTaskDate[2]}`
                    await bot.sendMessage(data.userData.id, `${tarefas.title} ${newDate}.`)
                }
            }
			break
		}
		case '/start': {
			const isSignedUp = await helper.onStart(data.userData.id, data.userData)
			if (!isSignedUp) {
				await bot.sendMessage(data.userData.id, 'Digite */cadastrar* para realizar seu cadastro', { parse_mode: 'Markdown' })
			}
			break
		}
		case '/sessao': {
			console.log(helper.getActiveSessions())
			break
		}
	}
}
module.exports = getCommand
