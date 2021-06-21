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
                return reject(bot.sendMessage(this.id, `Você precisa fornecer um dado válido. Digite */cadastrar* e tente novamente.`,{parse_mode:"Markdown"}))
            })
        })

    }

    requestEmail () {
        bot.sendMessage(this.id, 'Insira seu Email')
        return new Promise((resolve,reject) =>{
            bot.once('text', (insertEmail) => {
                const isEmailCorrect = checkFields.email(insertEmail.text)
                if (isEmailCorrect === false) {
                    return reject(bot.sendMessage(this.id, `Você precisa fornecer um dado válido. Digite */cadastrar* e tente novamente.`, { parse_mode: "Markdown" }))
                    
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
                console.log(insertPass)
                const isPassCorrect = checkFields.pass(password)
                if(isPassCorrect === false){
                    return reject (bot.sendMessage(this.id, `Você precisa fornecer um dado válido. Digite */cadastrar* e tente novamente.`,{parse_mode:"Markdown"}))
                    
                }
                bot.deleteMessage(this.id, insertPass.message_id)
                return resolve(insertPass.text)
            })
        })
    }

    requestRePassword () {
        bot.sendMessage(this.id, 'Insira sua senha novamente...')	
        return new Promise ((resolve,reject) =>{
            bot.on('text', (insertPass) => {
                let password = insertPass.text
                console.log(insertPass)
                const isPassCorrect = checkFields.pass(password)
                if(isPassCorrect === false){
                    return reject (bot.sendMessage(this.id, `Você precisa fornecer um dado válido. Digite */cadastrar* e tente novamente.`,{parse_mode:"Markdown"}))
                    
                }
                bot.deleteMessage(this.id, insertPass.message_id)
                return resolve(insertPass.text)
            })
        })
    }


                const isPassMatching = checkFields.passMatch(password, repassword)
                if (isPassMatching === false) {
                    bot.sendMessage(this.id, `Senhas não conferem. Digite */cadastrar* e tente novamente.`, { parse_mode: "Markdown" })
                    return reject(false)
                }
                bot.deleteMessage(this.id, insertRePass.message_id)
                return resolve(password)
                })
            })
        })
    }
}