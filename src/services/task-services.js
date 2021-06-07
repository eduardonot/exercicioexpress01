const Tasks = require('./../models/tasks')

module.exports = {
    create:(userData) =>{
        return Tasks.create(userData)
    },

    search: (userData) => {
        if(!userData){
            return Tasks.find((Object.assign(userData.body, {userId: userData.headers.userPayload.id})))
        }
        const criteria = {
            $and: [{userId: userData.userId},
                {title: new RegExp(userData.title, 'i')},
                {description: new RegExp(userData.description, 'i')},
                {status: userData.status}]
        }

        if(userData.status){return Tasks.find(criteria)}
        criteria.$and.pop()
        return Tasks.find(criteria)
    },

    findAndUpdate: (userData) => {
        return Tasks.findOneAndUpdate({_id: userData.params.id, userId: userData.headers.userPayload.id}, userData.body)
    },

    findAndDelete: (userData) => {
        return Tasks.findOneAndDelete({_id: userData.params.id, userId: userData.headers.userPayload.id}, userData.body)
    }
}