const express = require('express');
const router = express.Router();
const authModel= require('../models/auth_model')


router.post('/authentication',function(req,res,next){

    const {correo,password} =req.body
    authModel.authenticate(correo,password).
    then(user => {
        //Validar que tenga por lo menos
        // un objeto el arreglo
        if(user.length>0){
        req.session.loggedIn=true
        req.session.name = correo
        res.redirect('/cuadernillo')
    }else{
        req.flash('success',
         'No se encontro el usuario')
        res.redirect('/auth/login')
    }
    }).catch(err => {
        req.flash('error',
         'Ingrese correctamente los datos!')
        res.redirect('/auth/login')
    })


});
router.get('/', function(req, res, next){    
    // render to views/user/add.ejs
    res.render('auth/login', {
        title: 'Login',
        correo: '',
        password: ''     
    })
})
 
//display login page
router.get('/login', function(req, res, next){    
    // render to views/user/add.ejs
    res.render('auth/login', {
        title: 'Login',
        correo: '',
        password: ''    
    })
})
 

module.exports=router