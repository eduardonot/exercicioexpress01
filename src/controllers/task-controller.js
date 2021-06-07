const taskServices = require('./../services/task-services')

module.exports = {

    post:(req, res) => {
        if(!req.body.title){
            return res.status(400).send('Título não informado.')
        }
        taskServices.create(req.body)
            .then(data => res.json(data))
            .catch(err => res.status(400).send(err))
    },

    get:(req, res) => {
        const task_id = req.body.id
        const title = req.body.title
        const status = req.body.status
        const description = req.body.description
        const query = {}
        if(!task_id && !title && !status && !description){
            taskServices.findAll(req)
                .then(data => res.json(data))
                .catch(err => res.status(400).send(err))
            return
        }
        if (!status){
            req.body.status = true
        }
        taskServices.search(req.body)
            .then(data => res.json(data))
            .catch(err => res.status(400).send(err))
    },

    put:(req, res) => {
        Tasks.findOneAndUpdate({_id: req.params.id, userId: req.headers.userPayload.id}, req.body)
            .then((data) => {
                if (!data){
                    return res.status(404).send('Tarefa não encontrada')
                }
                res.json(data)
            })
            .catch(err => res.status (400).send('Não foi possível listar\n' + err))
    },

    delete:(req, res) => {
        Tasks.findOneAndDelete({_id: req.params.id, userId: req.headers.userPayload.id})
            .then((data) => {
                if (!data){
                    return res.status(404).send('Tarefa não encontrada')
                }
                res.json(data)
            })
            .catch(err => res.status (400).send('Não foi possível listar\n' + err))
    }
}