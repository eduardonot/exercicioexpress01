const jwt = require('./../helpers/jwt')

module.exports = class TelegramSession {
	constructor(){
		this.sessionList = []
		this.sessionData = {}
	}


	setSession(id, userName, messagesCount, token) {
		this.sessionData = {id:id, userName: userName, messagesCount:messagesCount, token:token}
		this.sessionList.push(this.sessionData)
		return this.sessionList
	}

	getSession() {
		return this.sessionList
	}

	getUserSession(userId){
		return this.sessionList.find(x => x.id == userId)
	}

	async getUserAndSetToken(userData){
		let userToken = {}
		const getUser = this.sessionList.find(x => x.id == userData.id)
		if (!userData.token){
			Object.assign(userToken, {_id: userData.chat.id, name: userData.from.first_name, email: userData.from.username})
			const telegramUserToken = await jwt.genToken(userToken)
            await Object.assign(userData,{token:telegramUserToken})
            return userData.token
		}
        return

    }
}
