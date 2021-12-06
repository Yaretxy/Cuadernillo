const conexion = require("../config/conexion.js");
const fs = require('fs');
const path = require('path');
const { resolve } = require("path");
//CRUD - Create,read,update,delet

module.exports = {
    insertar(fechaI,fechaF,titulo,informacion,instrucciones,imagen) {
        return new Promise((resolve,reject) => {
            conexion.query('insert into tarea (fechaI,fechaF,titulo,informacion,instrucciones,imagen)'+
                ' values (?,?,?,?,?,?)',[fechaI,fechaF,titulo,informacion,instrucciones,imagen],(err,resultado) => {
                    if (err)reject(err);
                    else resolve(resultado.insertId)
                })


        })


    },

    obtener() {
        return new Promise((resolve, reject) => {

            conexion.query('select idTarea,fechaI,fechaF,titulo,informacion,instrucciones,imagen from tarea', (err, resultados) => {
                if (err) reject(err);
                else resolve(resultados);
            })
        
        })
    },
}