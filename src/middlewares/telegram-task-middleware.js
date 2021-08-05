const taskRepository = require('./../repository/task-repository')
const telegramHelper = require('./../helpers/telegram')

module.exports = {

    save: (req, res) => {
    },

    get: (req, res) => {
        taskRepository.search()
            .then((result) => telegramHelper.resMessage())
            .catch((err) => console.log(err))
    }
}
