const TelegramBot = require('node-telegram-bot-api');
const config = require('./../config')

module.exports = {
    token: config.telegramToken,
    bot: new TelegramBot(config.telegramToken, {polling:true})
}