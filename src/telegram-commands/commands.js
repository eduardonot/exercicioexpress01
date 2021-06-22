const helper = require ('./../helpers/telegram')
const TelegramRegister = require ('./../Classes/TelegramRegister')


const getCommand = function getCommand (command, userId, userData, token) {
    switch (command){
        case '/addtarefa':{
            console.log('tarefa')
            break
        }
        case '/cadastrar':{

            async function register(userData, token){
                let Register = new TelegramRegister(userData)
                try{
                    const name = await Register.requestName(token)
                    const email = await Register.requestEmail(token)
                    const pass = await Register.requestPassword(token)
					const rePass = await Register.requestRePassword(token)
					const isMatching = await Register.requestIsMatching(pass, rePass, token)
                }
                catch {
                    ((error) => console.log(error))
                }
            }
            register(userData, token)
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
			console.log(`\n\nEstá na sessão, ${userData.chat.id} -> ${token}`)
			break
		}
    }
}

module.exports = getCommand
