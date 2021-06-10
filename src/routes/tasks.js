const auth = require('./../middlewares/check-token')
const controller = require('./../controllers/task-controller')
const search = require ('./../middlewares/task-criteria')

module.exports = router => {
    router.post('/task', auth.checkToken, controller.post),
    router.get('/task/:id?:title?:status?:description?',auth.checkToken, search.searchCriteria, controller.get),
    router.put('/task/:id', auth.checkToken, controller.put),
    router.delete('/task/:id', auth.checkToken, controller.delete)

}