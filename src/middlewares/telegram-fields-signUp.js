const hash = require('./../helpers/hash')
const telegramInfra = require('./../infra/telegram')


module.exports = {
    email:(field)=>{
        let mailFormat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
        if (!field || !field.match(mailFormat)){
            return false
        }
        return true
    },
    pass:(field)=>{
        let passFormat = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/
        if (!field|| !field.match(passFormat)){
            return false
        }
        return true
    },
    passMatch:(pass1,pass2)=>{
        if(pass1 !== pass2){
            return false
        }
        return true
    }

}