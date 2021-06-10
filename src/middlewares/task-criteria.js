module.exports = {
    searchCriteria: (req, res, next) => {
        let criteria = {
            $and: [{userId: req.body.userId},
                {title: new RegExp(req.body.title, 'i')},
                {description: new RegExp(req.body.description, 'i')},
                {status: req.body.status}]
        }
        if(!req.body.status){
            criteria.$and.pop()
        }
        
        Object.assign(req.body, {criteria: criteria})
        next()
    }
}

// Object.assign(userData.body, {userId: req.headers.userPayload.id})
        

// if(!userData){
//     return Tasks.find((Object.assign(userData.body, {userId: userData.headers.userPayload.id})))
// }
// const criteria = {
//     $and: [{userId: userData.userId},
//         {title: new RegExp(userData.title, 'i')},
//         {description: new RegExp(userData.description, 'i')},
//         {status: userData.status}]
// }

// if(userData.status){return Tasks.find(criteria)}
// criteria.$and.pop()
// return Tasks.find(criteria)