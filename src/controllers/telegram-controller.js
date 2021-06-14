const telegramRepository = require('./../repository/telegram-repository')

module.exports = {
    checkSignUp: async(telegramID) =>{
        let result = await telegramRepository.getTelegramId(telegramID)
        return result
    }
}