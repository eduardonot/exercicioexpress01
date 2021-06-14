const Users = require('../models/users')

module.exports = {
    getTelegramId: (userData) => {
        return Users.findOne({telegram_ID: userData})
    }

}