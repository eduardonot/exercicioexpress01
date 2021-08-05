const telegramRepository = require('./../repository/telegram-repository')
const Users = require('./../repository/user-repository')
const Tasks = require('./../repository/task-repository')

module.exports = {
    getRegisterStatus: async (userId, userData) => {
        return await telegramRepository.getTelegramId(userData.id)
    },

	signUp: async (userData) => {
		return await Users.signUp(userData)
	},

	setTask: async (taskData) => {
		return await Tasks.create(taskData)
	},

	getUser: async (telegramID) => {
		return await Users.findByTelegramIdFromApp(telegramID)
	},

	getTask: async (userId) => {
		return await Tasks.search({ userId: userId })
	},

	strToDate: (date) => {
		const dateString = date
		const dataSplit = dateString.split('/')

		if (dataSplit[2].split(" ").length > 1) {
			const hora = dataSplit[2].split(" ")[1].split(':')
			dataSplit[2] = dataSplit[2].split(" ")[0]
			const dateConverted = new Date(dataSplit[2], dataSplit[1] - 1, dataSplit[0], hora[0], hora[1])
			return dateConverted
		} else {
			const dateConverted = new Date(dataSplit[2], dataSplit[1] - 1, dataSplit[0])
			return dateConverted
		}
	}

}
