const express= require('express')
const path= require('path')
const fs=require('fs')
//mensajes
const flash=require('express-flash')
const formidable= require('formidable')
const session= require('express-session')
const  routerIndex =require('./routes/index')
const  routerCuadernillo =require('./routes/cuadernillo')
const routerTarea=require('./routes/tarea')
const routerAuth=require('./routes/auth')
const cookieParser=require('cookie-parser')
const router = require('./routes/cuadernillo')
const  sercuadernillo=require('./models/cuadernillo_model')

const { Cookie } = require('express-session')
const { route } = require('./routes/cuadernillo')
const port = 8080
var app = express();

// Configuracion de engine de vistas en carpeta view de EJS
//npm install ejs
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
//mensajes
app.use(flash())
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: false }));
app.use(session({
    secret:'123456abc',
    resave:false,
    saveUninitialized:true,
    cookie:{maxAge: 6000}
}))

const DOMINIO_PERMITIDO_CORS = "http://localhost:8080",
  DIRECTORIO_FOTOST = path.join(__dirname, "fotos_tarea"),
  DIRECTORIO_DIST = path.join(__dirname, "dist");
  
  app.use("/foto_tarea", express.static(DIRECTORIO_FOTOST));
  // Estático
  app.use("/", express.static(DIRECTORIO_DIST));
  
  if (!fs.existsSync(DIRECTORIO_FOTOST)) {
    fs.mkdirSync(DIRECTORIO_FOTOST);
  }
  app.use((req, res, next) => {
    res.set("Access-Control-Allow-Credentials", "true");
    res.set("Access-Control-Allow-Origin", DOMINIO_PERMITIDO_CORS);
    res.set("Access-Control-Allow-Headers", "Content-Type");
    res.set("Access-Control-Allow-Methods", "DELETE");
    next();
  });

  app.use(express.json()) // for parsing application/json
  app.use(express.urlencoded({ extended: false }));
//npm install cookie-parser
app.use(cookieParser());
//Contenido estatico
app.use(express.static(path.join(__dirname, 'public')));
app.use('/',routerIndex)
app.use('/cuadernillo',routerCuadernillo)
app.use('/tarea',routerTarea)
app.use('/auth',routerAuth)
//app.use(router)
app.listen(port,function(){

    console.log('Example app ruta:localhost:'+port)
})