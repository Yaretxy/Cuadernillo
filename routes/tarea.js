const express=require('express')
const tareas_model= require('../models/tareas_model')

const router=express.Router()

router.get('/',function(req,res,next){
    if(req.session.loggedIn){
    tareas_model.obtener().then(tarea => {

        //res.json(productos)
        res.render('tarea/ver',{tarea:tarea,})

    }).catch(err => {
        return res.status(500).send('Error en obtener tarea')
    })
}else{
    req.flash('error','')
    res.render('auth/login')
  }
});

router.get('/agregar',function(req,res,next){

    res.render('tarea/agregar')
});


router.post('/insertar',function(req,res,next){
    //Obtener nombre y precio y esto va del body

    const {fechaI,fechaF,titulo,informacion,instrucciones,imagen} = req.body
    if(!fechaI||!fechaF||!titulo||!informacion||!instrucciones||!imagen){
        return res.status(500).send('complete los datos')
    }
    tareas_model.insertar(fechaI,fechaF,titulo,informacion,instrucciones,imagen).then(resultado => {
        res.json(resultado)
    }).catch(err => {
        res.status(500).send('Error al insertar tarea'+err)
    })
});
module.exports=router;