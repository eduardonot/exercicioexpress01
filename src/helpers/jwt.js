const jwt = require('jsonwebtoken')
const config = require('./../config')

module.exports = {
    genToken: (user) => {
        return jwt.sign({
            exp:Math.floor(Date.now() / 1000) + (60 * 60 * 60),
            data:{
                id: user._id,
                name: user.name,
                email: user.email
            }
        }, config.jwtSecretPassword)
    },

    verifyToken: (token) =>{
        try{
            return jwt.verify(token, config.jwtSecretPassword)
        } catch (error){
            return false
        }
    }
}
