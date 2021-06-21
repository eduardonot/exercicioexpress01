const checkFields = require('./../middlewares/telegram-fields-signUp')
const bot = require('./../infra/telegram')

module.exports = class TelegramRegister {

    constructor(userData){
        this.name = userData.chat.first_name
        this.id = userData.chat.id
        this.text = userData.text
        this.userName = userData.chat.username
    }

    requestName() {
        bot.sendMessage(this.id, 'Insira seu Nome')
        return new Promise ((resolve, reject) => {
            bot.once('text', (insertName) => {
                const isNameCorrect = checkFields.name(insertName.text)
                if(isNameCorrect === true){
                    return resolve(insertName.text)

                }
				bot.sendMessage(this.id, `Você precisa fornecer um dado válido. Digite */cadastrar* e tente novamente.`,{parse_mode:"Markdown"})
                return reject(Error ('Nome inválido para os padrões do sistema.'))
            })
        })

    }

    requestEmail () {
        bot.sendMessage(this.id, 'Insira seu Email')
        return new Promise((resolve,reject) =>{
            bot.once('text', (insertEmail) => {
                const isEmailCorrect = checkFields.email(insertEmail.text)
                if (isEmailCorrect === false) {
					bot.sendMessage(this.id, `Você precisa fornecer um dado válido. Digite */cadastrar* e tente novamente.`, { parse_mode: "Markdown" })
                    return reject(Error ('Email inválido'))

                }
                return resolve(insertEmail.text)
            })

        })
    }

    requestPassword () {
        bot.sendMessage(this.id, 'Insira sua Senha\n Deve conter:\n-Maisculas\n-Minusculas\n-Numeros\n-Caracteres Especiais')
        return new Promise ((resolve,reject) =>{
            bot.on('text', (insertPass) => {
                let password = insertPass.text
                const isPassCorrect = checkFields.pass(password)
                if(isPassCorrect === false){
					bot.sendMessage(this.id, `Você precisa fornecer um dado válido. Digite */cadastrar* e tente novamente.`,{parse_mode:"Markdown"})
                    return reject (Error('Valor digitado não válido'))

                }
                return resolve(password)
            })
        })
    }

    requestRePassword () {
        bot.sendMessage(this.id, 'Insira sua senha novamente...')
        return new Promise ((resolve,reject) =>{
            bot.on('text', (insertRePass) => {
                let rePassword = insertRePass.text
                const isPassCorrect = checkFields.pass(rePassword)
                if(isPassCorrect === false){
					bot.sendMessage(this.id, `Você precisa fornecer um dado válido. Digite */cadastrar* e tente novamente.`,{parse_mode:"Markdown"})
                    return reject (Error('Valor digitado não válido'))

                }
                return resolve(rePassword)
            })
        })
    }

	requestIsMatching(firstValue, secondValue){
		return new Promise ((resolve, reject) => {
			const isPassMatching = checkFields.passMatch(firstValue, secondValue)
			if (isPassMatching === false) {
				bot.sendMessage(this.id, `Senhas não conferem. Digite */cadastrar* e tente novamente.`, { parse_mode: "Markdown" })
				console.log('Unmatch')
				return reject(false)
			}
			console.log('Matched')
			return resolve(true)
		})
    }

}
