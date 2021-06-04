const bcrypt = require('bcrypt')

module.exports = {

    genHash: (value) => {
        return bcrypt.hashSync(value, saltRounds)
    },

    compareHash: (currentField, hash) => {
        return bcrypt.compareSync(currentField, hash)
    }

}