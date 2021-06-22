const bot = require('./../infra/telegram')
const controller = require ('./../controllers/telegram-controller')
const telegramRepository = require('./../repository/telegram-repository')

module.exports = {

    onStart:(chatId, userData) =>{
		controller.getRegisterStatus(chatId, userData)
    },

    onSignUp: (chatId, userData) => {

        //check if signed up
        // controller.getRegisterStatus(chatId, userData)
        //     .then(controller.setTelegramUserName(chatId, userData))
        //     .catch(console.log('oi'))
        controller.setTelegramUserName(chatId, userData)

    }
}
