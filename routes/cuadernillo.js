const express=require('express')
const cuadernilloModel= require('../models/cuadernillo_model')

const router=express.Router()

router.get('/',function(req,res,next){
    if(req.session.loggedIn){
    cuadernilloModel.obtener().then(cuadernillo => {

        //res.json(productos)
        res.render('cuadernillo/ver',{cuadernillo:cuadernillo,})

    }).catch(err => {
        return res.status(500).send('Error en obtener cuadernillo')
    })
}else{
    req.flash('error','')
    res.render('auth/login')
  }
});

router.get('/agregar',function(req,res,next){

    res.render('cuadernillo/agregar')
});


router.post('/insertar',function(req,res,next){
    //Obtener nombre y precio y esto va del body

    const {nombre,materia,semana,grupo} = req.body
    if(!nombre||!materia||!semana||!grupo){
        return res.status(500).send('No hay nombre grupo o materia')
    }
    cuadernilloModel.insertar(nombre,materia,semana,grupo).then(resultado => {
        res.json(resultado)
    }).catch(err => {
        res.status(500).send('Error al insertar cuadernillo'+err)
    })
});
module.exports=router;