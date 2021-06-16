const telegramRepository = require('./../repository/telegram-repository')
const helper = require ('./../helpers/telegram')
const bot = require ('./../infra/telegram')

module.exports = {
    // checkSignUp: async(telegramID) =>{
    //     let result = await telegramRepository.getTelegramId(telegramID)
    //     return result
    // },
    getRegisterStatus: async(userId, userData) =>{
        await telegramRepository.getTelegramId(userData.chat.id)
            .then((data => helper.oldUserGreetings(userId, userData)))
            .then(bot.removeListener(/\/cadastrar/))
            .catch((err) => helper.newUserGreetings(userData.chat.id, userData))
        
    }
}