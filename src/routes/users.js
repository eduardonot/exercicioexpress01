const express = require ('express')
const router = express.Router()
const authUser = require('./../middlewares/authUser')
const Users = require ('../models/users')

router.post('/user',authUser.checkFields, function(req, res){
    Users.create(req.body)
        .then(data => res.json(data))
        .catch(err => res.status(400).send(err))
})

router.get('/user', (req, res) => {
    // METODO 1
    //db.collection('users').createIndex({name: "text"})
    // Users.find(
    //     {$text:
    //         {$search: req.body.name}}
    // )
    //     .then(data => res.json(data))
    //     .catch(err => res.status(400).send(err))

    // METODO 2
    Users.find({
        $and: [
            {name: new RegExp(req.body.name, 'i')},
            {email: new RegExp(req.body.email, 'i')}
        ]
    })
        .select('name email')
        .then(data => res.json(data))
        .catch(err => res.status(400).send(err))


})

module.exports = router