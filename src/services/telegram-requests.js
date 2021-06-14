const telegram = require ('./../helpers/telegram')
const checkFields = require('./../middlewares/telegram-fields-signUp')

module.exports = {	

    requestName: (reqUserId) => {
        telegram.bot.sendMessage(reqUserId, 'Digite seu nome:')
            .catch(console.log('pum'))
        telegram.bot.on('text', (chatId) => {
            if(!chatId.text){
                telegram.bot.sendMessage(chatId, `Você precisa fornecer um dado válido. Digite */cadastrar* e tente novamente.`,{parse_mode:"Markdown"})
                console.log(`Name Status: 400`)
                return false
            }
            
            const id = chatId.chat.id
            telegram.bot.sendMessage(id, 'Insira seu Email:')
            const isEmailCorrect = checkFields.email(chatId.text)
            // if(isEmailCorrect === false){
            //     telegram.bot.sendMessage(id, `Você precisa fornecer um dado válido. Digite */cadastrar* e tente novamente.`,{parse_mode:"Markdown"})
            //     console.log(`Email Status: 400`)
            //     return false
            // }
            console.log('o nome do user e ' + chatId.text)
            console.log('Email Status: 200')
        })
    },

    // requestEmail: (chatId) => {
    //     telegram.bot.sendMessage(chatId, 'Insira seu Email')
    //     telegram.bot.on('text', (insertEmail) => {
    //         const isEmailCorrect = checkFields.email(insertEmail.text)
    //         if(isEmailCorrect === false){
    //             telegram.bot.sendMessage(chatId, `Você precisa fornecer um dado válido. Digite */cadastrar* e tente novamente.`,{parse_mode:"Markdown"})
    //             console.log(`Email Status: 400`)
    //             return false
    //         }
    //         console.log('Email Status: 200')
    //         return true
    //     })
    // }

    // requestPassword:(chatId)=>{
    //     telegram.bot.sendMessage(chatId, 'Insira sua senha.\n\nSua senha deve conter:\n-Mínimo de 8 caracteres\n-Ao menos uma letra maiúscula\n-Ao menos um número\nAo menos um caractere especial')	
    //     telegram.bot.on('text', (insertPass) => {
    //         let password = insertPass.text
    //         const isPassCorrect = checkFields.pass(password)
    //         if(isPassCorrect === false){
    //             telegram.bot.sendMessage(chatId, `Você precisa fornecer um dado válido. Digite */cadastrar* e tente novamente.`,{parse_mode:"Markdown"})
    //             console.log(`Password Status: 400`)
    //             return false
    //         }
    //         console.log('Password Status: 200')
    //         return true
    //     })
    // },

    // requestRePassword:(chatId)=>{
    //     telegram.bot.sendMessage(chatId, 'Insira sua senha novamente...')	
    //     telegram.bot.on('text', (insertPass) => {
    //         let password = insertPass.text
    //         const isPassCorrect = checkFields.pass(password)
    //         if(isPassCorrect === false){
    //             telegram.bot.sendMessage(chatId, `Você precisa fornecer um dado válido. Digite */cadastrar* e tente novamente.`,{parse_mode:"Markdown"})
    //             console.log(`Password Status: 400`)
    //             return false
    //         }
    //         console.log('Password Status: 200')
    //         return true
    //     })
    // },

    // matchPasswords:(chatId,pass1, pass2) =>{
    //     const isPassMatching = checkFields.passMatch(pass1,pass2)
    //     if (isPassMatching === false){
    //         telegram.bot.sendMessage(chatId, `Senhas não conferem. Digite */cadastrar* e tente novamente.`,{parse_mode:"Markdown"})
    //         console.log('Password Match Status: 400')
    //         return false
    //     }
    //     console.log('Password Match Status: 200')
    //     return true
    // }
}