const taskServices = require('../repository/task-repository')

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
        taskServices.search(req.body.criteria)
            .then(data => res.json(data))
            .catch(err => res.status(400).send(err))
    },

    put:(req, res) => {
        const params = {_id: req.params.id, userId: req.headers.userPayload.id}
        taskServices.findAndUpdate(params, req)
            .then((data) => {
                if (!data){
                    return res.status(404).send('Tarefa não encontrada')
                }
                res.status(200).send('Dados alterados com sucesso!')
            })
            .catch(err => res.status (400).send('Não foi possível realizar sua requisição\n' + err))
    },

    delete:(req, res) => {
        const params = {_id: req.params.id, userId: req.headers.userPayload.id}
        taskServices.findAndUpdate(params,req)
            .then((data) => {
                if (!data){
                    return res.status(404).send('Tarefa não encontrada')
                }
                res.status(200).send('Tarefa excluída com sucesso!')
            })
            .catch(err => res.status (400).send('Não foi possível realizar sua requisição\n' + err))
    }
}