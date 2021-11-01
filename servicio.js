const express= require('express')
const path= require('path')
const fs=require('fs')
const formidable= require('formidable')
const session= require('express-session')
const  routerIndex =require('./routes/index')
const  routerCuadernillo =require('./routes/cuadernillo')
//const routerAuth=require('./routes/auth')
const cookieParser=require('cookie-parser')
const router = require('./routes/cuadernillo')
const  sercuadernillo=require('./models/cuadernillo_model')
const { Cookie } = require('express-session')
const { route } = require('./routes/cuadernillo')
const port = 5000
var app = express();

// Configuracion de engine de vistas en carpeta view de EJS
//npm install ejs
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: false }));
app.use(session({
    secret:'123456abc',
    resave:false,
    saveUninitialized:true,
    cookie:{maxAge: 6000}
}))
//npm install cookie-parser
app.use(cookieParser());
//Contenido estatico
app.use(express.static(path.join(__dirname, 'public')));
app.use('/',routerIndex)
app.use('/cuadernillo',routerCuadernillo)
//app.use('/auth',routerAuth)
//app.use(router)
app.listen(port,function(){

    console.log('Example app ruta:localhost:'+port)
})