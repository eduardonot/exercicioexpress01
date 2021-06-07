const auth = require('./../middlewares/check-token')
const controller = require('./../controllers/task-controller')

module.exports = router => {
    router.post('/task', auth.checkToken, controller.post),
    router.get('/task/:id?:title?:status?:description?',auth.checkToken, controller.get),
    router.put('/task/:id', auth.checkToken),
    router.delete('/task/:id', auth.checkToken)

}

// router.post('/task', authUser.isLogged, (req, res) =>{
//     if(!req.body.title){
//         return res.status(400).send('Título não informado.')
//     }

//     Tasks.create(req.body)
//         .then(data => res.json(data))
//         .catch(err => res.status(400).send(err))
// })

// router.get('/task/:id?:title?:status?',authUser.isLogged, (req, res) => {
//     const task_id = req.query.id
//     const title = req.query.title
//     const status = req.query.status
//     const query = {}
//     if(!task_id && !title && !status){
//         Tasks.find(Object.assign(req.body, {userId: req.headers.userPayload.id}))
//             .then(data => res.json(data))
//             .catch(err => res.status(400).send(err))
//         return
//     }
//     if(task_id){
//         Object.assign(query, {userId: req.headers.userPayload.id, _id: task_id})
//     }
//     if(title){
//         Object.assign(query, {userId: req.headers.userPayload.id, title:title})
//     }
//     if(status){
//         Object.assign(query, {userId: req.headers.userPayload.id, status:status})
//     }
//     console.log(query)
//     Tasks.find(query)
//         .then(data => res.json(data))
//         .catch(err => res.status(400).send(err))
// }) 

// router.put('/task/:id', authUser.isLogged, (req, res) => {
//     Tasks.findOneAndUpdate({_id: req.params.id, userId: req.headers.userPayload.id}, req.body)
//         .then((data) => {
//             if (!data){
//                 return res.status(404).send('Tarefa não encontrada')
//             }
//             res.json(data)
//         })
//         .catch(err => res.status (400).send('Não foi possível listar\n' + err))
// })

// router.delete('/task/:id', authUser.isLogged, (req, res) => {
//     Tasks.findOneAndDelete({_id: req.params.id, userId: req.headers.userPayload.id})
//         .then((data) => {
//             if (!data){
//                 return res.status(404).send('Tarefa não encontrada')
//             }
//             res.json(data)
//         })
//         .catch(err => res.status (400).send('Não foi possível listar\n' + err))
// })
