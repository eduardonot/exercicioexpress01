const telegram = require ('./../helpers/telegram')
const checkFields = require('./../middlewares/telegram-fields-signUp')
const hash = require('./../helpers/hash')
const { bot } = require('../infra/telegram')

module.exports = {	

    // requestName: (userData) => {
    //     telegram.bot.once('text', (insertName) => {
    //         if(!insertName.text){
    //             telegram.bot.sendMessage(userData.chat.id, `Você precisa fornecer um dado válido. Digite */cadastrar* e tente novamente.`,{parse_mode:"Markdown"})
    //             console.log(`Name Status: 400`)
    //             return false
    //         }
    //         return insertName.text
    //     })
    // },

    // requestEmail: (userData) => {
    //     telegram.bot.sendMessage(userData.chat.id, 'Insira seu Email:')
    //     telegram.bot.once('text', (insertEmail) => {
    //         const isEmailCorrect = checkFields.email(insertEmail.text)
    //         if(isEmailCorrect === false){
    //             telegram.bot.sendMessage(insertEmail.chat.id, `Você precisa fornecer um dado válido. Digite */cadastrar* e tente novamente.`,{parse_mode:"Markdown"})
    //             console.log(`Email Status: 400`)
    //             return false
    //         }
    //         console.log('Email Status: 200')
    //         return insertEmail.text
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
        // telegram.bot.sendMessage(chatId, 'Insira sua senha novamente...')	
        // telegram.bot.on('text', (insertPass) => {
        //     let password = insertPass.text
        //     const isPassCorrect = checkFields.pass(password)
        //     if(isPassCorrect === false){
        //         telegram.bot.sendMessage(chatId, `Você precisa fornecer um dado válido. Digite */cadastrar* e tente novamente.`,{parse_mode:"Markdown"})
        //         console.log(`Password Status: 400`)
        //         return false
        //     }
        //     console.log('Password Status: 200')
        //     return true
        // })
    // },

    // matchPasswords:(chatId,pass1, pass2) =>{
        // const isPassMatching = checkFields.passMatch(pass1,pass2)
        // if (isPassMatching === false){
        //     telegram.bot.sendMessage(chatId, `Senhas não conferem. Digite */cadastrar* e tente novamente.`,{parse_mode:"Markdown"})
        //     console.log('Password Match Status: 400')
        //     return false
        // }
        // console.log('Password Match Status: 200')
        // return true
    // }

    signUp:(reqUserId) => {

        // USER NAME

        telegram.bot.sendChatAction(reqUserId,'typing')
        telegram.bot.sendMessage(reqUserId,'Insira seu Nome:')
        let userSignUpData = {}
        telegram.bot.once('text', (inputName) => {
            const isNameCorrect = checkFields.name(inputName.text)
            if(isNameCorrect === false){
                telegram.bot.sendMessage(inputName.chat.id, `Você precisa fornecer um dado válido. Digite */cadastrar* e tente novamente.`,{parse_mode:"Markdown"})
                console.log(`Name Status: 400`)
                return false
            }
            const name = inputName.text
            console.log('Nome digitado foi: ' + name)
            Object.assign(userSignUpData, {name:name})
           
            // EMAIL
            telegram.bot.sendChatAction(reqUserId,'typing')
            telegram.bot.sendMessage(reqUserId, 'Insira seu Email:')
            telegram.bot.once('text', (inputEmail) => {
                const isEmailCorrect = checkFields.email(inputEmail.text)
                if(isEmailCorrect === false){
                    telegram.bot.sendMessage(inputEmail.chat.id, `Você precisa fornecer um dado válido. Digite */cadastrar* e tente novamente.`,{parse_mode:"Markdown"})
                    console.log(`Email Status: 400`)
                    return false
                }
                const email = inputEmail.text
                console.log('Email digitado foi: '+ email)
                Object.assign(userSignUpData, {email:email})

                // PASSWORD1
                
                telegram.bot.sendChatAction(reqUserId,'typing')
                telegram.bot.sendMessage(reqUserId, 'Insira sua senha.\n\nSua senha deve conter:\n-Mínimo de 8 caracteres\n-Ao menos uma letra maiúscula\n-Ao menos um número\nAo menos um caractere especial')	
                telegram.bot.once('text', (inputPass) => {
                    let pass1 = inputPass.text
                    const isPassCorrect = checkFields.pass(pass1)
                    if(isPassCorrect === false){
                        telegram.bot.sendMessage(reqUserId, `Você precisa fornecer um dado válido. Digite */cadastrar* e tente novamente.`,{parse_mode:"Markdown"})
                        console.log(`Password Status: 400`)
                        return false
                    }
                    telegram.bot.deleteMessage(reqUserId, inputPass.message_id)
                    console.log('Password 1 Status: 200')

                    // PASSWORD2
                    telegram.bot.sendChatAction(reqUserId,'typing')
                    telegram.bot.sendMessage(reqUserId, 'Insira sua senha novamente...')	
                    telegram.bot.on('text', (inputRePass) => {
                        let pass2 = inputRePass.text
                        const isPassCorrect = checkFields.pass(pass2)
                        if(isPassCorrect === false){
                            telegram.bot.sendMessage(reqUserId, `Você precisa fornecer um dado válido. Digite */cadastrar* e tente novamente.`,{parse_mode:"Markdown"})
                            console.log(`Password Status: 400`)
                            return false
                        }
                        telegram.bot.deleteMessage(reqUserId, inputRePass.message_id)
                        console.log('Password 2 Status: 200')

                        // CHECK IF BOTH PASSWORDS MATCHES EACH OTHER
                        const isPassMatching = checkFields.passMatch(pass1,pass2)
                        if (isPassMatching === false){
                            telegram.bot.sendMessage(reqUserId, `Senhas não conferem. Digite */cadastrar* e tente novamente.`,{parse_mode:"Markdown"})
                            console.log('Password Match Status: 400')
                            return false
                        }
                        const hashedPass = hash.genHash(pass1)
                        console.log('Password é: ' + pass1)
                        console.log('HashedPass = ' + hashedPass)
                        Object.assign(userSignUpData, {
                            pass1:hashedPass,
                            telegram_ID: reqUserId
                        })
                        telegram.bot.sendMessage(reqUserId, `*🎉Cadastrado com sucesso!🎉*`,{'parse_mode':'Markdown'})
						telegram.bot.removeTextListener(/\/cadastrar/)
                        return userSignUpData
                    })
                })
            
            })
        })

        
        
    }

    //     telegram.bot.on('text', (chatId) => {
    //         if(!chatId.text){
    //             telegram.bot.sendMessage(chatId, `Você precisa fornecer um dado válido. Digite */cadastrar* e tente novamente.`,{parse_mode:"Markdown"})
    //             console.log(`Name Status: 400`)
    //             return false
    // }
}