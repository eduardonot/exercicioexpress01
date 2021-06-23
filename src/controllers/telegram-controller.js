const telegramRepository = require('./../repository/telegram-repository')
const Users = require ('./../repository/user-repository')
const Tasks = require('./../repository/task-repository')

module.exports = {
    getRegisterStatus: async(userId, userData) =>{
        return await telegramRepository.getTelegramId(userData.id)
    },

	signUp: async(userData) =>{
		return await Users.signUp(userData)
	},

	setTask: async(taskData) => {
		return await Tasks.create (taskData)
	},

	getUser: async(telegram_ID) => {
		return await Users.findByTelegramIdFromApp(telegram_ID)
	},

	getTask: async(userId) => {
		return await Tasks.search({userId:userId})
	},

	strToDate: (date)=> {
		const dateString = date;
		const dataSplit = dateString.split('/');
		var dateConverted;

		if (dataSplit[2].split(" ").length > 1) {

			let hora = dataSplit[2].split(" ")[1].split(':');
			dataSplit[2] = dataSplit[2].split(" ")[0];
			return dateConverted = new Date(dataSplit[2], dataSplit[1] - 1, dataSplit[0], hora[0], hora[1]);

		} else {
			return dateConverted = new Date(dataSplit[2], dataSplit[1] - 1, dataSplit[0]);
		}
	}

}
