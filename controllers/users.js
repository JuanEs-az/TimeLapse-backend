//Imports de modulos
var usersModel = require('../models/users')
var fs = require('fs')
//Creación de controladores 
//Parte de usuarios
users = {

    //Guardar usuarios en la base (BODY: name,email,password)
    //URL: '/save'
    save: function(req,res){
        //Traemos el modelo y obtenemos los parametros del body de la request
        var user = new usersModel()
        var data = req.body
        //Ingresamos los datos de la request en el modelo
        user.name = data.name
        user.email = data.email
        user.password = data.password
        user.timers = []
        //Guardamos el modelo y verificamos que todo esté bien
        user.save((err, result) => {
            if(err){
                res.status(500)
                   .send({error:true,type:500})
            }else if(!result){
                res.status(404)
                   .send({error:true,type:404})
            }else{
                res.status(200)
                   .send({error:false,submitted:result})
            }
        })
    },

    //Obtener un usuario de la base (BODY: email,password)
    //URL: '/get'
    get: function(req,res){
        //Obtenemos los parametros
        var data = req.body
        //Obtenemos un usuario según los parametros y lo enviamos por la response
        usersModel.findOne({email: data.email , password: data.password},(err, result) => {
            if(err){
                res.status(500)
                   .send({error:true,type:500})
            }else if(!result){
                res.status(404)
                   .send({error:true,type:404})
            }else{
                res.status(200)
                   .send({error:false,submitted:result})
            }
        })
    },

    //Actualizar todas las caracteristicas del usuario menos la img (BODY: name,email,password) (PARAMS:id)
    //URL: /update/:id
    update:function(req,res){
        var id = req.params.id
        var data = req.body
        var newUser = {
            name: data.name,
            email: data.email,
            password: data.password
        }
        usersModel.findByIdAndUpdate(id,newUser,{new:true},(err, result) => {
            if(err){
                res.status(500)
                   .send({error:true,type:500})
            }else if(!result){
                res.status(404)
                   .send({error:true,type:404})
            }else{
                res.status(200)
                   .send({error:false,now:result})
            }
        })
    },

    //Actualizar la imagen de un usuario (FILES: img) (PARAMS: id)
    //URL: '/updateImage/:id'
    updateImage:function(req,res){
        //Obtenemos la id del usuario
        var id = req.params.id
        //Verificamos que si haya un objeto file en la request
        if(req.files){
            //Obtenemos el nombre y la extensión del archivo
            var filePath = req.files.img.path
            var fileName = filePath.split("\\")[1]
            var extension = fileName.split(".")[1]
            //Verificamos si el archivo tiene alguna de las extensiones validas y si es así procedemos a actualizar
            if(extension == "png" || extension == "jpeg" || extension == "jpg" || extension == "gif"){
                usersModel.findByIdAndUpdate(id,{img:fileName},{new:true},(err, result) => {
                    if(err){
                        res.status(500)
                           .send({error:true,type:500})
                    }else if(!result){
                        res.status(404)
                           .send({error:true,type:404})
                    }else{
                        res.status(200)
                           .send({error:false,now:result})
                    }
                })
            }else{
                fs.unlink(filePath, () => {
                    return res.status(404)
                              .send({error:true,type:404})
                })
            }
        }
    }
    
}

//Parte de timers
var timers = {

    //Añadir timer (BODY: name,interval,img,sound) (PARAMS: userid)
    //URL: '/timers/save/:userid'
    save: function(req,res){
        var data = req.body
        data.userid = req.params.userid
        //Obtener timer
        var timer = {
            name: data.name,
            interval: parseInt(data.interval),
            img: data.img,
            sonido: data.sonido
        }
        //Obtener timers del usuario
        usersModel.findById(data.userid,(err, result) => {
            if(err){
                res.status(500)
                   .send({error:true,type:500})
            }else if(!result){
                res.status(404)
                   .send({error:true,type:404})
            }else{
                timers = result.timers
                //Setear timer y añadirle el elemento deseado
                timers.push(timer)
                //Actualizar timer en la base
                usersModel.findByIdAndUpdate(data.userid,{timers:timers},{new:true},(err, result) => {
                    if(err){
                        res.status(500)
                        .send({error:true,type:500})
                    }else if(!result){
                        res.status(404)
                        .send({error:true,type:404})
                    }else{
                        res.status(200)
                        .send({error:false,now:result})
                    }
                })
            }
        })
    },

    //Eliminar un timer (BODY: index) (PARAMS: userid)
    //URL: '/timers/delete/:userid'
    delete: function(req,res){
        var data = req.body
        data.userid = req.params.userid
        //Obtener timers del usuario
        usersModel.findById(data.userid,(err, result) => {
            if(err){
                res.status(500)
                   .send({error:true,type:500})
            }else if(!result){
                res.status(404)
                   .send({error:true,type:404})
            }else{
                timers = result.timers
                //Eliminar el elemento deseado del timer
                timers.splice(data.index,1)
                //Actualizar timer en la base
                usersModel.findByIdAndUpdate(data.userid,{timers:timers},{new:true},(err, result) => {
                    if(err){
                        res.status(500)
                        .send({error:true,type:500})
                    }else if(!result){
                        res.status(404)
                        .send({error:true,type:404})
                    }else{
                        res.status(200)
                        .send({error:false,now:result})
                    }
                })
            }
        })
    },

    //Actualizar timer (BODY: index,name,interval,img,sound) (PARAMS: userid)
    //URL: 'timers/update/:userid'
    update: function(req,res){
        var data = req.body
        data.userid = req.params.userid
        //Obtener nuevos datos
        var newtimer = {
            name: data.name,
            interval: parseInt(data.interval),
            img: data.img,
            sound: data.sonido
        }
        //Obtener timers del usuario
        usersModel.findById(data.userid,(err, result) => {
            if(err){
                res.status(500)
                   .send({error:true,type:500})
            }else if(!result){
                res.status(404)
                   .send({error:true,type:404})
            }else{
                timers = result.timers
                //Setear nuevo timer y borrar el viejo
                timers.splice(data.index,1,newtimer)                
                //Actualizar timer en la base
                usersModel.findByIdAndUpdate(data.userid,{timers:timers},{new:true},(err, result) => {
                    if(err){
                        res.status(500)
                        .send({error:true,type:500})
                    }else if(!result){
                        res.status(404)
                        .send({error:true,type:404})
                    }else{
                        res.status(200)
                        .send({error:false,now:result})
                    }
                })
            }
        })
    }
}




usersController = {users:users,timers:timers}
//Exportación del controlador
module.exports = usersController