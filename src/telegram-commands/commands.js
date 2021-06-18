const bot = require("../infra/telegram")

const getCommand = function getCommand (command, userId, userData) {
    switch (command){
        case '/addtarefa':{

            break
        }
        case '/cadastrar':{
            const getUserSignUpData = services.signUp(msg.from.id)
            telegram.bot.clearReplyListeners()
            break
        }
        case '/listartarefa':{

            break
        }
        case '/start':{

            break
        }
        
    }
}

module.exports = getCommand