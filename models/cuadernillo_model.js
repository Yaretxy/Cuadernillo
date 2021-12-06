const conexion = require("../config/conexion.js");
//const fs = require('fs');
//const path = require('path');
//const { resolve } = require("path");
//CRUD - Create,read,update,delet

module.exports = {
    insertar(nombre,materia,semana,grupo) {
        return new Promise((resolve,reject) => {
            conexion.query('insert into cuadernillo (nombre,materia,semana,grupo)'+
                ' values (?,?,?,?)',[nombre,materia,semana,grupo],(err,resultado) => {
                    if (err)reject(err);
                    else resolve(resultado)
                })


        })


    },

    obtener() {
        return new Promise((resolve, reject) => {

            conexion.query('select idCuadernillo,nombre,materia,semana,grupo from cuadernillo', (err, resultados) => {
                if (err) reject(err);
                else resolve(resultados);
            })
        
        })
    },


}