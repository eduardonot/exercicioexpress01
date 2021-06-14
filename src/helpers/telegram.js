const telegramInfra = require('./../infra/telegram')
const bot = telegramInfra.bot
/*
bot.onText(/\/echo (.+)/, (msg, match) => {
    const chatId = msg.chat.id
    const resp = match[1]
    bot.sendMessage(chatId, resp)
})
*/
module.exports = {
    bot:bot,
    
    listartarefa: (chatId, userData) => {
        bot.onText(/\/listartarefa/, () => {
            const telegramChatId = chatId
            bot.sendMessage(telegramChatId, userData)
        })
    },

    addtarefa: (chatId, userData) => {
        bot.onText(/\/addtarefa/, () => {
            const telegramChatId = chatId
            bot.sendMessage(telegramChatId, userData)
        })
    },
    oldUserGreetings: (chatId, userData) =>{
        bot.sendMessage(chatId, `Olá ${userData.first_name}, você já é um usuário cadastrado neste bot!`)
    },
    newUserGreetings: (chatId, userData) => {
        bot.sendMessage(chatId,  `Olá ${userData.first_name}, verificamos que você ainda não possui um cadastro.\n-\nResponda as etapas a seguir para utilizar este bot!`)
        bot.sendMessage(chatId, `Digite */cadastrar* para continuar`,{parse_mode: "Markdown"})
    }
    
    
}