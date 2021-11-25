module.exports = {
    searchCriteria: (req, res, next) => {
        const criteria = {
            $and: [{ userId: req.body.userId },
                { title: req.body.title },
                { description: req.body.description },
                { status: req.body.status }]
        }
        if (!req.body.status) {
            criteria.$and.pop()
        }

        Object.assign(req.body, { criteria: criteria })
        next()
    }
}
