const telegramRepository = require('./../repository/telegram-repository')
const checkFields = require('./../middlewares/telegram-fields-signUp')
const bot = require ('./../infra/telegram')

module.exports = {
    getRegisterStatus: async(userId, userData) =>{
        return await telegramRepository.getTelegramId(userData.chat.id)


    }
}
