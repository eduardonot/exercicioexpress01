const bot = require('./../infra/telegram')
const controller = require ('./../controllers/telegram-controller')
const telegramRepository = require('./../repository/telegram-repository')

module.exports = {    
    
    oldUserGreetings: (chatId, userData) =>{
        bot.sendMessage(chatId, `Olá ${userData.first_name}, você já é um usuário cadastrado neste bot!`)
    },
    newUserGreetings: (chatId, userData) => {
        bot.sendMessage(chatId,  `Olá ${userData.first_name}, verificamos que você ainda não possui um cadastro.\n-\nResponda as etapas a seguir para utilizar este bot!`)
        bot.sendMessage(chatId, `Digite */cadastrar* para continuar`,{parse_mode: "Markdown"})
    },

    sendMessage:(chatId, text) =>{
        bot.sendMessage(chatId, text)
    },

    onStart:(chatId, userData) =>{
        console.log(controller)
        // controller.getRegisterStatus(chatId, userData)
    }
    
    
}