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
        taskServices.search(req.body)
            .then(data => res.json(data))
            .catch(err => res.status(400).send(err))
    },

    put:(req, res) => {
        taskServices.findAndUpdate(req)
            .then((data) => {
                if (!data){
                    return res.status(404).send('Tarefa não encontrada')
                }
                res.status(200).send('Dados alterados com sucesso!')
            })
            .catch(err => res.status (400).send('Não foi possível realizar sua requisição\n' + err))
    },

    delete:(req, res) => {
        taskServices.findAndUpdate(req)
            .then((data) => {
                if (!data){
                    return res.status(404).send('Tarefa não encontrada')
                }
                res.status(200).send('Tarefa excluída com sucesso!')
            })
            .catch(err => res.status (400).send('Não foi possível realizar sua requisição\n' + err))
    }
}