module.exports = {
    appPort: 4000,
    appName: 'API Task Manager',
	// mongoURL: `mongodb+srv://admin:Admin1234@cluster0.jfhep.mongodb.net/taskManager?retryWrites=true&w=majority`,
    mongoURL: 'mongodb://localhost/taskManager',
    jwtSecretPassword: '0🤣🎆D🎍1🧨l🎨3🥽せひけのR👱🏻‍♂️4👩🏻‍🦱6%$h#.👶🏻ひ👱🏿‍♀️🎅🏿©↘↛↸↹¾ⅤⅫ⅒(☞ﾟヮﾟ)☞☜(ﾟヮﾟ☜)o((⊙﹏⊙))o.®༼ つ ◕_◕ ༽つ▓WND1l3r4!░«▒▓│🧛‍♂️🧄🔟®©💲✔',
    saltRounds: 10,
	mongoSetup: {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useFindAndModify: false,
		useCreateIndex: true
	},
	telegramToken: '1886102886:AAGZu48BQl1g73ZHX3IMHfz56I9wVYTf7as'
}
