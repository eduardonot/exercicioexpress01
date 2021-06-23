const telegramRepository = require('./../repository/telegram-repository')
const Users = require ('./../repository/user-repository')

module.exports = {
    getRegisterStatus: async(userId, userData) =>{
        return await telegramRepository.getTelegramId(userData.id)
    },

	signUp: async(userData) =>{
		return await Users.signUp(userData)
	}

}
