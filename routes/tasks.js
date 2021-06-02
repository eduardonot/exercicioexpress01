const express = require ('express')
const router = express.Router()
const Tasks = require ('./../schemas/tasks')
const authUser = require ('./../middlewares/authUser')

router.post('/task', authUser.verifyUserToken, (req, res) =>{
    if(!req.body.title){
        return res.status(400).send('Título não informado.')
    }

    Tasks.create(req.body)
        .then(data => res.json(data))
        .catch(err => res.status(400).send(err))
})

router.get('/task/:id?:title?:status?',authUser.verifyUserToken, (req, res) => {
    const task_id = req.query.id
    const title = req.query.title
    const status = req.query.status
    const query = {}
    if(!task_id && !title && !status){
        Tasks.find()
            .then(data => res.json(data))
            .catch(err => res.status(400).send(err))
        return
    }
    if(task_id){
        Object.assign(query, {_id: task_id})
    }
    if(title){
        Object.assign(query, {title:title})
    }
    if(status){
        Object.assign(query, {status:status})
    }
    console.log(query)
    Tasks.find(query)
        .then(data => res.json(data))
        .catch(err => res.status(400).send(err))
}) 

module.exports = router