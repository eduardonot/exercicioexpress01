const telegramRepository = require('./../repository/telegram-repository')
const checkFields = require('./../middlewares/telegram-fields-signUp')
const bot = require ('./../infra/telegram')

module.exports = {
    getRegisterStatus: async(userId, userData) =>{
        await telegramRepository.getTelegramId(userData.chat.id)
            .then((data => bot.sendMessage(userId, `Olá ${userData.chat.first_name}, você já é um usuário cadastrado neste bot!`)))
            .then(bot.removeListener(/\/cadastrar/))
            .catch((err) => bot.sendMessage(userId, `Digite */cadastrar* para continuar`,{parse_mode: "Markdown"}))

    },

    setTelegramUserName: async(userId, userData) => {
        let userName = userData.chat.username
        bot.sendMessage(userId,'Insira seu Nome:')
        bot.once('text', (inputName) => {
            const isNameCorrect = checkFields.name(inputName.text)
            if(isNameCorrect === false){
                bot.sendMessage(inputName.chat.id, `Você precisa fornecer um dado válido. Digite */cadastrar* e tente novamente.`,{parse_mode:"Markdown"})
                console.log(`Name Status: 400`)
                return false
            }
            const name = inputName.text
            console.log('Nome digitado foi: ' + name)
        })
    },

	getUserAndSetToken: async(messageData) =>{

		let sessionRegister = {}
        if(!messageData.token){
            Object.assign(sessionRegister, {_id: messageData.chat.id, name: messageData.from.first_name, email: messageData.from.username})
            const telegramUserToken =  jwt.genToken(sessionRegister)
            Object.assign(messageData,{token:telegramUserToken})
            console.log('new token assigned')
            return messageData
        }
        console.log('already has message data token')
        return
    }
}
