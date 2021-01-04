//Imports de modulos
var mongoose = require('mongoose')
var app = require('./app')
var port = 9930
//Establecemos la conexión con el servidor
mongoose.connect('mongodb:localhost:27017/timelapse',{useNewUrlParser:true,useUnifiedTopology:true})
        .then(() => {
            console.log("Conexión establecida")
            //Conexión con el servidor
            app.listen(port , () => {
                console.log("Servidor corriendo en puerto " + port)
            })
        })
        .catch((err) => {
            console.log(err)
        })

    