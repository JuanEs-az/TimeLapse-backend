//Imports de modulos
var express = require('express')
var multiparty = require('connect-multiparty')

//Imports de controladores
var controller = require('../controllers/users')

//Declaración del router
var router = express.Router()

//Middlewares
var middlewares = {
    forMedia: multiparty({uploadDir:'./uploads'})
}

//Configuración de rutas
//Metodos con usuarios
router.post('/save',controller.users.save)
router.get('/get',controller.users.get)
router.put('/update/:id',controller.users.update)
router.put('/updateImage/:id',middlewares.forMedia,controller.users.updateImage)
//Metodos con timers
router.post('/timers/save/:userid',controller.timers.save)
router.put('/timers/update/:userid',controller.timers.update)
router.delete('/timers/delete/:userid',controller.timers.delete)
//Exportación del router
module.exports = router