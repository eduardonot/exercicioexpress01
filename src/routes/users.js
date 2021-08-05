const auth = require('./../middlewares/check-fields-signup')
const userController = require('./../controllers/user-controller')

module.exports = router => {
    router.post('/user', auth.checkFields, userController.create)
    router.get('/user', userController.search)
}
