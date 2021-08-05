const Users = require('../models/users')

module.exports = {
    signUp: (userData) => {
        return Users.create(userData)
    },

    findPreviousSignUp: (userData) => {
        return Users.findOne({ email: userData.email })
    },

    findByTelegramId: (userData) => {
        return Users.findOne({ telegram_ID: userData.telegram_ID })
    },

	findByTelegramIdFromApp: (userData) => {
        return Users.findOne({ telegram_ID: userData })
    },

    search: (userData) => {
        return Users.find({
			$and: [
				{ name: new RegExp(userData.name, 'i') },
				{ email: new RegExp(userData.email, 'i') }
			]
		})
    }
}
