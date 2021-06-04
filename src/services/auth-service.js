const Users = require('./../models/users')

module.exports = {
    post: (user) => {
        return Users.findOne({email: user.email})
    }
}