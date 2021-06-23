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
