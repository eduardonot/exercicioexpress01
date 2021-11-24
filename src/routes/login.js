const fields = require('./../middlewares/check-fields-login')
const authController = require('./../controllers/auth-controller')

module.exports = router => {
    router.post('/login', fields.checkFields, authController.login, function (req, res) {
    })
}
