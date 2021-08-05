const mongoose = require('mongoose')
const config = require('./../config')
const db = mongoose.connection

module.exports = {
    connect (app) {
        mongoose.connect(config.mongoURL, config.mongoSetup)
        db.on('error', console.error.bind(console, 'Connection error.'))
        db.once('open', () => {
            app.listen(config.appPort, () => {
                console.log(`${config.appName} conectado à porta ${config.appPort} e Banco de Dados Conectado!`)
            })
        })
    }
}
