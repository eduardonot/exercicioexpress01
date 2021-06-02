const express = require ('express')
const router = express.Router()
const authUsers = require ('./../middlewares/authUser')

router.get('/login', (req, res) => {
	res.send('Tela de Login')
})

router.post('/login', authUsers.authLogin,function(req, res){
	
})

module.exports = router