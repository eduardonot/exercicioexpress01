module.exports = class Validate {

    constructor(user){
        this.user = user
    }
    userSignUp(){
        if (!this.user['name']){
            res.send("Insira um valor no campo name")
        }
    }

}