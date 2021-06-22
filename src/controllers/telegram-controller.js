const telegramRepository = require('./../repository/telegram-repository')
const checkFields = require('./../middlewares/telegram-fields-signUp')
const bot = require ('./../infra/telegram')

module.exports = {
    getRegisterStatus: async(userId, userData) =>{
        await telegramRepository.getTelegramId(userData.chat.id)
            .then((data => bot.sendMessage(userId, `Olá ${userData.chat.first_name}, você já é um usuário cadastrado neste bot!`)))
            .then(bot.removeListener(/\/cadastrar/))
            .catch((err) => bot.sendMessage(userId, `Digite */cadastrar* para continuar`,{parse_mode: "Markdown"}))

    }
}
