const Tasks = require('./../models/tasks')

module.exports = {
    create:(userData) =>{
        return Tasks.create(userData)
    },

    findAll: (userData) =>{
        return Tasks.find((Object.assign(userData.body, {userId: userData.headers.userPayload.id})))
        
    },

    search: (userData) => {
        return Tasks.find({
			$and: [
				{title: new RegExp(userData.title, 'i')},
                {description: new RegExp(userData.description, 'i')},
                {status: userData.status},
                {userId: userData.userId}
			]
		})
    }
}