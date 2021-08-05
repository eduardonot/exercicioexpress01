const bcrypt = require('bcrypt')
const config = require('./../config')

module.exports = {

    genHash: (value) => {
        return bcrypt.hashSync(value, config.saltRounds)
    },

    compareHash: (currentField, hash) => {
        return bcrypt.compareSync(currentField, hash)
    }
}
