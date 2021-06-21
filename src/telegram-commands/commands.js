const helper = require ('./../helpers/telegram')
const TelegramRegister = require ('./../Classes/TelegramRegister')

const getCommand = function getCommand (command, userId, userData) {
    switch (command){
        case '/addtarefa':{
            console.log('tarefa')
            break
        }
        case '/cadastrar':{

            async function register(userData){
                let Register = new TelegramRegister(userData)
                try{
                    const name = await Register.requestName()
                    const email = await Register.requestEmail()
                    const pass = await Register.requestPassword()
					const rePass = await Register.requestRePassword()
					const isMatching = await Register.requestIsMatching(pass, rePass)
                }
                catch {
                    ((error) => console.log(error))
                }
                finally{
                }

            }
            register(userData)
            //const getUserSignUpData = services.signUp(msg.from.id)
            //helper.onSignUp(userId, userData)
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
    }
}

module.exports = getCommand
