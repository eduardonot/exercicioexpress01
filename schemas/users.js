const mongoose = require('mongoose')
const UserSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        telegram_ID: {
            type: Number,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        pass1:{
            type: String,
            required: true
        }
    },
    {
        timestamps: true
    }
)

module.exports = mongoose.model('Users', UserSchema)