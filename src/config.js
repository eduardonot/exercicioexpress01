const ports = require('./helpers/ports')

module.exports = {
    appPort: 3000,
    appName: 'API Task Manager',
    mongoURL: 'mongodb://localhost/taskManager',
    jwtSecretPassword: '0🤣🎆D🎍1🧨l🎨3🥽せひけのR👱🏻‍♂️4👩🏻‍🦱6%$h#.👶🏻ひ👱🏿‍♀️🎅🏿©↘↛↸↹¾ⅤⅫ⅒(☞ﾟヮﾟ)☞☜(ﾟヮﾟ☜)o((⊙﹏⊙))o.®༼ つ ◕_◕ ༽つ▓WND1l3r4!░«▒▓│🧛‍♂️🧄🔟®©💲✔',
    saltRounds: 10,
	mongoSetup:{
		useNewUrlParser: true, 
		useUnifiedTopology: true,
		useFindAndModify: false,
		useCreateIndex: true
	}
}