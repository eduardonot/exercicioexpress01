module.exports = class Validate {

    constructor(user){
        this.user = user
        this.warns = {}
        this.isAble = false
    }
    userSignUp(){
        let mailFormat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
        let passFormat = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/
        let totalWarns = 0
        if (!this.user.name){
            Object.assign(this.warns, {totalWarns: totalWarns += 1, nameWarn: "Parâmetro 'name' Inválido"})
        }
        if (!this.user.telegram_ID || this.user.telegram_ID == undefined){
            Object.assign(this.warns, {totalWarns: totalWarns += 1, telegramWarn: "Parâmetro 'telegram_ID' Inválido"})
        }
        if (!this.user.email || !this.user.email.match(mailFormat)){
            Object.assign(this.warns, {totalWarns: totalWarns += 1, mailWarn: "Parâmetro 'email' Inválido"})
        }
        if (this.user.pass1 !== this.user.pass2){
            Object.assign(this.warns, {totalWarns: totalWarns += 1, equalPassWarn: "Parâmetros 'pass1' e 'pass2' não são idênticos"})
        }
        if (!this.user.pass1 || !this.user.pass2 || !this.user.pass1.match(passFormat) || !this.user.pass2.match(passFormat)){
            Object.assign(this.warns, {totalWarns: totalWarns += 1, passPatternWarn: "Parâmetro 'pass1' e 'pass2' requer Maiúsculas, Minúsculas, Números e Carac. Especiais!"})
        }
        
        if(this.warns.totalWarns > 0){
            return false
        }
        return true
    }

    getSignUpError(){
        return this.warns
    }
}