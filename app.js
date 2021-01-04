//Imports de modulos
var express = require('express')
var bodyParser = require('body-parser')

//Declaración de la app
var app = express()

//Configuración de rutas

//Middlewares
app.use(bodyParser.urlencoded({extended:false})) //Configuraciones necesarias
app.use(bodyParser.json()) //Para que cualquier tipo de petición sea convertida a JSON

//Configuración del CORS}
app.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
	res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
	res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
	next();
})

//Cargar rutas

//Exportamos la app
module.exports = app