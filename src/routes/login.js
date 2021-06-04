const express = require ('express')
const router = express.Router()
const fields = require ('./../middlewares/check-fields-login')
// const pass = require('./../middlewares/check-password')
const authController = require('./../controllers/auth-controller')

module.exports = router =>{
    router.post('/login',fields.checkFields, authController.login)
       
}