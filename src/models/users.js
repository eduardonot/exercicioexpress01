const mongoose = require('mongoose')
const UserSchema = mongoose.Schema(
    {
        name: {
            type: String,
            index: true,
            required: true
        },
        telegram_ID: {
            type: Number
        },
        email: {
            type: String,
            index: true,
            required: true
        },
        pass1: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true
    }
)

module.exports = mongoose.model('Users', UserSchema)
