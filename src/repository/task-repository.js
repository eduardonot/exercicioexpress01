const Tasks = require('../models/tasks')

module.exports = {
    create: (userData) => {
        return Tasks.create(userData)
    },

    search: (userData) => {
        return Tasks.find(userData)
    },

    findAndUpdate: (params, userData) => {
        return Tasks.findOneAndUpdate(params, userData.body)
    },

    findAndDelete: (params, userData) => {
        return Tasks.findOneAndDelete(params, userData.body)
    }
}
