const mongoose = require('mongoose')
const TaskSchema = mongoose.Schema(
    {
        userId: {
            type: String
            // required: true
        },
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
        date: {
            type: String,
            required: true
        },
        doneDate: {
            type: Date
        },
		tags: {
			type: Array
		},
		icon: {
			type: String
		},
		favorite: {
			type: Boolean
		}
    },
    {
        timestamps: true
    }
)

module.exports = mongoose.model('Tasks', TaskSchema)
