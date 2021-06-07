const jwt = require('./../helpers/jwt')
const verifyToken = jwt.verifyToken

module.exports = {

    checkToken: (req, res, next) => {
        const token = req.headers.authorization
        if(!token){
            return res.status(401).send('Token não informado')
        }
        const validToken = verifyToken(token)
        if(validToken){
            Object.assign(req.body, {userId: validToken.data.id})
            Object.assign(req.headers, {userPayload: validToken.data})
            return next()
        }
        return res.status(401).send('Token inválido')
    }
}