const jwt = require('./../helpers/jwt')

module.exports = class TelegramSession {
	constructor () {
		this.sessionList = []
		this.sessionData = {}
	}

	setSession (id, userData) {
		this.sessionData = { id: id, data: userData }
		this.sessionList.push(this.sessionData)
		return this.sessionList
	}

	getSession () {
		return this.sessionList
	}

	getUserSession (userId) {
		return this.sessionList.find(x => x.id === userId)
	}

	async getUserAndSetToken (userData) {
		const userToken = {}
		const getUser = this.sessionList.find(x => x.id === userData.id)
		if (!getUser.userData.token) {
			Object.assign(userToken, { _id: userData.chat.id, name: userData.from.first_name, email: userData.from.username })
			const telegramUserToken = jwt.genToken(userToken)
            await Object.assign(userData, { token: telegramUserToken })
            return userData.token
		}
	}
}
