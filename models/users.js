//Imports de modulos
var mongoose = require('mongoose')

//Obtenemos el objeto Schema de mongoose
var Schema = mongoose.Schema

//Creación del esquema
var userSchema = Schema({
    name: String,
    email: String,
    password: String,
    img: String,
    timers: Array
})

//Exportación del modelo
module.exports = mongoose.model('users',userSchema)