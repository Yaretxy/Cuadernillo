const conexion = require("../config/conexion.js");
module.exports = {

        authenticate(correo,password){

            
    return new Promise((resolve, reject)=>{

            conexion.query('Select * from user where correo= ? and password=?',[correo,password], (err,resultado)=>{
                if(err)reject(err)
                else resolve(resultado)
            })

        })
    }

   

}