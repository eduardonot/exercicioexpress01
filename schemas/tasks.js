const mongoose = require('mongoose')
const TaskSchema = mongoose.Schema(
    {
        title: {
            type: String,
            required: true
        },
        description: {
            type: String
        },
        status: {
            type: Boolean,
            default: false
        },
        expectedDate:{
            type: Date,
        },
        doneDate: {
            type: Date
        }
    },
    {
        timestamps: true
    }
)

module.exports = mongoose.model('Tasks', TaskSchema)