module.exports = {
    appPort: 3000,
    appName: 'API Task Manager',
	// mongoURL: `mongodb+srv://admin:Admin1234@cluster0.jfhep.mongodb.net/taskManager?retryWrites=true&w=majority`,
    mongoURL: 'mongodb://localhost/taskManager',
    jwtSecretPassword: '@Th@az^., Kom3 p 4sz +=! //(o_o)// Oh my god 123',
	cookieSecret: `asdasdads`,
    saltRounds: 10,
	mongoSetup: {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useFindAndModify: false,
		useCreateIndex: true
	},
	telegramToken: '1886102886:AAGZu48BQl1g73ZHX3IMHfz56I9wVYTf7as'
}
