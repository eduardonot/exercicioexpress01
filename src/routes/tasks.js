const auth = require('./../middlewares/check-token')
const controller = require('./../controllers/task-controller')

module.exports = router => {
    router.post('/task', auth.checkToken, controller.post),
    router.get('/task/:id?:title?:status?:description?',auth.checkToken, controller.get),
    router.put('/task/:id', auth.checkToken, controller.put),
    router.delete('/task/:id', auth.checkToken, controller.delete)

}