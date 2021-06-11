const telegramInfra = require('./../infra/telegram')
const bot = telegramInfra.bot

/*
bot.onText(/\/echo (.+)/, (msg, match) => {
    const chatId = msg.chat.id
    const resp = match[1]
    bot.sendMessage(chatId, resp)
})
*/
/*
bot.on('message', (msg) => {
    const chatId = msg.chat.id
    // send a message to the chat acknowledging receipt of their message
    console.log(chatId)
    bot.sendMessage(chatId, `Olá, ${msg.chat.first_name} ${msg.chat.last_name}!`)
})
*/

module.exports = {
    resMessage: (chatId) =>{
        bot.on('message', (msg)=> {
        bot.sendMessage(chatId, `Olá, ${msg.chat.first_name}!\nAcesse o menu /ajuda para mais informações.`)
        })
    }
}