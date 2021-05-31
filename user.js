const mongoose = require('mongoose')

const UserSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true
        },
        telegramId: {
            type: String
        },
        status: {
            type: Boolean
        }
    }, 
    {
        timestamp: true
    }
)

module.exports = mongoose.model('User', UserSchema)
