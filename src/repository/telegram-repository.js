const Users = require('../models/users')

module.exports = {
    getTelegramId: async(userData) => {
        return await Users.findOne({telegram_ID: userData})
    }

}
