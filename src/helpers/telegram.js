const TelegramBot = require('node-telegram-bot-api');
const config = require('./../config')
const token = config.telegramToken
const bot = new TelegramBot(token, { polling: true });

bot.onText(/\/echo (.+)/, (msg, match) => {

    const chatId = msg.chat.id
    const resp = match[1]; // the captured "whatever"

    // send back the matched "whatever" to the chat
    bot.sendMessage(chatId, resp)
})


// Listen for any kind of message. There are different kinds of
// messages.
bot.on('message', (msg) => {
    const chatId = msg.chat.id

    // send a message to the chat acknowledging receipt of their message
    console.log(chatId)
    bot.sendMessage(chatId, 'Received your message')
})

module.exports = bot